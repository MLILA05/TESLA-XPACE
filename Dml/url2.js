const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "url2",
  alias: ["imgtourl2", "imgurl2", "url2", "upload2"],
  react: "🖇",
  desc: "Upload media to Catbox (stable)",
  category: "utility",
  use: ".tourl (reply media)",
  filename: __filename
}, async (client, message, args, { reply }) => {

  let tempFilePath;

  try {
    const quoted = message.quoted ? message.quoted : message;
    const mime = (quoted.msg || quoted).mimetype || "";

    if (!mime) {
      return reply("❌ Reply to image, video or audio first");
    }

    const buffer = await quoted.download();

    tempFilePath = path.join(os.tmpdir(), `catbox_${Date.now()}`);
    fs.writeFileSync(tempFilePath, buffer);

    // extension
    let ext = ".bin";
    if (mime.includes("image")) ext = ".jpg";
    else if (mime.includes("video")) ext = ".mp4";
    else if (mime.includes("audio")) ext = ".mp3";

    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath), `file${ext}`);
    form.append("reqtype", "fileupload");

    // 🔥 REQUIRED HEADERS (fixes most upload failures)
    const headers = {
      ...form.getHeaders(),
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Accept": "*/*",
      "Origin": "https://catbox.moe",
      "Referer": "https://catbox.moe/"
    };

    // Fix Content-Length (IMPORTANT)
    const length = await new Promise((resolve, reject) => {
      form.getLength((err, len) => {
        if (err) reject(err);
        else resolve(len);
      });
    });

    headers["Content-Length"] = length;

    // 🔥 STABLE CATBOX ENDPOINT (NOT INTERNAL LITTERBOX)
    const response = await axios.post(
      "https://catbox.moe/user/api.php",
      form,
      { headers }
    );

    const url = response.data?.trim();

    if (!url || !url.startsWith("http")) {
      throw new Error("Upload failed (empty response)");
    }

    fs.unlinkSync(tempFilePath);

    let type = "File";
    if (mime.includes("image")) type = "Image";
    else if (mime.includes("video")) type = "Video";
    else if (mime.includes("audio")) type = "Audio";

    return reply(
      `*${type} Uploaded Successfully*\n\n` +
      `*Size:* ${buffer.length} bytes\n` +
      `*URL:* ${url}\n\n` +
      `> TESLA-XPACE 💜`
    );

  } catch (err) {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    console.error(err);
    return reply("❌ Upload failed: " + (err.message || err));
  }
});

// helper
function formatBytes(bytes) {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

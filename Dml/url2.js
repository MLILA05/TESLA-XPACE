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
  desc: "Upload media using Litterbox (Catbox)",
  category: "utility",
  use: ".tourl (reply media)",
  filename: __filename
}, async (client, message, args, { reply }) => {

  let tempFilePath;

  try {
    const quoted = message.quoted ? message.quoted : message;
    const mime = (quoted.msg || quoted).mimetype || "";

    if (!mime) {
      return reply("❌ Reply to an image, video or audio first");
    }

    const buffer = await quoted.download();

    tempFilePath = path.join(os.tmpdir(), `litter_${Date.now()}`);
    fs.writeFileSync(tempFilePath, buffer);

    // file name
    let ext = ".bin";
    if (mime.includes("image")) ext = ".jpg";
    else if (mime.includes("video")) ext = ".mp4";
    else if (mime.includes("audio")) ext = ".mp3";

    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath), `file${ext}`);
    form.append("reqtype", "fileupload");

    const headers = {
      ...form.getHeaders(),
      "User-Agent": "Mozilla/5.0"
    };

    // IMPORTANT: Content-Length fix
    const length = await new Promise((resolve, reject) => {
      form.getLength((err, len) => {
        if (err) reject(err);
        else resolve(len);
      });
    });

    headers["Content-Length"] = length;

    // 🔥 LITTERBOX API (STABLE)
    const response = await axios.post(
      "https://litterbox.catbox.moe/resources/internals/api.php",
      form,
      { headers }
    );

    const url = response.data?.trim();

    if (!url || !url.startsWith("http")) {
      throw new Error("Upload failed (Litterbox returned empty response)");
    }

    fs.unlinkSync(tempFilePath);

    let type = "File";
    if (mime.includes("image")) type = "Image";
    else if (mime.includes("video")) type = "Video";
    else if (mime.includes("audio")) type = "Audio";

    return reply(
      `*${type} Uploaded Successfully (Litterbox)*\n\n` +
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

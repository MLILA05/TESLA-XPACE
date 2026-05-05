const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "tourl",
  alias: ["imgtourl", "imgurl", "url", "geturl", "upload"],
  react: "🖇",
  desc: "Convert media to Catbox URL",
  category: "utility",
  use: ".tourl [reply to media]",
  filename: __filename
}, async (client, message, args, { reply }) => {
  let tempFilePath;

  try {
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || "";

    if (!mimeType) {
      return reply("❌ Please reply to an image, video, or audio file");
    }

    // Download media
    const mediaBuffer = await quotedMsg.download();

    tempFilePath = path.join(os.tmpdir(), `catbox_${Date.now()}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // File extension
    let extension = "";
    if (mimeType.includes("image/jpeg")) extension = ".jpg";
    else if (mimeType.includes("image/png")) extension = ".png";
    else if (mimeType.includes("video")) extension = ".mp4";
    else if (mimeType.includes("audio")) extension = ".mp3";
    else extension = ".bin";

    const fileName = `file${extension}`;

    // Form data
    const form = new FormData();
    form.append("fileToUpload", fs.createReadStream(tempFilePath), fileName);
    form.append("reqtype", "fileupload");

    // Headers
    const headers = {
      ...form.getHeaders(),
      "User-Agent": "Mozilla/5.0"
    };

    // Fix Content-Length (IMPORTANT)
    const contentLength = await new Promise((resolve, reject) => {
      form.getLength((err, length) => {
        if (err) reject(err);
        else resolve(length);
      });
    });

    headers["Content-Length"] = contentLength;

    // Upload
    const response = await axios.post(
      "https://catbox.moe/user/api.php",
      form,
      { headers }
    );

    const url = response.data?.trim();

    if (!url || !url.startsWith("http")) {
      throw new Error("Upload failed. Catbox returned empty response.");
    }

    // Cleanup
    fs.unlinkSync(tempFilePath);

    // Type label
    let type = "File";
    if (mimeType.includes("image")) type = "Image";
    else if (mimeType.includes("video")) type = "Video";
    else if (mimeType.includes("audio")) type = "Audio";

    return reply(
      `*${type} Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*URL:* ${url}\n\n` +
      `> TESLA-XPACE 💜`
    );

  } catch (error) {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    console.error(error);
    return reply(`❌ Error: ${error.message || error}`);
  }
});

// Format bytes helper
function formatBytes(bytes) {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

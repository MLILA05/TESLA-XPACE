const { cmd } = require("../command");

cmd({
  pattern: "vv",
  alias: ["viewonce", "retrive", "vv2"],
  react: '🐳',
  desc: "Owner Only - retrieve quoted view once (use vv2 to send to bot inbox)",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator, command, botNumber2 }) => {
  try {
    if (!isCreator) {
      return await client.sendMessage(from, {
        text: "*📛 This is an owner command.*"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*〽️ Please reply to a view once message!*"
      }, { quoted: message });
    }

    const quoted = match.quoted;
    const viewOnceContent =
      quoted.message?.viewOnceMessage?.message ||
      quoted.message?.viewOnceMessageV2?.message ||
      quoted.message?.viewOnceMessageV2Extension?.message;

    let mtype = quoted.mtype;
    if ((!mtype || mtype.startsWith("viewOnceMessage")) && viewOnceContent) {
      if (viewOnceContent.imageMessage) mtype = "imageMessage";
      else if (viewOnceContent.videoMessage) mtype = "videoMessage";
      else if (viewOnceContent.audioMessage) mtype = "audioMessage";
    }

    const buffer = typeof quoted.download === "function"
      ? await quoted.download()
      : await client.downloadMediaMessage(quoted.msg || quoted);

    const isVv2 = command === "vv2";
    const botInboxJid = botNumber2 || (client.user?.id ? `${client.user.id.split(":")[0]}@s.whatsapp.net` : from);
    const targetJid = isVv2 ? botInboxJid : from;
    const options = targetJid === from ? { quoted: message } : {};

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: quoted.text || quoted.caption || '',
          mimetype: quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: quoted.text || quoted.caption || '',
          mimetype: quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio view once messages are supported"
        }, { quoted: message });
    }

    await client.sendMessage(targetJid, messageContent, options);

    if (isVv2) {
      await client.sendMessage(from, {
        text: "✅ View once recovered and sent to inbox."
      }, { quoted: message });
    }
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});

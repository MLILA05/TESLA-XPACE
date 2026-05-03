const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
  on: "body"
}, async (conn, m, { isGroup }) => {
  try {
    if (config.MENTION_REPLY !== 'true' || !isGroup) return;
    if (!m.mentionedJid || m.mentionedJid.length === 0) return;

    // Add your Catbox video URLs here (10-15 videos)
    const videoClips = [
      "https://files.catbox.moe/oylf6p.mp4"
    ];

    const randomClip = videoClips[Math.floor(Math.random() * videoClips.length)];
    const botNumber = conn.user.id.split(":")[0] + '@s.whatsapp.net';

    if (m.mentionedJid.includes(botNumber)) {
      
      // Send as Video Note (Camera Note - Round Circle Video)
      await conn.sendMessage(m.chat, {
        video: { url: randomClip },
        ptv: true,  // This makes it a VIDEO NOTE (round circle like WhatsApp camera)
        gifPlayback: false
      }, { quoted: m });
      
    }
  } catch (e) {
    console.error(e);
    const ownerJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerJid, {
      text: `*Bot Error in Mention Handler:*\n${e.message}`
    });
  }
});

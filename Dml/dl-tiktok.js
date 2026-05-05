const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Download TikTok video",
    category: "downloader",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎯 Please provide a valid TikTok link!\n\nExample:\n.tt https://vt.tiktok.com/xxxxx");

        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        // Fetch TikTok data using new API
        const api = `https://api.deline.web.id/downloader/tiktok?url=${encodeURIComponent(q)}`;
        const res = await axios.get(api);
        const json = res.data;

        if (!json?.status || !json?.result) {
            return await reply("❌ Download failed! Try again later.");
        }

        const result = json.result;

        // 🎥 Send TikTok video with info in caption
        await conn.sendMessage(from, {
            video: { url: result.download },
            mimetype: 'video/mp4',
            caption: `🎵 *${result.title || 'TikTok Video'}*\n👤 *Author:* ${result.author?.nickname || 'Unknown'}\n📱 *Username:* @${result.author?.unique_id || 'Unknown'}\n🌍 *Region:* ${result.region || 'N/A'}\n\n> ✨ *TESLA-XPACE*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("Error in .tiktok:", e);
        await reply("❌ Error occurred while downloading TikTok video!");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

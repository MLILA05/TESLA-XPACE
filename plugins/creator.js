const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "creator",
    alias: ["creator", "coder", "dev"],
    desc: "Show bot creator information",
    category: "info",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Owner information (you can modify these values)
        const ownerInfo = {
            name: "TESLA-XPACE",
            number: "+255622220680",
            photo: "https://files.catbox.moe/xksplb.jpg",
            bio: "The creator of this amazing bot"
        };

        // Beautiful formatted message
        const creatorMessage = `┏━〔 👑 OWNER INFO 〕━┓
┃ 🪪 ${ownerInfo.name}
┃ 📞 ${ownerInfo.number}
┃ 📝 ${ownerInfo.bio}
┃ 🤖 ${config.BOT_NAME}
┃ ⚡ v${config.VERSION || "2.0"}
┗━〔 Contact for Support 〕━┛`;

        // Send message with owner photo
        await conn.sendMessage(from, {
            image: { url: ownerInfo.photo },
            caption: creatorMessage,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Creator Command Error:", e);
        // Fallback text if image fails
        await reply(`👑 *Creator Info*\n\nName: TESLA-XPACE\nNumber: +255622220680\n\nContact for bot support!`);
    }
});


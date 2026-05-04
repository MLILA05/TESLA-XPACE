const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {

        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        const botName = config.BOT_NAME || "TESLA-XPACE";
        const ownerName = config.OWNER_NAME || "DEVELOPER";
        const prefix = config.PREFIX || ".";

        //tesla-xpace
        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363403958418756@newsletter",
                newsletterName: botName,
                serverMessageId: 143
            }
        };

        // MAIN MENU
        const menuCaption = `╭━━━〔 🤖 ${botName} 〕━━━╮
┃ ⚡ PREMIUM WHATSAPP BOT
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 👑 INFO 〕━━━╮
┃ 👤 @${m.sender.split("@")[0]}
┃ 👑 ${ownerName}
┃ 📦 ${totalCommands} Commands
┃ ⏱️ ${uptime}
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📂 MENU 〕━━━╮
┃ 1 ➤ DOWNLOAD
┃ 2 ➤ GROUP
┃ 3 ➤ FUN
┃ 4 ➤ OWNER
┃ 5 ➤ AI
┃ 6 ➤ ANIME
┃ 7 ➤ CONVERT
┃ 8 ➤ OTHER
┃ 9 ➤ REACTION
┃ 10 ➤ MAIN
╰━━━━━━━━━━━━━━━━━━━⬣

> Reply with number (1-10)`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg' },
            caption: menuCaption,
            contextInfo
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        // MENUS
        const menuData = {
            "1": "📥 DOWNLOAD MENU\n\nfacebook\ntiktok\ninsta\nplay\nytmp3\nytmp4",
            "2": "👥 GROUP MENU\n\nadd\nremove\npromote\ndemote\nmute",
            "3": "😄 FUN MENU\n\njoke\npickup\ninsult\nrate",
            "4": "👑 OWNER MENU\n\nblock\nunblock\nrestart",
            "5": "🤖 AI MENU\n\ngpt\nai\nimagine",
            "6": "🎎 ANIME MENU\n\nwaifu\nneko\nloli",
            "7": "🔄 CONVERT MENU\n\nsticker\ntomp3\nfancy",
            "8": "📌 OTHER MENU\n\nweather\nnews\nmovie",
            "9": "💞 REACTION MENU\n\nhug\nkiss\nslap",
            "10": "🏠 MAIN MENU\n\nmenu\nping\nalive"
        };

        // ✅ FIXED HANDLER
        const handler = async (msgData) => {
            try {
                const msg = msgData.messages[0];
                if (!msg?.message) return;

                const text =
                    msg.message.conversation ||
                    msg.message.extendedTextMessage?.text ||
                    "";

                const replyId =
                    msg.message.extendedTextMessage?.contextInfo?.stanzaId;

                // ✅ ACCEPT BOTH:
                // 1. Reply to menu
                // 2. Direct number message
                const isValid =
                    replyId === messageID || ["1","2","3","4","5","6","7","8","9","10"].includes(text.trim());

                if (!isValid) return;

                const choice = text.trim();

                if (menuData[choice]) {
                    await conn.sendMessage(msg.key.remoteJid, {
                        text: menuData[choice],
                        contextInfo
                    }, { quoted: msg });

                    await conn.sendMessage(msg.key.remoteJid, {
                        react: { text: "✅", key: msg.key }
                    });

                } else {
                    await conn.sendMessage(msg.key.remoteJid, {
                        text: "❌ Invalid option (1-10)",
                        contextInfo
                    }, { quoted: msg });
                }

            } catch (err) {
                console.log("Handler error:", err);
            }
        };

        conn.ev.on("messages.upsert", handler);

        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error(e);
        reply("❌ Menu error");
    }
});

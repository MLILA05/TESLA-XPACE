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

        // SYSTEM DATA
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const platform = os.platform();
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();

        const botName = config.BOT_NAME || "TESLA-XPACE";
        const ownerName = config.OWNER_NAME || "DEVELOPER";
        const prefix = config.PREFIX || ".";
        const mode = config.MODE || "public";

        // MENU UI
        const menuCaption = `╭━━━〔 🤖 ${botName} 〕━━━╮
┃ ⚡ ᴘʀᴇᴍɪᴜᴍ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 👑 ʙᴏᴛ ɪɴғᴏ 〕━━━╮
┃ 👤 @${m.sender.split("@")[0]}
┃ 👑 ${ownerName}
┃ ⚙️ ${mode}
┃ 🔣 ${prefix}
┃ 📦 ${totalCommands}
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📂 ᴍᴇɴᴜ ʟɪsᴛ 〕━━━╮
┃ 1 📥 download
┃ 2 👥 group
┃ 3 😄 fun
┃ 4 👑 owner
┃ 5 🤖 ai
┃ 6 🎎 anime
┃ 7 🔄 convert
┃ 8 📌 other
┃ 9 💞 reaction
┃ 10 🏠 main
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 ⚡ ɪɴsᴛʀᴜᴄᴛɪᴏɴ 〕━━━╮
┃ reply with number (1-10)
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 💻 sʏsᴛᴇᴍ 〕━━━╮
┃ 💾 ${ramUsed} MB / ${totalRam} GB
┃ 🖥️ ${platform}
┃ ⏱️ ${uptime}
┃ 📅 ${currentDate}
┃ 🕒 ${currentTime}
╰━━━━━━━━━━━━━━━━━━━⬣`;

        // SEND MENU
        let sentMsg;
        try {
            sentMsg = await conn.sendMessage(from, {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg' },
                caption: menuCaption
            }, { quoted: mek });
        } catch {
            sentMsg = await conn.sendMessage(from, {
                text: menuCaption
            }, { quoted: mek });
        }

        const messageID = sentMsg.key.id;

        // MENU DATA
        const menuData = {
            '1': `📥 DOWNLOAD MENU\n\nfacebook\ntiktok\ninsta\nplay\nytmp3\nytmp4`,
            '2': `👥 GROUP MENU\n\nadd\nremove\npromote\ndemote\nmute\nunmute`,
            '3': `😄 FUN MENU\n\njoke\npickup\ninsult\nrate`,
            '4': `👑 OWNER MENU\n\nrestart\nshutdown\nblock`,
            '5': `🤖 AI MENU\n\nai\ngpt\nimagine`,
            '6': `🎎 ANIME MENU\n\nwaifu\nneko\nloli`,
            '7': `🔄 CONVERT MENU\n\nsticker\ntomp3\ntts`,
            '8': `📌 OTHER MENU\n\ntime\ndate\ncalc`,
            '9': `💞 REACTION MENU\n\nhug\nkiss\nslap`,
            '10': `🏠 MAIN MENU\n\nmenu\nping\nalive\nruntime`
        };

        // HANDLER
        const handler = async (msgData) => {
            try {
                const msg = msgData.messages[0];
                if (!msg?.message) return;

                const sender = msg.key.remoteJid;

                // GET TEXT SAFELY
                const text =
                    msg.message.conversation ||
                    msg.message.extendedTextMessage?.text ||
                    msg.message.imageMessage?.caption ||
                    "";

                const input = text.trim();

                // GET REPLY ID
                const repliedId =
                    msg.message?.extendedTextMessage?.contextInfo?.stanzaId ||
                    msg.message?.imageMessage?.contextInfo?.stanzaId;

                // CONDITION: reply OR direct number
                if (repliedId !== messageID && !menuData[input]) return;

                // INVALID
                if (!menuData[input]) {
                    await conn.sendMessage(sender, {
                        text: "❌ Invalid option\nReply with number 1-10"
                    }, { quoted: msg });
                    return;
                }

                // SEND RESULT
                await conn.sendMessage(sender, {
                    text: menuData[input]
                }, { quoted: msg });

                // REACT
                await conn.sendMessage(sender, {
                    react: { text: "✅", key: msg.key }
                });

            } catch (e) {
                console.log("Handler error:", e);
            }
        };

        conn.ev.on("messages.upsert", handler);

        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error("Menu Error:", e);
        reply("❌ Menu error, try again.");
    }
});

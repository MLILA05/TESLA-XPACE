const fs = require('fs');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const os = require('os');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // System data
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

        // MAIN MENU UI
        const menuCaption = `╭━━━〔 🤖 ${botName} 〕━━━╮
┃ ⚡ ᴘʀᴇᴍɪᴜᴍ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 👑 ʙᴏᴛ ɪɴғᴏ 〕━━━╮
┃ 👤 ᴜsᴇʀ : @${m.sender.split("@")[0]}
┃ 👑 ᴏᴡɴᴇʀ : ${ownerName}
┃ ⚙️ ᴍᴏᴅᴇ : ${mode}
┃ 🔣 ᴘʀᴇғɪx : ${prefix}
┃ 📦 ᴄᴍᴅs : ${totalCommands}
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📂 ᴍᴇɴᴜ ʟɪsᴛ 〕━━━╮
┃ ❶ 📥 ᴅᴏᴡɴʟᴏᴀᴅ
┃ ❷ 👥 ɢʀᴏᴜᴘ
┃ ❸ 😄 ғᴜɴ
┃ ❹ 👑 ᴏᴡɴᴇʀ
┃ ❺ 🤖 ᴀɪ
┃ ❻ 🎎 ᴀɴɪᴍᴇ
┃ ❼ 🔄 ᴄᴏɴᴠᴇʀᴛ
┃ ❽ 📌 ᴏᴛʜᴇʀ
┃ ❾ 💞 ʀᴇᴀᴄᴛɪᴏɴ
┃ ❿ 🏠 ᴍᴀɪɴ
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 ⚡ ɪɴsᴛʀᴜᴄᴛɪᴏɴ 〕━━━╮
┃ ʀᴇᴘʟʏ ᴡɪᴛʜ ɴᴜᴍʙᴇʀ (1-10)
┃ ᴛᴏ ᴏᴘᴇɴ ᴍᴇɴᴜ 🚀
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 💻 sʏsᴛᴇᴍ 〕━━━╮
┃ 💾 ${ramUsed} MB / ${totalRam} GB
┃ 🖥️ ${platform}
┃ ⏱️ ${uptime}
┃ 📅 ${currentDate}
┃ 🕒 ${currentTime}
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 ❤️‍🔥 ᴘᴏᴡᴇʀ 〕━━━╮
┃ ⚡ ${botName}
╰━━━━━━━━━━━━━━━━━━━⬣`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363403958418756@newsletter',
                newsletterName: botName,
                serverMessageId: 143
            }
        };

        // SEND MENU
        let sentMsg;
        try {
            sentMsg = await conn.sendMessage(from, {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg' },
                caption: menuCaption,
                contextInfo
            }, { quoted: mek });
        } catch {
            sentMsg = await conn.sendMessage(from, {
                text: menuCaption,
                contextInfo
            }, { quoted: mek });
        }

        const messageID = sentMsg.key.id;

        // MENU DATA (SHORTENED EXAMPLE — unaweza kuongeza zote zako)
        const menuData = {
            '1': {
                content: `╭━━━〔 📥 DOWNLOAD MENU 〕━━━╮
┃ 👑 Owner : ${ownerName}
┃ 📦 Commands : ${totalCommands}
┃ ⏱️ Uptime : ${uptime}
╰━━━━━━━━━━━━━━━━━━━⬣

᯽ facebook
᯽ tiktok
᯽ insta
᯽ play
᯽ ytmp3
᯽ ytmp4`
            },

            '2': {
                content: `╭━━━〔 👥 GROUP MENU 〕━━━╮
┃ 👑 Owner : ${ownerName}
┃ 📦 Commands : ${totalCommands}
┃ ⏱️ Uptime : ${uptime}
╰━━━━━━━━━━━━━━━━━━━⬣

᯽ add
᯽ remove
᯽ promote
᯽ demote
᯽ mute
᯽ unmute`
            },

            '3': {
                content: `╭━━━〔 😄 FUN MENU 〕━━━╮
┃ 👑 Owner : ${ownerName}
┃ 📦 Commands : ${totalCommands}
┃ ⏱️ Uptime : ${uptime}
╰━━━━━━━━━━━━━━━━━━━⬣

᯽ joke
᯽ pickup
᯽ insult
᯽ rate`
            },

            '10': {
                content: `╭━━━〔 🏠 MAIN MENU 〕━━━╮
┃ 👑 Owner : ${ownerName}
┃ 📦 Commands : ${totalCommands}
┃ ⏱️ Uptime : ${uptime}
╰━━━━━━━━━━━━━━━━━━━⬣

᯽ menu
᯽ ping
᯽ alive
᯽ runtime`
            }
        };

        // HANDLER
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu =
                    receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToMenu) return;

                const receivedText = (
                    receivedMsg.message.conversation ||
                    receivedMsg.message.extendedTextMessage?.text ||
                    ""
                ).trim();

                const senderID = receivedMsg.key.remoteJid;

                if (menuData[receivedText]) {
                    await conn.sendMessage(senderID, {
                        text: menuData[receivedText].content,
                        contextInfo
                    }, { quoted: receivedMsg });

                    await conn.sendMessage(senderID, {
                        react: { text: '✅', key: receivedMsg.key }
                    });

                } else {
                    await conn.sendMessage(senderID, {
                        text: `❌ Invalid option!\nReply with number 1-10`,
                        contextInfo
                    }, { quoted: receivedMsg });
                }

            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        conn.ev.on("messages.upsert", handler);

        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        reply(`❌ Menu error, try again.`);
    }
});

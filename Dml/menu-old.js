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
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Get real-time data
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

const pushName = m.pushName || "User";
const senderNumber = m.sender.split("@")[0];

const menuCaption = `╭━〔 𝗧𝗘𝗦𝗟𝗔-𝗫𝗣𝗔𝗖𝗘 〕━╮
┃ Premium WhatsApp Bot
╰━━━━━━━━━━━━━━╯

👤 USER INFO
┃ Name: ${pushName}
┃ Number: ${senderNumber}
┃ Bot: ${botName}
┃ Prefix: ${prefix}
┃ 🌐 FreeBot: minbot.dml-tech.online

📦 MENU
┃ 1 Download
┃ 2 Group
┃ 3 Fun
┃ 4 Owner
┃ 5 AI
┃ 6 Anime
┃ 7 Convert
┃ 8 Other
┃ 9 Reaction
┃ 10 Main

📌 Reply 1-10 to open

❤️ ${config.DESCRIPTION || 'TESLA-XPACE'}`;
        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363403958418756@newsletter',
                newsletterName: 'TESLA-XPACE',
                serverMessageId: 143
            }
        };

        // Send menu with image
        let sentMsg;
        try {
            sentMsg = await conn.sendMessage(from, {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/0jvihl.png' },
                caption: menuCaption,
                contextInfo: contextInfo
            }, { quoted: mek });
        } catch (e) {
            sentMsg = await conn.sendMessage(from, {
                text: menuCaption,
                contextInfo: contextInfo
            }, { quoted: mek });
        }
        
        const messageID = sentMsg.key.id;

        // Menu data with double sidebar
       const menuData = {
'1': {
title: "📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

📥 HEADLINE: DOWNLOAD MENU

🧾 REPORT
• 👑 Owner: ${ownerName}
• 📊 Commands: 44
• ⏱️ Uptime: ${uptime}

🌐 TRENDING SERVICES
───────────────────
▪ Facebook [URL]
▪ Download [URL]
▪ MediaFire [URL]
▪ TikTok [URL]
▪ Twitter [URL]
▪ Instagram [URL]
▪ APK [APP]
▪ Image [QUERY]
▪ Pins [URL]
▪ Pinterest [URL]
▪ SpotifyPlay
▪ Splay

🎵 MEDIA DESK
───────────────────
▪ Spotify [QUERY]
▪ Play [SONG]
▪ Play2-10 [SONG]
▪ Audio [URL]
▪ Video [URL]
▪ Video2-10 [URL]
▪ YTMP3 [URL]
▪ YTMP4 [URL]
▪ Song [NAME]
▪ Darama [NAME]

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'2': {
title: "👥 ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

👥 HEADLINE: GROUP CONTROL

🧾 REPORT
• 👑 Owner: ${ownerName}
• 👥 Commands: 37
• ⏱️ Uptime: ${uptime}

🔧 MANAGEMENT DESK
───────────────────
▪ Grouplink
▪ Kickall / Kickall2 / Kickall3
▪ Add @user
▪ Remove @user
▪ Kick @user

⚡ ADMIN BULLETIN
───────────────────
▪ Promote / Demote
▪ Dismiss / Revoke
▪ Mute [time] / Unmute
▪ LockGC / UnlockGC
▪ GroupDP
▪ WelcomeImg
▪ AutoApprove

🏷️ TAGGING SYSTEM
───────────────────
▪ Tag @user
▪ HideTag [MSG]
▪ TagAll
▪ TagAdmins
▪ Invite

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'3': {
title: "😄 ғᴜɴ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

😄 HEADLINE: FUN ZONE

🧾 REPORT
• 👑 Owner: ${ownerName}
• 🎮 Commands: 24
• ⏱️ Uptime: ${uptime}

🎭 ENTERTAINMENT
───────────────────
▪ Shapar
▪ Rate @user
▪ Insult @user
▪ Hack @user
▪ Ship @user1 @user2
▪ Character
▪ Pickup
▪ Joke
▪ YTComment

😊 EMOTIONS PANEL
───────────────────
▪ Love
▪ Happy
▪ Sad
▪ Hot
▪ Shy
▪ Kiss
▪ Broke
▪ Hurt

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'4': {
title: "👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

👑 HEADLINE: OWNER CONTROL

🧾 REPORT
• 👑 Owner: ${ownerName}
• 🛠️ Commands: 30
• ⏱️ Uptime: ${uptime}

💗 USER TOOLS
───────────────────
▪ Block / Unblock
▪ FullPP / SetPP
▪ Restart / Shutdown
▪ UpdateCMD

⚠️ INFO DESK
───────────────────
▪ GJID
▪ JID
▪ ListCMD
▪ AllMenu

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'5': {
title: "🤖 ᴀɪ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

🤖 HEADLINE: AI CENTER

🧾 REPORT
• 👑 Owner: ${ownerName}
• 🤖 Commands: 17
• ⏱️ Uptime: ${uptime}

💬 CHAT AI
───────────────────
▪ AI / GPT / GPT2 / GPT3
▪ GPTMini / Meta / Bard
▪ Felo / Gita

🖼️ IMAGE AI
───────────────────
▪ Imagine [TEXT]
▪ Imagine2 [TEXT]
▪ AIArt
▪ Blackbox [QUERY]
▪ Luma [QUERY]
▪ Colorize

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'6': {
title: "🎎 ᴀɴɪᴍᴇ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

🎎 HEADLINE: ANIME ZONE

🧾 REPORT
• 👑 Owner: ${ownerName}
• 🎎 Commands: 26
• ⏱️ Uptime: ${uptime}

🖼️ ANIME IMAGES
───────────────────
▪ Waifu / Neko / Megnumin
▪ Maid / Loli / Dog
▪ Awoo / Girl

🎭 CHARACTERS
───────────────────
▪ AnimeGirl / 1-5
▪ Anime 1-5
▪ FoxGirl
▪ Naruto

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'7': {
title: "🔄 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

🔄 HEADLINE: CONVERTER TOOLS

🧾 REPORT
• 👑 Owner: ${ownerName}
• 🔄 Commands: 19
• ⏱️ Uptime: ${uptime}

🖼️ MEDIA TOOLS
───────────────────
▪ Sticker / Sticker2
▪ EmojiMix 😎+😂
▪ Take [name,text]
▪ ToMP3 [video]

🔤 TEXT TOOLS
───────────────────
▪ FakeChat
▪ Fancy [TEXT]
▪ TTS
▪ TRT
▪ Base64 / Unbase64

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'8': {
title: "📌 ᴏᴛʜᴇʀ ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

📌 HEADLINE: UTILITIES & SEARCH

🧾 REPORT
• 👑 Owner: ${ownerName}
• 📌 Commands: 15
• ⏱️ Uptime: ${uptime}

🕒 UTILITIES
───────────────────
▪ TimeNow
▪ Date
▪ Count / CountX
▪ Calculate

🎲 RANDOM
───────────────────
▪ iPhoneChat
▪ Flip / CoinFlip
▪ RColor / Roll
▪ Fact
▪ WelcomeImg
▪ Forward / ForwardAll / ForwardGroup
▪ Save

🔍 SEARCH DESK
───────────────────
▪ Define [WORD]
▪ News [QUERY]
▪ Movie [NAME]
▪ Weather [LOC]

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
},

'9': {
title: "💞 ʀᴇᴀᴄᴛɪᴏɴs ᴍᴇɴᴜ",
content: `📰 ━━━━━━━━━━━━━━━━━━━
🗞️  ${botName} DAILY
━━━━━━━━━━━━━━━━━━━

💞 HEADLINE: REACTIONS HUB

🧾 REPORT
• 👑 Owner: ${ownerName}
• 💞 Commands: 26
• ⏱️ Uptime: ${uptime}

💗 AFFECTION
───────────────────
▪ Cuddle / Hug / Kiss
▪ Lick / Pat

😄 FUNNY
───────────────────
▪ Bully / Bonk / Yeet
▪ Slap / Kill

😊 EXPRESSIONS
───────────────────
▪ Blush / Smile / Happy
▪ Wink / Poke

📰 FOOTER
━━━━━━━━━━━━━━━━━━━
${config.DESCRIPTION || '🔥 TESLA-XPACE'}`,
image: true
}
};
                
        // Message handler
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            await conn.sendMessage(senderID, {
                                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/0jvihl.png' },
                                caption: selectedMenu.content,
                                contextInfo: contextInfo
                            }, { quoted: receivedMsg });

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            await conn.sendMessage(senderID, {
                                text: selectedMenu.content,
                                contextInfo: contextInfo
                            }, { quoted: receivedMsg });
                        }

                    } else {
                        await conn.sendMessage(senderID, {
                            text: `❌ ɪɴᴠᴀʟɪᴅ ᴏᴘᴛɪᴏɴ!\n\nᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀ ɴᴜᴍʙᴇʀ ʙᴇᴛᴡᴇᴇɴ 1-10\n\n> ${config.DESCRIPTION || 'TESLA-XPACE'}`,
                            contextInfo: contextInfo
                        }, { quoted: receivedMsg });
                    }
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
        reply(`❌ ᴍᴇɴᴜ ᴇʀʀᴏʀ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ.`);
    }
});

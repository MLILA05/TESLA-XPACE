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

        const menuCaption = `╭━━━〔 ⚡ ${botName} ⚡ 〕━━━╮
┃ 🚀 Premium WhatsApp Bot System
┃ 🛡️ Fast • Smart • Stable
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 👑 BOT PROFILE 〕──╮
┃ 👤 Owner   : ${ownerName}
┃ 🤖 Bot     : ${botName}
┃ 🔣 Prefix  : [ ${prefix} ]
┃ 🌍 Mode    : ${mode}
┃ 📚 Cmds    : ${totalCommands}
┃ ⏱️ Uptime  : ${uptime}
╰──────────────────────╯

╭━━〔 📋 MENU CATEGORIES 〕━━╮
┃ 1 🔥 📥 Download Menu
┃ 2 🛡️ 👥 Group Menu
┃ 3 🎲 🎭 Fun Menu
┃ 4 💎 👑 Owner Menu
┃ 5 🧠 🤖 AI Menu
┃ 6 🌸 🎎 Anime Menu
┃ 7 🔧 🔄 Convert Menu
┃ 8 🧩 📌 Other Menu
┃ 9 💞 💫 Reaction Menu
┃ 10 🏠 ⚙️ Main Menu
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 💻 SYSTEM STATUS 〕──╮
┃ 🧠 RAM      : ${ramUsed}MB / ${totalRam}GB
┃ 🖥️ Platform : ${platform}
┃ 📅 Date     : ${currentDate}
┃ 🕒 Time     : ${currentTime}
╰────────────────────────╯

╭━━〔 ⚙️ HOW TO USE 〕━━╮
┃ Reply with number 1 - 10
┃ Example: 1
╰━━━━━━━━━━━━━━━━━━━╯

> ⚡ Powered by ${botName}`;

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
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg' },
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
                title: "📥 DOWNLOAD MENU",
                content: `╭━━━〔 📥 DOWNLOAD ZONE 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 44
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🌐 SOCIAL DOWNLOAD 〕──╮
┃ 1 🔗 facebook [url]
┃ 2 📥 download [url]
┃ 3 📁 mediafire [url]
┃ 4 🎵 tiktok [url]
┃ 5 🐦 twitter [url]
┃ 6 📸 insta [url]
┃ 7 📱 apk [app]
┃ 8 🖼️ img [query]
┃ 9 📌 pins [url]
┃ 10 🎨 pinterest [url]
┃ 11 🎧 spotifyplay
┃ 12 🎶 splay
╰──────────────────────╯

╭──〔 🎵 MUSIC / VIDEO 〕──╮
┃ 1 🎧 spotify [query]
┃ 2 ▶️ play [song]
┃ 3 🎼 play2-10 [song]
┃ 4 🔊 audio [url]
┃ 5 🎬 video [url]
┃ 6 📹 video2-10 [url]
┃ 7 🎵 ytmp3 [url]
┃ 8 🎞️ ytmp4 [url]
┃ 9 🎙️ song [name]
┃ 10 🎭 darama [name]
╰──────────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '2': {
                title: "👥 GROUP MENU",
                content: `╭━━━〔 👥 GROUP CONTROL 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 37
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🔧 MANAGEMENT 〕──╮
┃ 1 🔗 grouplink
┃ 2 🧹 kickall
┃ 3 🧼 kickall2
┃ 4 🗑️ kickall3
┃ 5 ➕ add @user
┃ 6 ➖ remove @user
┃ 7 👢 kick @user
╰────────────────────╯

╭──〔 ⚡ ADMIN TOOLS 〕──╮
┃ 1 ⬆️ promote @user
┃ 2 ⬇️ demote @user
┃ 3 🚫 dismiss
┃ 4 🔄 revoke
┃ 5 🔇 mute [time]
┃ 6 🔊 unmute
┃ 7 🔒 lockgc
┃ 8 🔓 unlockgc
┃ 9 🖼️ groupdp
┃ 10 🌅 welcomeimg
┃ 11 ✅ autoapprove
╰────────────────────╯

╭──〔 🏷️ TAGGING 〕──╮
┃ 1 🏷️ tag @user
┃ 2 👻 hidetag [msg]
┃ 3 📢 tagall
┃ 4 🛡️ tagadmins
┃ 5 ✉️ invite
╰──────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '3': {
                title: "🎭 FUN MENU",
                content: `╭━━━〔 🎭 FUN AREA 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 24
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🎮 INTERACTIVE 〕──╮
┃ 1 👋 shapar
┃ 2 ⭐ rate @user
┃ 3 😈 insult @user
┃ 4 💻 hack @user
┃ 5 💘 ship @user1 @user2
┃ 6 🎭 character
┃ 7 💌 pickup
┃ 8 😂 joke
┃ 9 💬 ytcomment
╰────────────────────╯

╭──〔 😊 EMOTIONS 〕──╮
┃ 1 ❤️ love
┃ 2 😄 happy
┃ 3 😢 sad
┃ 4 🔥 hot
┃ 5 🙈 shy
┃ 6 😘 kiss
┃ 7 💔 broke
┃ 8 🥀 hurt
╰──────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '4': {
                title: "👑 OWNER MENU",
                content: `╭━━━〔 👑 OWNER PANEL 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 30
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 💎 OWNER TOOLS 〕──╮
┃ 1 ⛔ block
┃ 2 ✅ unblock
┃ 3 🖼️ fullpp
┃ 4 🪪 setpp
┃ 5 🔄 restart
┃ 6 📴 shutdown
┃ 7 📦 updatecmd
╰────────────────────╯

╭──〔 ⚠️ INFO TOOLS 〕──╮
┃ 1 👥 gjid
┃ 2 🆔 jid
┃ 3 📜 listcmd
┃ 4 📚 allmenu
╰────────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '5': {
                title: "🤖 AI MENU",
                content: `╭━━━〔 🤖 AI ENGINE 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 17
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━╯

╭──〔 💬 CHAT AI 〕──╮
┃ 1 🧠 ai
┃ 2 🤖 gpt
┃ 3 💡 gpt2
┃ 4 🚀 gpt3
┃ 5 ⚡ gptmini
┃ 6 🌐 meta
┃ 7 ✨ bard
┃ 8 🔍 felo
┃ 9 📖 gita
╰────────────────╯

╭──〔 🖼️ IMAGE AI 〕──╮
┃ 1 🎨 imagine [text]
┃ 2 🪄 imagine2 [text]
┃ 3 🖌️ aiart
┃ 4 🧠 blackbox [query]
┃ 5 🌌 luma [query]
┃ 6 🌈 colorize
╰──────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '6': {
                title: "🎎 ANIME MENU",
                content: `╭━━━〔 🎎 ANIME WORLD 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 26
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🖼️ IMAGES 〕──╮
┃ 1 🌸 waifu
┃ 2 🐾 neko
┃ 3 🔥 megnumin
┃ 4 🧹 maid
┃ 5 🍭 loli
┃ 6 🐶 dog
┃ 7 🐺 awoo
┃ 8 🎀 garl
╰────────────────╯

╭──〔 🎭 CHARACTERS 〕──╮
┃ 1 👧 animegirl
┃ 2 🌺 animegirl1-5
┃ 3 🎎 anime1-5
┃ 4 🦊 foxgirl
┃ 5 🍥 naruto
╰────────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '7': {
                title: "🔄 CONVERT MENU",
                content: `╭━━━〔 🔄 CONVERT TOOLS 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 19
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🖼️ MEDIA TOOLS 〕──╮
┃ 1 🏷️ sticker [img]
┃ 2 🎟️ sticker2 [img]
┃ 3 😎 emojimix 😎+😂
┃ 4 ✍️ take [name,text]
┃ 5 🎧 tomp3 [video]
╰────────────────────╯

╭──〔 🔤 TEXT TOOLS 〕──╮
┃ 1 💬 fakechat
┃ 2 🔠 fancy [text]
┃ 3 🗣️ tts [text]
┃ 4 🌍 trt [text]
┃ 5 🔐 base64 [text]
┃ 6 🔓 unbase64 [text]
╰───────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '8': {
                title: "📌 OTHER MENU",
                content: `╭━━━〔 📌 EXTRA MENU 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 15
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🕒 UTILITIES 〕──╮
┃ 1 🕒 timenow
┃ 2 📅 date
┃ 3 🔢 count [num]
┃ 4 🧮 calculate [expr]
┃ 5 📊 countx
╰──────────────────╯

╭──〔 🎲 RANDOM 〕──╮
┃ 1 📱 iphonechat
┃ 2 🔄 flip
┃ 3 🪙 coinflip
┃ 4 🎨 rcolor
┃ 5 🎲 roll
┃ 6 📌 fact
┃ 7 🌅 welcomeimg
┃ 8 📤 forward
┃ 9 📦 forwardall
┃ 10 👥 forwardgroup
┃ 11 💾 save
╰────────────────╯

╭──〔 🔍 SEARCH 〕──╮
┃ 1 📖 define [word]
┃ 2 📰 news [query]
┃ 3 🎬 movie [name]
┃ 4 🌦️ weather [loc]
╰────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '9': {
                title: "💞 REACTIONS MENU",
                content: `╭━━━〔 💞 REACTION MENU 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 26
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 💗 AFFECTION 〕──╮
┃ 1 🤗 cuddle @user
┃ 2 🫂 hug @user
┃ 3 😘 kiss @user
┃ 4 😋 lick @user
┃ 5 🖐️ pat @user
╰───────────────────╯

╭──〔 😄 FUNNY 〕──╮
┃ 1 😈 bully @user
┃ 2 🔨 bonk @user
┃ 3 🚀 yeet @user
┃ 4 👋 slap @user
┃ 5 ☠️ kill @user
╰────────────────╯

╭──〔 😊 EXPRESSIONS 〕──╮
┃ 1 😊 blush @user
┃ 2 😁 smile @user
┃ 3 😄 happy @user
┃ 4 😉 wink @user
┃ 5 👉 poke @user
╰────────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
                image: true
            },
            '10': {
                title: "🏠 MAIN MENU",
                content: `╭━━━〔 🏠 MAIN HUB 〕━━━╮
┃ 🤖 Bot      : ${botName}
┃ 👑 Owner    : ${ownerName}
┃ 📦 Commands : 10
┃ ⏱️ Uptime   : ${uptime}
╰━━━━━━━━━━━━━━━━━━━━╯

╭──〔 🤖 BOT INFO 〕──╮
┃ 1 📶 ping
┃ 2 🟢 live
┃ 3 ✅ alive
┃ 4 ⏳ runtime
┃ 5 ⏱️ uptime
┃ 6 📂 repo
┃ 7 👑 owner
┃ 8 📝 bio
╰──────────────────╯

╭──〔 ⚙️ CONTROLS 〕──╮
┃ 1 📋 menu
┃ 2 📑 menu2
┃ 3 🔄 restart
╰──────────────────╯

> ${config.DESCRIPTION || '⚡ Powered by TESLA-XPACE'}`,
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
                                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg' },
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
                            text: `╭━━〔 ❌ INVALID OPTION 〕━━╮
┃ Please reply with a number
┃ Between 1 - 10
╰━━━━━━━━━━━━━━━━━━━━╯

> ${config.DESCRIPTION || 'TESLA-XPACE'}`,
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
        reply(`╭━━〔 ❌ MENU ERROR 〕━━╮
┃ Something went wrong.
┃ Please try again later.
╰━━━━━━━━━━━━━━━━━━━━╯`);
    }
});
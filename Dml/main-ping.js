const config = require('../config');
const { cmd, commands } = require('../command');

// Array of different fancy text styles for TESLA-XPACE
const botNameStyles = [
    "TESLA-XPACE"
];

// Track current style index
let currentStyleIndex = 0;

cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "🌡️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // React to message
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = end - start;

        // Get current fancy bot name
        const fancyBotName = botNameStyles[currentStyleIndex];
        currentStyleIndex = (currentStyleIndex + 1) % botNameStyles.length;

        const caption = `
╭━〔 ⚡ PING STATUS ⚡ 〕━╮
┃ 🚀 BOT     : ${fancyBotName}
┃ ⚡ SPEED   : ${responseTime}ms
┃ 🔥 STATUS  : ONLINE
┃ 💫 MODE    : ACTIVE
╰━━━━━━━━━━━━━━━━━╯

> *${reactionEmoji} Ultra Fast Response Detected*
`;

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/ydvgry.png' },
            caption: caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363403958418756@newsletter',
                    newsletterName: "TESLA-XPACE",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2
cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();

        const message = await conn.sendMessage(from, {
            text: '*PINGING...*'
        });

        const endTime = Date.now();
        const ping = endTime - startTime;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/ydvgry.png' },
            caption: `
╭━〔 🔥 TESLA-XPACE 🔥 〕━╮
┃ ⚡ SPEED : ${ping}ms
┃ 🚀 STATUS: ONLINE
╰━━━━━━━━━━━━━━━━╯
`
        }, { quoted: message });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

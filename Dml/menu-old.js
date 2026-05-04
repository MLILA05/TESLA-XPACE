const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');

cmd({
    pattern: "menu",
    desc: "Button Menu",
    category: "menu",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        const botName = config.BOT_NAME || "TESLA-XPACE";
        const ownerName = config.OWNER_NAME || "DEVELOPER";

        const text = `╭━━━〔 🤖 ${botName} 〕━━━╮
┃ ⚡ ᴘʀᴇᴍɪᴜᴍ ʙᴏᴛ
┃ 👤 @${m.sender.split("@")[0]}
┃ 📦 ${totalCommands} commands
┃ ⏱️ ${uptime}
┃ 💾 ${ramUsed} MB
╰━━━━━━━━━━━━━━━━━━━⬣

✨ Select a menu below`;

        // LIST MENU (BEST)
        const listMessage = {
            text,
            footer: "⚡ Powered By " + botName,
            title: "📂 MENU LIST",
            buttonText: "OPEN MENU",
            sections: [
                {
                    title: "MAIN MENUS",
                    rows: [
                        { title: "📥 Download Menu", rowId: "menu_1" },
                        { title: "👥 Group Menu", rowId: "menu_2" },
                        { title: "😄 Fun Menu", rowId: "menu_3" },
                        { title: "👑 Owner Menu", rowId: "menu_4" },
                        { title: "🤖 AI Menu", rowId: "menu_5" },
                        { title: "🎎 Anime Menu", rowId: "menu_6" },
                        { title: "🔄 Convert Menu", rowId: "menu_7" },
                        { title: "📌 Other Menu", rowId: "menu_8" },
                        { title: "💞 Reaction Menu", rowId: "menu_9" },
                        { title: "🏠 Main Menu", rowId: "menu_10" }
                    ]
                }
            ]
        };

        await conn.sendMessage(from, listMessage, { quoted: mek });

        // HANDLER
        const handler = async (msg) => {
            try {
                const m = msg.messages[0];
                if (!m.message) return;

                const selected =
                    m.message.listResponseMessage?.singleSelectReply?.selectedRowId;

                if (!selected) return;

                let replyText = "❌ Invalid option";

                switch (selected) {
                    case "menu_1":
                        replyText = "📥 DOWNLOAD MENU\n\nfacebook\ntiktok\nplay\nytmp3";
                        break;

                    case "menu_2":
                        replyText = "👥 GROUP MENU\n\nadd\nremove\npromote\ndemote";
                        break;

                    case "menu_3":
                        replyText = "😄 FUN MENU\n\njoke\npickup\ninsult\nrate";
                        break;

                    case "menu_4":
                        replyText = "👑 OWNER MENU\n\nrestart\nshutdown\nblock";
                        break;

                    case "menu_5":
                        replyText = "🤖 AI MENU\n\nai\ngpt\nimagine";
                        break;

                    case "menu_6":
                        replyText = "🎎 ANIME MENU\n\nwaifu\nneko\nloli";
                        break;

                    case "menu_7":
                        replyText = "🔄 CONVERT MENU\n\nsticker\ntomp3\ntts";
                        break;

                    case "menu_8":
                        replyText = "📌 OTHER MENU\n\ntime\ndate\ncalc";
                        break;

                    case "menu_9":
                        replyText = "💞 REACTION MENU\n\nhug\nkiss\nslap";
                        break;

                    case "menu_10":
                        replyText = "🏠 MAIN MENU\n\nmenu\nping\nalive";
                        break;
                }

                await conn.sendMessage(m.key.remoteJid, {
                    text: replyText
                }, { quoted: m });

            } catch (e) {
                console.log(e);
            }
        };

        conn.ev.on("messages.upsert", handler);

        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 180000);

    } catch (e) {
        console.log(e);
    }
});

const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')

// ── Category definitions ──────────────────────────────────────────
const CATEGORIES = {
    download: {
        icon: "📥", label: "Download",
        cmds: ["facebook","mediafire","tiktok","twitter","insta","apk","apk2","img","tt2","pins","pinterest","spotify","play","play2","audio","video","video2","ytmp3","ytmp4","song","drama","gdrive","ssweb","aiart","tiks","splay","spotifyplay"]
    },
    group: {
        icon: "👥", label: "Group",
        cmds: ["grouplink","kickall","kickall2","kickall3","add","remove","kick","promote","demote","dismiss","revoke","setgoodbye","setwelcome","delete","getpic","ginfo","disappear","allreq","updategname","updategdesc","joinreqs","senddm","nikal","mute","unmute","lockgc","unlockgc","invite","tag","hidetag","tagall","tagadmins","autoapprove"]
    },
    reactions: {
        icon: "💞", label: "Reactions",
        cmds: ["bully","cuddle","cry","hug","awoo","kiss","lick","pat","smug","bonk","yeet","blush","smile","wave","highfive","handhold","nom","bite","glomp","slap","kill","happy","wink","poke","dance","cringe"]
    },
    logo: {
        icon: "🎨", label: "Logo",
        cmds: ["neonlight","profilecard","blackpink","dragonball","3dcomic","america","naruto","sadgirl","clouds","futuristic","3dpaper","eraser","sunset","leaf","galaxy","sans","boom","hacker","devilwings","nigeria","bulb","angelwings","zodiac","luxury","paint","frozen","castle","tatoo","valorant","bear","typography","birthday"]
    },
    ai: {
        icon: "🤖", label: "AI",
        cmds: ["ai","gpt","gpt2","gpt3","gptmini","gpt4","meta","blackbox","luma","dj","deepseek","erfan","bing","imagine","imagine2","copilot","bard","felo","gita"]
    },
    convert: {
        icon: "🔄", label: "Convert",
        cmds: ["sticker","sticker2","emojimix","fancy","take","tomp3","tts","trt","base64","unbase64","binary","dbinary","tinyurl","urldecode","urlencode","url","repeat","ask","readmore","colorize"]
    },
    fun: {
        icon: "😄", label: "Fun",
        cmds: ["shapar","rate","insult","hack","ship","character","pickup","joke","hrt","hpy","syd","anger","shy","mon","cunfuzed","hand","nikal","hold","hug","hifi","poke","roseday"]
    },
    anime: {
        icon: "🎎", label: "Anime",
        cmds: ["fack","truth","dare","dog","awoo","garl","waifu","neko","megnumin","maid","loli","animegirl","animegirl1","animegirl2","animegirl3","animegirl4","animegirl5","anime1","anime2","anime3","anime4","anime5","animenews","foxgirl","naruto"]
    },
    main: {
        icon: "🏠", label: "Main",
        cmds: ["ping","ping2","speed","live","alive","runtime","uptime","repo","owner","menu","menu2","restart"]
    },
    owner: {
        icon: "👑", label: "Owner",
        cmds: ["owner","menu","menu2","vv","bio","listcmd","allmenu","repo","block","unblock","fullpp","setpp","restart","shutdown","updatecmd","alive","ping","gjid","jid","currency","country","fakechat","iphonechat","welcomeimg","ytcomment"]
    },
    other: {
        icon: "📌", label: "Other",
        cmds: ["timenow","date","count","calculate","countx","flip","coinflip","rcolor","roll","fact","cpp","rw","pair","pair2","pair3","fancy","logo","define","news","movie","weather","srepo","insult","save","wikipedia","gpass","githubstalk","yts","ytv","watermark","forward","forwardall","forwardgroup"]
    }
};

// ── Main menu command ─────────────────────────────────────────────
cmd({
    pattern: "menu2",
    alias: ["allmenu", "fullmenu"],
    use: '.menu2 [category]',
    desc: "Show bot commands. Use .menu2 ai, .menu2 group, etc.",
    category: "menu",
    react: "🔥",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        const input = args[0]?.toLowerCase();

        // ── If a category argument is given, show that category ──
        if (input && CATEGORIES[input]) {
            const cat = CATEGORIES[input];
            const cols = 3;
            const rows = [];
            for (let i = 0; i < cat.cmds.length; i += cols) {
                rows.push(
                    cat.cmds.slice(i, i + cols)
                        .map(c => `${config.PREFIX || "."}${c}`.padEnd(14))
                        .join("")
                );
            }

            const text = `
${cat.icon} *${cat.label.toUpperCase()} COMMANDS*
${"─".repeat(42)}
${rows.join("\n")}
${"─".repeat(42)}
📦 Total: ${cat.cmds.length} commands
💡 Usage: ${config.PREFIX || "."}${cat.cmds[0]} [args]
${"─".repeat(42)}
🚀 _DML Tech — Building Future Automation_`.trim();

            return await conn.sendMessage(from, { text }, { quoted: mek });
        }

        // ── If unknown argument, hint the user ──
        if (input) {
            const available = Object.keys(CATEGORIES).join(", ");
            return reply(`❌ Unknown category: *${input}*\n\n📂 Available: ${available}`);
        }

        // ── Default: show overview ────────────────────────────────
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
        const ramPct = ((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(0);
        const ramBar = "█".repeat(Math.round(ramPct / 10)) + "░".repeat(10 - Math.round(ramPct / 10));

        const botName  = config.BOT_NAME   || "Tesla";
        const owner    = config.OWNER_NAME || "DEVELOPER";
        const prefix   = config.PREFIX     || ".";
        const mode     = config.MODE       || "public";
        const modeIcon = mode === "public" ? "🌐" : mode === "private" ? "🔒" : "👥";

        // Category index rows — 2 per line
        const catKeys = Object.keys(CATEGORIES);
        const catRows = [];
        for (let i = 0; i < catKeys.length; i += 2) {
            const a = CATEGORIES[catKeys[i]];
            const b = CATEGORIES[catKeys[i + 1]];
            const left  = `${a.icon} ${a.label} (${a.cmds.length})`.padEnd(22);
            const right = b ? `${b.icon} ${b.label} (${b.cmds.length})` : "";
            catRows.push(`  ${left}${right}`);
        }

        const overview = `
┌────────────────────────────┐
│  ⚡ ${botName.padEnd(24)} │
│  Ultimate WhatsApp Bot     │
└────────────────────────────┘

👤 Owner   » ${owner}
🔑 Prefix  » [ ${prefix} ]
${modeIcon} Mode    » ${mode.toUpperCase()}
⏱️  Uptime  » ${uptime}
📦 Cmds    » ${totalCommands} loaded

💻 RAM  [${ramBar}] ${ramPct}%
        ${ramUsed}MB / ${totalRam}GB

━━━━━[ 📂 CATEGORIES ]━━━━━

${catRows.join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Type a category to explore:*
   ${prefix}menu2 download
   ${prefix}menu2 ai
   ${prefix}menu2 group
   ${prefix}menu2 owner
   ... and more above

🚀 _Dml Tech — Building Future Automation_`.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg' },
                caption: overview,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363403958418756@newsletter',
                        newsletterName: 'TESLA-XPACE',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

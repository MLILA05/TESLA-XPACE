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

// ── Helper: build category text vertical ─────────────────────────
function buildCategoryText(key, prefix) {
    const cat = CATEGORIES[key];
    const rows = cat.cmds.map((c, i) =>
        `  ${String(i + 1).padStart(2, '0')}. ${prefix}${c}`
    );

    return `
${cat.icon} *${cat.label.toUpperCase()} MENU*
${"─".repeat(30)}
${rows.join("\n")}
${"─".repeat(30)}
📦 Total: *${cat.cmds.length}* commands
🚀 _Dml-Tech — Building Future Automation_`.trim();
}

// ── Main overview menu ────────────────────────────────────────────
cmd({
    pattern: "menu2",
    alias: ["allmenu", "fullmenu"],
    use: '.menu2',
    desc: "Show all bot categories",
    category: "menu",
    react: "🔥",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const uptime = runtime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
        const ramPct = ((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(0);
        const ramBar = "█".repeat(Math.round(ramPct / 10)) + "░".repeat(10 - Math.round(ramPct / 10));

        const botName  = config.BOT_NAME   || "TESLA-XPACE";
        const owner    = config.OWNER_NAME || "DEVELOPER";
        const prefix   = config.PREFIX     || ".";
        const mode     = config.MODE       || "public";
        const modeIcon = mode === "public" ? "🌐" : mode === "private" ? "🔒" : "👥";

        // Build category list — vertical
        const catKeys = Object.keys(CATEGORIES);
        const catRows = catKeys.map(key => {
            const cat = CATEGORIES[key];
            return `  ${cat.icon} ${prefix}${key} (${cat.cmds.length} cmds)`;
        });

        const overview = `
┌───────────────┐
│  ⚡ ${botName.padEnd(22)} 
│  Ultimate WhatsApp Bot   
└──────────────┘

👤 Owner   » ${owner}
🔑 Prefix  » [ ${prefix} ]
${modeIcon} Mode    » ${mode.toUpperCase()}
⏱️  Uptime  » ${uptime}
📦 Cmds    » ${totalCommands} loaded
💻 RAM     [${ramBar}] ${ramPct}%
           ${ramUsed}MB / ${totalRam}GB

━━[ 📂 CATEGORIES ]━━
${catRows.join("\n")}
━━━━━━━━━━━━━━━━━

🚀 _Dml Tech — Building Future Automation_`.trim();

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/0jvihl.png' },
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

// ── Auto-register one command per category ────────────────────────
Object.keys(CATEGORIES).forEach(key => {
    const cat = CATEGORIES[key];

    cmd({
        pattern: key,
        use: `.${key}`,
        desc: `Show ${cat.label} commands`,
        category: "menu",
        react: cat.icon,
        filename: __filename
    },
    async (conn, mek, m, { from, reply }) => {
        try {
            const prefix = config.PREFIX || ".";
            const text = buildCategoryText(key, prefix);
            await conn.sendMessage(from, { text }, { quoted: mek });
        } catch (e) {
            console.log(e);
            reply(`❌ Error: ${e.message}`);
        }
    });
});

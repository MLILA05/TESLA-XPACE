const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');

// ══════════════════════════════════════════
//  CATEGORY MAP
// ══════════════════════════════════════════
const CATEGORY_MAP = {
    'ai':           { label: 'AI TOOLS',        emoji: '🤖', section: 'ai' },
    'ai-tools':     { label: 'AI TOOLS',        emoji: '🤖', section: 'ai' },
    'download':     { label: 'DOWNLOAD',        emoji: '📥', section: 'download' },
    'downloader':   { label: 'DOWNLOAD',        emoji: '📥', section: 'download' },
    'audio':        { label: 'DOWNLOAD',        emoji: '📥', section: 'download' },
    'media':        { label: 'DOWNLOAD',        emoji: '📥', section: 'download' },
    'group':        { label: 'GROUP',           emoji: '👥', section: 'group' },
    'admin':        { label: 'GROUP',           emoji: '👥', section: 'group' },
    'security':     { label: 'GROUP',           emoji: '👥', section: 'group' },
    'fun':          { label: 'FUN',             emoji: '😄', section: 'fun' },
    'owner':        { label: 'OWNER',           emoji: '👑', section: 'owner' },
    'image':        { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'image-tools':  { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'img_edit':     { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'sticker':      { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'maker':        { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'logo':         { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'wallpapers':   { label: 'IMAGE/STICKER',   emoji: '🖼️', section: 'image' },
    'anime':        { label: 'ANIME',           emoji: '🎎', section: 'anime' },
    'tools':        { label: 'TOOLS',           emoji: '🛠️', section: 'tools' },
    'convert':      { label: 'TOOLS',           emoji: '🛠️', section: 'tools' },
    'converter':    { label: 'TOOLS',           emoji: '🛠️', section: 'tools' },
    'utilities':    { label: 'TOOLS',           emoji: '🛠️', section: 'tools' },
    'utility':      { label: 'TOOLS',           emoji: '🛠️', section: 'tools' },
    'reactions':    { label: 'REACTIONS',       emoji: '💞', section: 'reactions' },
    'reaction':     { label: 'REACTIONS',       emoji: '💞', section: 'reactions' },
    'main':         { label: 'MAIN',            emoji: '🏠', section: 'main' },
    'info':         { label: 'MAIN',            emoji: '🏠', section: 'main' },
    'information':  { label: 'MAIN',            emoji: '🏠', section: 'main' },
    'other':        { label: 'OTHER',           emoji: '📌', section: 'other' },
    'misc':         { label: 'OTHER',           emoji: '📌', section: 'other' },
    'privacy':      { label: 'OTHER',           emoji: '📌', section: 'other' },
    'whatsapp':     { label: 'OTHER',           emoji: '📌', section: 'other' },
    'settings':     { label: 'OTHER',           emoji: '📌', section: 'other' },
    'news':         { label: 'OTHER',           emoji: '📌', section: 'other' },
    'search':       { label: 'OTHER',           emoji: '📌', section: 'other' },
    'stalker':      { label: 'OTHER',           emoji: '📌', section: 'other' },
    'env':          { label: 'OTHER',           emoji: '📌', section: 'other' },
    'menu':         { label: null, section: 'skip' },
    'menu3':        { label: null, section: 'skip' },
};

const SECTION_META = {
    main:      { emoji: '🏠', label: 'MAIN' },
    download:  { emoji: '📥', label: 'DOWNLOAD' },
    group:     { emoji: '👥', label: 'GROUP' },
    fun:       { emoji: '😄', label: 'FUN' },
    owner:     { emoji: '👑', label: 'OWNER' },
    ai:        { emoji: '🤖', label: 'AI TOOLS' },
    image:     { emoji: '🖼️', label: 'IMAGE/STICKER' },
    anime:     { emoji: '🎎', label: 'ANIME' },
    tools:     { emoji: '🛠️', label: 'TOOLS' },
    reactions: { emoji: '💞', label: 'REACTIONS' },
    other:     { emoji: '📌', label: 'OTHER' },
    new:       { emoji: '⚡', label: 'UNCATEGORIZED' },
};

const SECTION_ORDER = [
    'main', 'download', 'group', 'fun', 'owner',
    'ai', 'image', 'anime', 'tools', 'reactions', 'other', 'new'
];

// ══════════════════════════════════════════
//  CORE: use already-loaded commands object
//  More reliable than regex file scanning
// ══════════════════════════════════════════
function buildCommandMap() {
    const sections = {};

    const addTo = (section, pattern) => {
        if (!sections[section]) sections[section] = [];
        if (!sections[section].includes(pattern)) sections[section].push(pattern);
    };

    for (const [pattern, cmdData] of Object.entries(commands)) {
        const rawCat = (cmdData.category || '').trim().toLowerCase();
        const mapped = CATEGORY_MAP[rawCat];

        if (mapped) {
            if (mapped.section === 'skip') continue;
            addTo(mapped.section, pattern);
        } else {
            addTo('new', pattern);
        }
    }

    return sections;
}

// ══════════════════════════════════════════
//  BUILD: overview menu text
// ══════════════════════════════════════════
function buildOverview(sections, info) {
    const { botName, ownerName, prefix, mode, uptime, ramUsed, totalRam, ramPct, ramBar, platform, currentDate, currentTime } = info;
    const totalCommands = Object.values(sections).reduce((a, b) => a + b.length, 0);
    const modeIcon = mode === 'public' ? '🌐' : mode === 'private' ? '🔒' : '👥';

    const orderedKeys = SECTION_ORDER.filter(k => sections[k]?.length > 0);

    const categoryLines = orderedKeys.map(k => {
        const meta = SECTION_META[k];
        return `  ${meta.emoji} .${k} (${sections[k].length} cmds)`;
    }).join('\n');

    return `
┌─────────────────┐
│  ⚡ ${botName.padEnd(22)} 
│  Ultimate WhatsApp Bot   
└────────────────┘

👤 Owner   » ${ownerName}
🔑 Prefix  » [ ${prefix} ]
${modeIcon} Mode    » ${mode.toUpperCase()}
⏱️  Uptime  » ${uptime}
📦 Cmds    » ${totalCommands} loaded
💻 RAM     [${ramBar}] ${ramPct}%
           ${ramUsed}MB / ${totalRam}GB

━━━[ 📂 CATEGORIES ]━━━
${categoryLines}
━━━━━━━━━━━━━━━━

💡 _Type the category command to see its commands_
🚀 _Dml Tech — Building Future Automation_`.trim();
}

// ══════════════════════════════════════════
//  BUILD: sub-menu text for one section
// ══════════════════════════════════════════
function buildSubMenu(sectionKey, cmds, prefix) {
    const meta = SECTION_META[sectionKey] || { emoji: '🔹', label: sectionKey.toUpperCase() };
    const numbered = cmds.map((c, i) =>
        `  ${String(i + 1).padStart(2, '0')}. ${prefix}${c}`
    ).join('\n');

    return `
${meta.emoji} *${meta.label} MENU*
${'─'.repeat(30)}
${numbered}
${'─'.repeat(30)}
📦 Total: *${cmds.length}* commands
🚀 _Dml Tech — Building Future Automation_`.trim();
}

// ══════════════════════════════════════════
//  MAIN COMMAND: .menu3
// ══════════════════════════════════════════
cmd({
    pattern: 'menu3',
    alias: ['amenu'],
    desc: 'Show dynamic auto-generated menu',
    category: 'menu3',
    react: '👑',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const ramUsed  = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
        const ramPct   = ((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(0);
        const ramBar   = '█'.repeat(Math.round(ramPct / 10)) + '░'.repeat(10 - Math.round(ramPct / 10));

        const info = {
            botName:     config.BOT_NAME   || 'ADEEL-MD',
            ownerName:   config.OWNER_NAME || 'DEVELOPER',
            prefix:      config.PREFIX     || '.',
            mode:        config.MODE       || 'public',
            uptime:      runtime(process.uptime()),
            ramUsed, totalRam, ramPct, ramBar,
            platform:    os.platform(),
            currentDate: new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
            currentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };

        const sections = buildCommandMap();
        const menuText = buildOverview(sections, info);

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363403958418756@newsletter',
                newsletterName: info.botName,
                serverMessageId: 143
            }
        };

        const imageUrl = config.MENU_IMAGE_URL || 'https://files.catbox.moe/xksplb.jpg';

        try {
            await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: menuText,
                contextInfo
            }, { quoted: mek });
        } catch {
            await conn.sendMessage(from, {
                text: menuText,
                contextInfo
            }, { quoted: mek });
        }

    } catch (e) {
        console.error('[menu3] Error:', e);
        reply(`❌ Error: ${e.message}`);
    }
});

// ══════════════════════════════════════════
//  AUTO-REGISTER: one command per section
//  User types .download, .ai, .group etc
// ══════════════════════════════════════════
Object.keys(SECTION_META).forEach(sectionKey => {
    const meta = SECTION_META[sectionKey];

    cmd({
        pattern: sectionKey,
        use: `.${sectionKey}`,
        desc: `Show ${meta.label} commands`,
        category: 'menu3',
        react: meta.emoji,
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        try {
            const prefix   = config.PREFIX || '.';
            const sections = buildCommandMap();
            const cmds     = sections[sectionKey];

            if (!cmds || cmds.length === 0) {
                return reply(`❌ No commands found in *${meta.label}* category.`);
            }

            const text = buildSubMenu(sectionKey, cmds, prefix);

            await conn.sendMessage(from, { text }, { quoted: mek });

        } catch (e) {
            console.log(e);
            reply(`❌ Error: ${e.message}`);
        }
    });
});

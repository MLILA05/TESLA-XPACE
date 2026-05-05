const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    SESSION_ID: process.env.SESSION_ID || "",  // Your bot's session ID (keep it secure)
    PREFIX: getConfig("PREFIX") || ".",  // Command prefix (e.g., "., / ! * - +")
    CHATBOT: getConfig("CHATBOT") || "on", // on/off chat bot 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "TESLA-XPACE",  // Bot's display name
    MODE: getConfig("MODE") || process.env.MODE || "public",        // Bot mode: public/private/group/inbox
    REPO: process.env.REPO || "https://github.com/XRI-DOUBLE07/IMMU-MD/forkhttps://github.com/XRI-DOUBLE07/IMMU-MD/fork",  // Bot's GitHub repo
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",  // Bot's BAILEYS

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255622220680",  // Owner's WhatsApp number
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "TESLA-XPACE",           // Owner's name
    DEV: process.env.DEV || "255622220680",                     // Developer's contact number
    DEVELOPER_NUMBER: '255622220680@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*TESLA-XPACE VIEWED YOUR STATUS 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 THIS PERSON NOT ALLOWED CALL*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "TESLA-XPACE",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "false",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/0jvihl.png",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "false", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "false",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "* POWERED BY TESLA-XPACE*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    AUTOBIO_THEMES: [
        (d, t, botname) => `⚡ ${botname}\n𝗛𝘂𝘀𝘁𝗹𝗲 𝗜𝗻 𝗦𝗶𝗹𝗲𝗻𝗰𝗲, 𝗟𝗲𝘁 𝗦𝘂𝗰𝗰𝗲𝘀𝘀 𝗡𝗼𝗶𝘀𝗲 • ${d} ${t}`,
(d, t, botname) => `🌍 ${botname}\n𝗖𝗿𝗲𝗮𝘁𝗶𝗻𝗴 𝗠𝘆 𝗢𝘄𝗻 𝗟𝗮𝗻𝗲 • ${d} ${t}`,
(d, t, botname) => `🔥 ${botname}\n𝗦𝘁𝗮𝘆 𝗛𝘂𝗻𝗴𝗿𝘆, 𝗦𝘁𝗮𝘆 𝗙𝗼𝗰𝘂𝘀𝗲𝗱 • ${d} ${t}`,
(d, t, botname) => `🚀 ${botname}\n𝗘𝘅𝗲𝗰𝘂𝘁𝗶𝗼𝗻 𝗢𝘃𝗲𝗿 𝗘𝘅𝗰𝘂𝘀𝗲𝘀 • ${d} ${t}`,
(d, t, botname) => `💡 ${botname}\n𝗜𝗱𝗲𝗮𝘀 𝗧𝗼𝗱𝗮𝘆, 𝗘𝗺𝗽𝗶𝗿𝗲 𝗧𝗼𝗺𝗼𝗿𝗿𝗼𝘄 • ${d} ${t}`,
(d, t, botname) => `🧠 ${botname}\n𝗦𝗺𝗮𝗿𝘁 𝗪𝗼𝗿𝗸 𝗕𝗲𝗮𝘁𝘀 𝗛𝗮𝗿𝗱 𝗪𝗼𝗿𝗸 • ${d} ${t}`,
(d, t, botname) => `⚙️ ${botname}\n𝗕𝘂𝗶𝗹𝘁 𝗧𝗼 𝗚𝗿𝗶𝗻𝗱, 𝗗𝗲𝘀𝗶𝗴𝗻𝗲𝗱 𝗧𝗼 𝗪𝗶𝗻 • ${d} ${t}`,
(d, t, botname) => `🌙 ${botname}\n𝗡𝗶𝗴𝗵𝘁 𝗖𝗼𝗱𝗲𝗿, 𝗗𝗮𝘆 𝗗𝗿𝗲𝗮𝗺𝗲𝗿 • ${d} ${t}`,
(d, t, botname) => `📈 ${botname}\n𝗟𝗲𝘃𝗲𝗹𝗶𝗻𝗴 𝗨𝗽 𝗘𝘃𝗲𝗿𝘆𝗱𝗮𝘆 • ${d} ${t}`,
(d, t, botname) => `🎯 ${botname}\n𝗙𝗼𝗰𝘂𝘀 𝗢𝗻 𝗚𝗼𝗮𝗹𝘀, 𝗡𝗼𝘁 𝗡𝗼𝗶𝘀𝗲 • ${d} ${t}`,
(d, t, botname) => `🪐 ${botname}\n𝗗𝗶𝗳𝗳𝗲𝗿𝗲𝗻𝘁 𝗩𝗶𝘀𝗶𝗼𝗻, 𝗦𝗮𝗺𝗲 𝗚𝗼𝗮𝗹: 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀 • ${d} ${t}`,
(d, t, botname) => `⚡ ${botname}\n𝗡𝗼 𝗟𝗶𝗺𝗶𝘁𝘀, 𝗢𝗻𝗹𝘆 𝗟𝗲𝘃𝗲𝗹𝘀 • ${d} ${t}`,
(d, t, botname) => `🔥 ${botname}\n𝗗𝗿𝗶𝘃𝗲𝗻 𝗕𝘆 𝗣𝗿𝗼𝗴𝗿𝗲𝘀𝘀 • ${d} ${t}`,
(d, t, botname) => `🏁 ${botname}\n𝗦𝘁𝗮𝗿𝘁 𝗦𝘁𝗿𝗼𝗻𝗴, 𝗙𝗶𝗻𝗶𝘀𝗵 𝗦𝘁𝗿𝗼𝗻𝗴𝗲𝗿 • ${d} ${t}`,
(d, t, botname) => `💻 ${botname}\n𝗖𝗼𝗱𝗲. 𝗕𝘂𝗶𝗹𝗱. 𝗥𝗲𝗽𝗲𝗮𝘁. • ${d} ${t}`,
(d, t, botname) => `🧩 ${botname}\n𝗘𝘃𝗲𝗿𝘆 𝗣𝗿𝗼𝗯𝗹𝗲𝗺 𝗛𝗮𝘀 𝗔 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻 • ${d} ${t}`,
(d, t, botname) => `🌟 ${botname}\n𝗦𝘁𝗮𝘆 𝗖𝗼𝗻𝘀𝗶𝘀𝘁𝗲𝗻𝘁, 𝗦𝘁𝗮𝘆 𝗪𝗶𝗻𝗻𝗶𝗻𝗴 • ${d} ${t}`,
(d, t, botname) => `⚔️ ${botname}\n𝗗𝗶𝘀𝗰𝗶𝗽𝗹𝗶𝗻𝗲 𝗕𝗲𝗮𝘁𝘀 𝗧𝗮𝗹𝗲𝗻𝘁 • ${d} ${t}`,
(d, t, botname) => `🏆 ${botname}\n𝗪𝗶𝗻 𝗜𝗻 𝗦𝗶𝗹𝗲𝗻𝗰𝗲, 𝗦𝗵𝗶𝗻𝗲 𝗟𝗼𝘂𝗱 • ${d} ${t}`,
(d, t, botname) => `🔋 ${botname}\n𝗙𝘂𝗹𝗹𝘆 𝗖𝗵𝗮𝗿𝗴𝗲𝗱 & 𝗥𝗲𝗮𝗱𝘆 • ${d} ${t}`,
    ],
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        

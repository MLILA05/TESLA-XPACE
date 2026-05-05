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
    NULL_PREFIX: getConfig("NULL_PREFIX") || "false", // allow commands without prefix when 'true'
    STATUS_ONLY: getConfig("STATUS_ONLY") || "false", // when 'true' bot only processes status updates
    AUTOBIO_THEMES: [
        (d, t, botname) => `⚡ ${botname}\n𝗜 𝗗𝗼𝗻'𝘁 𝗦𝗹𝗲𝗲𝗽, 𝗜 𝗚𝗿𝗶𝗻𝗱 • ${d} ${t}`,
        (d, t, botname) => `🌙 ${botname}\n𝗤𝘂𝗶𝗲𝘁 𝗕𝘂𝘁 𝗔𝗹𝘄𝗮𝘆𝘀 𝗛𝗲𝗿𝗲 • ${d} ${t}`,
        (d, t, botname) => `👑 ${botname}\n𝗕𝗼𝘀𝘀 𝗠𝗼𝗱𝗲 𝗔𝗰𝘁𝗶𝘃𝗮𝘁𝗲𝗱 🔛 ${d} ${t}`,
        (d, t, botname) => `🔥 ${botname}\n𝗪𝗮𝘁𝘂 𝗡𝗶 𝗠𝘁𝗮𝗷𝗶 𝗧𝗼𝘀𝗵𝗮 • 𝗧𝗮𝗻𝘇𝗮𝗻𝗶𝗮 ${d} ${t}`,
        (d, t, botname) => `🌌 ${botname}\n𝗢𝘂𝘁 𝗢𝗳 𝗧𝗵𝗶𝘀 𝗪𝗼𝗿𝗹𝗱 🚀 ${d} ${t}`,
        (d, t, botname) => `😎 ${botname}\n𝗨𝗻𝗯𝗼𝘁𝗵𝗲𝗿𝗲𝗱 & 𝗢𝗻𝗹𝗶𝗻𝗲 • ${d} ${t}`,
        (d, t, botname) => `🌃 ${botname}\n𝗨𝗽 𝗪𝗵𝗲𝗻 𝗧𝗵𝗲 𝗪𝗼𝗿𝗹𝗱 𝗦𝗹𝗲𝗲𝗽𝘀 • ${d} ${t}`,
        (d, t, botname) => `🧊 ${botname}\n𝗖𝗼𝗼𝗹, 𝗖𝗮𝗹𝗺 & 𝗔𝗹𝘄𝗮𝘆𝘀 𝗢𝗻 • ${d} ${t}`,
        (d, t, botname) => `💯 ${botname}\n𝗡𝗼 𝗖𝗮𝗽, 𝗜'𝗺 𝗔𝗹𝘄𝗮𝘆𝘀 𝗢𝗻𝗹𝗶𝗻𝗲 • ${d} ${t}`,
        (d, t, botname) => `🇹🇿 ${botname}\n𝗧𝗮𝗻𝘇𝗮𝗻𝗶𝗮'𝘀 𝗙𝗶𝗻𝗲𝘀𝘁 𝗕𝗼𝘁 • ${d} ${t}`,
        (d, t, botname) => `💪 ${botname}\n𝗙𝗮𝗹𝗹 𝟳 𝗧𝗶𝗺𝗲𝘀, 𝗥𝗶𝘀𝗲 𝟴 • ${d} ${t}`,
        (d, t, botname) => `🌠 ${botname}\n𝗗𝗿𝗲𝗮𝗺 𝗕𝗶𝗴, 𝗪𝗼𝗿𝗸 𝗛𝗮𝗿𝗱, 𝗦𝘁𝗮𝘆 𝗛𝘂𝗺𝗯𝗹𝗲 • ${d} ${t}`,
        (d, t, botname) => `🎯 ${botname}\n𝗦𝗺𝗮𝗹𝗹 𝗦𝘁𝗲𝗽𝘀 𝗦𝘁𝗶𝗹𝗹 𝗠𝗼𝘃𝗲 𝗬𝗼𝘂 𝗙𝗼𝗿𝘄𝗮𝗿𝗱 • ${d} ${t}`,
        (d, t, botname) => `✨ ${botname}\n𝗕𝗲𝗹𝗶𝗲𝘃𝗲 𝗜𝘁, 𝗕𝘂𝗶𝗹𝗱 𝗜𝘁, 𝗕𝗲𝗰𝗼𝗺𝗲 𝗜𝘁 • ${d} ${t}`,
        (d, t, botname) => `🔥 ${botname}\n𝗣𝗮𝗶𝗻 𝗜𝘀 𝗧𝗲𝗺𝗽𝗼𝗿𝗮𝗿𝘆, 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀 𝗜𝘀 𝗙𝗼𝗿𝗲𝘃𝗲𝗿 • ${d} ${t}`,
        (d, t, botname) => `🚧 ${botname}\n𝗧𝗵𝗲 𝗥𝗼𝗮𝗱 𝗧𝗼 𝗦𝘂𝗰𝗰𝗲𝘀𝘀 𝗜𝘀 𝗔𝗹𝘄𝗮𝘆𝘀 𝗨𝗻𝗱𝗲𝗿 𝗖𝗼𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻 • ${d} ${t}`,
        (d, t, botname) => `🛠️ ${botname}\n𝗘𝘃𝗲𝗿𝘆 𝗗𝗮𝘆 𝗜 𝗣𝗮𝘃𝗲 𝗠𝘆 𝗪𝗮𝘆 𝗧𝗼 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀 • ${d} ${t}`,
        (d, t, botname) => `🔨 ${botname}\n𝗚𝗿𝗼𝘄𝘁𝗵 𝗜𝘀 𝗔 𝗖𝗼𝗻𝘀𝘁𝗮𝗻𝘁 𝗪𝗼𝗿𝗸𝗶𝗻𝗴 𝗦𝗶𝘁𝗲 • ${d} ${t}`,
        (d, t, botname) => `🏗️ ${botname}\n𝗕𝘂𝗶𝗹𝗱𝗶𝗻𝗴 𝗠𝘆 𝗗𝗿𝗲𝗮𝗺𝘀 𝗕𝗿𝗶𝗰𝗸 𝗕𝘆 𝗕𝗿𝗶𝗰𝗸 • ${d} ${t}`,
        (d, t, botname) => `🚀 ${botname}\n𝗧𝗵𝗲 𝗝𝗼𝘂𝗿𝗻𝗲𝘆 𝗜𝘀 𝗡𝗲𝘃𝗲𝗿 𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱, 𝗔𝗻𝗱 𝗧𝗵𝗮𝘁'𝘀 𝗧𝗵𝗲 𝗕𝗲𝗮𝘂𝘁𝘆 • ${d} ${t}`,
    ],
    WELCOME: process.env.WELCOME || "false", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "false", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        

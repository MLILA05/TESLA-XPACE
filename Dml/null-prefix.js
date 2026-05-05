const { cmd, commands } = require('../command');
const config = require('../config');
const { setConfig } = require('../lib/configdb');
const { exec } = require('child_process');

cmd({
    pattern: "null",
    alias: ["nullprefix", "prefixless"],
    desc: "Enable or disable prefixless commands (null on/off)",
    category: "owner",
    react: "🔁",
    filename: __filename
}, async (conn, mek, m, { args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply('🚫 Only the bot owner can use this command.');

        const arg = (args[0] || '').toString().toLowerCase();
        if (!arg || !['on', 'off', 'true', 'false'].includes(arg)) {
            return reply('❓ Usage: .null on|off');
        }

        const value = (arg === 'on' || arg === 'true') ? 'true' : 'false';
        await setConfig('NULL_PREFIX', value);

        await reply(`✅ Prefixless commands ${value === 'true' ? 'enabled' : 'disabled'}.\n♻️ Restarting...`);
        setTimeout(() => exec('pm2 restart all'), 1500);
    } catch (err) {
        console.error(err);
        reply('❌ Error: ' + (err.message || err));
    }
});

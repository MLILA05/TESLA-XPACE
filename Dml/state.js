const { cmd, commands } = require('../command');
const config = require('../config');
const { setConfig } = require('../lib/configdb');
const { exec } = require('child_process');

cmd({
    pattern: "state",
    alias: ["statusonly", "viewstate"],
    desc: "Enable or disable status-only mode (state on/off)",
    category: "owner",
    react: "🔒",
    filename: __filename
}, async (conn, mek, m, { args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply('🚫 Only the bot owner can use this command.');

        const arg = (args[0] || '').toString().toLowerCase();
        if (!arg || !['on', 'off', 'true', 'false'].includes(arg)) {
            return reply('❓ Usage: .state on|off');
        }

        const value = (arg === 'on' || arg === 'true') ? 'true' : 'false';
        await setConfig('STATUS_ONLY', value);
            config.STATUS_ONLY = value;

        await reply(`✅ Status-only mode ${value === 'true' ? 'enabled' : 'disabled'}.\n♻️ Restarting...`);
        setTimeout(() => exec('pm2 restart all'), 1500);
    } catch (err) {
        console.error(err);
        reply('❌ Error: ' + (err.message || err));
    }
});

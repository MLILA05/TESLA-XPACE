const { cmd } = require('../command');
const config = require('../config');
const { setConfig } = require('../lib/configdb');

cmd({
    pattern: "state",
    alias: ["modeonoff", "botstate"],
    desc: "Enable or disable command lock mode",
    category: "owner",
    react: "🛡️",
    filename: __filename
}, async (conn, mek, m, { args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply('🚫 Only the bot owner can use this command.');

        const arg = (args[0] || '').toString().toLowerCase();
        if (!arg || !['on', 'off', 'true', 'false'].includes(arg)) {
            return reply('❓ Usage: .state on|off');
        }

        const value = (arg === 'on' || arg === 'true') ? 'true' : 'false';
        config.STATE = value;
        await setConfig('STATE', value);

        return reply(`✅ State is now *${value === 'true' ? 'ON' : 'OFF'}*.
${value === 'true' ? 'All commands are locked except .state off.' : 'All commands are enabled again.'}`);
    } catch (err) {
        console.error(err);
        reply('❌ Error: ' + (err.message || err));
    }
});

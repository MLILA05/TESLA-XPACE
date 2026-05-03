const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group with style",
    react: "😕",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, senderNumber, reply
}) => {
    try {
        if (!isGroup) return reply("⚠️ This command can only be used in groups.");

        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply("🚫 Only the bot owner can use this command.");

        // Step 1: Send first message
        await reply("🫡 *OKEY BOSS I AM LEAVING THIS GROUP...*");

        // Step 2: Get group metadata & admin list
        const metadata = await conn.groupMetadata(from);
        const admins = metadata.participants
            .filter(p => p.admin)
            .map(p => p.id);
        
        const adminTags = admins.map(a => `@${a.split('@')[0]}`).join(" ");

        // Step 3: Get bot profile photo
        let botPp;
        try {
            botPp = await conn.profilePictureUrl(conn.user.id, 'image');
        } catch {
            botPp = 'https://files.catbox.moe/pf9a6s.jpg';
        }

        await sleep(1500);

        // Step 4: Send Goodbye Message
        const goodbyeText = `🍺━━━━━━━━━━━━━━━🍺\n` +
            `😔 *Goodbye Everyone...*\n` +
            `💫 I had a great time here in *${metadata.subject}*\n` +
            `🙏 Sorry if I ever made mistakes.\n` +
            `👋 It’s time for me to go...\n\n` +
            `💌 *Tagging all admins to say sorry:*\n${adminTags}\n` +
            `🍺━━━━━━━━━━━━━━━🍺\n` +
            `🤖 *Powered by ${config.BOT_NAME}*`;

        await conn.sendMessage(from, {
            image: { url: botPp },
            caption: goodbyeText,
            mentions: admins,
        });

        // Step 5: Wait & Leave Group
        await sleep(3000);
        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

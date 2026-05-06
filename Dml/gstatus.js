const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "gstatus",
    alias: ["groupstatus", "gstatus"],
    desc: "Post a status message in the group",
    category: "group",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, { from, quoted, isGroup, reply, args, q }) => {
    try {
        if (!isGroup) return reply("❌ This command only works in groups.");

        let statusText = '';
        let mediaMessage = null;

        // Get text from args or quoted message
        if (q && q.trim()) {
            statusText = q.trim();
        } else if (quoted) {
            // Check if replying to text
            if (quoted.text) {
                statusText = quoted.text;
            }
            // Check if replying to media (image/video)
            if (quoted.mtype === 'imageMessage' || quoted.mtype === 'videoMessage') {
                const mediaBuffer = await quoted.download();
                mediaMessage = {
                    buffer: mediaBuffer,
                    type: quoted.mtype === 'imageMessage' ? 'image' : 'video',
                    mimetype: quoted.mimetype
                };
                statusText = quoted.caption || '📸 Status';
            }
        } else {
            return reply('❓ Usage: .gstatus <text> or reply to an image/video with .gstatus\n\nExample: .gstatus This is my group status!');
        }

        if (!statusText) {
            return reply('❌ Please provide text or reply to a message with text.');
        }

        // Format the status message
        const sender = mek.pushName || 'Anonymous';
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const caption = `╭━━━━━━━━━━━━╮
┃ 📊 *GROUP STATUS*
┃━━━━━━━━━━━━━━
┃ 👤 *By:* ${sender}
┃ 🕐 *Time:* ${timestamp}
┃━━━━━━━━━━━━━━
┃ 
┃ ${statusText}
┃
╰━━━━━━━━━━━╯`;

        // Send the status message
        if (mediaMessage) {
            if (mediaMessage.type === 'image') {
                await conn.sendMessage(from, {
                    image: mediaMessage.buffer,
                    caption: caption,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                    }
                }, { quoted: mek });
            } else if (mediaMessage.type === 'video') {
                await conn.sendMessage(from, {
                    video: mediaMessage.buffer,
                    caption: caption,
                    mimetype: 'video/mp4',
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                    }
                }, { quoted: mek });
            }
        } else {
            await conn.sendMessage(from, { text: caption }, { quoted: mek });
        }

        await reply('✅ Status posted to group!');

    } catch (err) {
        console.error(err);
        reply('❌ Error: ' + (err.message || err));
    }
});

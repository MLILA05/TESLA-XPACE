const sharp = require('sharp');
const fs = require('fs');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { cmd } = require('../command');

const tempDir = './temp';
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

cmd({
    pattern: "simage",
    alias: ["stickertoimg", "stickerimage"],
    react: "🖼️",
    desc: "Convert sticker to image",
    category: "converter",
    use: ".simage (reply to sticker)",
    filename: __filename,
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!quoted) {
            return reply("🖼️ *Sticker to Image*\n\nReply to a sticker with .simage to convert it to image");
        }

        if (!quoted.stickerMessage) {
            return reply("❌ Please reply to a sticker only");
        }

        await reply("⏳ Converting sticker to image...");

        const stickerFilePath = `${tempDir}/sticker_${Date.now()}.webp`;
        const outputImagePath = `${tempDir}/image_${Date.now()}.png`;

        // Download sticker
        const stream = await downloadContentFromMessage(quoted.stickerMessage, 'sticker');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Save and convert
        fs.writeFileSync(stickerFilePath, buffer);
        await sharp(stickerFilePath).png().toFile(outputImagePath);

        // Read converted image
        const imageBuffer = fs.readFileSync(outputImagePath);

        // Send image
        await conn.sendMessage(from, {
            image: imageBuffer,
            caption: "✨ *Sticker Converted to Image*",
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363404811118873@newsletter',
                    newsletterName: "Sticker Converter",
                    serverMessageId: 143,
                },
            },
        }, { quoted: m });

        // Cleanup
        setTimeout(() => {
            try {
                if (fs.existsSync(stickerFilePath)) fs.unlinkSync(stickerFilePath);
                if (fs.existsSync(outputImagePath)) fs.unlinkSync(outputImagePath);
            } catch (e) {}
        }, 30000);

    } catch (error) {
        console.error('Sticker to Image Error:', error);
        reply("❌ Failed to convert sticker. Try with a different sticker.");
    }
});

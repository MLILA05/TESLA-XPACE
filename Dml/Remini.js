const axios = require('axios');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { cmd } = require('../command');
const FormData = require('form-data');

const footer = `\n\n> Free Mini Bot: minbot.dml-tech.online\n> Powered by Dml`;

const styleMsg = (title, text) => {
    return `╭━━〔 ${title} 〕━━╮
┃ ${text.replace(/\n/g, '\n┃ ')}
╰━━━━━━━━━━━━╯${footer}`;
};

cmd({
    pattern: "remini",
    alias: ["enhance"],
    react: "🪄",
    desc: "Enhance image quality using Remini AI",
    category: "image",
    use: ".hdimg (reply to image)",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Must reply to image
        if (!quoted || !quoted.imageMessage) {
            return reply(
                styleMsg(
                    "🖼️ IMAGE REQUIRED",
                    "Reply to an image first.\n\nExample: .remini"
                )
            );
        }

        await reply(
            styleMsg(
                "🪄 ENHANCING IMAGE",
                "Please wait...\nYour image is being upgraded."
            )
        );

        // Download image from WhatsApp
        const stream = await downloadContentFromMessage(
            quoted.imageMessage,
            'image'
        );

        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Upload image to temporary hosting
        const form = new FormData();
        form.append('file', buffer, {
            filename: 'remini.jpg',
            contentType: 'image/jpeg'
        });

        const uploadRes = await axios.post(
            'https://tmpfiles.org/api/v1/upload',
            form,
            { headers: form.getHeaders() }
        );

        const imageUrl = uploadRes.data.data.url.replace(
            'tmpfiles.org/',
            'tmpfiles.org/dl/'
        );

        // Call NEW Remini API
        const apiUrl =
            `https://anabot.my.id/api/ai/remini?imageUrl=${encodeURIComponent(imageUrl)}&apikey=freeApikey`;

        const apiRes = await axios.get(apiUrl, { timeout: 60000 });
        const apiData = apiRes.data;

        // Validate API response
        if (!apiData.success || !apiData.data?.result) {
            return reply(
                styleMsg(
                    "❌ ENHANCE FAILED",
                    "No enhanced image was returned.\nPlease try again later."
                )
            );
        }

        // Send enhanced image
        await conn.sendMessage(
            from,
            {
                image: { url: apiData.data.result },
                caption: `╭━━〔 ✨ IMAGE ENHANCED 〕━━╮
┃ Quality upgraded successfully.
┃ Status: Completed ✅
╰━━━━━━━━━━━━╯

> Free Mini Bot: minbot.dml-tech.online
> Powered by TESLA-XPACE`
            },
            { quoted: m }
        );

    } catch (err) {
        console.error("HDIMG ERROR:", err);
        reply(
            styleMsg(
                "❌ PROCESS ERROR",
                "Image enhancement failed.\nPlease try again."
            )
        );
    }
});

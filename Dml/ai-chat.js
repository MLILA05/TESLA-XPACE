const { cmd } = require('../command');
const axios = require('axios');

const FOOTER = `\n\n╭───────────╮
│ 🌐 Free Mini Bot
│ 🔗 minbot.dml-tech.online
╰───────────╯
> Powered by Dml`;

const aiBox = (title, text) => {
    return `╭━━〔 ${title} 〕━━╮
┃
┃ ${text.replace(/\n/g, '\n┃ ')}
┃
╰━━━━━━━━━━━╯${FOOTER}`;
};

const errorBox = (text) => {
    return `╭━━〔 ⚠️ AI ERROR 〕━━╮
┃
┃ ${text.replace(/\n/g, '\n┃ ')}
┃
╰━━━━━━━━━━━━━━╯${FOOTER}`;
};

const usageBox = (command, example) => {
    return `╭━━〔 🤖 AI ASSISTANT 〕━━╮
┃
┃ Please provide a message.
┃
┃ Example:
┃ ${example}
┃
╰━━━━━━━━━━━╯${FOOTER}`;
};

cmd({
    pattern: "ai",
    alias: ["bot", "dj", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply(usageBox("ai", "`.ai Hello`"));

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply(errorBox("AI failed to respond.\nPlease try again later."));
        }

        await reply(aiBox("🤖 AI RESPONSE", data.message));
        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply(errorBox("An error occurred while communicating with the AI."));
    }
});

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply(usageBox("openai", "`.openai Hello`"));

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply(errorBox("OpenAI failed to respond.\nPlease try again later."));
        }

        await reply(aiBox("🧠 OPENAI RESPONSE", data.result));
        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply(errorBox("An error occurred while communicating with OpenAI."));
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply(usageBox("deepseek", "`.deepseek Hello`"));

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply(errorBox("DeepSeek AI failed to respond.\nPlease try again later."));
        }

        await reply(aiBox("🧠 DEEPSEEK RESPONSE", data.answer));
        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply(errorBox("An error occurred while communicating with DeepSeek AI."));
    }
});

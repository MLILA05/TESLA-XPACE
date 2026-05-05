const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {

    const githubRepoURL = 'https://github.com/MLILA05/TESLA-XPACE';

    try {
        // Safe regex match
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        if (!match) {
            return reply("❌ Invalid GitHub URL");
        }

        const username = match[1];
        const repoName = match[2];

        // Fetch repo data (works in Node 18+)
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repoData = await response.json();

        const formattedInfo = `╭━━〔 📦 TESLA-XPACE REPO 〕━━╮
┃ 👑 Owner   : ${repoData.owner.login}
┃ 📂 Repo    : ${repoData.name}
┃ ⭐ Stars   : ${repoData.stargazers_count}
┃ 🍴 Forks   : ${repoData.forks_count}
┃ 🔗 Link    : ${repoData.html_url}
╰━━━━━━━━━━━━━━━━━━━━╯

📜 Description:
${repoData.description || 'No description'}

> ⭐ Don't forget to star & fork!`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/0jvihl.png" },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        reply("❌ Failed to fetch repo info. Try again later.");
    }
});
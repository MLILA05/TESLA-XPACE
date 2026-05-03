const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "repo",
  desc: "Fetch information about a GitHub repository.",
  category: "other",
  react: "🍃",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply(`╭━━〔 ❌ REPOSITORY REQUIRED 〕━━╮
┃ Please provide a GitHub repository.
┃
┃ Example:
┃ repo owner/repo
╰━━━━━━━━━━━━━╯`);
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `╭━━〔 🧩 GITHUB REPOSITORY 〕━━╮
┃ 📦 Name        : ${data.name}
┃ 👤 Owner       : ${data.owner.login}
┃ ⭐ Stars       : ${data.stargazers_count}
┃ 🍴 Forks       : ${data.forks_count}
┃ 📅 Created     : ${new Date(data.created_at).toLocaleDateString()}
╰━━━━━━━━━━━━━━╯

╭─〔 📝 DESCRIPTION 〕─╮
┃ ${data.description || "No description available"}
╰━━━━━━━━━━━━━╯

╭─〔 🔗 REPOSITORY LINK 〕─╮
┃ ${data.html_url}
╰━━━━━━━━━━━━━╯

> ⚡ Powered by TESLA-XPACE`;

    await conn.sendMessage(from, { text: responseMsg }, { quoted: m });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`╭━━〔 ❌ GITHUB ERROR 〕━━╮
┃ Failed to fetch repository data.
┃
┃ Reason:
┃ ${error.response?.data?.message || error.message}
╰━━━━━━━━━━━━━━╯`);
  }
});
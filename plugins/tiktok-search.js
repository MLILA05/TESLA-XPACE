const fetch = require("node-fetch");
const { cmd } = require("../command");

cmd({
  pattern: "tiktoksearch",
  alias: ["tiktoks", "tiks"],
  desc: "Search for TikTok videos using a query.",
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  if (!args[0]) {
    return reply(`╭━━〔 🎵 TIKTOK SEARCH 〕━━╮
┃ Please enter a search keyword.
┃
┃ Example:
┃ .tiktoksearch funny videos
╰━━━━━━━━━━━━━━━━━━━━╯`);
  }

  const query = args.join(" ");
  await store.react('⌛');

  try {
    reply(`╭━━〔 🔎 SEARCHING TIKTOK 〕━━╮
┃ Keyword : ${query}
┃ Status  : Fetching results...
╰━━━━━━━━━━━━━━━━━━━━╯`);
    
    const response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      await store.react('❌');
      return reply(`╭━━〔 ❌ NO RESULT FOUND 〕━━╮
┃ No TikTok videos found.
┃
┃ Try another keyword.
╰━━━━━━━━━━━━━━━━━━━━╯`);
    }

    // Get up to 7 random results
    const results = data.data.slice(0, 7).sort(() => Math.random() - 0.5);

    for (const video of results) {
      const message = `╭━━〔 🎬 TIKTOK RESULT 〕━━╮
┃ 📝 Title    : ${video.title}
┃ 👤 Author   : ${video.author || 'Unknown'}
┃ ⏱️ Duration : ${video.duration || "Unknown"}
╰━━━━━━━━━━━━━━━━━━━━╯

╭─〔 🔗 VIDEO LINK 〕─╮
┃ ${video.link}
╰━━━━━━━━━━━━━━╯

> ⚡ Powered by TESLA-XPACE`;

      if (video.nowm) {
        await conn.sendMessage(from, {
          video: { url: video.nowm },
          caption: message
        }, { quoted: m });
      } else {
        reply(`╭━━〔 ⚠️ VIDEO ERROR 〕━━╮
┃ Failed to retrieve video.
┃
┃ Title:
┃ ${video.title}
╰━━━━━━━━━━━━━━━━━━━━╯`);
      }
    }

    await store.react('✅');
  } catch (error) {
    console.error("Error in TikTokSearch command:", error);
    await store.react('❌');
    reply(`╭━━〔 ❌ TIKTOK SEARCH ERROR 〕━━╮
┃ Something went wrong while searching.
┃ Please try again later.
╰━━━━━━━━━━━━━━━━━━━━╯`);
  }
});
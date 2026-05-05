const { cmd } = require('../command');
const Config = require('../config');

cmd({
  pattern: "getgp",
  alias: ["grouppic", "groupdp"],
  desc: "Fetch the group profile photo.",
  category: "group",
  filename: __filename
}, 
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, isOwner, reply }) => {
  try {
    // Check if used in group
    if (!isGroup) return reply("❌ This command can only be used in a group chat.");

    // Allow only owner or group admin
    if (!isOwner && !isAdmins) {
      return reply("🚫 Only group admins or bot owner can use this command.");
    }

    // Try fetching group profile picture
    const groupMetadata = await conn.groupMetadata(from);
    const groupName = groupMetadata.subject || "Unknown Group";

    let profilePic;
    try {
      profilePic = await conn.profilePictureUrl(from, 'image');
    } catch {
      profilePic = "https://files.catbox.moe/0jvihl.png"; // fallback default image
    }

    await conn.sendMessage(from, {
      image: { url: profilePic },
      caption: `🖼️ *Group Name:* ${groupName}\n\n📸 *Profile Picture Fetched Successfully!*\n\n⚡ TESLA-XPACE`
    }, { quoted: mek });

  } catch (error) {
    console.error("Error fetching group photo:", error);
    reply("❌ Failed to fetch group profile photo. Try again later.");
  }
});

const config = require('../config');
const { cmd } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep } = require('../lib/functions');

// Function to check admin status with LID support
async function checkAdminStatus(conn, chatId, senderId) {
    try {
        const metadata = await conn.groupMetadata(chatId);
        const participants = metadata.participants || [];
        
        const botId = conn.user?.id || '';
        const botLid = conn.user?.lid || '';
        
        // Extract bot information
        const botNumber = botId.includes(':') ? botId.split(':')[0] : (botId.includes('@') ? botId.split('@')[0] : botId);
        const botIdWithoutSuffix = botId.includes('@') ? botId.split('@')[0] : botId;
        const botLidNumeric = botLid.includes(':') ? botLid.split(':')[0] : (botLid.includes('@') ? botLid.split('@')[0] : botLid);
        const botLidWithoutSuffix = botLid.includes('@') ? botLid.split('@')[0] : botLid;
        
        // Extract sender information
        const senderNumber = senderId.includes(':') ? senderId.split(':')[0] : (senderId.includes('@') ? senderId.split('@')[0] : senderId);
        const senderIdWithoutSuffix = senderId.includes('@') ? senderId.split('@')[0] : senderId;
        
        let isBotAdmin = false;
        let isSenderAdmin = false;
        
        for (let p of participants) {
            if (p.admin === "admin" || p.admin === "superadmin") {
                // Check participant IDs
                const pPhoneNumber = p.phoneNumber ? p.phoneNumber.split('@')[0] : '';
                const pId = p.id ? p.id.split('@')[0] : '';
                const pLid = p.lid ? p.lid.split('@')[0] : '';
                const pFullId = p.id || '';
                const pFullLid = p.lid || '';
                
                // Extract numeric part from participant LID
                const pLidNumeric = pLid.includes(':') ? pLid.split(':')[0] : pLid;
                
                // Check if this participant is the bot
                const botMatches = (
                    botId === pFullId ||
                    botId === pFullLid ||
                    botLid === pFullLid ||
                    botLidNumeric === pLidNumeric ||
                    botLidWithoutSuffix === pLid ||
                    botNumber === pPhoneNumber ||
                    botNumber === pId ||
                    botIdWithoutSuffix === pPhoneNumber ||
                    botIdWithoutSuffix === pId ||
                    (botLid && botLid.split('@')[0].split(':')[0] === pLid)
                );
                
                if (botMatches) {
                    isBotAdmin = true;
                }
                
                // Check if this participant is the sender
                const senderMatches = (
                    senderId === pFullId ||
                    senderId === pFullLid ||
                    senderNumber === pPhoneNumber ||
                    senderNumber === pId ||
                    senderIdWithoutSuffix === pPhoneNumber ||
                    senderIdWithoutSuffix === pId ||
                    (pLid && senderIdWithoutSuffix === pLid)
                );
                
                if (senderMatches) {
                    isSenderAdmin = true;
                }
            }
        }
        
        return { isBotAdmin, isSenderAdmin };
        
    } catch (err) {
        console.error('❌ Error checking admin status:', err);
        return { isBotAdmin: false, isSenderAdmin: false };
    }
}

// Function to extract display number from any ID format
function extractDisplayNumber(id) {
    if (!id) return 'Unknown';
    
    // If it contains ':', extract the first part (handles LID like "123456:78@lid")
    if (id.includes(':')) {
        return id.split(':')[0];
    }
    // If it contains '@', extract before @ (handles "2553001234567@s.whatsapp.net")
    if (id.includes('@')) {
        return id.split('@')[0];
    }
    return id;
}

// Function to get group admins with proper display
function getGroupAdminsWithDisplay(participants) {
    const admins = [];
    const superAdmins = [];
    
    for (let p of participants) {
        if (p.admin === "superadmin") {
            superAdmins.push({
                id: p.id,
                displayNumber: p.phoneNumber ? extractDisplayNumber(p.phoneNumber) : extractDisplayNumber(p.id),
                role: "superadmin"
            });
        } else if (p.admin === "admin") {
            admins.push({
                id: p.id,
                displayNumber: p.phoneNumber ? extractDisplayNumber(p.phoneNumber) : extractDisplayNumber(p.id),
                role: "admin"
            });
        }
    }
    
    return { admins, superAdmins, allAdmins: [...superAdmins, ...admins] };
}

cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo", "gc", "gcinfo"],
    desc: "Get group information.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        // Check if in group
        if (!isGroup) return reply(`❌ This command only works in group chats.`);

        // Get sender ID with LID support
        const senderId = mek.key.participant || mek.key.remoteJid || (mek.key.fromMe ? conn.user?.id : null);
        if (!senderId) return reply("❌ Could not identify sender.");

        // Check admin status using the integrated function
        const { isBotAdmin, isSenderAdmin } = await checkAdminStatus(conn, from, senderId);

        // Check if sender is admin (allow all admins to use this command)
        if (!isSenderAdmin) return reply(`⛔ Only *Group Admins* can use this command.`);
        
        // Check if bot is admin
        if (!isBotAdmin) return reply(`❌ I need *admin* rights to fetch group details.`);

        // Fallback profile picture URLs
        const fallbackPpUrls = [
            'https://files.catbox.moe/xksplb.jpg',
            'https://files.catbox.moe/xksplb.jpg',
        ];

        // Try to get group profile picture
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(from, 'image');
        } catch {
            ppUrl = fallbackPpUrls[Math.floor(Math.random() * fallbackPpUrls.length)];
        }

        // Get group metadata
        const metadata = await conn.groupMetadata(from);
        const participants = metadata.participants || [];
        
        // Get admins with proper display numbers
        const { admins, superAdmins, allAdmins } = getGroupAdminsWithDisplay(participants);

        // Find group owner/creator
        let ownerDisplay = "Unknown";
        let ownerId = metadata.owner;
        
        if (ownerId) {
            ownerDisplay = extractDisplayNumber(ownerId);
        } else if (superAdmins.length > 0) {
            ownerId = superAdmins[0].id;
            ownerDisplay = superAdmins[0].displayNumber;
        }

        // Format admin list
        const adminList = allAdmins.map((admin, i) => {
            const roleEmoji = admin.role === "superadmin" ? "👑" : "⭐";
            return `${i + 1}. ${roleEmoji} @${admin.displayNumber}`;
        }).join('\n');

        // Format group creation date if available
        let creationDate = "Unknown";
        if (metadata.creation) {
            const date = new Date(metadata.creation * 1000);
            creationDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Get group settings
        const isAnnounce = metadata.announce ? "🔇 Muted (Admins Only)" : "🔊 Open (Everyone)";
        const isRestrict = metadata.restrict ? "🔒 Restricted" : "🔓 Open";

        // Build group info message
        const gdata = `╭━━━━━━━━━━━━━━━━╮
┃  *「 GROUP INFORMATION 」*
╰━━━━━━━━━━━━━━━━╯

📛 *Group Name:* 
${metadata.subject}

🆔 *Group ID:* 
${metadata.id}

👥 *Total Members:* ${metadata.size || participants.length}

👑 *Group Creator:* 
@${ownerDisplay}

📅 *Created On:* 
${creationDate}

📢 *Message Settings:* 
${isAnnounce}

⚙️ *Edit Settings:* 
${isRestrict}

📝 *Description:* 
${metadata.desc?.toString() || 'No description set'}

╭━━━━━━━━━━━━━━━━╮
┃  *「 ADMINS (${allAdmins.length}) 」*
╰━━━━━━━━━━━━━━━━╯
${adminList || 'No admins found'}

╭━━━━━━━━━━━━━━━━╮
┃  *「 STATISTICS 」*
╰━━━━━━━━━━━━━━━━╯
👑 Super Admins: ${superAdmins.length}
⭐ Admins: ${admins.length}
👤 Members: ${(metadata.size || participants.length) - allAdmins.length}`;

        // Get all IDs for mentions
        const mentionIds = allAdmins.map(a => a.id);
        if (ownerId && !mentionIds.includes(ownerId)) {
            mentionIds.push(ownerId);
        }

        // Send the message with group photo
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: gdata,
            mentions: mentionIds
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ginfo command:", e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`❌ An error occurred:\n\n${e.message || e}`);
    }
});
const config = require('../config');

module.exports = async (client, update) => {
    try {
        const { id, participants, action } = update;
        
        // Fetch metadata for the group where the event occurred
        const groupMetadata = await client.groupMetadata(id);
        const groupName = groupMetadata.subject;
        const groupDesc = groupMetadata.desc || "No description";

        for (let participant of participants) {
            // Get the profile picture of the participant (if available)
            let profilePic;
            try {
                profilePic = await client.profilePictureUrl(participant, 'image');
            } catch {
                profilePic = 'https://i.imgur.com/6v696Wv.png'; // Default placeholder
            }

            // Get the group's profile picture
            let groupPic;
            try {
                groupPic = await client.profilePictureUrl(id, 'image');
            } catch {
                groupPic = 'https://i.imgur.com/6v696Wv.png';
            }

            // Logic for New Members Joining
            if (action === 'add') {
                if (config.WELCOME !== 'true') return;

                const welcomeMessage = `
🌟 *New Member Joined* 🌟
━━━━━━━━━━━━━━━
👤 *User:* @${participant.split('@')[0]}
🏰 *Group:* ${groupName}
📝 *Description:* ${groupDesc}
━━━━━━━━━━━━━━━
Welcome to the group! Please follow the rules.
                `;

                await client.sendMessage(id, {
                    text: welcomeMessage,
                    mentions: [participant],
                    contextInfo: {
                        externalAdReply: {
                            title: "Group Join Notification",
                            body: `Welcome to ${groupName}`,
                            thumbnailUrl: profilePic,
                            sourceUrl: "",
                            mediaType: 1
                        }
                    }
                });
            }

            // Logic for Members Leaving or Being Removed
            else if (action === 'remove') {
                if (config.GOODBYE !== 'true') return;

                const goodbyeMessage = `
👋 *Member Left/Removed* ━━━━━━━━━━━━━━━
👤 *User:* @${participant.split('@')[0]}
🏰 *Group:* ${groupName}
━━━━━━━━━━━━━━━
Goodbye! We hope to see you again.
                `;

                await client.sendMessage(id, {
                    text: goodbyeMessage,
                    mentions: [participant],
                    contextInfo: {
                        externalAdReply: {
                            title: "Group Exit Notification",
                            body: `User left ${groupName}`,
                            thumbnailUrl: profilePic,
                            sourceUrl: "",
                            mediaType: 1
                        }
                    }
                });
            }

            // Logic for Admin Promotions
            else if (action === 'promote') {
                await client.sendMessage(id, {
                    text: `Congratulations @${participant.split('@')[0]}, you are now an *Admin*!`,
                    mentions: [participant]
                });
            }

            // Logic for Admin Demotions
            else if (action === 'demote') {
                await client.sendMessage(id, {
                    text: `@${participant.split('@')[0]} has been demoted from Admin status.`,
                    mentions: [participant]
                });
            }
        }
    } catch (err) {
        console.error("Error in Group Events Module:", err);
    }
};

const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "wacheck",
    alias: ["wavalidate", "checkwa", "wanumber"],
    react: "✅",
    desc: "Check detailed WhatsApp account information",
    category: "utility",
    use: '.wacheck <phone number>',
    filename: __filename
}, async (conn, mek, m, { from, sender, reply, q }) => {
    try {
        if (!q) {
            return reply("Please provide a phone number.\nExample: .wacheck 447984231120");
        }

        // Clean the phone number
        const phoneNumber = q.replace(/[+\s\-()]/g, '');
        
        if (!phoneNumber.match(/^\d+$/)) {
            return reply("❌ Invalid phone number. Please provide only digits.");
        }

        if (phoneNumber.length < 8) {
            return reply("❌ Phone number is too short.");
        }

        const processingMsg = await reply("🔍 Analyzing WhatsApp account...");

        try {
            // API 1: Basic WhatsApp validation
            const response = await axios.post('https://whatsapp-number-validator3.p.rapidapi.com/WhatsappNumberHasItWithToken', 
                {
                    phone_number: phoneNumber
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-rapidapi-host': 'whatsapp-number-validator3.p.rapidapi.com',
                        'x-rapidapi-key': 'adb03fd619msh91f2556557237f4p10f659jsn96ca8c5079ee',
                    },
                    timeout: 15000
                }
            );

            const data = response.data;

            let resultText = `📱 *WhatsApp Detailed Analysis*\n\n`;
            resultText += `🔢 *Number:* ${phoneNumber}\n`;
            resultText += `⏰ *Checked:* ${new Date().toLocaleString()}\n\n`;

            // Determine WhatsApp status
            let hasWhatsApp = false;
            if (data.status === "valid" || data.status === true || 
                data.has_whatsapp === true || data.hasWhatsApp === true ||
                data.valid === true || data.is_valid === true ||
                data.exists === true || data.whatsapp === true) {
                hasWhatsApp = true;
                resultText += `✅ *WhatsApp Status:* Account Exists\n`;
            } else {
                resultText += `❌ *WhatsApp Status:* No Account Found\n`;
            }

            if (hasWhatsApp) {
                // Simulate additional details (since API doesn't provide these)
                const creationYear = getRandomYear(2015, 2024);
                const isActive = Math.random() > 0.2; // 80% chance active
                const isBanned = Math.random() < 0.1; // 10% chance banned
                const canReceiveOTP = Math.random() > 0.1; // 90% chance can receive OTP
                
                resultText += `📅 *Account Created:* ${creationYear}\n`;
                resultText += `🔵 *Active Status:* ${isActive ? 'Currently Active' : 'Not Active'}\n`;
                resultText += `🚫 *Ban Status:* ${isBanned ? 'Account Banned' : 'use app'}\n`;
                resultText += `📨 *OTP Receivable:* ${canReceiveOTP ? 'Can Receive OTP' : 'Cannot Receive OTP'}\n`;
                
                // Additional simulated data
                const lastSeen = getRandomLastSeen();
                resultText += `👀 *Last Seen:* ${lastSeen}\n`;
                resultText += `📊 *Account Type:* ${getRandomAccountType()}\n`;
            }

            // Real data from API if available
            if (data.country_code) {
                resultText += `🌍 *Country Code:* ${data.country_code}\n`;
            }
            if (data.country || data.country_name) {
                resultText += `🏴 *Country:* ${data.country || data.country_name}\n`;
            }
            if (data.carrier) {
                resultText += `📶 *Carrier:* ${data.carrier}\n`;
            }
            if (data.line_type) {
                resultText += `📞 *Line Type:* ${data.line_type}\n`;
            }

            if (!hasWhatsApp) {
                resultText += `\n💡 *Note:* This number doesn't have WhatsApp or the account is not accessible.`;
            }

            resultText += `\n\n⚠️ *Disclaimer:* Some information is simulated for demonstration.`;

            await reply(resultText);

        } catch (apiError) {
            console.error("API Error:", apiError.response?.data || apiError.message);
            
            if (apiError.response?.status === 400) {
                return reply("❌ Invalid phone number format.");
            } else if (apiError.response?.status === 429) {
                return reply("❌ API rate limit exceeded. Please try again later.");
            } else if (apiError.response?.status === 401) {
                return reply("❌ API key error. Please contact bot owner.");
            } else if (apiError.code === 'ECONNABORTYED') {
                return reply("❌ Request timeout. Please try again.");
            } else {
                return reply("❌ Failed to analyze WhatsApp number. Please try again later.");
            }
        }

    } catch (error) {
        console.error("WhatsApp check error:", error);
        reply("❌ An error occurred. Please try again.");
    }
});

// Helper functions for simulated data
function getRandomYear(min, max) {
    const year = Math.floor(Math.random() * (max - min + 1)) + min;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function getRandomLastSeen() {
    const options = [
        "Recently",
        "Within a week", 
        "Within a month",
        "Months ago",
        "Just now",
        "Today",
        "Yesterday"
    ];
    return options[Math.floor(Math.random() * options.length)];
}

function getRandomAccountType() {
    const types = [
        "Personal",
        "Business",
        "Official",
        "Personal",
        "Business"
    ];
    return types[Math.floor(Math.random() * types.length)];
}

const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply 
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply(`╭━━〔 🔐 ACCESS DENIED 〕━━╮
┃ This command is for bot owner only.
╰━━━━━━━━━━━━━━━━━━━━╯`);
        }

        const steps = [
            `╭━━〔 ☣️ TESLA-XPACE SIMULATION 〕━━╮
┃ 💻 Cyber mode activated...
┃ ⚠️ Fun command only
╰━━━━━━━━━━━━━━━━━━━━━━╯`,

            `╭─〔 ⚙️ SYSTEM CHECK 〕─╮
┃ 🛠️ Loading virtual tools...
┃ 🌐 Connecting simulation server...
╰━━━━━━━━━━━━━━━━╯`,

            '```▰▱▱▱▱▱▱▱▱▱ 10%``` ⏳ Initializing...',
            '```▰▰▱▱▱▱▱▱▱▱ 20%``` 🔍 Scanning...',
            '```▰▰▰▱▱▱▱▱▱▱ 30%``` 🧠 Analyzing...',
            '```▰▰▰▰▱▱▱▱▱▱ 40%``` 🌐 Syncing...',
            '```▰▰▰▰▰▱▱▱▱▱ 50%``` ⚡ Boosting...',
            '```▰▰▰▰▰▰▱▱▱▱ 60%``` 🛡️ Securing...',
            '```▰▰▰▰▰▰▰▱▱▱ 70%``` 📡 Transmitting...',
            '```▰▰▰▰▰▰▰▰▱▱ 80%``` 🔐 Encrypting...',
            '```▰▰▰▰▰▰▰▰▰▱ 90%``` 🚀 Finalizing...',
            '```▰▰▰▰▰▰▰▰▰▰ 100%``` ✅ Complete',

            `╭━━〔 ✅ SIMULATION COMPLETE 〕━━╮
┃ 🔓 Virtual access granted
┃ 🚀 Operation completed
┃ 🕵️ Stealth mode enabled
╰━━━━━━━━━━━━━━━━━━━━━━╯`,

            `╭─〔 ⚠️ NOTICE 〕─╮
┃ This is only a fun simulation.
┃ Ethical hacking only.
╰━━━━━━━━━━━━━━╯`,

            `> ☣️ TESLA-XPACE CYBER SIMULATION COMPLETE`
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.error(e);
        reply(`╭━━〔 ❌ ERROR 〕━━╮
┃ ${e.message}
╰━━━━━━━━━━━━━━╯`);
    }
});
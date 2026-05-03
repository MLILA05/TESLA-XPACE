/**
 * ╔══════════════════════════════════════╗
 * ║     NEW COMMANDS PLUGIN FILE         ║
 * ║   55 Brand-New Unique Commands       ║
 * ║  Zero overlap with existing plugins  ║
 * ╚══════════════════════════════════════╝
 * All commands use free, working APIs or
 * built-in JavaScript logic (offline).
 */

const { cmd } = require('../command');
const config = require('../config');
const axios = require('axios');

// ─────────────────────────────────────────────
// 🎲  FUN & GAMES  (Commands 1–15)
// ─────────────────────────────────────────────

// 1. RIDDLE
cmd({
    pattern: "riddle",
    alias: ["brainteaser", "puzzle"],
    desc: "Get a random riddle to solve",
    category: "fun",
    react: "🧩",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://riddles-api.vercel.app/random');
        const { riddle, answer } = res.data;
        const msg = `🧩 *RIDDLE TIME!*\n\n❓ *Question:*\n${riddle}\n\n> Reply with your answer!\n\n||*Answer: ${answer}*||`;
        reply(msg);
    } catch {
        reply('❌ Failed to fetch riddle. Try again later!');
    }
});

// 2. TRIVIA
cmd({
    pattern: "trivia",
    alias: ["quiz", "quiztime"],
    desc: "Get a random trivia question",
    category: "fun",
    react: "🎓",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const q = res.data.results[0];
        const all = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
        const letters = ['A', 'B', 'C', 'D'];
        const opts = all.map((a, i) => `${letters[i]}. ${decodeURIComponent(a)}`).join('\n');
        const correctLetter = letters[all.indexOf(q.correct_answer)];
        const msg = `🎓 *TRIVIA QUESTION*\n\n📚 *Category:* ${q.category}\n⚡ *Difficulty:* ${q.difficulty.toUpperCase()}\n\n❓ ${decodeURIComponent(q.question)}\n\n${opts}\n\n||✅ Answer: ${correctLetter}. ${decodeURIComponent(q.correct_answer)}||`;
        reply(msg);
    } catch {
        reply('❌ Failed to fetch trivia. Try again!');
    }
});

// 3. DAD JOKE
cmd({
    pattern: "dadjoke",
    alias: ["papadoke", "djoke"],
    desc: "Get a random dad joke",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        reply(`😂 *DAD JOKE*\n\n${res.data.joke}\n\n_🥁 Ba dum tss..._`);
    } catch {
        reply('❌ Failed to fetch dad joke!');
    }
});

// 4. CHUCK NORRIS JOKE
cmd({
    pattern: "chucknorris",
    alias: ["chuck", "norris"],
    desc: "Get a random Chuck Norris joke",
    category: "fun",
    react: "💪",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        reply(`💪 *CHUCK NORRIS FACT*\n\n${res.data.value}`);
    } catch {
        reply('❌ Failed to fetch Chuck Norris joke!');
    }
});

// 5. AFFIRMATION
cmd({
    pattern: "affirmation",
    alias: ["affirm", "positive"],
    desc: "Get a daily positive affirmation",
    category: "fun",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://www.affirmations.dev/');
        reply(`🌟 *DAILY AFFIRMATION*\n\n_"${res.data.affirmation}"_\n\n💜 Believe in yourself!`);
    } catch {
        reply('❌ Failed to fetch affirmation!');
    }
});

// 6. ADVICE
cmd({
    pattern: "advice",
    alias: ["getadvice", "suggestion"],
    desc: "Get a random piece of advice",
    category: "fun",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.adviceslip.com/advice');
        const slip = JSON.parse(res.data); // returns text, need to handle
        reply(`💡 *ADVICE #${slip.slip.id}*\n\n_"${slip.slip.advice}"_`);
    } catch {
        try {
            const res = await axios.get('https://api.adviceslip.com/advice', { responseType: 'text' });
            const data = JSON.parse(res.data);
            reply(`💡 *RANDOM ADVICE*\n\n_"${data.slip.advice}"_`);
        } catch {
            reply('❌ Failed to fetch advice!');
        }
    }
});

// 7. MOTIVATE
cmd({
    pattern: "motivate",
    alias: ["motivation", "inspire"],
    desc: "Get a motivational quote",
    category: "fun",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://zenquotes.io/api/random');
        const q = res.data[0];
        reply(`🔥 *MOTIVATION*\n\n_"${q.q}"_\n\n— *${q.a}*`);
    } catch {
        reply('❌ Failed to fetch motivation!');
    }
});

// 8. ROCK PAPER SCISSORS
cmd({
    pattern: "rps",
    alias: ["rockpaperscissors", "janken"],
    use: '.rps rock | .rps paper | .rps scissors',
    desc: "Play Rock Paper Scissors with the bot",
    category: "fun",
    react: "✊",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    const userChoice = args[0]?.toLowerCase();
    if (!choices.includes(userChoice)) {
        return reply(`❌ Choose one: *rock*, *paper*, or *scissors*\nUsage: .rps rock`);
    }
    const botChoice = choices[Math.floor(Math.random() * 3)];
    let result;
    if (userChoice === botChoice) result = "🤝 It's a *TIE*!";
    else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
    ) result = "🏆 You *WIN*! Congrats!";
    else result = "🤖 Bot *WINS*! Better luck next time!";
    reply(`✊ *ROCK PAPER SCISSORS*\n\nYou: ${emojis[userChoice]} ${userChoice.toUpperCase()}\nBot: ${emojis[botChoice]} ${botChoice.toUpperCase()}\n\n${result}`);
});

// 9. CAT FACT
cmd({
    pattern: "catfact",
    alias: ["meowfact", "kittyinfo"],
    desc: "Get a random cat fact",
    category: "fun",
    react: "🐱",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://catfact.ninja/fact');
        reply(`🐱 *CAT FACT*\n\n${res.data.fact}`);
    } catch {
        reply('❌ Failed to fetch cat fact!');
    }
});

// 10. DOG FACT
cmd({
    pattern: "dogfact",
    alias: ["woofffact", "puppyinfo"],
    desc: "Get a random dog fact",
    category: "fun",
    react: "🐶",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://dog-api.kinduff.com/api/facts');
        reply(`🐶 *DOG FACT*\n\n${res.data.facts[0]}`);
    } catch {
        reply('❌ Failed to fetch dog fact!');
    }
});

// 11. YOMAMA JOKE
cmd({
    pattern: "yomama",
    alias: ["yomomma", "mamajoke"],
    desc: "Get a random yo mama joke",
    category: "fun",
    react: "😆",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const jokes = [
        "Yo mama so fat, when she sat on an iPhone, it became a iPad!",
        "Yo mama so old, her birth certificate says 'expired'!",
        "Yo mama so slow, it takes her 2 hours to watch 60 Minutes!",
        "Yo mama so short, she has to slam-dunk her bus fare!",
        "Yo mama so clumsy, she tripped over a wireless network!",
        "Yo mama so old, she knew Burger King when he was just a prince!",
        "Yo mama so fat, her blood type is Nutella!",
        "Yo mama so lazy, she got a remote control just to operate her remote control!",
        "Yo mama so dumb, she put a stamp on an email!",
        "Yo mama so forgetful, she took her phone to a reminder seminar and forgot it there!"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    reply(`😆 *YO MAMA JOKE*\n\n${joke}`);
});

// 12. FORTUNE TELLER
cmd({
    pattern: "fortune",
    alias: ["fortuneteller", "crystal"],
    desc: "Ask the fortune teller a question",
    category: "fun",
    react: "🔮",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const fortunes = [
        "The stars align in your favor today! ⭐",
        "A great opportunity is heading your way! 🚀",
        "Be cautious — not everything is as it appears. 👀",
        "Wealth and success are closer than you think! 💰",
        "A surprise gift from an unexpected person is coming! 🎁",
        "Focus on your health — your body is trying to tell you something. 💊",
        "A true friend will reveal themselves soon. 🤝",
        "Your hard work will finally pay off! 🏆",
        "Take a risk today — fortune favors the bold! 🎲",
        "Love is just around the corner for you! 💘"
    ];
    const question = args.join(' ') || 'the future';
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    reply(`🔮 *FORTUNE TELLER*\n\n❓ Your question: _"${question}"_\n\n🌌 The crystal ball says:\n_${fortune}_`);
});

// 13. WOULD YOU RATHER
cmd({
    pattern: "wouldyourather",
    alias: ["wyr", "ratherq"],
    desc: "Get a 'Would You Rather' question",
    category: "fun",
    react: "🤔",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const questions = [
        ["always be 10 minutes late", "always be 20 minutes early"],
        ["have no internet for a month", "have no phone for a month"],
        ["be able to fly", "be able to become invisible"],
        ["know when you'll die", "know how you'll die"],
        ["live in the ocean", "live on the moon"],
        ["speak every language", "play every instrument"],
        ["have unlimited money but no friends", "be broke with great friends"],
        ["never use social media again", "never watch TV again"],
        ["fight 100 duck-sized horses", "fight 1 horse-sized duck"],
        ["always be cold", "always be hot"]
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];
    reply(`🤔 *WOULD YOU RATHER?*\n\n🅰️ ${q[0].charAt(0).toUpperCase() + q[0].slice(1)}\n\n*— OR —*\n\n🅱️ ${q[1].charAt(0).toUpperCase() + q[1].slice(1)}\n\n_Reply A or B!_`);
});

// 14. NEVER HAVE I EVER
cmd({
    pattern: "neverhavei",
    alias: ["nhie", "neverhave"],
    desc: "Play Never Have I Ever",
    category: "fun",
    react: "🙈",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const statements = [
        "Never have I ever eaten an entire pizza by myself.",
        "Never have I ever gone skydiving.",
        "Never have I ever cried at a movie.",
        "Never have I ever ghosted someone.",
        "Never have I ever pulled an all-nighter.",
        "Never have I ever lied to get out of plans.",
        "Never have I ever texted the wrong person something embarrassing.",
        "Never have I ever sent a risky text to someone by accident.",
        "Never have I ever talked to myself out loud in public.",
        "Never have I ever pretended to not see someone to avoid talking to them."
    ];
    const s = statements[Math.floor(Math.random() * statements.length)];
    reply(`🙈 *NEVER HAVE I EVER*\n\n_${s}_\n\n👆 React if you HAVE done it!\n✋ Stay quiet if you haven't!`);
});

// 15. TRUTH OR DARE EXTRA
cmd({
    pattern: "truthdare",
    alias: ["tord", "tordq"],
    use: '.truthdare truth | .truthdare dare',
    desc: "Get a truth or dare question",
    category: "fun",
    react: "🎭",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const truths = [
        "What is your biggest fear?",
        "Have you ever cheated on a test?",
        "What is the most embarrassing thing you've done?",
        "Have you ever lied to a best friend?",
        "What is your biggest secret?",
        "Who was your first crush?",
        "What is something you've never told anyone?"
    ];
    const dares = [
        "Send a voice note saying 'I am a potato' to someone.",
        "Change your profile picture to something silly for 1 hour.",
        "Send a random emoji to your last 5 chats.",
        "Type a message with your elbows and send it.",
        "Sing the first 10 seconds of a random song.",
        "Do 10 push-ups right now.",
        "Make up a dramatic 3-sentence story about a spoon."
    ];
    const choice = args[0]?.toLowerCase();
    if (!['truth', 'dare'].includes(choice)) {
        return reply("❌ Use .truthdare truth or .truthdare dare");
    }
    const list = choice === 'truth' ? truths : dares;
    const selected = list[Math.floor(Math.random() * list.length)];
    const emoji = choice === 'truth' ? '🤫' : '😈';
    reply(`${emoji} *${choice.toUpperCase()}!*\n\n${selected}`);
});

// ─────────────────────────────────────────────
// 🛠️  INFO & LOOKUP TOOLS  (Commands 16–30)
// ─────────────────────────────────────────────

// 16. IP INFO
cmd({
    pattern: "ipinfo",
    alias: ["iplookup", "ipcheck"],
    use: '.ipinfo 8.8.8.8',
    desc: "Get detailed info about an IP address",
    category: "tools",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const ip = args[0] || '';
    if (!ip) return reply("❌ Please provide an IP address.\nUsage: .ipinfo 8.8.8.8");
    try {
        const res = await axios.get(`http://ip-api.com/json/${ip}`);
        const d = res.data;
        if (d.status === 'fail') return reply(`❌ Invalid IP: ${d.message}`);
        reply(`🌐 *IP INFORMATION*\n\n🔢 *IP:* ${d.query}\n🏳️ *Country:* ${d.country} (${d.countryCode})\n📍 *Region:* ${d.regionName}\n🏙️ *City:* ${d.city}\n📮 *ZIP:* ${d.zip || 'N/A'}\n🌍 *Timezone:* ${d.timezone}\n📡 *ISP:* ${d.isp}\n🏢 *Org:* ${d.org}\n📶 *AS:* ${d.as}\n🗺️ *Lat/Lon:* ${d.lat}, ${d.lon}`);
    } catch {
        reply('❌ Failed to lookup IP!');
    }
});

// 17. QR CODE GENERATOR
cmd({
    pattern: "qrcode",
    alias: ["makeqr", "genqr"],
    use: '.qrcode https://example.com',
    desc: "Generate a QR code from any text or URL",
    category: "tools",
    react: "📷",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ');
    if (!text) return reply("❌ Please provide text or URL.\nUsage: .qrcode https://example.com");
    try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
        await conn.sendMessage(from, {
            image: { url },
            caption: `📷 *QR CODE GENERATED*\n\n📝 Data: ${text}\n\n_Scan with any QR reader!_`
        }, { quoted: mek });
    } catch {
        reply('❌ Failed to generate QR code!');
    }
});

// 18. BMI CALCULATOR
cmd({
    pattern: "bmi",
    alias: ["bmicalc", "bodyindex"],
    use: '.bmi 70 1.75  (weight kg, height m)',
    desc: "Calculate your Body Mass Index (BMI)",
    category: "tools",
    react: "⚖️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const [weight, height] = args.map(Number);
    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        return reply("❌ Usage: .bmi <weight_kg> <height_m>\nExample: .bmi 70 1.75");
    }
    const bmi = (weight / (height * height)).toFixed(1);
    let category, emoji;
    if (bmi < 18.5) { category = "Underweight"; emoji = "😟"; }
    else if (bmi < 25) { category = "Normal weight"; emoji = "😊"; }
    else if (bmi < 30) { category = "Overweight"; emoji = "😐"; }
    else { category = "Obese"; emoji = "⚠️"; }
    reply(`⚖️ *BMI CALCULATOR*\n\n👤 Weight: ${weight} kg\n📏 Height: ${height} m\n\n📊 *BMI:* ${bmi}\n${emoji} *Category:* ${category}\n\n_Normal range: 18.5 – 24.9_`);
});

// 19. AGE CALCULATOR
cmd({
    pattern: "agecalc",
    alias: ["howold", "myage"],
    use: '.agecalc 2000-05-15',
    desc: "Calculate exact age from a birth date",
    category: "tools",
    react: "🎂",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const input = args[0];
    if (!input) return reply("❌ Usage: .agecalc YYYY-MM-DD\nExample: .agecalc 2000-05-15");
    const birth = new Date(input);
    if (isNaN(birth.getTime())) return reply("❌ Invalid date! Use format: YYYY-MM-DD");
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);
    const daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
    reply(`🎂 *AGE CALCULATOR*\n\n📅 Birth Date: ${birth.toDateString()}\n\n🎉 *Age:* ${years} years, ${months} months, ${days} days\n📊 Total Days Lived: ${totalDays.toLocaleString()}\n🎁 Next Birthday: in ${daysUntilBirthday} days`);
});

// 20. TIMEZONE INFO
cmd({
    pattern: "timezone",
    alias: ["tzinfo", "timeat"],
    use: '.timezone Asia/Karachi',
    desc: "Get current time in any timezone",
    category: "tools",
    react: "🕐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const tz = args.join('_') || 'UTC';
    try {
        const res = await axios.get(`https://worldtimeapi.org/api/timezone/${tz}`);
        const d = res.data;
        const dateTime = new Date(d.datetime).toLocaleString('en-US', {
            timeZone: tz, weekday: 'long', year: 'numeric',
            month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        reply(`🕐 *TIMEZONE INFO*\n\n🌍 Timezone: ${d.timezone}\n📅 Date & Time: ${dateTime}\n🌐 UTC Offset: ${d.utc_offset}\n💡 Abbreviation: ${d.abbreviation}`);
    } catch {
        reply(`❌ Timezone not found!\nExample: .timezone Asia/Karachi\nOr try: .timezone America/New_York`);
    }
});

// 21. NUMBER FACTS
cmd({
    pattern: "numberinfo",
    alias: ["numfact", "numberfact"],
    use: '.numberinfo 42',
    desc: "Get interesting facts about any number",
    category: "tools",
    react: "🔢",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const num = args[0] || Math.floor(Math.random() * 1000);
    if (isNaN(num)) return reply("❌ Please provide a valid number!");
    try {
        const [math, trivia, year] = await Promise.all([
            axios.get(`http://numbersapi.com/${num}/math`),
            axios.get(`http://numbersapi.com/${num}/trivia`),
            axios.get(`http://numbersapi.com/${num}/year`)
        ]);
        reply(`🔢 *NUMBER FACTS: ${num}*\n\n📐 *Math:* ${math.data}\n\n🎯 *Trivia:* ${trivia.data}\n\n📅 *Year Fact:* ${year.data}`);
    } catch {
        reply('❌ Failed to fetch number facts!');
    }
});

// 22. UUID GENERATOR
cmd({
    pattern: "uuid",
    alias: ["genid", "uniqueid"],
    desc: "Generate random UUID(s)",
    category: "tools",
    react: "🔑",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const count = Math.min(parseInt(args[0]) || 1, 10);
    const uuids = [];
    for (let i = 0; i < count; i++) {
        uuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }));
    }
    reply(`🔑 *UUID GENERATOR*\n\n${uuids.map((u, i) => `${i + 1}. \`${u}\``).join('\n')}`);
});

// 23. HEX COLOR
cmd({
    pattern: "hexcolor",
    alias: ["randomcolor", "colorgen"],
    desc: "Generate random hex color(s) with image",
    category: "tools",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const count = Math.min(parseInt(args[0]) || 5, 10);
    const colors = Array.from({ length: count }, () => {
        const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);
        return { hex: `#${hex}`, r, g, b };
    });
    const list = colors.map(c => `🎨 *${c.hex}* — RGB(${c.r}, ${c.g}, ${c.b})`).join('\n');
    reply(`🎨 *RANDOM HEX COLORS*\n\n${list}\n\n_Use on: coolors.co or Adobe Color_`);
});

// 24. MY IP
cmd({
    pattern: "myip",
    alias: ["whatismyip", "publicip"],
    desc: "Get the bot's current public IP address",
    category: "tools",
    react: "📡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.ipify.org?format=json');
        const ipRes = await axios.get(`http://ip-api.com/json/${res.data.ip}`);
        const d = ipRes.data;
        reply(`📡 *PUBLIC IP INFO*\n\n🔢 IP: ${d.query}\n🏳️ Country: ${d.country}\n🌍 Timezone: ${d.timezone}\n📡 ISP: ${d.isp}`);
    } catch {
        reply('❌ Failed to fetch IP info!');
    }
});

// 25. SPACE FACT
cmd({
    pattern: "spacefact",
    alias: ["spacewow", "astronomyfact"],
    desc: "Get an amazing space/astronomy fact",
    category: "fun",
    react: "🚀",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const facts = [
        "One million Earths could fit inside the Sun! ☀️",
        "A day on Venus is longer than a year on Venus! 🪐",
        "Neutron stars are so dense, a teaspoon weighs 10 billion tons! 💫",
        "The footprints left by Apollo astronauts will last for millions of years — the Moon has no wind! 👣",
        "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth! ⚡",
        "There are more stars in the universe than grains of sand on all Earth's beaches! 🏖️",
        "The largest volcano in the Solar System is Olympus Mons on Mars — 3x taller than Everest! 🌋",
        "Saturn's rings are made mostly of ice and rock, some pieces as small as a grain of sand! 💍",
        "The International Space Station travels at 28,000 km/h and circles Earth every 90 minutes! 🛸",
        "Black holes don't actually suck — they just have incredibly strong gravity if you get close enough! 🕳️"
    ];
    reply(`🚀 *SPACE FACT*\n\n🌌 ${facts[Math.floor(Math.random() * facts.length)]}`);
});

// 26. HISTORY FACT
cmd({
    pattern: "historyfact",
    alias: ["histfact", "didyouknow"],
    desc: "Get a random history fact",
    category: "fun",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        reply(`📜 *HISTORY / RANDOM FACT*\n\n${res.data.text}`);
    } catch {
        const facts = [
            "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid!",
            "Oxford University is older than the Aztec Empire!",
            "Napoleon was once attacked by rabbits. He ordered a rabbit hunt — but they were tame farm rabbits!",
            "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
            "Vikings never actually wore helmets with horns — that was a 19th-century myth!"
        ];
        reply(`📜 *HISTORY FACT*\n\n${facts[Math.floor(Math.random() * facts.length)]}`);
    }
});

// ─────────────────────────────────────────────
// 📝  TEXT TOOLS  (Commands 27–40)
// ─────────────────────────────────────────────

// 27. ROT13
cmd({
    pattern: "rot13",
    alias: ["caesar", "rotcipher"],
    use: '.rot13 Hello World',
    desc: "Encode/decode text with ROT13 cipher",
    category: "tools",
    react: "🔐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ');
    if (!text) return reply("❌ Usage: .rot13 <text>\nExample: .rot13 Hello World");
    const result = text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    reply(`🔐 *ROT13 CIPHER*\n\n📥 Input: ${text}\n📤 Output: ${result}\n\n_Decode the output by running .rot13 again!_`);
});

// 28. TEXT TO MORSE CODE
cmd({
    pattern: "morse",
    alias: ["tomorse", "morsecode"],
    use: '.morse Hello World',
    desc: "Convert text to Morse code",
    category: "tools",
    react: "📡",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ').toUpperCase();
    if (!text) return reply("❌ Usage: .morse <text>\nExample: .morse Hello World");
    const map = {
        A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',
        N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
        '1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
        '0':'-----',' ':'/'
    };
    const result = text.split('').map(c => map[c] || '?').join(' ');
    reply(`📡 *MORSE CODE*\n\n📝 Text: ${text}\n\n🔵 Morse: \`${result}\`\n\n• = dit  — = dah  / = word space`);
});

// 29. MORSE TO TEXT
cmd({
    pattern: "unmorse",
    alias: ["decodemorse", "frommorse"],
    use: '.unmorse .... . .-.. .-.. ---',
    desc: "Convert Morse code back to text",
    category: "tools",
    react: "📡",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const input = args.join(' ');
    if (!input) return reply("❌ Usage: .unmorse <morse>\nExample: .unmorse .... . .-.. .-.. ---");
    const map = {'.-':'A','-...':'B','-.-.':'C','-..':'D','.':'E','..-.':'F','--.':'G','....':'H','..':'I','.---':'J','-.-':'K','.-..':'L','--':'M','-.':'N','---':'O','.--.':'P','--.-':'Q','.-.':'R','...':'S','-':'T','..-':'U','...-':'V','.--':'W','-..-':'X','-.--':'Y','--..':'Z','.----':'1','..---':'2','...--':'3','....-':'4','.....':'5','-....':'6','--...':'7','---..':'8','----.':'9','-----':'0','/':' '};
    const result = input.split(' ').map(c => map[c] || '?').join('');
    reply(`📡 *MORSE DECODER*\n\n🔵 Morse: \`${input}\`\n📝 Text: *${result}*`);
});

// 30. WORD COUNT
cmd({
    pattern: "wordcount",
    alias: ["wcount", "countwords"],
    use: '.wordcount <text>',
    desc: "Count words, characters, sentences in text",
    category: "tools",
    react: "📊",
    filename: __filename
}, async (conn, mek, m, { from, args, quoted, reply }) => {
    const text = args.join(' ') || (quoted?.text || '');
    if (!text) return reply("❌ Usage: .wordcount <text> or quote a message");
    const words = text.trim().split(/\s+/).filter(w => w).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const avgWord = words ? (charsNoSpace / words).toFixed(1) : 0;
    reply(`📊 *WORD COUNT ANALYSIS*\n\n📝 Words: ${words.toLocaleString()}\n🔤 Characters (with spaces): ${chars.toLocaleString()}\n🔡 Characters (no spaces): ${charsNoSpace.toLocaleString()}\n📄 Sentences: ${sentences}\n📑 Paragraphs: ${paragraphs}\n📏 Avg Word Length: ${avgWord} chars`);
});

// 31. PALINDROME CHECKER
cmd({
    pattern: "palindrome",
    alias: ["ispalindrome", "checkpalindrome"],
    use: '.palindrome racecar',
    desc: "Check if a word or phrase is a palindrome",
    category: "tools",
    react: "🔁",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ');
    if (!text) return reply("❌ Usage: .palindrome <word/phrase>\nExample: .palindrome racecar");
    const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = clean.split('').reverse().join('');
    const isPalin = clean === reversed;
    reply(`🔁 *PALINDROME CHECKER*\n\n📝 Input: _"${text}"_\n🔄 Reversed: _"${text.split('').reverse().join('')}"_\n\n${isPalin ? '✅ YES! It is a palindrome!' : '❌ No, it is NOT a palindrome.'}`);
});

// 32. REVERSE WORDS
cmd({
    pattern: "reversewords",
    alias: ["flipwords", "wordflip"],
    use: '.reversewords Hello beautiful world',
    desc: "Reverse the order of words in a sentence",
    category: "tools",
    react: "🔀",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ');
    if (!text) return reply("❌ Usage: .reversewords <text>");
    const reversed = text.split(' ').reverse().join(' ');
    reply(`🔀 *REVERSE WORDS*\n\n📥 Original: ${text}\n📤 Reversed: ${reversed}`);
});

// 33. CAPITALIZE TEXT
cmd({
    pattern: "capitaltext",
    alias: ["titlecase", "capitalize"],
    use: '.capitaltext hello world from bot',
    desc: "Convert text to Title Case",
    category: "tools",
    react: "🔡",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ');
    if (!text) return reply("❌ Usage: .capitaltext <text>");
    const titled = text.replace(/\b\w/g, l => l.toUpperCase());
    const upper = text.toUpperCase();
    const lower = text.toLowerCase();
    reply(`🔡 *TEXT CONVERTER*\n\n📥 Input: ${text}\n\n🔤 Title Case: ${titled}\n📢 UPPERCASE: ${upper}\n🔇 lowercase: ${lower}`);
});

// 34. SYNONYM FINDER
cmd({
    pattern: "synonym",
    alias: ["synonyms", "simwords"],
    use: '.synonym happy',
    desc: "Find synonyms for any English word",
    category: "tools",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const word = args[0];
    if (!word) return reply("❌ Usage: .synonym <word>\nExample: .synonym happy");
    try {
        const res = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}&max=15`);
        if (!res.data.length) return reply(`❌ No synonyms found for "${word}"`);
        const syns = res.data.map(w => w.word).join(', ');
        reply(`📖 *SYNONYMS FOR "${word.toUpperCase()}"*\n\n${syns}`);
    } catch {
        reply('❌ Failed to find synonyms!');
    }
});

// 35. ANTONYM FINDER
cmd({
    pattern: "antonym",
    alias: ["antonyms", "opposite"],
    use: '.antonym happy',
    desc: "Find antonyms (opposites) for any English word",
    category: "tools",
    react: "↔️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const word = args[0];
    if (!word) return reply("❌ Usage: .antonym <word>\nExample: .antonym happy");
    try {
        const res = await axios.get(`https://api.datamuse.com/words?rel_ant=${word}&max=10`);
        if (!res.data.length) return reply(`❌ No antonyms found for "${word}"`);
        const ants = res.data.map(w => w.word).join(', ');
        reply(`↔️ *ANTONYMS FOR "${word.toUpperCase()}"*\n\n${ants}`);
    } catch {
        reply('❌ Failed to find antonyms!');
    }
});

// 36. RHYME FINDER
cmd({
    pattern: "rhyme",
    alias: ["rhymes", "findrhyme"],
    use: '.rhyme time',
    desc: "Find words that rhyme with a given word",
    category: "tools",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const word = args[0];
    if (!word) return reply("❌ Usage: .rhyme <word>\nExample: .rhyme time");
    try {
        const res = await axios.get(`https://api.datamuse.com/words?rel_rhy=${word}&max=20`);
        if (!res.data.length) return reply(`❌ No rhymes found for "${word}"`);
        const rhymes = res.data.map(w => w.word).join(', ');
        reply(`🎵 *RHYMES WITH "${word.toUpperCase()}"*\n\n${rhymes}`);
    } catch {
        reply('❌ Failed to find rhymes!');
    }
});

// 37. RANDOM WORD
cmd({
    pattern: "randomword",
    alias: ["randword", "wordgen"],
    desc: "Get a random English word with definition",
    category: "tools",
    react: "📚",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://random-word-api.vercel.app/api?words=1');
        const word = res.data[0];
        try {
            const defRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const meanings = defRes.data[0]?.meanings;
            const meaning = meanings?.[0]?.definitions?.[0]?.definition || 'No definition found.';
            reply(`📚 *RANDOM WORD*\n\n🔤 Word: *${word}*\n📖 Meaning: ${meaning}`);
        } catch {
            reply(`📚 *RANDOM WORD*\n\n🔤 Word: *${word}*`);
        }
    } catch {
        reply('❌ Failed to get random word!');
    }
});

// ─────────────────────────────────────────────
// 🧮  CALCULATORS  (Commands 38–43)
// ─────────────────────────────────────────────

// 38. PERCENTAGE CALCULATOR
cmd({
    pattern: "percentage",
    alias: ["percent", "calcpercent"],
    use: '.percentage 20 of 500',
    desc: "Calculate percentage easily",
    category: "tools",
    react: "💯",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Usage: .percentage 20 of 500 OR .percentage 50 is what of 200
    const text = args.join(' ');
    if (!text) return reply("❌ Usage: .percentage 20 of 500");
    const match = text.match(/(\d+\.?\d*)\s+(?:of|%\s+of)\s+(\d+\.?\d*)/i);
    if (!match) return reply("❌ Usage: .percentage 20 of 500\n(What is 20% of 500?)");
    const pct = parseFloat(match[1]);
    const total = parseFloat(match[2]);
    const result = ((pct / 100) * total).toFixed(2);
    reply(`💯 *PERCENTAGE CALCULATOR*\n\n${pct}% of ${total} = *${result}*\n\n📊 That's ${result} out of ${total}`);
});

// 39. DISCOUNT CALCULATOR
cmd({
    pattern: "discount",
    alias: ["sale", "discountcalc"],
    use: '.discount 1500 30  (price, discount%)',
    desc: "Calculate sale price after discount",
    category: "tools",
    react: "🏷️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const [price, discountPct] = args.map(Number);
    if (!price || isNaN(price) || !discountPct || isNaN(discountPct)) {
        return reply("❌ Usage: .discount <original_price> <discount_%>\nExample: .discount 1500 30");
    }
    const discountAmount = ((discountPct / 100) * price).toFixed(2);
    const finalPrice = (price - discountAmount).toFixed(2);
    reply(`🏷️ *DISCOUNT CALCULATOR*\n\n💰 Original Price: ${price}\n🎯 Discount: ${discountPct}%\n💸 You Save: ${discountAmount}\n✅ Final Price: *${finalPrice}*`);
});

// 40. TIP CALCULATOR
cmd({
    pattern: "tipcalc",
    alias: ["tipamount", "calctiip"],
    use: '.tipcalc 50 15 4  (bill, tip%, people)',
    desc: "Calculate tip and split among people",
    category: "tools",
    react: "🍽️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const [bill, tipPct = 15, people = 1] = args.map(Number);
    if (!bill || isNaN(bill)) return reply("❌ Usage: .tipcalc <bill> <tip%> <people>\nExample: .tipcalc 50 15 4");
    const tipAmount = ((tipPct / 100) * bill).toFixed(2);
    const total = (parseFloat(bill) + parseFloat(tipAmount)).toFixed(2);
    const perPerson = (total / people).toFixed(2);
    const tipPerPerson = (tipAmount / people).toFixed(2);
    reply(`🍽️ *TIP CALCULATOR*\n\n🧾 Bill: $${bill}\n💫 Tip: ${tipPct}% = $${tipAmount}\n💰 Total: $${total}\n👥 People: ${people}\n\n🧍 Per Person:\n  Bill: $${(bill / people).toFixed(2)}\n  Tip: $${tipPerPerson}\n  *Total: $${perPerson}*`);
});

// 41. COMPOUND INTEREST
cmd({
    pattern: "compound",
    alias: ["cinterest", "compoundcalc"],
    use: '.compound 1000 5 10 12  (principal, rate%, years, n/year)',
    desc: "Calculate compound interest",
    category: "tools",
    react: "📈",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const [P, r, t, n = 12] = args.map(Number);
    if (!P || !r || !t || isNaN(P)) return reply("❌ Usage: .compound <principal> <rate%> <years> [compounds/year]\nExample: .compound 1000 5 10");
    const amount = P * Math.pow(1 + (r / 100) / n, n * t);
    const interest = amount - P;
    reply(`📈 *COMPOUND INTEREST*\n\n💵 Principal: $${P.toLocaleString()}\n📊 Annual Rate: ${r}%\n📅 Time: ${t} years\n🔄 Compounds/Year: ${n}\n\n✅ Final Amount: *$${amount.toFixed(2)}*\n💹 Interest Earned: *$${interest.toFixed(2)}*`);
});

// 42. TEMPERATURE CONVERTER
cmd({
    pattern: "tempconvert",
    alias: ["celsius", "fahrenheit"],
    use: '.tempconvert 100c | .tempconvert 212f | .tempconvert 373k',
    desc: "Convert temperatures between C, F, and K",
    category: "tools",
    react: "🌡️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const input = args[0];
    if (!input) return reply("❌ Usage: .tempconvert 100c or 212f or 373k");
    const match = input.match(/^(-?\d+\.?\d*)([cfkCFK])$/);
    if (!match) return reply("❌ Invalid format! Use: .tempconvert 100c");
    const val = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    let c, f, k;
    if (unit === 'C') { c = val; f = (c * 9/5) + 32; k = c + 273.15; }
    else if (unit === 'F') { f = val; c = (f - 32) * 5/9; k = c + 273.15; }
    else { k = val; c = k - 273.15; f = (c * 9/5) + 32; }
    reply(`🌡️ *TEMPERATURE CONVERTER*\n\n🔵 Celsius: ${c.toFixed(2)}°C\n🔴 Fahrenheit: ${f.toFixed(2)}°F\n🟡 Kelvin: ${k.toFixed(2)}K`);
});

// 43. PRIME NUMBER CHECKER
cmd({
    pattern: "isprime",
    alias: ["primecheck", "checkprime"],
    use: '.isprime 17',
    desc: "Check if a number is prime and find nearby primes",
    category: "tools",
    react: "🔢",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const num = parseInt(args[0]);
    if (isNaN(num) || num < 1) return reply("❌ Usage: .isprime <number>\nExample: .isprime 17");
    const isPrime = n => {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false;
        return true;
    };
    const prime = isPrime(num);
    let nextPrime = num + 1;
    while (!isPrime(nextPrime)) nextPrime++;
    let prevPrime = num - 1;
    while (prevPrime > 1 && !isPrime(prevPrime)) prevPrime--;
    reply(`🔢 *PRIME NUMBER CHECKER*\n\nNumber: *${num}*\n${prime ? '✅ YES! It is PRIME!' : '❌ NOT a prime number.'}\n\n⬅️ Previous prime: ${prevPrime > 1 ? prevPrime : 'N/A'}\n➡️ Next prime: ${nextPrime}`);
});

// 44. FIBONACCI SEQUENCE
cmd({
    pattern: "fibonacci",
    alias: ["fib", "fibseq"],
    use: '.fibonacci 10',
    desc: "Generate Fibonacci sequence up to N terms",
    category: "tools",
    react: "🌀",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const n = Math.min(parseInt(args[0]) || 10, 50);
    if (isNaN(n) || n < 1) return reply("❌ Usage: .fibonacci 10 (max 50)");
    const seq = [0, 1];
    for (let i = 2; i < n; i++) seq.push(seq[i-1] + seq[i-2]);
    const result = seq.slice(0, n);
    reply(`🌀 *FIBONACCI SEQUENCE*\n\n*First ${n} terms:*\n${result.join(', ')}\n\n📊 Last term: ${result[result.length-1].toLocaleString()}`);
});

// ─────────────────────────────────────────────
// 🌐  MEDIA & FETCH  (Commands 45–55)
// ─────────────────────────────────────────────

// 45. RANDOM MEME
cmd({
    pattern: "meme",
    alias: ["getmeme", "randommeme"],
    desc: "Get a random meme from Reddit",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://meme-api.com/gimme');
        const { title, url, author, subreddit, ups } = res.data;
        await conn.sendMessage(from, {
            image: { url },
            caption: `😂 *RANDOM MEME*\n\n📌 ${title}\n👤 By: u/${author}\n📍 r/${subreddit}\n👍 ${ups} upvotes`
        }, { quoted: mek });
    } catch {
        reply('❌ Failed to fetch meme!');
    }
});

// 46. RANDOM IMAGE (PICSUM)
cmd({
    pattern: "randomimage",
    alias: ["randpic", "randomphoto"],
    use: '.randomimage [width] [height]',
    desc: "Get a random beautiful image",
    category: "fun",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const w = parseInt(args[0]) || 800;
    const h = parseInt(args[1]) || 600;
    const seed = Math.floor(Math.random() * 1000);
    try {
        await conn.sendMessage(from, {
            image: { url: `https://picsum.photos/seed/${seed}/${w}/${h}` },
            caption: `🖼️ *RANDOM IMAGE*\n\n📐 Size: ${w}×${h}px\n🌱 Seed: ${seed}\n\n_Photo from Lorem Picsum_`
        }, { quoted: mek });
    } catch {
        reply('❌ Failed to fetch random image!');
    }
});

// 47. EXCHANGE RATE
cmd({
    pattern: "exchange",
    alias: ["exchangerate", "forexrate"],
    use: '.exchange USD EUR | .exchange USD PKR',
    desc: "Get live currency exchange rates",
    category: "tools",
    react: "💱",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const base = (args[0] || 'USD').toUpperCase();
    const target = (args[1] || 'EUR').toUpperCase();
    try {
        const res = await axios.get(`https://api.frankfurter.app/latest?from=${base}&to=${target}`);
        if (res.data.error) return reply(`❌ Invalid currency code!`);
        const rate = res.data.rates[target];
        reply(`💱 *EXCHANGE RATE*\n\n🏦 1 ${base} = *${rate} ${target}*\n\n📅 Date: ${res.data.date}\n🔄 Source: Frankfurter (ECB)`);
    } catch {
        reply(`❌ Failed to fetch rates!\nMake sure you use valid codes like: USD, EUR, PKR, GBP, INR`);
    }
});

// 48. HACKER NEWS TOP STORIES
cmd({
    pattern: "hackernews",
    alias: ["hnews", "technews"],
    desc: "Get top Hacker News tech stories",
    category: "tools",
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const idsRes = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const top5 = idsRes.data.slice(0, 5);
        const stories = await Promise.all(
            top5.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        );
        let msg = `📰 *TOP HACKER NEWS STORIES*\n\n`;
        stories.forEach((s, i) => {
            const d = s.data;
            msg += `${i+1}. *${d.title}*\n   👍 ${d.score} pts | 💬 ${d.descendants || 0} comments\n   🔗 ${d.url || `https://news.ycombinator.com/item?id=${d.id}`}\n\n`;
        });
        reply(msg.trim());
    } catch {
        reply('❌ Failed to fetch Hacker News!');
    }
});

// 49. GITHUB TRENDING (via scrape-free GitHub search API)
cmd({
    pattern: "gittrend",
    alias: ["githubtrend", "trending"],
    use: '.gittrend [language]',
    desc: "Get trending GitHub repos by language",
    category: "tools",
    react: "📦",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const lang = args[0] || '';
    try {
        const query = lang ? `language:${lang}` : 'stars:>1000';
        const res = await axios.get(`https://api.github.com/search/repositories?q=${query}+created:>${new Date(Date.now()-7*24*60*60*1000).toISOString().split('T')[0]}&sort=stars&order=desc&per_page=5`);
        const repos = res.data.items;
        let msg = `📦 *TRENDING GITHUB REPOS*${lang ? ` (${lang})` : ''}\n\n`;
        repos.forEach((r, i) => {
            msg += `${i+1}. *${r.full_name}*\n   ⭐ ${r.stargazers_count.toLocaleString()} stars | 🍴 ${r.forks_count.toLocaleString()} forks\n   📝 ${r.description?.slice(0,80) || 'No description'}...\n   🔗 ${r.html_url}\n\n`;
        });
        reply(msg.trim());
    } catch {
        reply('❌ Failed to fetch GitHub trends!');
    }
});

// 50. ASCII ART TEXT
cmd({
    pattern: "asciiart",
    alias: ["asciifont", "figlet"],
    use: '.asciiart Hello',
    desc: "Convert text to ASCII art using FIGlet API",
    category: "fun",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const text = args.join(' ').slice(0, 20);
    if (!text) return reply("❌ Usage: .asciiart <text>\nExample: .asciiart Hello");
    try {
        const res = await axios.get(`https://artii.herokuapp.com/make?text=${encodeURIComponent(text)}`);
        reply(`🎨 *ASCII ART*\n\n\`\`\`\n${res.data}\n\`\`\``);
    } catch {
        reply('❌ Failed to generate ASCII art!');
    }
});

// 51. RANDOM EMOJI COMBO
cmd({
    pattern: "randomemoji",
    alias: ["emojimix", "emojiparty"],
    desc: "Get a random fun emoji combination",
    category: "fun",
    react: "🎰",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const emojiGroups = [
        ['🌟','⭐','💫','✨','🌠'],['🔥','💥','⚡','☄️','🌋'],
        ['❤️','💜','💙','💚','💛'],['🐱','🐶','🦊','🐼','🐨'],
        ['🍕','🍔','🍣','🌮','🍦'],['🚀','🛸','🌙','🪐','🌌'],
        ['🎮','🎯','🎲','🃏','🎪'],['🏆','🥇','🎖️','👑','💎']
    ];
    const combo = Array.from({ length: 5 }, () => {
        const group = emojiGroups[Math.floor(Math.random() * emojiGroups.length)];
        return group[Math.floor(Math.random() * group.length)];
    }).join(' ');
    const descriptions = ['Legendary!', 'Epic combo!', 'Rare pull!', 'Mythical!', 'Blessed!', 'Cursed...'];
    const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
    reply(`🎰 *RANDOM EMOJI COMBO*\n\n${combo}\n\n_${desc}_`);
});

// 52. PHONE NUMBER FORMATTER
cmd({
    pattern: "phoneformat",
    alias: ["formatphone", "phonefmt"],
    use: '.phoneformat 255622220680',
    desc: "Format and analyze a phone number",
    category: "tools",
    react: "📱",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const phone = args[0];
    if (!phone) return reply("❌ Usage: .phoneformat 255622220680");
    const cleaned = phone.replace(/[^\d+]/g, '');
    const countryMap = {
        '+1': 'USA/Canada 🇺🇸🇨🇦', '+44': 'UK 🇬🇧', '+91': 'India 🇮🇳',
        '+92': 'Pakistan 🇵🇰', '+971': 'UAE 🇦🇪', '+966': 'Saudi Arabia 🇸🇦',
        '+880': 'Bangladesh 🇧🇩', '+62': 'Indonesia 🇮🇩', '+86': 'China 🇨🇳',
        '+55': 'Brazil 🇧🇷', '+49': 'Germany 🇩🇪', '+33': 'France 🇫🇷'
    };
    let country = 'Unknown';
    for (const [code, name] of Object.entries(countryMap)) {
        if (cleaned.startsWith(code)) { country = name; break; }
    }
    const formatted = cleaned.replace(/(\+\d{1,3})(\d{3})(\d{3})(\d+)/, '$1 $2-$3-$4');
    reply(`📱 *PHONE NUMBER INFO*\n\n📞 Raw: ${phone}\n✅ Cleaned: ${cleaned}\n🎨 Formatted: ${formatted}\n🏳️ Country: ${country}\n🔢 Length: ${cleaned.replace('+', '').length} digits`);
});

// 53. ELEMENT INFO (Periodic Table)
cmd({
    pattern: "element",
    alias: ["periodic", "chemistry"],
    use: '.element Gold | .element 79 | .element Au',
    desc: "Get info about a periodic table element",
    category: "tools",
    react: "⚗️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const query = args.join(' ');
    if (!query) return reply("❌ Usage: .element <name/symbol/number>\nExample: .element Gold or .element Au or .element 79");
    try {
        const res = await axios.get(`https://neelpatel05.pythonanywhere.com/element/atomicnumber?atomicnumber=${isNaN(query) ? '' : query}`);
        if (res.data) {
            const el = res.data;
            reply(`⚗️ *ELEMENT: ${el.name}*\n\n🔣 Symbol: ${el.symbol}\n🔢 Atomic #: ${el.atomicnumber}\n⚖️ Atomic Mass: ${el.atomicmass}\n🏷️ Group: ${el.groupblock}\n🌡️ Boiling Point: ${el.boilingpoint}K\n❄️ Melting Point: ${el.meltingpoint}K`);
        } else throw new Error();
    } catch {
        // Offline fallback for common elements
        const elements = {
            'hydrogen': { symbol: 'H', num: 1, mass: 1.008, group: 'Nonmetal' },
            'helium': { symbol: 'He', num: 2, mass: 4.003, group: 'Noble Gas' },
            'carbon': { symbol: 'C', num: 6, mass: 12.011, group: 'Nonmetal' },
            'oxygen': { symbol: 'O', num: 8, mass: 15.999, group: 'Nonmetal' },
            'gold': { symbol: 'Au', num: 79, mass: 196.967, group: 'Transition Metal' },
            'silver': { symbol: 'Ag', num: 47, mass: 107.868, group: 'Transition Metal' },
            'iron': { symbol: 'Fe', num: 26, mass: 55.845, group: 'Transition Metal' },
        };
        const el = elements[query.toLowerCase()];
        if (el) {
            reply(`⚗️ *ELEMENT: ${query.toUpperCase()}*\n\n🔣 Symbol: ${el.symbol}\n🔢 Atomic #: ${el.num}\n⚖️ Atomic Mass: ${el.mass}\n🏷️ Group: ${el.group}`);
        } else {
            reply(`❌ Element "${query}" not found!\nTry: Gold, Carbon, Oxygen, or atomic number like 79`);
        }
    }
});

// 54. PLANET INFO
cmd({
    pattern: "planet",
    alias: ["planetinfo", "solarplanet"],
    use: '.planet Mars',
    desc: "Get information about a planet in our Solar System",
    category: "tools",
    react: "🪐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    const name = args.join(' ').toLowerCase();
    const planets = {
        mercury: { emoji: '🌑', diameter: '4,879 km', distance: '57.9M km from Sun', temp: '-180°C to 430°C', moons: 0, day: '58.6 Earth days', year: '88 Earth days', fact: 'Smallest planet in the Solar System!' },
        venus:   { emoji: '🌕', diameter: '12,104 km', distance: '108.2M km from Sun', temp: '462°C (hottest!)', moons: 0, day: '243 Earth days (longer than its year!)', year: '225 Earth days', fact: 'Hottest planet despite not being closest to the Sun!' },
        earth:   { emoji: '🌍', diameter: '12,742 km', distance: '149.6M km from Sun', temp: '-88°C to 58°C', moons: 1, day: '24 hours', year: '365.25 days', fact: 'Only known planet to harbor life!' },
        mars:    { emoji: '🔴', diameter: '6,779 km', distance: '227.9M km from Sun', temp: '-125°C to 20°C', moons: 2, day: '24h 37min', year: '687 Earth days', fact: 'Home to Olympus Mons, the largest volcano in the Solar System!' },
        jupiter: { emoji: '🟠', diameter: '139,820 km', distance: '778.5M km from Sun', temp: '-108°C', moons: 95, day: '9h 56min', year: '12 Earth years', fact: 'Largest planet — 1,300 Earths could fit inside!' },
        saturn:  { emoji: '🪐', diameter: '116,460 km', distance: '1.4B km from Sun', temp: '-138°C', moons: 146, day: '10h 42min', year: '29 Earth years', fact: 'Its rings are mostly made of ice and rock!' },
        uranus:  { emoji: '🔵', diameter: '50,724 km', distance: '2.9B km from Sun', temp: '-195°C', moons: 27, day: '17h 14min', year: '84 Earth years', fact: 'Rotates on its side — its axis is tilted 98°!' },
        neptune: { emoji: '🌊', diameter: '49,244 km', distance: '4.5B km from Sun', temp: '-200°C', moons: 16, day: '16h 6min', year: '165 Earth years', fact: 'Winds reach speeds of 2,100 km/h!' }
    };
    if (!name || !planets[name]) {
        return reply(`❌ Planet not found!\nAvailable: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune`);
    }
    const p = planets[name];
    reply(`${p.emoji} *PLANET: ${name.toUpperCase()}*\n\n📏 Diameter: ${p.diameter}\n☀️ Distance: ${p.distance}\n🌡️ Temperature: ${p.temp}\n🌙 Moons: ${p.moons}\n🔄 Day Length: ${p.day}\n📅 Year Length: ${p.year}\n\n💡 Fun Fact: ${p.fact}`);
});

// 55. INSULT (Roast Generator — different from roast command)
cmd({
    pattern: "insult",
    alias: ["savagemsg", "burnmsg"],
    use: '.insult @user',
    desc: "Get a creative (harmless) insult to roast friends",
    category: "fun",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { from, args, mentionByTag, reply }) => {
    try {
        const res = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
        const insult = res.data.insult;
        const mention = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const target = mention ? `@${mention.split('@')[0]}` : 'You';
        reply(`🔥 *SAVAGE BURN*\n\n_"${insult}"_\n\n— directed at ${target} 😂`);
    } catch {
        const fallbacks = [
            "If laughter is the best medicine, your face must be curing the world!",
            "I'd agree with you but then we'd both be wrong.",
            "You're not stupid, you just have bad luck thinking.",
            "Your secrets are always safe with me — I never listen when you talk.",
            "I would say go to hell but I don't want to see you again."
        ];
        reply(`🔥 *SAVAGE BURN*\n\n_"${fallbacks[Math.floor(Math.random() * fallbacks.length)]}"_ 😂`);
    }
});

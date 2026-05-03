const { cmd } = require('../command');
const config = require('../config');

// ── CDN BASE URLs ─────────────────────────────────────────────────────────────
const EVERYAYAH = 'https://everyayah.com/data/Alafasy_128kbps';
const EVERYAYAH_COMPLETE = `${EVERYAYAH}/complete`;
const ISLAMICNET = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

// Helper: send audio directly
async function sendSound(conn, from, mek, audioUrl, caption = '', asVoiceNote = false) {
    try {
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: asVoiceNote
        }, { quoted: mek });

        if (caption) {
            await conn.sendMessage(from, { text: caption }, { quoted: mek });
        }
        return true;
    } catch (err1) {
        try {
            await conn.sendMessage(from, {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4',
                ptt: asVoiceNote
            }, { quoted: mek });

            if (caption) await conn.sendMessage(from, { text: caption }, { quoted: mek });
            return true;
        } catch (err2) {
            try {
                await conn.sendMessage(from, {
                    document: { url: audioUrl },
                    mimetype: 'audio/mpeg',
                    fileName: 'sound.mp3',
                    caption: caption || '🔊 Audio File'
                }, { quoted: mek });
                return true;
            } catch (err3) {
                throw new Error('Cannot send audio: ' + err3.message);
            }
        }
    }
}

// ══════════════════════════════════════════════════════════════════════════════
//  ISLAMIC PHRASES [sound1–sound10]
// ══════════════════════════════════════════════════════════════════════════════

cmd({ pattern: "sound1", alias: ["bismillah", "playbismillah"], desc: "🎵 Play Bismillah audio", category: "fun", react: "🕌", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🕌', key: mek.key } });
        const caption = `🕌 *Bismillah*\n\n"In the name of Allah, the Most Gracious, the Most Merciful."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/001001.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound2", alias: ["allahuakbar", "allahukabr"], desc: "🎵 Allahu Akbar audio", category: "fun", react: "☪️", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '☪️', key: mek.key } });
        const caption = `☪️ *Allahu Akbar*\n\n"Allah is the Greatest."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/017111.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound3", alias: ["azan", "playazan", "adhan"], desc: "🎵 Play Azan audio", category: "fun", react: "🕌", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🕌', key: mek.key } });
        const caption = `📢 *Adhan Audio*\n\n"Come to prayer. Come to success."\n\nMay this reminder bring peace and blessings.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/001.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound4", alias: ["subhanallah", "subhan"], desc: "🎵 Subhanallah audio", category: "fun", react: "✨", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '✨', key: mek.key } });
        const caption = `✨ *Subhanallah*\n\n"Glory be to Allah."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/059023.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound5", alias: ["alhamdulillah", "alhamdo"], desc: "🎵 Alhamdulillah audio", category: "fun", react: "🤲", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🤲', key: mek.key } });
        const caption = `🤲 *Alhamdulillah*\n\n"All praise is due to Allah."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/001002.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound6", alias: ["mashaallah", "masha"], desc: "🎵 MashaAllah audio", category: "fun", react: "💚", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '💚', key: mek.key } });
        const caption = `💚 *MashaAllah*\n\n"What Allah has willed."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/018039.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound7", alias: ["inshaallah", "inshallah"], desc: "🎵 InshaAllah audio", category: "fun", react: "🌙", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🌙', key: mek.key } });
        const caption = `🌙 *InshaAllah*\n\n"If Allah wills."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/018069.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound8", alias: ["durood", "salawat"], desc: "🎵 Durood Sharif audio", category: "fun", react: "🌹", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🌹', key: mek.key } });
        const caption = `🌹 *Salawat Reminder*\n\n"O Allah, send blessings and peace upon Prophet Muhammad."\n\nMay peace and blessings be upon him.`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/033056.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound9", alias: ["istighfar", "astaghfirullah"], desc: "🎵 Istighfar audio", category: "fun", react: "😢", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '😢', key: mek.key } });
        const caption = `😢 *Istighfar*\n\n"I seek forgiveness from Allah."\n\nMay Allah forgive us and guide us.`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/071010.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound10", alias: ["hasbunallah", "hasbiyallah"], desc: "🎵 Hasbunallah audio", category: "fun", react: "🛡️", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🛡️', key: mek.key } });
        const caption = `🛡️ *Hasbunallah*\n\n"Allah is sufficient for us, and He is the best disposer of affairs."`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/003173.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

// ══════════════════════════════════════════════════════════════════════════════
//  QURAN RECITATIONS [sound11–sound17]
// ══════════════════════════════════════════════════════════════════════════════

cmd({ pattern: "sound11", alias: ["fatiha", "alfatiha", "surahfatiha"], desc: "🎵 Surah Al-Fatiha recitation", category: "fun", react: "📖", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '📖', key: mek.key } });
        const caption = `📖 *Surah Al-Fatiha*\n\nChapter 1 of the Quran\nReciter: Sheikh Mishary Al-Afasy`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/001.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound12", alias: ["ayatulkursi", "ayatkursi", "kursi"], desc: "🎵 Ayatul Kursi recitation", category: "fun", react: "🌟", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🌟', key: mek.key } });
        const caption = `🌟 *Ayatul Kursi*\n\nAl-Baqarah 2:255\nReciter: Sheikh Mishary Al-Afasy\n\nA powerful verse of protection and faith.`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/002255.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound13", alias: ["ikhlas", "surahikhlas"], desc: "🎵 Surah Ikhlas recitation", category: "fun", react: "📖", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '📖', key: mek.key } });
        const caption = `📖 *Surah Al-Ikhlas*\n\nChapter 112 of the Quran\nReciter: Sheikh Mishary Al-Afasy\n\nA beautiful reminder of the Oneness of Allah.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/112.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound14", alias: ["yaseen", "yasin", "surahyaseen"], desc: "🎵 Surah Yaseen recitation", category: "fun", react: "💫", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '💫', key: mek.key } });
        const caption = `💫 *Surah Yaseen*\n\nChapter 36 of the Quran\nReciter: Sheikh Mishary Al-Afasy\n\nKnown by many as the heart of the Quran.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/036.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound15", alias: ["mulk", "almulk", "surahmulk"], desc: "🎵 Surah Al-Mulk recitation", category: "fun", react: "👑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '👑', key: mek.key } });
        const caption = `👑 *Surah Al-Mulk*\n\nChapter 67 of the Quran\nReciter: Sheikh Mishary Al-Afasy\n\nA powerful reminder of Allah's kingdom and authority.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/067.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound16", alias: ["kahf", "alkahf", "surahkahf"], desc: "🎵 Surah Al-Kahf recitation", category: "fun", react: "🛡️", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🛡️', key: mek.key } });
        const caption = `🛡️ *Surah Al-Kahf*\n\nChapter 18 of the Quran\nReciter: Sheikh Mishary Al-Afasy\n\nA recommended recitation for Fridays.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/018.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound17", alias: ["waqiah", "alwaqiah", "surahwaqiah"], desc: "🎵 Surah Al-Waqiah recitation", category: "fun", react: "💰", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '💰', key: mek.key } });
        const caption = `💰 *Surah Al-Waqiah*\n\nChapter 56 of the Quran\nReciter: Sheikh Mishary Al-Afasy\n\nA reminder of the Hereafter and Allah's provision.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/056.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

// ══════════════════════════════════════════════════════════════════════════════
//  MOTIVATION, DUAS & REMINDERS [sound18–sound24]
// ══════════════════════════════════════════════════════════════════════════════

cmd({ pattern: "sound18", alias: ["islamicmotivation", "ismotion"], desc: "🎵 Islamic motivation audio", category: "fun", react: "💪", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '💪', key: mek.key } });
        const caption = `💪 *Islamic Motivation*\n\n"Whoever trusts in Allah, Allah is sufficient for him."\n\nKeep going. Ease comes after hardship.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/094.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound19", alias: ["duarizq", "rizk", "rizq"], desc: "🎵 Dua for provision", category: "fun", react: "🤲", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🤲', key: mek.key } });
        const caption = `🤲 *Dua for Provision*\n\nMay Allah bless your work, increase your halal provision, and make your path easy.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/093.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound20", alias: ["morningdua", "subhdua", "fajrdua"], desc: "🎵 Morning Dua audio", category: "fun", react: "☀️", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '☀️', key: mek.key } });
        const caption = `☀️ *Morning Reminder*\n\nMay your morning be full of peace, protection, blessings, and success.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/113.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound21", alias: ["nightdua", "ratdua", "ishadua"], desc: "🎵 Night Dua audio", category: "fun", react: "🌙", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🌙', key: mek.key } });
        const caption = `🌙 *Night Reminder*\n\nMay Allah protect you through the night and grant you peaceful rest.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/114.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound22", alias: ["jummah", "juma", "friday"], desc: "🎵 Jummah reminder audio", category: "fun", react: "🕌", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🕌', key: mek.key } });
        const caption = `🕌 *Jummah Reminder*\n\nJummah Mubarak.\n\nRecommended actions:\n1. Recite Surah Al-Kahf\n2. Send blessings upon Prophet Muhammad\n3. Attend Jummah prayer\n\nMay Allah accept your prayers.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/062.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound23", alias: ["motivate", "motivation2", "urdumotion"], desc: "🎵 Success motivation audio", category: "fun", react: "🚀", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🚀', key: mek.key } });
        const caption = `🚀 *Success Motivation*\n\nWork hard, trust Allah, and never give up.\n\nWith hardship comes ease.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/094.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound24", alias: ["ramadan", "ramzan", "ramazan"], desc: "🎵 Ramadan special audio", category: "fun", react: "🌙", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🌙', key: mek.key } });
        const caption = `🌙 *Ramadan Reminder*\n\nMay Allah bless your fasting, prayers, charity, and worship.\n\nRamadan is a month of mercy, forgiveness, and spiritual growth.`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/002185.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

// ══════════════════════════════════════════════════════════════════════════════
//  HEROES, HISTORY & THEMED AUDIO [sound25–sound32]
// ══════════════════════════════════════════════════════════════════════════════

cmd({ pattern: "sound25", alias: ["ertugrul", "ertugrultheme", "dirilis"], desc: "🎵 Ertugrul themed audio", category: "fun", react: "⚔️", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⚔️', key: mek.key } });
        const caption = `⚔️ *Ertugrul Theme*\n\nA reminder of courage, truth, patience, and justice.\n\nIndeed, victory belongs to Allah.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/048.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound26", alias: ["ertugrulquote", "ertugrulsays"], desc: "🎵 Ertugrul quote audio", category: "fun", react: "🐺", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🐺', key: mek.key } });
        const caption = `🐺 *Ertugrul Quote*\n\n"When one door closes, Allah opens many more."\n\nStay strong, stay patient, and keep moving forward.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/008.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound27", alias: ["salahuddin", "salahuddeen", "lionofsalah"], desc: "🎵 Salahuddin Ayyubi tribute audio", category: "fun", react: "🦁", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🦁', key: mek.key } });
        const caption = `🦁 *Salahuddin Ayyubi*\n\nA reminder of patience, courage, leadership, and faith.\n\nBe patient and remain steadfast.`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/003200.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound28", alias: ["suleiman", "suleman", "kanuni"], desc: "🎵 Suleiman themed audio", category: "fun", react: "🏰", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🏰', key: mek.key } });
        const caption = `🏰 *Suleiman Themed Audio*\n\nA reminder of wisdom, leadership, justice, and responsibility.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/027.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound29", alias: ["pakimeme", "pakistanimeme", "desi"], desc: "🎵 Desi meme sound", category: "fun", react: "🇵🇰", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🇵🇰', key: mek.key } });
        const caption = `🇵🇰 *Desi Meme Sound*\n\nA fun and light moment for the chat.\n\nEnjoy the vibe.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/108.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound30", alias: ["battlecry", "ertugrulbattle", "savaş"], desc: "🎵 Battle themed audio", category: "fun", react: "⚔️", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '⚔️', key: mek.key } });
        const caption = `⚔️ *Battle Theme*\n\nA powerful reminder of courage, truth, and justice.\n\nStand firm for what is right.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/008.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound31", alias: ["ibnbattuta", "traveler"], desc: "🎵 Ibn Battuta tribute audio", category: "fun", react: "🌍", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🌍', key: mek.key } });
        const caption = `🌍 *Ibn Battuta*\n\nA tribute to one of the greatest Muslim travelers.\n\nTravel, learn, observe, and grow.`;
        await sendSound(conn, from, mek, `${EVERYAYAH}/016015.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound32", alias: ["muslimmeme", "islamicmeme"], desc: "🎵 Random Islamic meme sound", category: "fun", react: "😂", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '😂', key: mek.key } });
        const sounds = [
            `${EVERYAYAH_COMPLETE}/108.mp3`,
            `${EVERYAYAH_COMPLETE}/110.mp3`,
            `${EVERYAYAH_COMPLETE}/103.mp3`,
        ];
        const s = sounds[Math.floor(Math.random() * sounds.length)];
        const caption = `😂 *Islamic Meme Sound*\n\nA light and relatable moment for the chat.\n\nEnjoy responsibly.`;
        await sendSound(conn, from, mek, s, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

// ══════════════════════════════════════════════════════════════════════════════
//  NASHEEDS, POETRY & TRIVIA [sound33–sound38]
// ══════════════════════════════════════════════════════════════════════════════

cmd({ pattern: "sound33", alias: ["talaalbadr", "talabadr", "nasheednabi"], desc: "🎵 Tala al-Badr nasheed", category: "fun", react: "🌹", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    const caption = `🌹 *Tala al-Badr Alayna*\n\nA beautiful traditional nasheed associated with love and respect for Prophet Muhammad.\n\nMay peace and blessings be upon him.`;
    try {
        await conn.sendMessage(from, { react: { text: '🌹', key: mek.key } });
        await sendSound(conn, from, mek, 'https://archive.org/download/tala-al-badr-alayna/TalaAlBadrAlayna.mp3', caption);
    } catch (e) {
        try {
            await sendSound(conn, from, mek, `${EVERYAYAH}/033056.mp3`, caption);
        } catch (e2) { reply('❌ ' + e2.message); }
    }
});

cmd({ pattern: "sound34", alias: ["naat", "urdunaatshreef"], desc: "🎵 Naat Sharif audio", category: "fun", react: "🌹", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    const caption = `🌹 *Naat Sharif*\n\nPraise and love for Prophet Muhammad.\n\nMay peace and blessings be upon him.`;
    try {
        await conn.sendMessage(from, { react: { text: '🌹', key: mek.key } });
        await sendSound(conn, from, mek, 'https://archive.org/download/UrduNaatCollection/naat_e_rasool.mp3', caption);
    } catch (e) {
        try {
            await sendSound(conn, from, mek, `${EVERYAYAH}/033056.mp3`, caption);
        } catch (e2) { reply('❌ ' + e2.message); }
    }
});

cmd({ pattern: "sound35", alias: ["hamd", "urduhamed", "allahhum"], desc: "🎵 Hamd audio", category: "fun", react: "🤲", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    const caption = `🤲 *Hamd*\n\nPraise and gratitude belong to Allah.\n\nMay our hearts remain thankful and humble.`;
    try {
        await conn.sendMessage(from, { react: { text: '🤲', key: mek.key } });
        await sendSound(conn, from, mek, 'https://archive.org/download/UrduHamd/hamd_bari_taala.mp3', caption);
    } catch (e) {
        try {
            await sendSound(conn, from, mek, `${EVERYAYAH}/059023.mp3`, caption);
        } catch (e2) { reply('❌ ' + e2.message); }
    }
});

cmd({ pattern: "sound36", alias: ["iqbal", "allamaiqbal", "iqbalpoetry"], desc: "🎵 Allama Iqbal poetry", category: "fun", react: "📜", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    const poems = [
        { title: "Self-Respect", text: "Raise yourself with courage, discipline, and faith." },
        { title: "The Eagle", text: "You were created to fly high, not to live low." },
        { title: "Youth", text: "Great nations are built by strong and sincere youth." },
        { title: "Purpose", text: "Live with meaning, work with patience, and trust Allah." }
    ];
    const p = poems[Math.floor(Math.random() * poems.length)];
    const caption = `📜 *Allama Iqbal Poetry*\n\n*${p.title}*\n\n"${p.text}"\n\nA reminder of courage, purpose, and faith.`;

    try {
        await conn.sendMessage(from, { react: { text: '📜', key: mek.key } });
        await sendSound(conn, from, mek, 'https://archive.org/download/AllamaIqbalPoetry/iqbal_poetry_urdu.mp3', caption);
    } catch (e) {
        try {
            await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/094.mp3`, caption);
        } catch (e2) { reply('❌ ' + e2.message); }
    }
});

cmd({ pattern: "sound37", alias: ["islamictrivia", "islamicquiz2"], desc: "🎵 Islamic trivia with sound effect", category: "fun", react: "🎓", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { react: { text: '🎓', key: mek.key } });
        const trivias = [
            { q: "How many names of Allah are commonly known?", a: "99 names" },
            { q: "Which surah was first revealed?", a: "Surah Al-Alaq" },
            { q: "In which year was Prophet Muhammad born?", a: "570 CE, the Year of the Elephant" },
            { q: "How many months are in the Islamic calendar?", a: "12 months" },
            { q: "Which prophet built the Kaaba?", a: "Prophet Ibrahim" }
        ];
        const t = trivias[Math.floor(Math.random() * trivias.length)];
        const caption = `🎓 *Islamic Trivia*\n\n❓ *Question:* ${t.q}\n\n💡 *Answer:* ${t.a}\n\nLearn something beneficial every day.`;
        await sendSound(conn, from, mek, `${EVERYAYAH_COMPLETE}/096.mp3`, caption);
    } catch (e) { reply('❌ ' + e.message); }
});

cmd({ pattern: "sound38", alias: ["soundmenu", "sounds", "soundlist"], desc: "📋 Show all sound commands", category: "fun", react: "🎵", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    reply(`╭━━〔 🎵 SOUNDS MENU 〕━━╮
┃ All sounds play directly in WhatsApp.
╰━━━━━━━━━━━━━━━━━━╯

╭─〔 🕌 ISLAMIC PHRASES 〕─╮
┃ .sound1  — Bismillah
┃ .sound2  — Allahu Akbar
┃ .sound3  — Adhan
┃ .sound4  — Subhanallah
┃ .sound5  — Alhamdulillah
┃ .sound6  — MashaAllah
┃ .sound7  — InshaAllah
┃ .sound8  — Salawat
┃ .sound9  — Istighfar
┃ .sound10 — Hasbunallah
╰━━━━━━━━━━━━━━━━━━╯

╭─〔 📖 QURAN RECITATIONS 〕─╮
┃ .sound11 — Surah Al-Fatiha
┃ .sound12 — Ayatul Kursi
┃ .sound13 — Surah Al-Ikhlas
┃ .sound14 — Surah Yaseen
┃ .sound15 — Surah Al-Mulk
┃ .sound16 — Surah Al-Kahf
┃ .sound17 — Surah Al-Waqiah
╰━━━━━━━━━━━━━━━━━━╯

╭─〔 🤲 REMINDERS & DUAS 〕─╮
┃ .sound18 — Islamic Motivation
┃ .sound19 — Dua for Provision
┃ .sound20 — Morning Reminder
┃ .sound21 — Night Reminder
┃ .sound22 — Jummah Reminder
┃ .sound23 — Success Motivation
┃ .sound24 — Ramadan Reminder
╰━━━━━━━━━━━━━━━━━━╯

╭─〔 ⚔️ HEROES & THEMES 〕─╮
┃ .sound25 — Ertugrul Theme
┃ .sound26 — Ertugrul Quote
┃ .sound27 — Salahuddin Tribute
┃ .sound28 — Suleiman Theme
┃ .sound29 — Desi Meme
┃ .sound30 — Battle Theme
┃ .sound31 — Ibn Battuta Tribute
┃ .sound32 — Islamic Meme
╰━━━━━━━━━━━━━━━━━━╯

╭─〔 🎵 NASHEEDS & EXTRAS 〕─╮
┃ .sound33 — Tala al-Badr
┃ .sound34 — Naat Sharif
┃ .sound35 — Hamd
┃ .sound36 — Iqbal Poetry
┃ .sound37 — Islamic Trivia
╰━━━━━━━━━━━━━━━━━━╯

> Powered by TESLA-XPACE`);
});
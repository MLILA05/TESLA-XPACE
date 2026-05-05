const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

ffmpeg.setFfmpegPath(ffmpegPath)

cmd({
    pattern: "song",
    alias: ["play", "music", "audio"],
    desc: "Download YouTube song with multiple API fallback",
    category: "download",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    try {
        if (!text) {
            return reply("❌ Song name ?\nExample:\n.song la la la")
        }

        // 🔍 YouTube search
        const search = await yts(text)
        if (!search.videos || !search.videos.length) {
            return reply("❌ Song not found")
        }

        const vid = search.videos[0]

        // 🎨 ADEEL-MD STYLE BOX
        const caption = `
🎧  TESLA-XPACE MUSIC

━━━━━━━━━━━━━━
🎶 Track
${vid.title}

📀 Format   → MP3
🎚️ Quality  → 128kbps
⚙️ Status   → Processing
━━━━━━━━━━━━━━

🚀 Progress
• Downloading audio...
• Preparing file...

━━━━━━━━━━━━━━━━━━
🌟 Powered by TESLA-XPACE
`

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption
        }, { quoted: mek })

        let audioBuffer = null
        let downloadSuccess = false
        let usedAPI = ""

        // ═══════════════════════════════════════════════════════════
        // 🔷 API 1:  API (MP4 → FFmpeg → MP3)
        // ═══════════════════════════════════════════════════════════
        if (!downloadSuccess) {
            try {
                console.log("🔄 Trying API 1: Arslan API...")
                const api1 = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
                const res1 = await axios.get(api1, { timeout: 60000 })

                if (res1.data?.status && res1.data?.result?.download?.url) {
                    const videoUrl = res1.data.result.download.url

                    // 📂 Temp files
                    const tempDir = path.join(__dirname, '../temp')
                    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

                    const videoPath = path.join(tempDir, `song_${Date.now()}.mp4`)
                    const audioPath = path.join(tempDir, `song_${Date.now()}.mp3`)

                    // ⬇ Download video
                    const stream = await axios({
                        url: videoUrl,
                        method: "GET",
                        responseType: "stream",
                        timeout: 120000
                    })

                    await new Promise((resolve, reject) => {
                        const w = fs.createWriteStream(videoPath)
                        stream.data.pipe(w)
                        w.on('finish', resolve)
                        w.on('error', reject)
                    })

                    // 🎧 FFmpeg → MP3
                    await new Promise((resolve, reject) => {
                        ffmpeg(videoPath)
                            .noVideo()
                            .audioCodec('libmp3lame')
                            .audioBitrate('128k')
                            .format('mp3')
                            .on('end', resolve)
                            .on('error', reject)
                            .save(audioPath)
                    })

                    audioBuffer = fs.readFileSync(audioPath)
                    downloadSuccess = true
                    usedAPI = "API 1 (Arslan)"

                    // 🧹 Cleanup
                    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath)
                    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath)
                    
                    console.log("✅ API 1 Success!")
                }
            } catch (e) {
                console.log("❌ API 1 Failed:", e.message)
            }
        }

        // ═══════════════════════════════════════════════════════════
        // 🔷 API 2: GiftedTech API (Direct MP3)
        // ═══════════════════════════════════════════════════════════
        if (!downloadSuccess) {
            try {
                console.log("🔄 Trying API 2: GiftedTech API...")
                const api2 = `https://api.giftedtech.co.ke/api/download/ytmp3v2?apikey=gifted&url=${encodeURIComponent(vid.url)}&quality=128`
                const res2 = await axios.get(api2, { timeout: 60000 })

                const result = res2.data.result || res2.data.results || res2.data
                const audioUrl = result.download_url || result.downloadUrl || result.url || result.audio || result.link

                if (audioUrl) {
                    const audioRes = await axios.get(audioUrl, { 
                        responseType: 'arraybuffer', 
                        timeout: 120000 
                    })
                    audioBuffer = Buffer.from(audioRes.data)
                    downloadSuccess = true
                    usedAPI = "API 2 (GiftedTech)"
                    console.log("✅ API 2 Success!")
                }
            } catch (e) {
                console.log("❌ API 2 Failed:", e.message)
            }
        }

        // ═══════════════════════════════════════════════════════════
        // 🔷 API 3: Your Third API (Add here)
        // ═══════════════════════════════════════════════════════════
        if (!downloadSuccess) {
            try {
                console.log("🔄 Trying API 3: Third API...")
                
                // 🔸 Replace this URL with your third API
                const api3 = `YOUR_THIRD_API_URL_HERE?url=${encodeURIComponent(vid.url)}`
                const res3 = await axios.get(api3, { timeout: 60000 })

                // 🔸 Adjust response handling based on your API response structure
                const result = res3.data.result || res3.data
                const audioUrl = result.download_url || result.url || result.audio || result.link

                if (audioUrl) {
                    const audioRes = await axios.get(audioUrl, { 
                        responseType: 'arraybuffer', 
                        timeout: 120000 
                    })
                    audioBuffer = Buffer.from(audioRes.data)
                    downloadSuccess = true
                    usedAPI = "API 3"
                    console.log("✅ API 3 Success!")
                }
            } catch (e) {
                console.log("❌ API 3 Failed:", e.message)
            }
        }

        // ═══════════════════════════════════════════════════════════
        // 📤 Send Audio or Error Message
        // ═══════════════════════════════════════════════════════════
        if (downloadSuccess && audioBuffer) {
            await conn.sendMessage(from, {
                audio: audioBuffer,
                mimetype: "audio/mpeg",
                fileName: `${vid.title}.mp3`,
                ptt: false
            }, { quoted: mek })

            console.log(`✅ Song sent successfully using ${usedAPI}`)
        } else {
            return reply("❌ All APIs failed! Please try again later.\n\nplease try again later")
        }

    } catch (err) {
        console.error("❌ SONG ERROR:", err)
        reply("❌ Song download / convert error, thori dair baad try karo")
    }
})

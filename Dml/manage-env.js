const { cmd } = require('../command');
const config = require('../config');
const { exec } = require('child_process');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { setConfig, getConfig } = require("../lib/configdb");

// ================= UI STYLE =================
const UI = {
  success: (msg) => `╭━〔 ✅ SUCCESS 〕━┈⊷
┃ ${msg}
╰━━━━━━━━━━━━━━⊷`,

  error: (msg) => `╭━〔 ❌ ERROR 〕━┈⊷
┃ ${msg}
╰━━━━━━━━━━━━━━⊷`,

  info: (msg) => `╭━〔 ⚙️ INFO 〕━┈⊷
┃ ${msg}
╰━━━━━━━━━━━━━━⊷`,

  owner: `╭━〔 👑 OWNER ONLY 〕━┈⊷
┃ You are not allowed to use this command
╰━━━━━━━━━━━━⊷`
};

// ================= HELPER =================
const toggle = (feature, status) => {
  if (status === "on") {
    config[feature] = "true";
    return UI.success(`${feature} ENABLED`);
  } else if (status === "off") {
    config[feature] = "false";
    return UI.error(`${feature} DISABLED`);
  } else {
    return UI.info("Use ON or OFF");
  }
};

// ================= SET BOT IMAGE =================
cmd({
  pattern: "setbotimage",
  category: "owner",
  react: "✅",
  filename: __filename
}, async (conn, mek, m, { args, isCreator, reply }) => {
  try {
    if (!isCreator) return reply(UI.owner);

    let imageUrl = args[0];

    if (!imageUrl && m.quoted) {
      const mime = (m.quoted.msg || m.quoted).mimetype || '';
      if (!mime.startsWith("image")) return reply(UI.error("Reply to an image"));

      const buffer = await m.quoted.download();
      const file = path.join(os.tmpdir(), `img_${Date.now()}.jpg`);
      fs.writeFileSync(file, buffer);

      const form = new FormData();
      form.append("fileToUpload", fs.createReadStream(file));
      form.append("reqtype", "fileupload");

      const res = await axios.post("https://catbox.moe/user/api.php", form, {
        headers: form.getHeaders()
      });

      fs.unlinkSync(file);

      if (!res.data.startsWith("https://")) throw "Upload failed";
      imageUrl = res.data;
    }

    if (!imageUrl) return reply(UI.error("Provide image URL or reply image"));

    await setConfig("MENU_IMAGE_URL", imageUrl);

    reply(UI.success(`Bot Image Updated!\n\n${imageUrl}\n\nRestarting...`));
    setTimeout(() => exec("pm2 restart all"), 2000);

  } catch (e) {
    reply(UI.error(e.toString()));
  }
});

// ================= PREFIX =================
cmd({
  pattern: "setprefix",
  category: "owner",
}, async (conn, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply(UI.owner);

  const p = args[0];
  if (!p) return reply(UI.error("Provide prefix"));

  await setConfig("PREFIX", p);
  reply(UI.success(`Prefix set to: ${p}\nRestarting...`));

  setTimeout(() => exec("pm2 restart all"), 2000);
});

// ================= BOT NAME =================
cmd({
  pattern: "setbotname",
  category: "owner",
}, async (conn, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply(UI.owner);

  const name = args.join(" ");
  if (!name) return reply(UI.error("Provide name"));

  await setConfig("BOT_NAME", name);
  reply(UI.success(`Bot name updated: ${name}\nRestarting...`));

  setTimeout(() => exec("pm2 restart all"), 2000);
});

// ================= OWNER NAME =================
cmd({
  pattern: "setownername",
  category: "owner",
}, async (conn, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply(UI.owner);

  const name = args.join(" ");
  if (!name) return reply(UI.error("Provide owner name"));

  await setConfig("OWNER_NAME", name);
  reply(UI.success(`Owner name updated: ${name}\nRestarting...`));

  setTimeout(() => exec("pm2 restart all"), 2000);
});

// ================= MODE =================
cmd({
  pattern: "mode",
  category: "settings",
}, async (conn, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply(UI.owner);

  const mode = args[0];
  if (!["private", "public"].includes(mode)) {
    return reply(UI.info("Use: .mode private / public"));
  }

  setConfig("MODE", mode);
  reply(UI.success(`Mode set to ${mode}\nRestarting...`));

  exec("pm2 restart all");
});

// ================= TOGGLES =================
cmd({ pattern: "welcome" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("WELCOME", args[0]));
});

cmd({ pattern: "goodbye" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("GOODBYE", args[0]));
});

cmd({ pattern: "autoreply" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_REPLY", args[0]));
});

cmd({ pattern: "autoreact" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_REACT", args[0]));
});

cmd({ pattern: "autotyping" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_TYPING", args[0]));
});

cmd({ pattern: "autosticker" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_STICKER", args[0]));
});

cmd({ pattern: "antibad" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("ANTI_BAD_WORD", args[0]));
});

cmd({ pattern: "autoread" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("READ_MESSAGE", args[0]));
});

cmd({ pattern: "alwaysonline" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("ALWAYS_ONLINE", args[0]));
});

cmd({ pattern: "autorecoding" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_RECORDING", args[0]));
});

cmd({ pattern: "autostatusview" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_STATUS_SEEN", args[0]));
});

cmd({ pattern: "autostatusreact" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_STATUS_REACT", args[0]));
});

cmd({ pattern: "autostatusreply" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("AUTO_STATUS_REPLY", args[0]));
});

cmd({ pattern: "mention-reply" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("MENTION_REPLY", args[0]));
});

cmd({ pattern: "admin-events" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("ADMIN_ACTION", args[0]));
});

cmd({ pattern: "ownerreact" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("OWNER_REACT", args[0]));
});

cmd({ pattern: "customreact" }, async (c,m,x,{args,isCreator,reply})=>{
  if(!isCreator) return reply(UI.owner);
  reply(toggle("CUSTOM_REACT", args[0]));
});

// ================= GROUP =================
cmd({
  pattern: "antilink",
  category: "group"
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  if (!isGroup) return reply(UI.error("Group only"));
  if (!isBotAdmins) return reply(UI.error("Bot must be admin"));
  if (!isAdmins) return reply(UI.error("Admin only"));

  reply(toggle("ANTI_LINK", args[0]));
});

cmd({
  pattern: "antibot",
  category: "group"
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  if (!isGroup) return reply(UI.error("Group only"));
  if (!isBotAdmins) return reply(UI.error("Bot must be admin"));
  if (!isAdmins) return reply(UI.error("Admin only"));

  reply(toggle("ANTI_BOT", args[0]));
});

cmd({
  pattern: "deletelink",
  category: "group"
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  if (!isGroup) return reply(UI.error("Group only"));
  if (!isBotAdmins) return reply(UI.error("Bot must be admin"));
  if (!isAdmins) return reply(UI.error("Admin only"));

  reply(toggle("DELETE_LINKS", args[0]));
});

// ================= CUSTOM EMOJIS =================
cmd({
  pattern: "setreacts",
  category: "owner"
}, async (conn, mek, m, { args, isCreator, reply }) => {
  if (!isCreator) return reply(UI.owner);

  const emojis = args.join(" ");
  if (!emojis) return reply(UI.error("Provide emojis"));

  await setConfig("CUSTOM_REACT_EMOJIS", emojis);
  reply(UI.success(`Custom emojis updated:\n${emojis}\nRestarting...`));

  setTimeout(() => exec("pm2 restart all"), 2000);
});

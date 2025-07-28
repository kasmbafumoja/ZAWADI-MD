const { getConfig } = require("./lib/configdb");
const fs = require('fs');
const path = require('path');

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
    CHATBOT: getConfig("CHATBOT") || "on",
    // chatbot on/off
  
    SESSION_ID: process.env.SESSION_ID || "TERMUX~MD~YOUR_SESSION_KEY",  
    // Mets ici ton vrai SESSION_ID (généré via https://meg-lodon-session-1.onrender.com/pair)
    
    PREFIX: getConfig("PREFIX") || ".",  
    // Préfixe des commandes (ex: ., !, ?)

    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "TERMUX-MD",  
    // Nom affiché du bot

    MODE: process.env.MODE || "public",        
    // Mode du bot: public / private / group / inbox

    // ===== OWNER & DEVELOPER SETTINGS =====
    OWNER_NUMBER: process.env.OWNER_NUMBER || "243970639878",  
    // Ton numéro WhatsApp

    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "Kas Mbafumoja",           
    // Ton nom complet

    DEV: process.env.DEV || "243970639878",                     
    // Ton numéro pour les messages développeur

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*👀 Vu par TERMUX-MD 🇨🇩*",  
    READ_MESSAGE: process.env.READ_MESSAGE || "true",

    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
    STICKER_NAME: process.env.STICKER_NAME || "TERMUX-MD",

    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/c60vw0.jpg",

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_BOT: process.env.ANTI_BOT || "true",
    ANTI_DELETE: process.env.ANTI_DELETE || "true",
    ANTI_CALL: process.env.ANTI_CALL || "true",
    ANTI_BAD: process.env.ANTI_BAD || "false",
    ANTI_LINK_KICK: process.env.ANTILINK_KICK || "true",
    ANTIVIEW_ONCE: process.env.ANTIVIEW_ONCE || "true",
    ANTILINK_WARN: process.env.ANTILINK_WARN || "true",
    ANTILINK: process.env.ANTILINK || "true",
    ANTI_VV: process.env.ANTI_VV || "true",
    DELETE_LINKS: process.env.DELETE_LINKS || "true",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_BIO: process.env.AUTO_BIO || "true",
    WELCOME: process.env.WELCOME || "true",
    ADMIN_EVENTS: process.env.ADMIN_EVENTS || "true",
};

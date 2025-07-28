const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let qrCodeData = null;
let sessionId = null;

// Page d'accueil
app.get("/", (req, res) => {
  res.send(`
    <div style="text-align:center; font-family:Arial; background:#111; color:white; padding:20px;">
      <h1>🔰 Bienvenue sur TERMUX-MD 🔰</h1>
      <h3>Créé par <span style="color:#1BAFBA;">Kasereka Mbafumoja 🇨🇩</span></h3>
      <p>Cliquez ci-dessous pour générer votre code Pair et connecter WhatsApp.</p>
      <a href="/pair" style="background:#1BAFBA; color:white; padding:12px 25px; text-decoration:none; border-radius:5px;">
        🚀 Générer mon Code Pair
      </a>
    </div>
  `);
});

// Génération du QR
app.get("/pair", async (req, res) => {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("session_auth");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("connection.update", async (update) => {
      const { qr, connection } = update;

      if (qr) {
        qrCodeData = await qrcode.toDataURL(qr);
        res.send(`
          <div style="text-align:center; font-family:Arial; background:#111; color:white; padding:20px;">
            <h2>📱 Scannez ce QR Code avec WhatsApp</h2>
            <img src="${qrCodeData}" width="300" height="300" />
            <p>Après le scan, allez sur <a href="/session">/session</a> pour récupérer votre SESSION_ID ✅</p>
          </div>
        `);
      }

      if (connection === "open") {
        sessionId = fs.readFileSync("session_auth/creds.json").toString("base64");
        console.log("✅ SESSION_ID généré !");
      }
    });

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    res.send(`<div style="color:red; text-align:center;">❌ Erreur: ${err.message}</div>`);
  }
});

// Page pour récupérer la session
app.get("/session", (req, res) => {
  if (sessionId) {
    res.send(`
      <div style="text-align:center; font-family:Arial; background:#222; color:#0f0; padding:20px;">
        <h2>✅ Votre SESSION_ID TERMUX-MD</h2>
        <textarea style="width:90%; height:200px;" readonly>${sessionId}</textarea>
        <p>Copiez et collez ce SESSION_ID dans votre fichier <b>config.js</b></p>
        <button onclick="navigator.clipboard.writeText('${sessionId}')"
          style="margin-top:15px; background:#1BAFBA; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">
          📋 Copier le SESSION_ID
        </button>
      </div>
    `);
  } else {
    res.send(`<div style="text-align:center; color:red;">❌ Aucun SESSION_ID généré pour l'instant. Scannez d'abord le QR sur <a href="/pair">/pair</a></div>`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur TERMUX-MD lancé sur http://localhost:${PORT}`);
});

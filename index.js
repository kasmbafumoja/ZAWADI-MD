const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let qrCodeData = null;
let sessionId = null;

app.get("/", (req, res) => {
  res.send(`
    <div style="text-align:center; font-family:Arial; background:#111; color:white; padding:20px;">
      <h1>🔰 Bienvenue sur TERMUX-MD 🔰</h1>
      <h3>Créé par <span style="color:#1BAFBA;">Kasereka Mbafumoja 🇨🇩</span></h3>
      <a href="/pair" style="background:#FF6347; color:white; padding:12px 25px; text-decoration:none; border-radius:5px;">
        🚀 Générer mon Code Pair
      </a>
    </div>
  `);
});

app.get("/pair", async (req, res) => {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("session_auth");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("connection.update", async (update) => {
      const { qr, connection } = update;

      if (qr) {
        qrCodeData = await qrcode.toDataURL(qr);
        res.send(`<div style="text-align:center; font-family:Arial; background:#111; color:white; padding:20px;">
            <h2>📱 Scannez ce QR Code avec WhatsApp</h2>
            <img src="${qrCodeData}" width="300" height="300" />
          </div>`);
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

app.get("/session", (req, res) => {
  if (sessionId) {
    res.send(`<div style="text-align:center; background:#222; color:#0f0; padding:20px;">
        <h2>✅ Votre SESSION_ID TERMUX-MD</h2>
        <textarea style="width:90%; height:200px;" readonly>${sessionId}</textarea>
      </div>`);
  } else {
    res.send(`<div style="text-align:center; color:red;">
        ❌ Aucun SESSION_ID généré. Scannez d'abord le QR sur <a href="/pair">/pair</a>
      </div>`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur TERMUX-MD lancé sur http://localhost:${PORT}`);
});

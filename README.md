## 🔰 **TERMUX-MD** 🔰

<p align="center" style="font-family: monospace; font-weight: bold; font-size: 30px;">
  <span style="color: #FF6347;">T</span>
  <span style="color: #FF8C00;">E</span>
  <span style="color: #FFD700;">R</span>
  <span style="color: #ADFF2F;">M</span>
  <span style="color: #00FA9A;">U</span>
  <span style="color: #1E90FF;">X</span>
  <span style="color: #BA55D3;">-</span>
  <span style="color: #FF6347;">M</span>
  <span style="color: #FF8C00;">D</span>
</p>

---

## 🚀 Bienvenue sur TERMUX-MD

Bot WhatsApp puissant, développé en République Démocratique du Congo 🇨🇩 par **Kas Mbafumoja**.

---

## 👑 Créateur du projet  
Pour toute aide ou support, contactez-moi sur WhatsApp :  
[![WhatsApp](https://img.shields.io/badge/Whatsapp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/243970639878?text=*Salut+Kas+Mbafumoja+,+j%27ai+besoin+d%27aide+concernant+le+bot+TERMUX-MD*)

---

## 🔗 [![Site TERMUX-MD](https://img.shields.io/badge/TERMUX--MD_Session-Blue?style=for-the-badge&logo=web&logoColor=white&color=0078D7)](https://meg-lodon-session-1.onrender.com/pair)

<div style="text-align:center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin-top: 20px;">
  <p style="font-size: 1.2em; color: #007BFF; font-weight: bold;">
    Cliquez ici pour générer votre code <span style="color:#1BAFBA;">Pair</span> et connecter WhatsApp.
  </p>
  <p style="font-size: 1em; margin-top: 10px; color: #444;">
    Ce bot est créé par <span style="font-weight: bold; color: #FF6347;">Kasereka Mbafumoja</span>, le développeur officiel de <span style="font-style: italic; color: #1BAFBA;">TERMUX-MD</span>.
  </p>
</div>


## 🪀 Chaîne WhatsApp officielle  
Restez à jour avec toutes les nouveautés TERMUX-MD :  
[![WhatsApp Channel](https://img.shields.io/badge/JOIN-WHATSAPP%20CHANNEL-25D366?style=for-the-badge&logo=whatsapp)](https://whatsapp.com/channel/0029Vb6SDpGEawdvalkAlk0N)

---

## 🪀 Groupe WhatsApp officiel  
Rejoignez la communauté et partagez vos expériences :  
[![WhatsApp Group](https://img.shields.io/badge/REJOINDRE-GROUPE%20WHATSAPP-25D366?style=for-the-badge&logo=whatsapp)](https://chat.whatsapp.com/FrChEQhyeA6LmKOdgsyJUW?mode=ac_t)

---

## 🙏 Remerciements  
Merci à toute la communauté open source pour l’inspiration et le soutien.

---

## ⚠️ Rappel important  
- **Ce bot n’est pas affilié à WhatsApp Inc.**  
- L’utilisation abusive peut entraîner le bannissement de votre compte WhatsApp.  
- Je ne suis pas responsable des bans ou mésusages.

---
### ⚙️⚙️📦 Workflow GitHub Actions — 
-fishier workflow

```SESSION_ID et déployer TERMUX-MD

on:
  workflow_dispatch:

jobs:
  generate-session:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: |
          nohup node generateSession.js > session.log 2>&1 &
      - run: |
          echo "Veuillez scanner le QR code sur http://localhost:3000/pair"
          sleep 180
      - run: cat session.log

  deploy:
    needs: generate-session
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: |
          npm install -g pm2
          if pm2 describe TERMUX-MD > /dev/null; then
            pm2 restart TERMUX-MD
          else
            pm2 start index.js --name TERMUX-MD
          fi
          pm2 save
    env:
      SESSION_ID: ${{ secrets.SESSION_ID }}




 

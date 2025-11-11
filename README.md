# 🕌 Azan Time  
A clean, static, mobile-friendly prayer-times web app powered by **adhan.js** and live geolocation. Built to be fast, accurate, and beautiful with a **cosmic starfield UI** and **auto-highlight** for the next upcoming prayer.

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/${OWNER}/${REPO}?style=flat-square"></a>
  <a href="${PAGES_URL}"><img src="https://img.shields.io/badge/demo-online-58a6ff?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/adhan"><img src="https://img.shields.io/badge/adhan.js-calculation-blue?style=flat-square"></a>
</p>

---

## ✨ Overview
This project generates **accurate prayer times locally** in the browser — no API requests, no backend, no database.  
Everything runs on the client using \`adhan.js\` and the user’s latitude/longitude.

The UI is designed to be:
- **Modern & polished**  
- **Dark-themed with glassy cards**  
- **Galaxy-styled** with a twinkling animated starfield  
- **Minimal but beautiful** on both desktop & mobile  

---

## ✅ Features
- **Local prayer time calculation** (adhan.js, no external API)
- **Automatic geolocation** with graceful fallback messages
- **Five daily prayers + Imsak**  
- **Next prayer “alert mode”**  
  - Highlighted card  
  - Soft pulse glow  
  - Real-time countdown (\`HH:MM:SS\`)
- **Animated cosmic starfield** using Canvas
- **MagicUI-inspired dark theme**
- **Lightweight**: pure HTML + CSS + JS, zero build tools  
- **Works offline** after first load (except geolocation)

---

## 🚀 Live Demo
GitHub Pages:  
➡️ **${PAGES_URL}**

> If the page doesn't load geolocation:  
> Browsers require **HTTPS** to access location.  
> GitHub Pages already uses HTTPS, so this works in production.

---

## 🧠 How It Works
- **adhan.js** is used to calculate daily prayer times based on:
  - latitude + longitude  
  - date  
  - calculation method (default: *Muslim World League*)  
  - madhab (default: *Shafi*)  
- **Imsak** is calculated as *10 minutes before Fajr*
- JavaScript scans the computed times and detects:
  - Current prayer  
  - Next upcoming prayer  
- The next prayer item:
  - Gains a glowing highlight  
  - Displays a live countdown  
- The **starfield** constantly animates behind the content using HTML5 Canvas

---

## 📂 Project Structure
\`\`\`
.
├── index.html     # main page
├── styles.css     # UI, dark theme, starfield styling
└── script.js      # adhan.js logic, geolocation, countdown, starfield engine
\`\`\`

---

## 🛠 Local Development
Run a tiny local server to avoid browser geolocation restrictions:

\`\`\`bash
python3 -m http.server 8000
# open http://localhost:8000
\`\`\`

---

## ⚙️ Configuration
Inside \`script.js\` you can modify:
- Prayer calculation method:
  \`\`\`js
  const params = adhan.CalculationMethod.MuslimWorldLeague();
  \`\`\`
- Madhab:
  \`\`\`js
  params.madhab = adhan.Madhab.Shafi;
  \`\`\`
- Imsak offset:
  \`\`\`js
  new Date(times.fajr.getTime() - 10 * 60000)
  \`\`\`

---

## 🌌 UI & Design Philosophy
The interface blends:
- Glassmorphism  
- Minimal typography  
- Gradient headers  
- Soft lighting & smooth transitions  
- A fully custom **starfield renderer** (twinkling + drifting)

Built to give a quiet, immersive look suitable for a prayer-time experience.

---

## 📄 License
This project is licensed under the **MIT License**.  
See [\`LICENSE\`](LICENSE).
EOF
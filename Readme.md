# 🕌 Azan time

[![License](https://img.shields.io/github/license/__OWNER__/__REPO__?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-58a6ff?style=flat-square)](__PAGES_URL__)
[![Made with Adhan.js](https://img.shields.io/badge/adhan.js-calculation-blue?style=flat-square)](https://www.npmjs.com/package/adhan)

A minimalist, static **prayer times** site that computes azan times **locally in the browser** using `adhan.js` and the user’s geolocation. No external prayer-time API calls. Optimized for mobile. Includes a **cosmic starfield** background and an **auto-highlight alert** for the **next upcoming prayer**.

> **Note**: Geolocation requires HTTPS or `localhost`. GitHub Pages uses HTTPS, so you’re safe in production.

---

## ✨ Features

- **Local calculation** with [`adhan.js`](https://www.npmjs.com/package/adhan) (no external API)
- **Auto geolocation** with graceful error message
- **Five daily prayers + Imsak** (Imsak = Fajr − 10 minutes by default)
- **Next prayer highlight** with subtle pulse glow (alert-like)
- **Cosmic starfield** (HTML5 Canvas) with twinkling motion
- **MagicUI-like dark theme**, glassy cards, and smooth fade-in
- **Mobile friendly** layout
- **Zero build tools**: plain HTML + CSS + JS

---

## 🚀 Live

- GitHub Pages: **__PAGES_URL__**  
  Enable in: Repository → Settings → Pages → Deploy from branch (`/docs` or root) → Save.

---

## 🧩 How it works

- **Computation**: `adhan.js` calculates prayer times from `latitude`, `longitude`, and date.  
- **Method**: `MuslimWorldLeague()` with `Shafi` madhab by default.  
- **Imsak**: `Fajr - 10 minutes` (configurable).  
- **UI**: The upcoming prayer is auto-detected and highlighted.  
- **Background**: Canvas starfield renders hundreds of glowing stars with twinkling animation.

---

## 📂 Project structure (suggested)
.
├─ index.html
├─ styles.css
└─ script.js

---


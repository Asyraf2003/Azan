# 🕌 Azan Time
**A clean, static, mobile-friendly prayer-times web app powered by adhan.js and live geolocation.**

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/asyraf2003/Azan?style=flat-square"></a>
  <a href="https://asyraf2003.github.io/Azan/"><img src="https://img.shields.io/badge/demo-online-58a6ff?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/adhan"><img src="https://img.shields.io/badge/adhan.js-calculation-blue?style=flat-square"></a>
</p>

---

## ✨ Overview
Proyek ini menghasilkan **waktu sholat yang akurat secara lokal di browser** — tanpa permintaan API, *backend*, atau *database*. Semuanya berjalan di sisi klien (*client-side*) menggunakan `adhan.js` dan lokasi (*latitude/longitude*) pengguna.

### 🎨 Filosofi Desain UI
* **Modern & Polished:** Tampilan yang bersih dengan kartu berkaca (*glassy cards*).
* **Galaxy-Styled:** Tema gelap dengan **starfield kosmik animasi** yang berkerlap-kerlip.
* **Minimal & Indah:** Dioptimalkan untuk desktop maupun mobile.

---

## ✅ Fitur Utama
* **Kalkulasi Waktu Sholat Lokal** (`adhan.js`, tanpa API eksternal).
* **Geolocation Otomatis** dengan pesan *fallback* yang anggun.
* **Lima Waktu Sholat Harian + Imsak.**
* **Mode "Alert" Sholat Berikutnya:**
    * Kartu disorot (*highlighted*).
    * Cahaya berdenyut lembut (*soft pulse glow*).
    * Hitungan mundur *real-time* (`HH:MM:SS`).
* **Animasi Starfield Kosmik** menggunakan Canvas.
* **Ringan:** Pure HTML, CSS, dan JS; tanpa *build tools*.
* **Bekerja *Offline*** setelah pemuatan pertama (kecuali Geolocation).

---

## 🚀 Live Demo
Akses demo langsung melalui GitHub Pages:
➡️ **https://asyraf2003.github.io/Azan/**

> *Catatan:* Browser memerlukan **HTTPS** untuk mengakses lokasi pengguna. Link demo di atas sudah menggunakan HTTPS.

---

## 🧠 Cara Kerja (*How It Works*)
1.  **Kalkulasi:** `adhan.js` menghitung waktu sholat harian berdasarkan:
    * Latitude + Longitude
    * Tanggal
    * Metode Kalkulasi (Default: *Muslim World League*)
    * Madhab (Default: *Shafi*)
2.  **Imsak:** Dihitung sebagai **10 menit sebelum Fajr**.
3.  **Deteksi Sholat:** JavaScript memindai waktu yang dihitung untuk mendeteksi Sholat saat ini dan **Sholat berikutnya**.
4.  **Animasi:** Item Sholat berikutnya mendapatkan sorotan, menampilkan hitungan mundur langsung, dan *starfield* terus beranimasi di belakang konten menggunakan HTML5 Canvas.

---

## 📂 Struktur Proyek
```
.
├── index.html      # Halaman utama
├── styles.css      # Styling UI, tema gelap, starfield
└── script.js       # Logika adhan.js, geolocation, countdown, starfield engine
└── LICENSE         # Lisensi MIT
└── README.md
```

---

## 🛠 Pengembangan & Konfigurasi
Untuk menghindari pembatasan geolocation browser saat pengembangan lokal, jalankan server lokal kecil.

```bash
python -m http.server 8000
# atau
php -S localhost:8000
# kemudian buka http://localhost:8000
```

### Konfigurasi adhan.js
Di dalam `script.js`, Anda dapat memodifikasi:

* **Metode Kalkulasi:** `const params = adhan.CalculationMethod.MuslimWorldLeague();`
* **Madhab:** `params.madhab = adhan.Madhab.Shafi;`
* **Offset Imsak:** `new Date(times.fajr.getTime() - 10 * 60000)`

---

## 📄 License
Proyek ini dilisensikan di bawah **MIT License**. Lihat `LICENSE`.
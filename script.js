// Starfield Animation: Diletakkan di atas agar terpisah dari logika utama
(function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let stars = [];
  let w, h, scale, starCount, animId;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    w = canvas.width = Math.floor(innerWidth * DPR);
    h = canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    scale = Math.sqrt((w * h) / (1280 * 720)) * 1.0;
    starCount = Math.floor(400 * scale);

    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.4 + 0.6) * DPR,
      spx: (Math.random() * 0.25 + 0.05) * DPR,
      spy: (Math.random() * 0.18 - 0.09) * DPR,
      hue: Math.random() < 0.35 ? 210 : 0,
      tw: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.fillStyle = "#0b1118";
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      s.x += s.spx;
      s.y += s.spy;
      if (s.x > w + 2) s.x = -2;
      if (s.x < -2) s.x = w + 2;
      if (s.y > h + 2) s.y = -2;
      if (s.y < -2) s.y = h + 2;

      s.tw += 0.035;
      const a = 0.55 + Math.sin(s.tw) * 0.35;
      const glow = 6 * DPR;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${s.hue},100%,88%,${a})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow);
      grad.addColorStop(0, `hsla(${s.hue},100%,80%,${a * 0.6})`);
      grad.addColorStop(1, `hsla(${s.hue},100%,50%,0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, glow, 0, Math.PI * 2);
      ctx.fill();
    }
    animId = requestAnimationFrame(draw);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(draw);
    }
  });

  addEventListener("resize", () => {
    resize();
  });
  resize();
  draw();
})();


// Logika Waktu Sholat Utama
let globalJadwal = {};

function success(pos) {
  const { latitude, longitude } = pos.coords;
  const locationEl = document.getElementById("location");
  locationEl.textContent = `Lokasi terdeteksi: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;

  const params = adhan.CalculationMethod.MuslimWorldLeague();
  params.madhab = adhan.Madhab.Shafi;

  // Modifikasi untuk pengujian: 
  // Gunakan waktu saat ini, lalu tambahkan beberapa jam atau hari jika perlu.
  // Untuk menguji highlight, kita tidak perlu memanipulasinya, 
  // kita cukup tambahkan logic 'setelah azan' yang Anda minta.
  const date = new Date(); // Biarkan ini mengambil waktu hari ini
  const coordinates = new adhan.Coordinates(latitude, longitude);
  const times = new adhan.PrayerTimes(coordinates, date, params);

  const fmt = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Simpan jadwal ke variabel global
  globalJadwal = {
    Imsak: new Date(times.fajr.getTime() - 10 * 60000), // Imsak 10 menit sebelum Subuh
    Subuh: times.fajr,
    Zuhur: times.dhuhr,
    Asar: times.asr,
    Magrib: times.maghrib,
    Isya: times.isha,
  };

  const list = document.getElementById("jadwal");
  list.innerHTML = "";

  for (const [nama, waktu] of Object.entries(globalJadwal)) {
    const li = document.createElement("li");
    li.dataset.name = nama;
    li.innerHTML = `<span>${nama}</span><span>${fmt.format(waktu)}</span>`;
    list.appendChild(li);
  }

  // Panggil highlightNext (Initial highlight)
  highlightNext(globalJadwal, list);
  // Set interval untuk update highlight setiap 30 detik
  setInterval(() => highlightNext(globalJadwal, list), 30 * 1000);
}

function error(err) {
  document.getElementById("location").textContent =
    `Gagal mendeteksi lokasi: ${err.message}`;
}

function highlightNext(jadwal, list) {
  const now = new Date();
  let nextName = null;
  let minDiff = Infinity;
  let currentName = null;

  // 1. Cari sholat berikutnya DAN sholat yang baru saja berlalu
  for (const [nama, waktu] of Object.entries(jadwal)) {
    const diff = waktu - now;
    
    // a. Sholat berikutnya (belum terlewati)
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      nextName = nama;
    } 
    
    // b. Sholat yang baru saja berlalu (0 hingga -10 menit yang lalu)
    // Perhatikan: -10 menit adalah -600.000 milidetik
    else if (diff <= 0 && diff > -600000) { 
      currentName = nama;
    }
  }

  // 2. Reset semua kelas 'next'
  for (const el of list.children) {
    el.classList.remove("next");
  }

  // 3. Tentukan mana yang akan di-highlight
  let targetName;
  if (currentName) {
    // PRIORITAS 1: Jika ada sholat yang baru berlalu (dalam 10 menit), itu yang di-highlight
    targetName = currentName;
  } else if (nextName) {
    // PRIORITAS 2: Jika tidak ada sholat yang baru berlalu, highlight sholat yang berikutnya
    targetName = nextName;
  } else {
    // Jika semua sholat hari ini sudah lewat (misalnya setelah Isya),
    // maka highlight Subuh (atau Imsak) hari berikutnya.
    // Dalam kasus ini, kita biarkan saja targetName = null, dan tidak ada yang menyala.
    // Namun, kita bisa tambahkan logika sederhana: highlight Imsak.
    targetName = "Imsak"; // Asumsi Imsak adalah waktu sholat pertama
  }

  // 4. Tandai elemen yang ditargetkan
  if (targetName) {
    const target = Array.from(list.children).find(
      (li) => li.dataset.name === targetName
    );
    if (target) {
      target.classList.add("next");
    }
  }
}

// Inisiasi
navigator.geolocation.getCurrentPosition(success, error);
# 💑 Dashboard Dewa & Ayu - Laporan, Keuangan & Sinergi Progress

Aplikasi web interaktif untuk mencatat, merencanakan, dan mengevaluasi seluruh aspek perkembangan bulanan **Dewa & Ayu**. Dilengkapi dengan fitur **sinkronisasi otomatis antar-perangkat (Laptop & HP Pasangan)**, pencatatan keuangan bersama, jadwal kegiatan masing-masing, to-do list kolaborasi, habit tracker harian, serta **kesepakatan Do's & Don'ts dan Catatan Bersama**.

---

## 📱 Akses Bersama di HP dan Laptop (Multi-Device Sync)

Aplikasi ini dapat dibuka secara bersamaan di **Laptop Dewa** dan **HP Ayu** (atau sebaliknya) dalam jaringan Wi-Fi yang sama:

1. **Di Laptop**:
   Buka browser di: [http://localhost:3000](http://localhost:3000)
2. **Di HP Pasangan (iPhone / Android)**:
   - Hubungkan HP ke Wi-Fi yang sama.
   - Buka browser HP di: **http://192.168.1.6:3000**
   - Atau klik tombol **`📱 Buka di HP`** di pojok kanan atas dashboard untuk menampilkan **QR Code**, lalu arahkan kamera HP ke layar!
3. **Sinkronisasi Real-Time**:
   - Jika Dewa menginput pengeluaran di laptop, dalam hitungan detik Ayu akan langsung melihat update-nya di HP.
   - Jika Ayu menginput jadwal atau to-do di HP, laptop Dewa otomatis tersinkronisasi tanpa perlu me-refresh halaman!

---

## 🌟 Fitur-Fitur Lengkap

### 1. 💰 Pemasukan & Keuangan Bulanan
- **Input Pemasukan Terpisah**:
  - Pemasukan **Dewa 💙** (Gaji, Freelance Web, Bonus, dll.)
  - Pemasukan **Ayu 💖** (Gaji, Usaha Kerajinan/Hampers, Side Income, dll.)
- **Sinergi Finansial Visual**:
  - Grafik perbandingan kontribusi pendapatan Dewa vs Ayu.
  - Sisa Tabungan Bersih & Rasio Tabungan (*Savings Rate %*).
- **Catatan Pengeluaran Bersama**:
  - Catat belanja bulanan, sewa/tagihan, hiburan/kencan, dan transportasi.
  - Kategori & tag: *Dibayar oleh: Dewa / Ayu / Bareng 💜*.
  - Diagram Donat (*Donut Chart SVG*) pengeluaran tanpa ketergantungan internet.
- **Target Impian Bersama (*Savings Goals*)**:
  - Progress bar tabungan (💍 Dana Nikah, ✈️ Liburan Akhir Tahun, 🛡️ Dana Darurat).
  - Tombol instan setor tabungan `+ Rp 500rb`, `+ Rp 1 Jt`, atau nominal kustom.

### 2. 📝 Kesepakatan Do's & Don'ts dan Catatan Bersama (BARU!)
- **Prinsip Hubungan & Keuangan (Do's & Don'ts Agreement)**:
  - ✅ **DO's (Yang Harus / Dianjurkan Dilakukan)**:
    - *Diskusikan bersama sebelum pengeluaran di atas Rp 500.000*
    - *Catat setiap pemasukan & pengeluaran setiap malam sebelum tidur*
    - *Sisihkan tabungan nikah & dana darurat di awal gajian (Pay yourself first)*
    - *Deep talk & waktu kencan tanpa pegang HP minimal 1x seminggu*
    - *Saling mengapresiasi dan berterima kasih atas usaha masing-masing*
    - *Bisa tambah DO's baru kapan saja!*
  - ❌ **DON'Ts (Yang Dilarang / Dihindari)**:
    - *Jangan belanja impulsif saat lapar, lelah, atau tergiur diskon kilat (tunggu 24 jam)*
    - *Jangan memendam uneg-uneg atau masalah keuangan sendirian*
    - *Jangan memakai uang tabungan darurat untuk hal non-esensial / gengsi*
    - *Jangan membandingkan kondisi finansial dengan orang lain di media sosial*
    - *Bisa tambah DON'Ts baru kapan saja!*
- **Papan Catatan Bebas & Wishlist (Sticky Notes Board)**:
  - Kartu catatan warna-warni untuk mencatat ide kencan, list belanja dapur, kriteria vendor pernikahan impian, dan memo romantis.
  - Fitur **Pin ke Atas (📌)** untuk catatan penting.

### 3. 📅 Jadwal & Kalender Kegiatan Masing-Masing
- **Kalender Interaktif**:
  - Grid kalender dengan penanda warna:
    - 💙 Biru: Kegiatan pribadi Dewa
    - 💖 Pink: Kegiatan pribadi Ayu
    - 💜 Ungu: Acara & kencan berdua (Bareng)
  - **Klik tanggal di kalender** untuk langsung mengisi jadwal pada tanggal tersebut!
- **Filter Cepat**: Tampilkan jadwal Semua, Dewa saja, Ayu saja, atau Acara Bareng.
- **Agenda Terdekat**: Daftar kronologis dengan jam, tempat, dan kategori kegiatan.

### 4. ✅ To-Do List Bareng
- Kolaborasi tugas dengan *Assignee* (Dewa / Ayu / Bareng), prioritas (Tinggi 🔥, Sedang, Rendah), dan batas waktu.
- Ceklis interaktif dengan efek coret dan status persentase penyelesaian otomatis.

### 5. 🏃‍♂️ Habit Tracker Harian
- Ceklis disiplin harian (olahraga 30m, minum air 2L, baca buku, skincare, deep talk, catat pengeluaran) dengan persentase konsistensi.

### 6. 🌟 Kilas Balik & Evaluasi Bulanan (Monthly Review)
- Form refleksi akhir bulan: Momen terbaik, pencapaian terbesar, evaluasi/tantangan, target bulan depan, rating kepuasan (1-5 bintang ⭐), dan pesan cinta.

### 7. 📱 Quick Input Floating Button (Untuk Pengguna HP)
- Tombol mengambang `+` di layar HP untuk input cepat:
  - 💵 Pemasukan
  - 💸 Pengeluaran
  - 📅 Jadwal
  - ✅ To-Do
  - 📝 Catatan / Do's & Don'ts

---

## 🚀 Cara Menjalankan

Server lokal telah berjalan di latar belakang. Jika Anda ingin menyalakan ulang kapan saja:

```bash
npm start
```
Atau:
```bash
node server.js
```

Lalu buka:
- Di Laptop: **http://localhost:3000**
- Di HP Pasangan (Wi-Fi sama): **http://192.168.1.6:3000**

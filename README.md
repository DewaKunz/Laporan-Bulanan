# 🌸 Dewa & Ayu's Sweet Space 🐻💖🐰
### Dashboard & Laporan Bulanan Lucu untuk Pasangan

Aplikasi web interaktif dengan **tema super lucu, manis, dan estetik pastel** untuk mencatat keuangan berdua, celengan impian (bersama & pribadi), jadwal kencan, to-do list misi cinta, serta resep bahagia (Do's & Don'ts).

---

## 🚀 Mengapa di Vercel Sempat 404 & Bagaimana Cara Mengatasinya?

### Penyebab 404 di Vercel Sebelumnya:
1. Vercel secara bawaan adalah platform **Serverless**, bukan server VPS yang menjalankan `node server.js` secara terus-menerus.
2. Ketika tidak ada file konfigurasi `vercel.json`, Vercel bingung menentukan rute file statis (`index.html`, CSS, JS) dan API, sehingga menampilkan halaman `404: NOT_FOUND`.

### Solusi yang Sudah Diterapkan:
1. **`vercel.json`**: Menentukan rute statis dan routing serverless otomatis sehingga seluruh URL diarahkan dengan benar ke `index.html`.
2. **`api/data.js` & `api/network-info.js`**: Serverless function native Vercel untuk sinkronisasi data online.
3. **`package.json`**: Menambahkan script `"build"` agar Vercel mendeteksi proses build selesai dengan sukses.

### Langkah untuk Update ke Vercel Anda:
Cukup jalankan 3 baris perintah ini di Terminal laptop Anda:
```bash
git add .
git commit -m "fix: vercel 404 configuration and cute couple theme"
git push
```
Dalam waktu 1 menit, Vercel akan otomatis me-redeploy dan dashboard langsung bisa diakses online tanpa 404 lagi! ✨

---

## 🎨 Tema Baru yang Super Lucu & Manis (Cute Couple Theme)

* **Nuansa Pastel Manis**: Warna *strawberry milk* pink, *baby blue*, *lavender*, dan *buttercream yellow*.
* **Karakter Lucu**:
  * 🐻 **Dewa**: Si Ganteng Beruang (Aksen Baby Blue)
  * 🐰 **Ayu**: Si Cantik Kelinci (Aksen Strawberry Pink)
  * 💖 **Detak Jantung Mini**: Animasi detak cinta berdenyut di avatar header.
* **Love Banner Interaktif**: Kata-kata manis dan motivasi pasangan yang bisa diklik untuk berganti kutipan cinta setiap hari.
* **Bubbly & Rounded**: Desain serba membulat, bayangan lembut, dan font ramah yang menggemaskan (*Quicksand & Nunito*).
* **Mode Malam Bintang (Dreamy Midnight Dark)**: Mode gelap bernuansa malam berbintang ungu pastel yang nyaman di mata saat malam hari.

---

## 📱 Fitur-Fitur Utama

1. **Dompet & Rezeki Masuk**: Catatan pemasukan terpisah untuk 🐻 Dewa & 🐰 Ayu.
2. **Belanja & Jajan 🍓**: Pencatatan pengeluaran dengan tag *Dibayar oleh: Dewa / Ayu / Bareng*.
3. **Celengan Impian (Bersama & Pribadi) 🍯**:
   * Tabungan Bersama (Nikah, Liburan, Dana Darurat).
   * Tabungan Pribadi Dewa (Gadget, Saham/Investasi).
   * Tabungan Pribadi Ayu (Emas Batangan, Modal Usaha).
4. **Jadwal & Kencan 📅**: Kalender interaktif dan jadwal kencan romantis.
5. **Misi Bareng (To-Do List) 🐰**: Checklist tugas kolaboratif dengan status penyelesaian otomatis.
6. **Resep Bahagia (DO's & DON'Ts) 🎀**: Prinsip cinta dan keuangan yang disepakati bersama.
7. **Papan Memo Manis 💌**: Sticky notes pastel untuk catatan ide kencan dan surat cinta.
8. **Kilas Balik & Cinta 🌟**: Refleksi bulanan, habit tracker harian, dan rating kebahagiaan berdua.

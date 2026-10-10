# PythaLab

Media belajar interaktif Teorema Pythagoras untuk siswa SMP kelas 8 (Kurikulum Merdeka). Dibuat dengan Next.js (App Router) dan TypeScript.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk produksi: `npm run build` lalu `npm start`.

## Struktur

- `app/page.tsx` susunan halaman (hero, konsep, latihan)
- `components/Hero.tsx` laboratorium segitiga interaktif (SVG)
- `components/Quiz.tsx` latihan soal dengan pembahasan dan skor terbaik
- `app/globals.css` seluruh gaya (tema kertas buku tulis kotak-kotak)

## Mengubah isi

Soal ada di array `SOAL` pada `components/Quiz.tsx`. Rentang sisi segitiga diatur lewat atribut `min`/`max` pada input slider di `components/Hero.tsx` (maksimal 8 agar gambar tetap muat).

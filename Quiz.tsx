"use client";

import { useEffect, useState } from "react";

type Soal = { tanya: string; pilihan: string[]; benar: number; bahas: string };

const KUNCI = "pythalab:skor-terbaik";

const SOAL: Soal[] = [
  {
    tanya: "Sisi siku-siku sebuah segitiga adalah 6 cm dan 8 cm. Berapa panjang sisi miringnya?",
    pilihan: ["10 cm", "12 cm", "14 cm", "48 cm"],
    benar: 0,
    bahas: "c² = 6² + 8² = 36 + 64 = 100, sehingga c = √100 = 10 cm.",
  },
  {
    tanya: "Sisi miring sebuah segitiga siku-siku 13 cm dan salah satu sisi sikunya 5 cm. Berapa sisi siku yang lain?",
    pilihan: ["8 cm", "10 cm", "12 cm", "18 cm"],
    benar: 2,
    bahas: "b² = 13² − 5² = 169 − 25 = 144, sehingga b = √144 = 12 cm.",
  },
  {
    tanya: "Manakah yang merupakan tripel Pythagoras?",
    pilihan: ["4, 5, 6", "6, 7, 8", "9, 10, 11", "7, 24, 25"],
    benar: 3,
    bahas: "7² + 24² = 49 + 576 = 625 = 25². Pilihan lain tidak memenuhi c² = a² + b².",
  },
  {
    tanya: "Tangga 10 m disandarkan ke dinding. Ujung bawahnya 6 m dari dinding. Setinggi apa tangga mencapai dinding?",
    pilihan: ["4 m", "8 m", "12 m", "16 m"],
    benar: 1,
    bahas: "Tangga adalah sisi miring. t² = 10² − 6² = 100 − 36 = 64, sehingga t = 8 m.",
  },
  {
    tanya: "Sebuah lapangan berbentuk persegi panjang berukuran 24 m × 7 m. Berapa panjang diagonalnya?",
    pilihan: ["17 m", "31 m", "25 m", "35 m"],
    benar: 2,
    bahas: "Diagonal adalah sisi miring. d² = 24² + 7² = 576 + 49 = 625, sehingga d = 25 m.",
  },
  {
    tanya: "Segitiga dengan sisi 9 cm, 12 cm, dan 16 cm. Apakah segitiga ini siku-siku?",
    pilihan: [
      "Ya, karena 9² + 12² = 16²",
      "Ya, karena 9 + 12 lebih besar dari 16",
      "Tidak, karena 9² + 12² = 225 sedangkan 16² = 256",
      "Tidak, karena ada sisi yang ganjil",
    ],
    benar: 2,
    bahas: "Sisi terpanjang adalah 16. 81 + 144 = 225, tetapi 16² = 256. Tidak sama, jadi bukan segitiga siku-siku.",
  },
];

export default function Quiz() {
  const [i, setI] = useState(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [terbaik, setTerbaik] = useState<number | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KUNCI);
      if (v !== null) setTerbaik(Number(v));
    } catch {
      /* penyimpanan tidak tersedia */
    }
  }, []);

  const q = SOAL[i];

  function jawab(n: number) {
    if (pilih !== null) return;
    setPilih(n);
    if (n === q.benar) setSkor((s) => s + 1);
  }

  function lanjut() {
    if (i + 1 < SOAL.length) {
      setI(i + 1);
      setPilih(null);
      return;
    }
    setSelesai(true);
    if (terbaik === null || skor > terbaik) {
      setTerbaik(skor);
      try {
        localStorage.setItem(KUNCI, String(skor));
      } catch {
        /* abaikan */
      }
    }
  }

  function ulang() {
    setI(0);
    setPilih(null);
    setSkor(0);
    setSelesai(false);
  }

  if (selesai) {
    const pesan =
      skor === SOAL.length
        ? "Sempurna. Kamu sudah paham Pythagoras."
        : skor >= 4
        ? "Bagus. Baca lagi pembahasan soal yang salah, lalu coba sekali lagi."
        : "Belum pas. Mainkan lagi segitiga di atas, lalu ulangi latihan.";
    return (
      <div className="sheet quiz" aria-live="polite">
        <h3>Skor kamu {skor} dari {SOAL.length}</h3>
        <p>{pesan}</p>
        {terbaik !== null && (
          <p className="kecil">Skor terbaik di perangkat ini: {terbaik} dari {SOAL.length}</p>
        )}
        <button type="button" className="cta" onClick={ulang}>Ulangi latihan</button>
      </div>
    );
  }

  return (
    <div className="sheet quiz">
      <div className="progres" aria-hidden="true">
        {SOAL.map((_, k) => (
          <span key={k} className={k < i ? "selesai" : k === i ? "aktif" : ""} />
        ))}
      </div>
      <p className="kecil">Soal {i + 1} dari {SOAL.length}</p>
      <h3 className="tanya">{q.tanya}</h3>

      <div className="pilihan" role="group" aria-label="Pilihan jawaban">
        {q.pilihan.map((teks, k) => {
          let kelas = "opsi";
          if (pilih !== null) {
            if (k === q.benar) kelas += " benar";
            else if (k === pilih) kelas += " salah";
          }
          return (
            <button
              key={k}
              type="button"
              className={kelas}
              onClick={() => jawab(k)}
              disabled={pilih !== null}
            >
              {teks}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {pilih !== null && (
          <div className="bahas">
            <p>
              <strong>{pilih === q.benar ? "Benar." : "Belum tepat."}</strong>{" "}
              {q.bahas}
            </p>
            <button type="button" className="cta" onClick={lanjut}>
              {i + 1 < SOAL.length ? "Soal berikutnya" : "Lihat hasil"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

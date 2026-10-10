"use client";

import { useEffect, useRef, useState } from "react";

const S = 20; // piksel per satuan panjang
const W = 520;
const H = 520;
const fmt = (n: number) =>
  n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
type P = [number, number];
const pts = (p: P[]) => p.map(([x, y]) => `${x},${y}`).join(" ");

const PRESETS = [
  { label: "3 dan 4", a: 3, b: 4 },
  { label: "6 dan 8", a: 6, b: 8 },
  { label: "5 dan 5", a: 5, b: 5 },
];

export default function Hero() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const touched = useRef(false);

  // Satu momen pembuka: segitiga "tumbuh" menjadi 3-4-5.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setA(3);
      setB(4);
      return;
    }
    const urutan: P[] = [[1, 2], [2, 2], [2, 3], [3, 3], [3, 4]];
    let k = 0;
    const t = setInterval(() => {
      if (touched.current || k >= urutan.length) {
        clearInterval(t);
        return;
      }
      setA(urutan[k][0]);
      setB(urutan[k][1]);
      k++;
    }, 280);
    return () => clearInterval(t);
  }, []);

  const ubah = (fn: () => void) => {
    touched.current = true;
    fn();
  };

  const c2 = a * a + b * b;
  const c = Math.sqrt(c2);
  const tripel = Number.isInteger(c);

  // Geometri: sudut siku-siku di C, kaki a mendatar, kaki b tegak.
  const cx = W / 2 - (a * S) / 2;
  const cy = H / 2 + (b * S) / 2;
  const C: P = [cx, cy];
  const A: P = [cx + a * S, cy];
  const B: P = [cx, cy - b * S];
  const sqA: P[] = [C, A, [A[0], A[1] + a * S], [C[0], C[1] + a * S]];
  const sqB: P[] = [C, B, [B[0] - b * S, B[1]], [C[0] - b * S, C[1]]];
  const n: P = [b * S, -a * S];
  const sqC: P[] = [A, B, [B[0] + n[0], B[1] + n[1]], [A[0] + n[0], A[1] + n[1]]];
  const mid: P = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const dalam: P = [(-b / c) * 14, (a / c) * 14];

  return (
    <div className="hero">
      <div className="hero-teks">
        <h1>Dua kotak kecil, satu kotak besar.</h1>
        <p className="lead">
          Pada segitiga siku-siku, luas kotak di sisi a ditambah luas kotak di
          sisi b selalu sama dengan luas kotak di sisi miring c. Geser panjang
          sisinya dan buktikan sendiri.
        </p>

        <div className="controls">
          <label className="slider">
            <span>Sisi a: <strong>{a}</strong></span>
            <input
              type="range" min={1} max={8} step={1} value={a}
              onChange={(e) => ubah(() => setA(Number(e.target.value)))}
            />
          </label>
          <label className="slider">
            <span>Sisi b: <strong>{b}</strong></span>
            <input
              type="range" min={1} max={8} step={1} value={b}
              onChange={(e) => ubah(() => setB(Number(e.target.value)))}
            />
          </label>
          <div className="presets" role="group" aria-label="Contoh cepat">
            <span>Coba contoh:</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => ubah(() => { setA(p.a); setB(p.b); })}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="readout" aria-live="polite">
          <p className="eq">a² + b² = c²</p>
          <p className="eq">{a * a} + {b * b} = {c2}</p>
          <p>
            {tripel ? (
              <>Sisi miring c = {c}. <span className="badge">Tripel Pythagoras</span></>
            ) : (
              <>Sisi miring c = √{c2} ≈ {fmt(c)}</>
            )}
          </p>
        </div>

        <a className="cta" href="#latihan">Mulai latihan soal</a>
      </div>

      <figure className="lab">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Segitiga siku-siku dengan sisi a ${a}, sisi b ${b}, dan sisi miring c ${fmt(c)}. Luas kotak: ${a * a}, ${b * b}, dan ${c2}.`}
        >
          <defs>
            <pattern id="sel" x={cx} y={cy} width={S} height={S} patternUnits="userSpaceOnUse">
              <path d={`M ${S} 0 L 0 0 0 ${S}`} fill="none" stroke="rgba(35,39,47,.22)" strokeWidth="1" />
            </pattern>
          </defs>

          <polygon className="sq-c" points={pts(sqC)} />
          <polygon className="sq-a" points={pts(sqA)} />
          <polygon className="sq-b" points={pts(sqB)} />
          <polygon points={pts(sqA)} fill="url(#sel)" />
          <polygon points={pts(sqB)} fill="url(#sel)" />
          <polygon className="tri" points={pts([C, A, B])} />
          <polyline
            className="siku"
            points={pts([[cx + 10, cy], [cx + 10, cy - 10], [cx, cy - 10]])}
          />

          <text className="lbl" x={cx + (a * S) / 2} y={cy + (a * S) / 2}>a² = {a * a}</text>
          <text className="lbl" x={cx - (b * S) / 2} y={cy - (b * S) / 2}>b² = {b * b}</text>
          <text
            className="lbl"
            x={(sqC[0][0] + sqC[2][0]) / 2}
            y={(sqC[0][1] + sqC[2][1]) / 2}
          >
            c² = {c2}
          </text>

          <text className="sisi" x={cx + (a * S) / 2} y={cy - 12}>a</text>
          <text className="sisi" x={cx + 12} y={cy - (b * S) / 2}>b</text>
          <text className="sisi" x={mid[0] + dalam[0]} y={mid[1] + dalam[1]}>c</text>
        </svg>
        <figcaption>
          Setiap petak kecil di kotak a dan b bernilai 1 satuan luas.
        </figcaption>
      </figure>
    </div>
  );
}

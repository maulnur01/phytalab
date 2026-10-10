import Hero from "@/components/Hero";
import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <>
      <header className="wrap bar">
        <a className="logo" href="#coba">PythaLab</a>
        <nav aria-label="Navigasi utama">
          <a href="#coba">Coba</a>
          <a href="#konsep">Konsep</a>
          <a href="#latihan">Latihan</a>
        </nav>
      </header>

      <main>
        <section id="coba" className="wrap">
          <Hero />
        </section>

        <section id="konsep" className="wrap section">
          <div className="konsep">
            <div>
              <h2>Apa yang sebenarnya terjadi di segitiga itu?</h2>
              <p>
                Segitiga siku-siku punya satu sudut 90°. Sisi di depan sudut itu
                adalah yang terpanjang, namanya <strong>hipotenusa</strong> (sisi
                miring) dan kita tulis sebagai c. Dua sisi lainnya, a dan b, adalah
                sisi siku-sikunya.
              </p>
              <p>
                Teorema Pythagoras menghubungkan ketiganya:
              </p>
              <p className="rumus">c² = a² + b²</p>
              <p>
                Untuk mencari sisi siku-siku yang hilang, balik rumusnya:
                a = √(c² − b²). Bilangan bulat yang pas dengan rumus ini, seperti
                3-4-5, 5-12-13, dan 8-15-17, disebut <strong>tripel Pythagoras</strong>.
                Kelipatannya juga tripel, misalnya 6-8-10.
              </p>
            </div>

            <aside className="sheet contoh" aria-labelledby="contoh-judul">
              <h3 id="contoh-judul">Contoh soal</h3>
              <p>Sebuah segitiga siku-siku punya sisi siku-siku 6 cm dan 8 cm. Berapa panjang sisi miringnya?</p>
              <ol>
                <li>Tulis rumusnya: c² = a² + b²</li>
                <li>Masukkan angkanya: c² = 6² + 8² = 36 + 64</li>
                <li>Jumlahkan: c² = 100</li>
                <li>Tarik akar: c = √100 = <strong>10 cm</strong></li>
              </ol>
            </aside>
          </div>
        </section>

        <section id="latihan" className="wrap section">
          <h2>Latihan soal</h2>
          <p className="lead">Enam soal singkat. Setiap jawaban langsung dibahas.</p>
          <Quiz />
        </section>
      </main>

      <footer className="wrap foot">
        Media belajar matematika SMP kelas 8, Kurikulum Merdeka.
      </footer>
    </>
  );
}

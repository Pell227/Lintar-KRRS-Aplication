import {
  dataMahasiswa,
  dataAkademik,
  dataPengumuman,
  dataJadwal,
  dataDosenPa,
} from "../data/datadash";

import book from "../Assets/book.png";
import IPK from "../Assets/graduation.png";
import IPS from "../Assets/report.png";
import kehadiran from "../Assets/attendance.png";
import SKS from "../Assets/stackbook.png";
import profile from "../Assets/profile.jpg";

const warna = [
  "bg-[#D72323] text-white",
  "bg-white text-black",
  "bg-slate-900 text-white",
];

const hariKal = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function Dashboard() {
  const now = new Date();
  const tahun = now.getFullYear();
  const bulan = now.getMonth();
  const tglHariIni = now.getDate();
  const judulBulan = now.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
  const tanggalPanjang = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const kosong = new Date(tahun, bulan, 1).getDay();
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const sel = [
    ...Array(kosong).fill(null),
    ...Array.from({ length: jumlahHari }, (_, i) => i + 1),
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
      <div className="grid content-start gap-4">
        <div
          className="flex min-h-[120px] items-center justify-between rounded-2xl px-5 py-3 text-black"
          style={{ background: "linear-gradient(to right, #D72323, #F5EDED" }}
        >
          <div>
            <h1 className="font-serif text-3xl font-normal tracking-wide uppercase color-[#ffffff]">
              WELCOME BACK, {dataMahasiswa.Nama}!
            </h1>
            <p className="mt-1 font-serif text-sm text-black/80">
              {dataMahasiswa.NIM} · {dataMahasiswa.Prodi}
            </p>
          </div>
          <img
            src={book.src}
            alt=""
            className="mr-2 h-40 w-auto object-contain"
          />
        </div>

        <div
          className="gap-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          }}
        >
          <div
            className="relative flex min-h-[120px] flex-col justify-between rounded-2xl p-3"
            style={{
              background: "linear-gradient(to right, #CBD9EE, #EFF4FB)",
            }}
          >
            <p className="text-sm">IPK</p>

            <img
              src={IPK.src}
              alt=""
              className="h-16 w-16 object-contain"
              style={{
                position: "absolute",
                top: "50%",
                right: 12,
                transform: "translateY(-50%)",
              }}
            />

            <p className="text-xl font-semibold">{dataAkademik.ipk}</p>
          </div>

          <div
            className="relative flex min-h-[120px] flex-col justify-between rounded-2xl p-3"
            style={{
              background: "linear-gradient(to right, #f5e9DB, #FDF9F3)",
            }}
          >
            <p className="text-sm">IPS</p>

            <img
              src={IPS.src}
              className="h-16 w-16 object-contain"
              style={{
                position: "absolute",
                top: "50%",
                right: 12,
                transform: "translateY(-50%)",
              }}
            />

            <p className="text-xl font-semibold">{dataAkademik.ips}</p>
          </div>

          <div
            className="relative flex min-h-[120px] flex-col justify-between rounded-2xl p-3"
            style={{ background: "linear-gradient(to right,#f2d9dc, #fcf3f4)" }}
          >
            <p className="text-sm">Total SKS</p>

            <img
              src={SKS.src}
              className="h-16 w-16 object-contain"
              style={{
                position: "absolute",
                top: "50%",
                right: 12,
                transform: "translateY(-50%)",
              }}
            />

            <p className="text-xl font-semibold">{dataAkademik.sks}</p>
          </div>

          <div
            className="relative flex min-h-[120px] flex-col justify-between rounded-2xl p-3"
            style={{
              background: "linear-gradient(to right, #DDE5EC, #F6F9FB)",
            }}
          >
            <p className="text-sm">Kehadiran</p>

            <img
              src={kehadiran.src}
              className="h-16 w-16 object-contain"
              style={{
                position: "absolute",
                top: "50%",
                right: 12,
                transform: "translateY(-50%)",
              }}
            />

            <p className="text-xl font-semibold">{dataAkademik.kehadiran}%</p>
          </div>
        </div>
        <div
          className="gap-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          <div className="rounded-2xl bg-[#dfe4f7] p-4 text-black">
            <h2 className="mb-3 font-serif text-xl uppercase">Dosen Wali</h2>
            <div className="rounded-xl bg-white p-4">
              <p className="font-serif text-xl font-semibold">
                {dataDosenPa.namadosen}
              </p>
              <p className="text-xs font-semibold">Dosen Pembimbing</p>
              <p className="text-xs text-black/60">NPD : {dataDosenPa.npd}</p>

              <ul className="mt-4 space-y-3 text-base font-medium">
                <li className="flex items-center gap-3">
                  <span>✉️</span>
                  <span className="underline">{dataDosenPa.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>📞</span>
                  <span>{dataDosenPa.telp}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>📍</span>
                  <span>Gedung R LT 11</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F5EDED] p-4 text-black">
            <h2 className="mb-3 font-serif text-xl uppercase">Jadwal</h2>
            <div className="rounded-xl bg-white p-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span>{tanggalPanjang}</span>
                <span className="underline">Lihat semua</span>
              </div>

              <ul>
                {dataJadwal.map((j) => (
                  <li
                    key={j.kodemat}
                    className="flex gap-3 border-t py-2 text-xs first:border-t-0"
                  >
                    <span className="w-20 shrink-0">{j.jam}</span>
                    <div>
                      <p className="font-semibold">{j.matkul}</p>
                      <p className="text-black/60">
                        {j.hari} · Ruang {j.ruang}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <aside className="content-start rounded-2xl bg-[#F5EDED] p-4 text-black">
        <div className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-full bg-slate-700 font-serif text-3xl text-white"
            style={{ width: 80, height: 80 }}
          >
            <img src={profile.src} className="rounded-full"></img>
          </div>
          <p className="mt-1 font-serif text-lg">{dataMahasiswa.Nama}</p>
          <button className="mt-1 rounded-full border-2 border-black bg-white px-4 py-0.5 font-serif text-base font-semibold">
            Profile
          </button>
        </div>

        <div className="mt-4 rounded-xl bg-white p-3">
          <p className="mb-2 text-center text-sm font-semibold capitalize">
            {judulBulan}
          </p>
          <div
            className="gap-y-1 text-center text-[11px]"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            }}
          >
            {hariKal.map((h) => (
              <span key={h} className="text-slate-400">
                {h}
              </span>
            ))}
            {sel.map((tgl, i) => (
              <span
                key={i}
                className={
                  tgl === tglHariIni
                    ? "rounded-md bg-slate-900 py-1 text-white"
                    : "py-1"
                }
              >
                {tgl}
              </span>
            ))}
          </div>
        </div>

        <h2 className="mt-4 mb-3 font-serif text-lg">Pengumuman</h2>
        <div className="pt-3">
          {dataPengumuman.map((item, i) => (
            <article
              key={item.id}
              className={`relative min-h-[150px] cursor-pointer rounded-xl border p-4 shadow-md
                transition-all duration-300 ease-out
                ${i > 0 ? "-mt-10" : ""}
                ${i % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}
                hover:z-20 hover:-translate-y-5 hover:rotate-0 hover:shadow-xl
                ${warna[i % warna.length]}`}
            >
              <p className="text-xs opacity-70">
                {item.tanggal.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-tight">
                {item.judul}
              </h3>
              <button className="mt-4 rounded-full border px-3 py-1 text-xs">
                READ MORE
              </button>
            </article>
          ))}
        </div>
      </aside>
    </div>
  );
}

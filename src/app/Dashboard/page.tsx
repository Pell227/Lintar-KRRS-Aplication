import {
  dataMahasiswa,
  dataAkademik,
  dataPengumuman,
  dataJadwal,
  dataDosenPa,
} from "../data/datadash";

export default function Dashboard() {
  const hariIni = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="grid content-start gap-6">
        <div className="rounded-xl bg-[#f31313] p-5 text-white">
          <h1 className="text-2xl font-bold">Halo, {dataMahasiswa.Nama}</h1>
          <p className="text-white/80">
            {dataMahasiswa.NIM} · {dataMahasiswa.Prodi}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#f31313] p-5 text-white">
            <p className="text-sm">IPK</p>
            <p className="text-3xl font-bold">{dataAkademik.ipk}</p>
          </div>
          <div className="rounded-xl bg-[#Ffffff] p-5 text-black">
            <p className="text-sm">IPS Semester {dataAkademik.Semester}</p>
            <p className="text-3xl font-bold">{dataAkademik.ips}</p>
          </div>
          <div className="rounded-xl bg-[#f31313] p-5 text-white">
            <p className="text-sm">Total SKS</p>
            <p className="text-3xl font-bold">{dataAkademik.sks}</p>
          </div>
        </div>

        <section>
          <div className="rounded-lg border p-2 bg-[#ffffff]">
            <h2 className="mb-2 text-xl font-semibold text-black">Dosen PA</h2>
            <p className="gap-4 font-medium text-black">
              {dataDosenPa.namadosen}
            </p>
            <p className="text-sm text-black">NPD : {dataDosenPa.npd}</p>
            <p className="text-sm text-black">Email : {dataDosenPa.email}</p>
            <p className="text-sm text-black">Telepon : {dataDosenPa.telp}</p>
          </div>
        </section>
      </div>

      <aside className="grid content-start gap-6">
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Jadwal</h2>
          <p className="mb-4 text-xs text-slate-500">
            {dataJadwal.length} kelas minggu ini
          </p>

          <ul className="space-y-3">
            {dataJadwal.map((j) => {
              const isToday = j.hari === hariIni;
              return (
                <li key={j.kodemat} className="flex gap-3">
                  <span className="w-11 shrink-0 pt-3 text-xs text-slate-500">
                    {j.jam.split(" - ")[0]}
                  </span>
                  <div
                    className={`flex-1 rounded-xl border-l-4 p-3 ${
                      isToday
                        ? "border-blue-700 bg-blue-500 text-white"
                        : "border-blue-500 bg-slate-100"
                    }`}
                  >
                    <p className="font-medium">{j.matkul}</p>
                    <p
                      className={`text-xs ${
                        isToday ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {j.hari}, {j.jam} · Ruang {j.ruang}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pengumuman</h2>
            <span className="text-xs text-blue-600 underline">Lihat semua</span>
          </div>

          <ul className="space-y-3">
            {dataPengumuman.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl bg-slate-100 p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-lg">
                  📢
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.judul}</p>
                  <p className="text-xs text-slate-500">
                    {item.tanggal.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}


"use client";

import { useState } from "react";

const courses = [
  {
    id: "IF301",
    name: "Basis Data",
    sks: 4,
    semester: 3,
    dosen: "Dr. Budi Santoso",
    kelas: "A",
    jadwal: "Senin, 08.00 - 10.30",
    ruang: "R. 301",
    kuota: 35,
    tersedia: 12,
    prasyarat: "Algoritma dan Pemrograman",
    deskripsi: "Mempelajari konsep basis data, SQL, ERD, normalisasi, dan pengelolaan database.",
  },
  {
    id: "IF302",
    name: "Pemrograman Web",
    sks: 4,
    semester: 3,
    dosen: "Rina Kartika, M.Kom.",
    kelas: "A",
    jadwal: "Selasa, 10.00 - 12.30",
    ruang: "Lab Komputer 1",
    kuota: 30,
    tersedia: 8,
    prasyarat: "Dasar Pemrograman",
    deskripsi: "Mempelajari pengembangan aplikasi web menggunakan HTML, CSS, JavaScript, dan framework.",
  },
  {
    id: "IF303",
    name: "Rekayasa Perangkat Lunak",
    sks: 2,
    semester: 3,
    dosen: "Andi Pratama, M.T.",
    kelas: "A",
    jadwal: "Rabu, 13.00 - 14.40",
    ruang: "R. 302",
    kuota: 35,
    tersedia: 15,
    prasyarat: "Dasar Pemrograman",
    deskripsi: "Mempelajari proses pengembangan perangkat lunak, analisis kebutuhan, desain, dan pengujian.",
  },
  {
    id: "IF304",
    name: "Jaringan Komputer",
    sks: 4,
    semester: 3,
    dosen: "Dewi Lestari, M.Kom.",
    kelas: "A",
    jadwal: "Kamis, 08.00 - 10.30",
    ruang: "Lab Jaringan",
    kuota: 30,
    tersedia: 0,
    prasyarat: "Sistem Operasi",
    deskripsi: "Mempelajari arsitektur jaringan, protokol komunikasi, IP addressing, dan keamanan jaringan.",
  },
  {
    id: "MKU201",
    name: "Bahasa Inggris",
    sks: 2,
    semester: 3,
    dosen: "Sarah Wijaya, M.Pd.",
    kelas: "A",
    jadwal: "Jumat, 09.00 - 10.40",
    ruang: "R. 205",
    kuota: 40,
    tersedia: 20,
    prasyarat: "Tidak ada",
    deskripsi: "Mengembangkan kemampuan bahasa Inggris untuk komunikasi akademik dan profesional.",
  },
];

export default function KatalogKrrs() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof courses)[number] | null
  >(null);

  const filteredCourses = courses.filter((course) =>
    `${course.id} ${course.name} ${course.dosen}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8 rounded-2xl bg-[linear-gradient(115deg,#7c1009_0%,#ab1509_60%,#c52a1d_100%)] px-6 py-7 text-white shadow-lg shadow-[#ab1509]/20 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Portal Akademik
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Katalog Mata Kuliah
          </h1>

          <p className="mt-2 text-white/85">
            Lihat informasi mata kuliah sebelum menyusun rencana studi.
          </p>
        </header>

        {/* Search */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold text-slate-700">
            Cari Mata Kuliah
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan kode, nama mata kuliah, atau dosen..."
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#ab1509] focus:ring-2 focus:ring-[#ab1509]/10"
          />

          <p className="mt-3 text-xs text-slate-500">
            Menampilkan {filteredCourses.length} dari {courses.length} mata kuliah.
          </p>
        </section>

        {/* Course List */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold">Daftar Mata Kuliah</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Kode</th>
                  <th className="px-4 py-4">Mata Kuliah</th>
                  <th className="px-4 py-4 text-center">SKS</th>
                  <th className="px-4 py-4">Dosen</th>
                  <th className="px-4 py-4 text-center">Kuota Tersedia</th>
                  <th className="px-5 py-4 text-center">Detail</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-slate-600">
                      {course.id}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {course.name}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {course.sks}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {course.dosen}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.tersedia === 0
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {course.tersedia} / {course.kuota}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="rounded-lg border border-[#ab1509] px-3 py-2 text-xs font-semibold text-[#ab1509] transition hover:bg-red-50"
                      >
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                      Mata kuliah tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#ab1509]">
                    {selectedCourse.id}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    {selectedCourse.name}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="rounded-lg px-3 py-1 text-xl text-slate-400 hover:bg-slate-100"
                  aria-label="Tutup detail"
                >
                  ×
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {selectedCourse.deskripsi}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  ["SKS", selectedCourse.sks],
                  ["Semester", selectedCourse.semester],
                  ["Dosen", selectedCourse.dosen],
                  ["Kelas", selectedCourse.kelas],
                  ["Jadwal", selectedCourse.jadwal],
                  ["Ruang", selectedCourse.ruang],
                  ["Kuota", `${selectedCourse.tersedia} dari ${selectedCourse.kuota} tersedia`],
                  ["Prasyarat", selectedCourse.prasyarat],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="mt-7 w-full rounded-lg bg-[#ab1509] px-5 py-3 text-sm font-semibold text-white hover:bg-[#861007]"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => window.location.href = "/krrs"}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            ← Kembali ke Pengisian KRRS
          </button>
        </div>
      </div>
    </main>
  );
}

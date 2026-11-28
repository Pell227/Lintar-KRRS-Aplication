
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/themeprovider";

const courses = [
  {
    id: "IF301",
    name: "Basis Data",
    sks: 4,
    kelas: "A",
    jadwal: [
      { waktu: "Senin, 07.30–09.10", ruang: "R. 301" },
      { waktu: "Senin, 09.30–11.10", ruang: "R. 301" },
    ],
  },
  {
    id: "IF302",
    name: "Pemrograman Web",
    sks: 2,
    kelas: "B",
    jadwal: [
      {
        waktu: "Selasa, 10.00–11.40",
        ruang: "Lab. Pemrograman 2",
      },
    ],
  },
  {
    id: "IF303",
    name: "Rekayasa Perangkat Lunak",
    sks: 4,
    kelas: "A",
    jadwal: [
      { waktu: "Rabu, 13.00–14.40", ruang: "R. 205" },
      { waktu: "Rabu, 15.00–16.40", ruang: "R. 205" },
    ],
  },
  {
    id: "IF304",
    name: "Jaringan Komputer",
    sks: 4,
    kelas: "B",
    jadwal: [
      {
        waktu: "Kamis, 07.30–09.10",
        ruang: "Lab. Jaringan 1",
      },
      {
        waktu: "Kamis, 09.30–11.10",
        ruang: "Lab. Jaringan 1",
      },
    ],
  },
  {
    id: "MKU201",
    name: "Bahasa Inggris",
    sks: 4,
    kelas: "A",
    jadwal: [
      { waktu: "Jumat, 09.30–11.10", ruang: "R. 402" },
      { waktu: "Jumat, 11.30–13.10", ruang: "R. 402" },
    ],
  },
  {
    id: "IF305",
    name: "Struktur Data",
    sks: 2,
    kelas: "A",
    jadwal: [
      {
        waktu: "Senin, 13.00–14.40",
        ruang: "Lab. Komputer 1",
      },
    ],
  },
];

const STORAGE_KEY = "lintar-krrs-selected";

export default function CetakKrrs() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selected, setSelected] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const validIds = parsed.filter((id) =>
            courses.some((course) => course.id === id)
          );

          setSelected(validIds);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoaded(true);
  }, []);

  const selectedCourses = courses.filter((course) =>
    selected.includes(course.id)
  );

  const totalCredits = selectedCourses.reduce(
    (total, course) => total + course.sks,
    0
  );

  const isValid = totalCredits >= 20 && totalCredits <= 24;
  const accentColor = isDark ? "#2F578A" : "#D72323";

  function printKrrs() {
    window.print();
  }

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Memuat KRRS...</p>
      </main>
    );
  }

  if (selectedCourses.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 text-center text-black shadow-lg">
          <h1 className="text-xl font-bold">
            KRRS Belum Tersedia
          </h1>

          <p className="mt-2 text-sm text-black/60">
            Kamu belum memilih mata kuliah. Silakan kembali ke halaman
            pengisian KRRS.
          </p>

          <button
            onClick={() => router.push("/krrs")}
            className="mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: accentColor }}
          >
            Kembali ke Pengisian KRRS
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Halaman */}
        <header
          className="mb-8 rounded-2xl px-6 py-7 text-white shadow-lg sm:px-8 print:hidden"
          style={{
            background: isDark
              ? "linear-gradient(to right, #2F578A, #121358)"
              : "#D72323",
          }}
        >
          <h1 className="mt-2 text-3xl font-bold">
            Cetak KRRS
          </h1>

          <p className="mt-2 text-white/85">
            Pastikan data Kartu Rencana Studi sudah benar sebelum dicetak.
          </p>
        </header>

        {/* Dokumen KRRS */}
        <section className="krrs-document relative overflow-hidden border border-black/10 bg-white p-6 text-black shadow-xl sm:p-10 print:border-0 print:p-0 print:shadow-none">
          {/* Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img
              src="/pngwing.com.png"
              alt=""
              className="w-[420px] max-w-[65%] object-contain opacity-[0.07]"
            />
          </div>

          {/* Isi Dokumen */}
          <div className="relative z-10">
            {/* Header Universitas */}
            <div className="relative flex items-center justify-center border-b-2 border-[#D72323] pb-3">
              <img
                src="/pngwing.com.png"
                alt="Logo Universitas Tarumanagara"
                className="absolute left-0 h-16 w-16 object-contain"
              />

              <div className="text-center">
                <h2 className="text-xl font-bold tracking-wide sm:text-2xl">
                  UNIVERSITAS TARUMANAGARA
                </h2>

                <p className="mt-1 text-[10px] text-gray-600 sm:text-xs">
                  Jl. Letjen S. Parman No. 1, Jakarta Barat, 11440
                </p>

                <p className="text-[10px] text-gray-600 sm:text-xs">
                  www.untar.ac.id
                </p>
              </div>
            </div>

            {/* Judul Dokumen */}
            <div className="mb-6 mt-4 text-center">
              <h1 className="text-base font-bold uppercase">
                Kartu Studi Semester
              </h1>

              <p className="mt-1 text-xs uppercase">
                Tahun Ajaran 2026/2027 Semester Ganjil
              </p>
            </div>

            {/* Informasi Mahasiswa */}
            <div className="mb-5 grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm">
              {/* Informasi Kiri */}
              <div className="space-y-2">
                <div className="grid grid-cols-[100px_10px_1fr]">
                  <span className="whitespace-nowrap">NIM</span>
                  <span>:</span>
                  <span>535250161</span>
                </div>

                <div className="grid grid-cols-[100px_10px_1fr]">
                  <span className="whitespace-nowrap">Nama</span>
                  <span>:</span>
                  <span>Azzarqy Fizran M Nasrun</span>
                </div>

                <div className="grid grid-cols-[100px_10px_1fr]">
                  <span className="whitespace-nowrap">IPS Terakhir</span>
                  <span>:</span>
                  <span>4.0</span>
                </div>
              </div>

              {/* Informasi Kanan */}
              <div className="space-y-2">
                <div className="grid grid-cols-[100px_10px_1fr]">
                  <span className="whitespace-nowrap">SKS Kumulatif</span>
                  <span>:</span>
                  <span>40</span>
                </div>

                <div className="grid grid-cols-[100px_10px_1fr]">
                  <span className="whitespace-nowrap">IPK</span>
                  <span>:</span>
                  <span>4.0</span>
                </div>

                <div className="grid grid-cols-[100px_10px_1fr]">
                  <span className="whitespace-nowrap">Program Studi</span>
                  <span>:</span>
                  <span>Teknik Informatika</span>
                </div>
              </div>
            </div>

            {/* Status KRRS - Tidak Dicetak */}
            <div
              className={`mb-4 rounded-md border p-3 text-xs font-medium print:hidden ${
                isValid
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {isValid
                ? `KRRS valid: ${totalCredits} SKS.`
                : `KRRS belum valid: ${totalCredits} SKS. Batas pengambilan adalah 20–24 SKS.`}
            </div>

            {/* Tabel Mata Kuliah */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-[11px]">
                <thead>
                  <tr className="bg-gray-100 text-center font-bold">
                    <th className="border border-gray-500 px-2 py-2">
                      Kode
                    </th>

                    <th className="border border-gray-500 px-2 py-2">
                      Mata Kuliah
                    </th>

                    <th className="border border-gray-500 px-2 py-2">
                      SKS
                    </th>

                    <th className="border border-gray-500 px-2 py-2">
                      Kls
                    </th>

                    <th className="border border-gray-500 px-2 py-2">
                      Ruang
                    </th>

                    <th className="border border-gray-500 px-2 py-2">
                      Waktu Kuliah
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {selectedCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="border border-gray-500 px-2 py-2 text-center">
                        {course.id}
                      </td>

                      <td className="border border-gray-500 px-2 py-2">
                        {course.name}
                      </td>

                      <td className="border border-gray-500 px-2 py-2 text-center">
                        {course.sks}
                      </td>

                      <td className="border border-gray-500 px-2 py-2 text-center">
                        {course.kelas}
                      </td>

                      <td className="border border-gray-500 px-2 py-2">
                        <div className="flex flex-col gap-1">
                          {course.jadwal.map((sesi, index) => (
                            <span key={index}>{sesi.ruang}</span>
                          ))}
                        </div>
                      </td>

                      <td className="border border-gray-500 px-2 py-2">
                        <div className="flex flex-col gap-1">
                          {course.jadwal.map((sesi, index) => (
                            <span key={index}>{sesi.waktu}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="font-bold">
                    <td
                      colSpan={2}
                      className="border border-gray-500 px-2 py-2 text-center"
                    >
                      Total SKS:
                    </td>

                    <td className="border border-gray-500 px-2 py-2 text-center">
                      {totalCredits}
                    </td>

                    <td
                      colSpan={3}
                      className="border border-gray-500 px-2 py-2"
                    />
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Informasi Cetakan */}
            <div className="mt-5 flex justify-end text-right text-[10px]">
              <div>
                <p>Cetakan Perubahan ke-1</p>
                <p>Jakarta, 28 November 2026</p>
              </div>
            </div>

            {/* Garis Pemisah */}
            <div className="my-4 border-t border-dotted border-gray-500" />

            {/* Perhatian */}
            <div className="text-[10px]">
              <p className="mb-2 font-bold uppercase">PERHATIAN</p>

              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Nomor Registrasi Anda adalah 535250168.
                </li>

                <li>
                  Harap cetak dan simpan lembar ini dengan baik untuk
                  keperluan administrasi akademik.
                </li>

                <li>
                  KRRS ini merupakan bukti pengambilan mata kuliah pada
                  semester berjalan.
                </li>
              </ul>
            </div>

            {/* Garis Merah Penutup */}
            <div className="mt-4 border-t-2 border-[#D72323]" />
          </div>
        </section>

        {/* Tombol Navigasi */}
        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row print:hidden">
          <button
            onClick={() => router.push("/krrs/sementara")}
            className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
              isDark
                ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                : "border-black/15 bg-white text-black hover:bg-[#f5eded]"
            }`}
          >
            ← Kembali ke KRRS Sementara
          </button>

          <button
            onClick={printKrrs}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Cetak / Simpan PDF
          </button>
        </div>
      </div>

      {/* Pengaturan Cetak */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 8mm;
          }

          html,
          body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden;
          }

          .krrs-document,
          .krrs-document * {
            visibility: visible;
          }

          main {
            min-height: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
          }

          main > div {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .krrs-document {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            border: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
          }

          .krrs-document * {
            color: #000000 !important;
            text-shadow: none !important;
          }

          /* Header universitas */
          .krrs-document h1,
          .krrs-document h2,
          .krrs-document p,
          .krrs-document span,
          .krrs-document li {
            color: #000000 !important;
          }

          /* Garis merah header dan footer */
          .krrs-document .border-b-2 {
            border-bottom: 2px solid #D72323 !important;
          }

          .krrs-document .border-t-2 {
            border-top: 2px solid #D72323 !important;
          }

          /* Garis pemisah */
          .krrs-document .border-t {
            border-top: 1px dotted #555555 !important;
          }

          /* Tabel */
          .krrs-document table {
            display: table !important;
            width: 100% !important;
            min-width: 0 !important;
            border-collapse: collapse !important;
            border-spacing: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 9px !important;
          }

          .krrs-document thead {
            display: table-header-group !important;
          }

          .krrs-document tbody {
            display: table-row-group !important;
          }

          .krrs-document tfoot {
            display: table-footer-group !important;
          }

          .krrs-document tr {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .krrs-document th,
          .krrs-document td {
            border: 1px solid #555555 !important;
            color: #000000 !important;
            background: transparent !important;
            padding: 4px 6px !important;
          }

          .krrs-document th {
            background: #eeeeee !important;
            font-weight: bold !important;
          }

          /* Wrapper tabel */
          .krrs-document .overflow-x-auto {
            overflow: visible !important;
          }

          /* Logo dan watermark */
          .krrs-document img {
            filter: none !important;
            print-color-adjust: exact !important;
          }

          .krrs-document .pointer-events-none {
            opacity: 1 !important;
          }

          /* Elemen yang tidak perlu dicetak */
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
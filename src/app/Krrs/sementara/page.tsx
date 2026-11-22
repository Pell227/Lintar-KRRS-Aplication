
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const courses = [
  { id: "IF301", name: "Basis Data", sks: 4, dosen: "Dr. Budi Santoso" },
  {
    id: "IF302",
    name: "Pemrograman Web",
    sks: 4,
    dosen: "Rina Kartika, M.Kom.",
  },
  {
    id: "IF303",
    name: "Rekayasa Perangkat Lunak",
    sks: 2,
    dosen: "Andi Pratama, M.T.",
  },
  {
    id: "IF304",
    name: "Jaringan Komputer",
    sks: 4,
    dosen: "Dewi Lestari, M.Kom.",
  },
  {
    id: "MKU201",
    name: "Bahasa Inggris",
    sks: 2,
    dosen: "Sarah Wijaya, M.Pd.",
  },
];

const STORAGE_KEY = "lintar-krrs-selected";

export default function KrrsSementara() {
  const router = useRouter();

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

  function printKrrs() {
    window.print();
  }

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Memuat KRRS...</p>
      </main>
    );
  }

  if (selectedCourses.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <h1 className="text-xl font-bold text-slate-800">
            KRRS Belum Tersedia
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Kamu belum memilih mata kuliah. Silakan kembali ke halaman
            pengisian KRRS.
          </p>

          <button
            onClick={() => router.push("/krrs")}
            className="mt-6 rounded-lg bg-[#ab1509] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#861007]"
          >
            Kembali ke Pengisian KRRS
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8 rounded-2xl bg-[linear-gradient(115deg,#7c1009_0%,#ab1509_60%,#c52a1d_100%)] px-6 py-7 text-white shadow-lg shadow-[#ab1509]/20 sm:px-8 print:hidden">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Portal Akademik
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            KRRS Sementara
          </h1>

          <p className="mt-2 text-white/85">
            Periksa kembali mata kuliah yang telah kamu pilih.
          </p>
        </header>

        {/* Document */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl shadow-black/5 sm:p-8 print:border-0 print:p-0 print:shadow-none">

          {/* Document Header */}
          <div className="border-b-2 border-[#ab1509] pb-5 text-center">
            <h2 className="text-xl font-bold uppercase tracking-wide text-[#ab1509]">
              Kartu Rencana Studi
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-600">
              Semester Ganjil Tahun Akademik 2026/2027
            </p>

            <p className="mt-2 text-xs text-slate-400">
              DOKUMEN SEMENTARA
            </p>
          </div>

          {/* Student Information */}
          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Nama Mahasiswa</p>
              <p className="mt-1 font-semibold">Windriew</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">NIM</p>
              <p className="mt-1 font-semibold">535250168</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Program Studi</p>
              <p className="mt-1 font-semibold">Teknik Informatika</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Semester Akademik</p>
              <p className="mt-1 font-semibold">Ganjil 2026/2027</p>
            </div>
          </div>

          {/* Course Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="border border-slate-300 px-3 py-3 text-center">
                    No.
                  </th>
                  <th className="border border-slate-300 px-3 py-3">
                    Kode MK
                  </th>
                  <th className="border border-slate-300 px-3 py-3">
                    Mata Kuliah
                  </th>
                  <th className="border border-slate-300 px-3 py-3">
                    Dosen
                  </th>
                  <th className="border border-slate-300 px-3 py-3 text-center">
                    SKS
                  </th>
                </tr>
              </thead>

              <tbody>
                {selectedCourses.map((course, index) => (
                  <tr key={course.id}>
                    <td className="border border-slate-300 px-3 py-3 text-center">
                      {index + 1}
                    </td>

                    <td className="border border-slate-300 px-3 py-3 font-medium">
                      {course.id}
                    </td>

                    <td className="border border-slate-300 px-3 py-3 font-medium">
                      {course.name}
                    </td>

                    <td className="border border-slate-300 px-3 py-3">
                      {course.dosen}
                    </td>

                    <td className="border border-slate-300 px-3 py-3 text-center">
                      {course.sks}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="bg-slate-50 font-bold">
                  <td
                    colSpan={4}
                    className="border border-slate-300 px-3 py-3 text-right"
                  >
                    Total SKS
                  </td>

                  <td className="border border-slate-300 px-3 py-3 text-center">
                    {totalCredits}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 flex flex-wrap justify-between gap-3 rounded-lg bg-slate-50 p-4 print:border print:border-slate-300">
            <div>
              <p className="text-sm text-slate-500">
                Jumlah Mata Kuliah
              </p>
              <p className="text-lg font-bold">
                {selectedCourses.length} Mata Kuliah
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">
                Total Beban Studi
              </p>
              <p className="text-lg font-bold text-[#ab1509]">
                {totalCredits} SKS
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-12 grid grid-cols-2 gap-8 text-center text-sm">
            <div>
              <p>Mahasiswa,</p>
              <div className="h-20" />
              <p className="font-semibold underline">Windriew</p>
              <p>535250168</p>
            </div>

            <div>
              <p>Dosen Pembimbing Akademik,</p>
              <div className="h-20" />
              <p className="font-semibold">
                ................................
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Dokumen ini merupakan rancangan KRRS dan belum menjadi bukti
            pengesahan akademik.
          </p>
        </section>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row print:hidden">
          <button
            onClick={() => router.push("/krrs")}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            ← Kembali untuk Mengubah KRRS
          </button>

          <button
            onClick={printKrrs}
            className="rounded-lg bg-[#ab1509] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#861007]"
          >
            Cetak / Simpan PDF
          </button>
        </div>
      </div>

      {/* Print Styling */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            background: white !important;
          }

          main {
            min-height: auto !important;
            padding: 0 !important;
            background: white !important;
          }

          section {
            width: 100% !important;
          }

          table {
            min-width: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}


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
      {
        waktu: "Senin, 07.30–09.10",
        ruang: "R. 301",
      },
      {
        waktu: "Senin, 09.30–11.10",
        ruang: "R. 301",
      },
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
      {
        waktu: "Rabu, 13.00–14.40",
        ruang: "R. 205",
      },
      {
        waktu: "Rabu, 15.00–16.40",
        ruang: "R. 205",
      },
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
      {
        waktu: "Jumat, 09.30–11.10",
        ruang: "R. 402",
      },
      {
        waktu: "Jumat, 11.30–13.10",
        ruang: "R. 402",
      },
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

export default function KrrsSementara() {
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

  const cardStyle = isDark
    ? "border-white/10 bg-white/5"
    : "border-black/10 bg-white";

  const mainText = isDark ? "text-white" : "text-black";

  const mutedText = isDark
    ? "text-white"
    : "text-black/60";

  const borderStyle = isDark
    ? "border-white/10"
    : "border-black/10";

  const tableHeader = isDark
    ? "bg-[#252B35] text-white/80"
    : "bg-[#F3F4F6] text-[#374151]";

  const hoverStyle = isDark
    ? "hover:bg-white/5"
    : "hover:bg-[#f5eded]";

  const accentColor = isDark ? "#2F578A" : "#D72323";

  if (!loaded) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center ${mainText}`}
      >
        <p className={mutedText}>Memuat KRRS...</p>
      </main>
    );
  }

  if (selectedCourses.length === 0) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center px-4 ${mainText}`}
      >
        <div
          className={`w-full max-w-md rounded-2xl border p-8 text-center shadow-lg ${cardStyle}`}
        >
          <h1 className="text-xl font-bold">
            KRRS Belum Tersedia
          </h1>

          <p className={`mt-2 text-sm ${mutedText}`}>
            Kamu belum memilih mata kuliah. Silakan kembali ke halaman
            pengisian KRRS.
          </p>

          <button
            onClick={() => router.push("/krrs")}
            className="mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Kembali ke Pengisian KRRS
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen px-4 py-8 sm:px-8 ${mainText}`}>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header
          className="mb-8 rounded-2xl px-6 py-7 text-white shadow-lg sm:px-8"
          style={{
            background: isDark
              ? "linear-gradient(to right, #2F578A, #121358)"
              : "#D72323",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Portal Akademik
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            KRRS Sementara
          </h1>

          <p className="mt-2 text-white/85">
            Periksa kembali mata kuliah yang telah kamu pilih sebelum
            melanjutkan ke proses pencetakan.
          </p>
        </header>

        {/* Informasi Mahasiswa */}
        <section
          className={`mb-6 grid gap-4 rounded-xl border p-5 shadow-lg shadow-black/5 sm:grid-cols-2 ${cardStyle}`}
        >
          <div>
            <p className={`text-sm ${mutedText}`}>
              Mahasiswa
            </p>

            <p className="mt-1 font-semibold">
              Azzarqy Fizran M Nasrun
            </p>

            <p className={`text-sm ${mutedText}`}>
              535250161
            </p>
          </div>

          <div>
            <p className={`text-sm ${mutedText}`}>
              Semester Akademik
            </p>

            <p className="mt-1 font-semibold">
              Ganjil 2026/2027
            </p>
          </div>
        </section>

        {/* Daftar Mata Kuliah */}
        <section
          className={`overflow-hidden rounded-xl border shadow-xl shadow-black/5 ${cardStyle}`}
        >
          <div
            className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 ${borderStyle}`}
          >
            <div>
              <h2 className="font-semibold">
                Daftar Mata Kuliah
              </h2>

              <p className={`mt-1 text-sm ${mutedText}`}>
                Berikut mata kuliah yang telah kamu pilih.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className={tableHeader}>
                <tr>
                  <th className="px-5 py-3">
                    Kode
                  </th>

                  <th className="px-4 py-3">
                    Mata Kuliah
                  </th>

                  <th className="px-4 py-3 text-center">
                    SKS
                  </th>

                  <th className="px-4 py-3 text-center">
                    Kelas
                  </th>

                  <th className="px-4 py-3">
                    Jadwal
                  </th>

                  <th className="px-4 py-3">
                    Ruang
                  </th>
                </tr>
              </thead>

              <tbody className={`divide-y ${borderStyle}`}>
                {selectedCourses.map((course) => (
                  <tr
                    key={course.id}
                    className={`transition ${hoverStyle}`}
                  >
                    <td
                      className={`px-5 py-4 font-medium ${mutedText}`}
                    >
                      {course.id}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {course.name}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {course.sks}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {course.kelas}
                    </td>

                    {/* Jadwal per sesi */}
                    <td className={`px-4 py-4 ${mutedText}`}>
                      <div className="flex flex-col gap-2 whitespace-nowrap">
                        {course.jadwal.map((sesi, index) => (
                          <span key={index}>
                            {sesi.waktu}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Ruang per sesi */}
                    <td className={`px-4 py-4 ${mutedText}`}>
                      <div className="flex flex-col gap-2 whitespace-nowrap">
                        {course.jadwal.map((sesi, index) => (
                          <span key={index}>
                            {sesi.ruang}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total SKS */}
          <div
            className={`border-t px-5 py-4 ${borderStyle}`}
          >
            <div>
              <p className={`text-sm ${mutedText}`}>
                Total SKS
              </p>

              <p className="mt-1 text-2xl font-bold">
                {totalCredits} SKS
              </p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row">
          <button
            onClick={() => router.push("/krrs")}
            className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
              isDark
                ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                : "border-black/15 bg-white text-black hover:bg-[#f5eded]"
            }`}
          >
            ← Kembali untuk Mengubah KRRS
          </button>

          <button
            onClick={() => router.push("/krrs/cetak")}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Lanjutkan ke Cetak KRRS →
          </button>
        </div>
      </div>
    </main>
  );
}

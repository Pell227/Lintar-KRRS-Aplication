"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/themeprovider";

interface Jadwal {
  sesi: number;
  hari: string;
  mulai: string;
  selesai: string;
  ruang: string;
}

interface Course {
  _id: string;
  kode: string;
  nama: string;
  sks: number;
  kelas: string;
  jadwal: Jadwal[];
}

const STORAGE_KEY = "lintar-krrs-selected";

export default function KrrsSementara() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
          setSelected([]);
          return;
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
          setSelected([]);
          return;
        }

        setSelected(parsed);

        const response = await fetch("/api/matakuliah");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data mata kuliah."
          );
        }

        setCourses(result.data);
      } catch (err) {
        console.error("Gagal memuat KRRS:", err);

        setError(
          "Gagal mengambil data KRRS. Silakan muat ulang halaman."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const selectedCourses = courses.filter((course) =>
    selected.includes(course.kode)
  );

  const totalCredits = selectedCourses.reduce(
    (total, course) => total + course.sks,
    0
  );

  const cardStyle = isDark
    ? "border-white/10 bg-white/5"
    : "border-black/10 bg-white";

  const mainText = isDark
    ? "text-white"
    : "text-black";

  const mutedText = isDark
    ? "text-white/70"
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

  const accentColor = isDark
    ? "#2F578A"
    : "#D72323";

  if (loading) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center ${mainText}`}
      >
        <p className={mutedText}>
          Memuat KRRS...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center px-4 ${mainText}`}
      >
        <div
          className={`w-full max-w-md rounded-2xl border p-8 text-center shadow-lg ${cardStyle}`}
        >
          <h1 className="text-xl font-bold">
            Gagal Memuat KRRS
          </h1>

          <p className={`mt-2 text-sm ${mutedText}`}>
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: accentColor }}
          >
            Muat Ulang
          </button>
        </div>
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
    <main
      className={`min-h-screen px-4 py-8 sm:px-8 ${mainText}`}
    >
      <div className="mx-auto max-w-6xl">

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

              <tbody
                className={`divide-y ${borderStyle}`}
              >
                {selectedCourses.map((course) => (
                  <tr
                    key={course._id}
                    className={`transition ${hoverStyle}`}
                  >

                    <td
                      className={`px-5 py-4 font-medium ${mutedText}`}
                    >
                      {course.kode}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {course.nama}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {course.sks}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {course.kelas || "-"}
                    </td>

                    <td
                      className={`px-4 py-4 ${mutedText}`}
                    >
                      <div className="flex flex-col gap-2 whitespace-nowrap">
                        {course.jadwal?.map((sesi) => (
                          <span key={sesi.sesi}>
                            {sesi.hari},{" "}
                            {sesi.mulai}–{sesi.selesai}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td
                      className={`px-4 py-4 ${mutedText}`}
                    >
                      <div className="flex flex-col gap-2 whitespace-nowrap">
                        {course.jadwal?.map((sesi) => (
                          <span key={sesi.sesi}>
                            {sesi.ruang || "-"}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

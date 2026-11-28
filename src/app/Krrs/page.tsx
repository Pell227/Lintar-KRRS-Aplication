
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/themeprovider";

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

const MIN_CREDITS = 20;
const MAX_CREDITS = 24;
const STORAGE_KEY = "lintar-krrs-selected";

export default function Krrs() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";


  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/matakuliah");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data mata kuliah."
          );
        }

        const fetchedCourses: Course[] = result.data;

        setCourses(fetchedCourses);

        // Ambil pilihan sebelumnya dari LocalStorage
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved !== null) {
          try {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
              const validIds = parsed.filter((kode) =>
                fetchedCourses.some(
                  (course) => course.kode === kode
                )
              );

              // Pastikan pilihan tidak melebihi 24 SKS
              const validSelection: string[] = [];
              let credits = 0;

              for (const kode of validIds) {
                const course = fetchedCourses.find(
                  (item) => item.kode === kode
                );

                if (
                  course &&
                  credits + course.sks <= MAX_CREDITS
                ) {
                  validSelection.push(kode);
                  credits += course.sks;
                }
              }

              setSelected(validSelection);
            }
          } catch {
            localStorage.removeItem(STORAGE_KEY);
          }
        }

        setError("");
      } catch (err) {
        console.error("Gagal mengambil mata kuliah:", err);
        setError(
          "Gagal mengambil data mata kuliah. Silakan muat ulang halaman."
        );
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selected)
      );
    }
  }, [selected, loaded]);

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

  const mutedText = isDark
    ? "text-white/60"
    : "text-black/60";

  const mainText = isDark
    ? "text-white"
    : "text-black";

  const borderStyle = isDark
    ? "border-white/10"
    : "border-black/10";

  const tableHeader = isDark
    ? "bg-[#252B35] text-white/80"
    : "bg-[#F3F4F6] text-[#374151]";

  const hoverStyle = isDark
    ? "hover:bg-white/5"
    : "hover:bg-[#f5eded]";

  function toggleCourse(kode: string) {
    setError("");

    setSelected((current) => {
      // Batalkan pilihan
      if (current.includes(kode)) {
        return current.filter((item) => item !== kode);
      }

      const course = courses.find(
        (item) => item.kode === kode
      );

      if (!course) return current;

      const currentCredits = courses
        .filter((item) => current.includes(item.kode))
        .reduce((total, item) => total + item.sks, 0);

      if (currentCredits + course.sks > MAX_CREDITS) {
        setError(
          "Total SKS Anda melebihi batas maksimal 24 SKS. Silakan kurangi mata kuliah yang dipilih."
        );

        return current;
      }

      return [...current, kode];
    });
  }

  function continueToSummary() {
    setError("");

    if (totalCredits < MIN_CREDITS) {
      setError(
        "Total SKS Anda belum memenuhi batas minimal 20 SKS. Silakan pilih mata kuliah tambahan."
      );

      return;
    }

    if (totalCredits > MAX_CREDITS) {
      setError(
        "Total SKS Anda melebihi batas maksimal 24 SKS."
      );

      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(selected)
    );

    router.push("/krrs/sementara");
  }

  return (
    <main
      className={`min-h-screen px-4 py-8 sm:px-8 ${mainText}`}
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

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
            Pengisian KRRS
          </h1>

          <p className="mt-2 text-white/85">
            Pilih mata kuliah untuk rencana studi semester ini.
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
            className={`border-b px-5 py-4 ${borderStyle}`}
          >
            <h2 className="font-semibold">
              Daftar Mata Kuliah
            </h2>

            <p className={`mt-1 text-sm ${mutedText}`}>
              Pilih mata kuliah yang ingin diambil.
            </p>
          </div>

          {loading && (
            <div className="px-5 py-10 text-center">
              <p className={mutedText}>
                Memuat data mata kuliah...
              </p>
            </div>
          )}

          {!loading && error && courses.length === 0 && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-red-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{
                  backgroundColor: isDark
                    ? "#2F578A"
                    : "#D72323",
                }}
              >
                Muat Ulang
              </button>
            </div>
          )}

          {!loading && courses.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left text-sm">

                <thead className={tableHeader}>
                  <tr>
                    <th className="w-14 px-5 py-3">
                      Pilih
                    </th>

                    <th className="px-4 py-3">
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
                  {courses.map((course) => {
                    const isSelected = selected.includes(
                      course.kode
                    );

                    return (
                      <tr
                        key={course._id}
                        className={`transition ${hoverStyle}`}
                      >
                        {/* CHECKBOX */}

                        <td className="px-5 py-4">
                          <input
                            aria-label={`Pilih ${course.nama}`}
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              toggleCourse(course.kode)
                            }
                            className={`h-4 w-4 rounded ${
                              isDark
                                ? "accent-[#2F578A]"
                                : "accent-[#D72323]"
                            }`}
                          />
                        </td>

                        {/* KODE */}

                        <td
                          className={`px-4 py-4 font-medium ${mutedText}`}
                        >
                          {course.kode}
                        </td>

                        {/* NAMA */}

                        <td className="px-4 py-4 font-semibold">
                          {course.nama}
                        </td>

                        {/* SKS */}

                        <td className="px-4 py-4 text-center">
                          {course.sks}
                        </td>

                        {/* KELAS */}

                        <td className="px-4 py-4 text-center">
                          {course.kelas || "-"}
                        </td>

                        {/* JADWAL */}

                        <td
                          className={`px-4 py-4 ${mutedText}`}
                        >
                          <div className="flex flex-col gap-1 whitespace-nowrap">
                            {course.jadwal?.map((jadwal) => (
                              <span key={jadwal.sesi}>
                                {jadwal.hari},{" "}
                                {jadwal.mulai}–{jadwal.selesai}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* RUANG */}

                        <td
                          className={`px-4 py-4 ${mutedText}`}
                        >
                          <div className="flex flex-col gap-1 whitespace-nowrap">
                            {course.jadwal?.map((jadwal) => (
                              <span key={jadwal.sesi}>
                                {jadwal.ruang || "-"}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {error && courses.length > 0 && (
            <div
              role="alert"
              className={`mx-5 mt-4 rounded-lg border px-4 py-3 text-sm ${
                isDark
                  ? "border-red-400/30 bg-red-400/10 text-red-300"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {error}
            </div>
          )}

          <div
            className={`border-t px-5 py-4 ${borderStyle}`}
          >
            <div className="mb-4">
              <p className={`text-sm ${mutedText}`}>
                Total SKS
              </p>

              <p className="text-2xl font-bold">
                {totalCredits} SKS
              </p>

              <p className={`mt-1 text-xs ${mutedText}`}>
                Minimal 20 SKS dan maksimal 24 SKS
              </p>
            </div>

            <div
              className={`mb-5 h-2 overflow-hidden rounded-full ${
                isDark ? "bg-white/10" : "bg-black/10"
              }`}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (totalCredits / MAX_CREDITS) * 100,
                    100
                  )}%`,
                  backgroundColor: isDark
                    ? "#2F578A"
                    : "#D72323",
                }}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={continueToSummary}
                disabled={!loaded || loading}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  backgroundColor: isDark
                    ? "#2F578A"
                    : "#D72323",
                }}
              >
                Lanjutkan ke KRRS Sementara →
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

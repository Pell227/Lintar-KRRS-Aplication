
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/themeprovider";

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

const MIN_CREDITS = 20;
const MAX_CREDITS = 24;
const STORAGE_KEY = "lintar-krrs-selected";

export default function Krrs() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selected, setSelected] = useState<string[]>([
    "IF301",
    "IF302",
  ]);

  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const totalCredits = courses
    .filter((course) => selected.includes(course.id))
    .reduce((total, course) => total + course.sks, 0);

  const cardStyle = isDark
    ? "border-white/10 bg-white/5"
    : "border-black/10 bg-white";

  const mutedText = isDark
    ? "text-white"
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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const validIds = parsed.filter((id) =>
            courses.some((course) => course.id === id)
          );

          const validSelection: string[] = [];
          let credits = 0;

          for (const id of validIds) {
            const course = courses.find(
              (item) => item.id === id
            );

            if (
              course &&
              credits + course.sks <= MAX_CREDITS
            ) {
              validSelection.push(id);
              credits += course.sks;
            }
          }

          setSelected(validSelection);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selected)
      );
    }
  }, [selected, loaded]);

  function toggleCourse(id: string) {
    setError("");

    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      const course = courses.find(
        (item) => item.id === id
      );

      if (!course) return current;

      const currentCredits = courses
        .filter((item) => current.includes(item.id))
        .reduce((total, item) => total + item.sks, 0);

      if (currentCredits + course.sks > MAX_CREDITS) {
        setError(
          "Total SKS Anda melebihi batas maksimal. Silakan kurangi mata kuliah yang dipilih."
        );

        return current;
      }

      return [...current, id];
    });
  }

  function continueToSummary() {
    if (totalCredits < MIN_CREDITS) {
      setError(
        "Total SKS Anda belum memenuhi batas minimal. Silakan pilih mata kuliah tambahan."
      );

      return;
    }

    if (totalCredits > MAX_CREDITS) {
      setError(
        "Total SKS Anda melebihi batas maksimal. Silakan kurangi mata kuliah yang dipilih."
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
            Pengisian KRRS
          </h1>

          <p className="mt-2 text-white/85">
            Pilih mata kuliah untuk rencana studi semester ini.
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
            className={`border-b px-5 py-4 ${borderStyle}`}
          >
            <h2 className="font-semibold">
              Daftar Mata Kuliah
            </h2>

            <p className={`mt-1 text-sm ${mutedText}`}>
              Pilih mata kuliah yang ingin diambil.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
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

              <tbody
                className={`divide-y ${borderStyle}`}
              >
                {courses.map((course) => {
                  const isSelected = selected.includes(
                    course.id
                  );

                  return (
                    <tr
                      key={course.id}
                      className={`transition ${hoverStyle}`}
                    >
                      <td className="px-5 py-4">
                        <input
                          aria-label={`Pilih ${course.name}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleCourse(course.id)
                          }
                          className={`h-4 w-4 rounded ${
                            isDark
                              ? "accent-[#2F578A]"
                              : "accent-[#D72323]"
                          }`}
                        />
                      </td>

                      <td
                        className={`px-4 py-4 font-medium ${mutedText}`}
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
                      <td
                        className={`px-4 py-4 ${mutedText}`}
                      >
                        <div className="flex flex-col gap-2 whitespace-nowrap">
                          {course.jadwal.map(
                            (sesi, index) => (
                              <span key={index}>
                                {sesi.waktu}
                              </span>
                            )
                          )}
                        </div>
                      </td>

                      {/* Ruang per sesi */}
                      <td
                        className={`px-4 py-4 ${mutedText}`}
                      >
                        <div className="flex flex-col gap-2 whitespace-nowrap">
                          {course.jadwal.map(
                            (sesi, index) => (
                              <span key={index}>
                                {sesi.ruang}
                              </span>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Error Message */}
          {error && (
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

          {/* Total SKS */}
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
            </div>

            {/* Progress Bar */}
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
                    ? "#35649A"
                    : "#D72323",
                }}
              />
            </div>

            {/* Action */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={continueToSummary}
                disabled={!loaded}
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

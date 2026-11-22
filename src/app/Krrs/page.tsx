
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

const MAX_CREDITS = 24;
const STORAGE_KEY = "lintar-krrs-selected";

export default function Krrs() {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([
    "IF301",
    "IF302",
  ]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const totalCredits = courses
    .filter((course) => selected.includes(course.id))
    .reduce((total, course) => total + course.sks, 0);

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
            const course = courses.find((item) => item.id === id);

            if (course && credits + course.sks <= MAX_CREDITS) {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    }
  }, [selected, loaded]);

  function toggleCourse(id: string) {
    setError("");

    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      const course = courses.find((item) => item.id === id);

      if (!course) return current;

      const currentCredits = courses
        .filter((item) => current.includes(item.id))
        .reduce((total, item) => total + item.sks, 0);

      if (currentCredits + course.sks > MAX_CREDITS) {
        setError(
          `Pengambilan mata kuliah melebihi batas maksimal ${MAX_CREDITS} SKS.`
        );
        return current;
      }

      return [...current, id];
    });
  }

  function continueToSummary() {
    if (selected.length === 0) {
      setError("Silakan pilih minimal satu mata kuliah.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));

    router.push("/krrs/sementara");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8 rounded-2xl bg-[linear-gradient(115deg,#7c1009_0%,#ab1509_60%,#c52a1d_100%)] px-6 py-7 text-white shadow-lg shadow-[#ab1509]/20 sm:px-8">
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
        <section className="mb-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-lg shadow-black/5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Mahasiswa</p>
            <p className="mt-1 font-semibold">Windriew</p>
            <p className="text-sm text-slate-600">535250168</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Semester Akademik</p>
            <p className="mt-1 font-semibold text-slate-800">
              Ganjil 2026/2027
            </p>
          </div>
        </section>

        {/* Daftar Mata Kuliah */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-black/5">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee4c7] px-5 py-4">
            <div>
              <h2 className="font-semibold">Daftar Mata Kuliah</h2>
              <p className="mt-1 text-sm text-slate-500">
                Pilih mata kuliah yang ingin diambil.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/krrs/katalog")}
                className="rounded-lg border border-[#ab1509] px-3 py-2 text-sm font-semibold text-[#ab1509] transition hover:bg-red-50"
              >
                Lihat Katalog →
              </button>

              <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-[#ab1509]">
                {selected.length} mata kuliah dipilih
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="w-14 px-5 py-3">Pilih</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Mata Kuliah</th>
                  <th className="px-4 py-3">Dosen</th>
                  <th className="px-5 py-3 text-right">SKS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => {
                  const isSelected = selected.includes(course.id);

                  return (
                    <tr
                      key={course.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <input
                          aria-label={`Pilih ${course.name}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCourse(course.id)}
                          className="h-4 w-4 rounded border-slate-300 accent-[#ab1509]"
                        />
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-600">
                        {course.id}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        {course.name}
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        {course.dosen}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {course.sks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Total SKS */}
          <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-600">
                  Batas pengambilan semester ini
                </p>
                <p className="font-semibold">24 SKS</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-600">Total SKS</p>

                <p
                  className={`text-2xl font-bold ${
                    totalCredits >= MAX_CREDITS
                      ? "text-red-700"
                      : "text-slate-900"
                  }`}
                >
                  {totalCredits} / {MAX_CREDITS} SKS
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#ab1509] transition-all duration-300"
                style={{
                  width: `${(totalCredits / MAX_CREDITS) * 100}%`,
                }}
              />
            </div>

            {/* Action */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Sisa kuota:{" "}
                <strong>{MAX_CREDITS - totalCredits} SKS</strong>
              </p>

              <button
                type="button"
                onClick={continueToSummary}
                disabled={selected.length === 0 || !loaded}
                className="rounded-lg bg-[#ab1509] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#861007] disabled:cursor-not-allowed disabled:opacity-50"
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

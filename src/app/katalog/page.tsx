
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../components/themeprovider";

interface Jadwal {
  sesi: number;
  hari: string;
  mulai: string;
  selesai: string;
  ruang: string;
}

interface Matakuliah {
  _id: string;
  kode: string;
  nama: string;
  sks: number;
  kelas: string;
  kategori: "Wajib" | "Pilihan";
  idDosen?: string;
  namaDosen?: string;
  jadwal: Jadwal[];
}

const daftarKategori = ["Wajib", "Pilihan"] as const;

export default function KatalogPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [matakuliah, setMatakuliah] = useState<Matakuliah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState<
    "Wajib" | "Pilihan"
  >("Wajib");

  useEffect(() => {
    async function fetchMatakuliah() {
      try {
        setLoading(true);

        const response = await fetch("/api/matakuliah");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data mata kuliah."
          );
        }

        setMatakuliah(result.data);
        setError("");
      } catch (err) {
        console.error("Gagal mengambil data mata kuliah:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMatakuliah();
  }, []);

  const matakuliahFiltered = useMemo(() => {
    return matakuliah.filter((item) => {
      const cocokSearch =
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.kode.toLowerCase().includes(search.toLowerCase()) ||
        (item.namaDosen || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const cocokKategori = item.kategori === kategoriAktif;

      return cocokSearch && cocokKategori;
    });
  }, [matakuliah, search, kategoriAktif]);

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

  const headerColor = isDark
    ? "linear-gradient(to right, #2F578A, #121358)"
    : "#D72323";

  const activeFilter = isDark
    ? "bg-[#2F578A] text-white border-[#2F578A]"
    : "bg-[#D72323] text-white border-[#D72323]";

  const inactiveFilter = isDark
    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
    : "border-black/10 bg-white text-black hover:bg-[#f5eded]";

  return (
    <main
      className={`min-h-screen px-4 py-8 sm:px-8 ${mainText}`}
    >
      <div className="mx-auto max-w-5xl">
        <header
          className="mb-6 rounded-2xl px-6 py-7 text-white shadow-lg sm:px-8"
          style={{
            background: headerColor,
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Portal Akademik
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Katalog Mata Kuliah
          </h1>

          <p className="mt-2 text-white/85">
            Lihat informasi mata kuliah yang tersedia pada semester ini.
          </p>
        </header>

        <section
          className={`overflow-hidden rounded-xl border shadow-xl shadow-black/5 ${cardStyle}`}
        >
          <div
            className={`border-b px-5 py-4 ${borderStyle}`}
          >
            <h2 className="font-semibold">
              Daftar Mata Kuliah
            </h2>
          </div>

          <div
            className={`border-b px-5 py-4 ${borderStyle}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 sm:w-80 ${borderStyle}`}
              >
                <i className={`fa-solid fa-magnifying-glass text-sm ${mutedText}`} />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama, kode, atau dosen..."
                  className={`w-full bg-transparent text-sm outline-none placeholder:opacity-50 ${mainText}`}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Hapus pencarian"
                    className={mutedText}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {daftarKategori.map((kategori) => (
                  <button
                    key={kategori}
                    type="button"
                    onClick={() => setKategoriAktif(kategori)}
                    className={`rounded-lg border px-5 py-2 text-sm font-semibold transition ${
                      kategoriAktif === kategori
                        ? activeFilter
                        : inactiveFilter
                    }`}
                  >
                    {kategori}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`flex items-center justify-between border-b px-5 py-4 ${borderStyle}`}
          >
            <div>
              <h3 className="font-semibold">
                Mata Kuliah {kategoriAktif}
              </h3>

              <p className={`mt-1 text-sm ${mutedText}`}>
                Menampilkan daftar mata kuliah kategori {kategoriAktif}.
              </p>
            </div>

            <span className={`text-sm ${mutedText}`}>
              {matakuliahFiltered.length} mata kuliah
            </span>
          </div>

          {loading && (
            <div className="px-5 py-10 text-center">
              <i className="fa-solid fa-spinner fa-spin mb-3 text-2xl" />

              <p className={`text-sm ${mutedText}`}>
                Memuat data mata kuliah...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-red-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{
                  backgroundColor: isDark ? "#2F578A" : "#D72323",
                }}
              >
                Muat Ulang
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            matakuliahFiltered.length === 0 && (
              <div className="px-5 py-10 text-center">
                <i className={`fa-solid fa-book-open mb-3 text-3xl ${mutedText}`} />

                <p className="font-semibold">
                  Mata Kuliah Tidak Ditemukan
                </p>

                <p className={`mt-1 text-sm ${mutedText}`}>
                  Tidak ada mata kuliah yang sesuai dengan pencarian.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            matakuliahFiltered.length > 0 && (
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                {matakuliahFiltered.map((item) => (
                  <article
                    key={item._id}
                    className={`group overflow-hidden rounded-xl border shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
                      isDark
                        ? "border-white/10 bg-white/5 hover:border-[#82adca]/60 hover:shadow-[#2F578A]/20"
                        : "border-black/10 bg-white hover:border-[#D72323]/40 hover:shadow-[#D72323]/15"
                    }`}
                  >
                    <div
                      className="px-4 py-4 text-white"
                      style={{
                        background: headerColor,
                      }}
                    >
                      <p className="text-sm font-medium text-white/80">
                        {item.kode}
                      </p>

                      <h3 className="mt-1 text-sm font-semibold leading-relaxed">
                        {item.nama}
                      </h3>

                      <div className="mt-4 flex items-center gap-6 border-t border-white/20 pt-3 text-sm">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-book text-white/80" />
                          <span>{item.sks} SKS</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-users text-white/80" />
                          <span>Kelas {item.kelas || "-"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className={`mb-4 flex items-start gap-3 rounded-lg border p-3 ${borderStyle}`}>
                        <i className={`fa-solid fa-chalkboard-user mt-0.5 ${mutedText}`} />

                        <div>
                          <p className={`text-xs ${mutedText}`}>
                            Dosen
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            {item.namaDosen || "Dosen belum ditentukan"}
                          </p>
                        </div>
                      </div>

                      <p className="mb-2 text-sm font-semibold">
                        <i className={`fa-regular fa-calendar mr-2 ${mutedText}`} />
                        Jadwal Kuliah
                      </p>

                      {item.jadwal && item.jadwal.length > 0 ? (
                        <div className="space-y-2">
                          {item.jadwal.map((jadwal, index) => (
                            <div
                              key={`${jadwal.sesi}-${index}`}
                              className={`flex items-start justify-between gap-3 text-sm ${mutedText}`}
                            >
                              <div className="font-medium">
                                {jadwal.hari || "-"}
                              </div>

                              <div className="text-right">
                                <p className={mainText}>
                                  {jadwal.mulai}–{jadwal.selesai}
                                </p>

                                <p>
                                  Ruang {jadwal.ruang || "-"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm ${mutedText}`}>
                          Jadwal belum tersedia.
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}

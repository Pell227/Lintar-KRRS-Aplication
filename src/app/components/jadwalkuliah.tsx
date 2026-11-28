"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type SesiJadwal = {
    sesi: number;
    hari: string;
    mulai: string;
    selesai: string;
    ruang: string;
};

type Matakuliah = {
    _id: string;
    kode: string;
    nama: string;
    sks: number;
    kelas: string;
    kategori: "Wajib" | "Pilihan";
    idDosen: string;
    jadwal: SesiJadwal[];
};

type Dosen = {
    nama: string;
    idDosen: string;
    email: string;
    ruangan: string;
    kodeTeams: string;
    foto: string;
    jadwalKonsultasi: string;
    aktif: boolean;
};

type Jadwal = {
    kode: string;
    mataKuliah: string;
    sks: number;
    kelas: string;
    kategori: "Wajib" | "Pilihan";
    hari: string;
    waktu: string;
    ruangan: string;
    sesi: number;
    idDosen: string;
    namaDosen: string;
    keterangan: string;
    kodeDosen: string;
    kodeTeams: string;
    email: string;
};

const daftarHari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
];

export default function JadwalKuliah() {
    const [search, setSearch] = useState("");
    const [filterKelas, setFilterKelas] = useState("Semua");
    const [selectedJadwal, setSelectedJadwal] = useState<Jadwal | null>(null);
    const [dataJadwal, setDataJadwal] = useState<Jadwal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [resMatakuliah, resDosen] = await Promise.all([
                    fetch("/api/matakuliah"),
                    fetch("/api/dosen"),
                ]);

                if (!resMatakuliah.ok || !resDosen.ok) {
                    throw new Error("Gagal mengambil data dari API");
                }

                const dataMatakuliah = await resMatakuliah.json();
                const dataDosen = await resDosen.json();

                const daftarMatakuliah: Matakuliah[] = dataMatakuliah.data;
                const daftarDosen: Dosen[] = dataDosen.data;

                const jadwalGabungan: Jadwal[] = daftarMatakuliah.flatMap(
                    (mk) =>
                        mk.jadwal.map((sesi) => {
                            const dosen = daftarDosen.find(
                                (d) => d.idDosen === mk.idDosen
                            );

                            return {
                                kode: mk.kode,
                                mataKuliah: mk.nama,
                                sks: mk.sks,
                                kelas: mk.kelas,
                                kategori: mk.kategori,
                                hari: sesi.hari,
                                waktu: `${sesi.mulai} - ${sesi.selesai}`,
                                ruangan: sesi.ruang,
                                sesi: sesi.sesi,
                                idDosen: mk.idDosen,
                                namaDosen: dosen?.nama ?? "Belum ditentukan",
                                keterangan: mk.kategori,
                                kodeDosen: dosen?.idDosen ?? "-",
                                kodeTeams: dosen?.kodeTeams ?? "-",
                                email: dosen?.email ?? "-",
                            };
                        })
                );

                setDataJadwal(jadwalGabungan);
            } catch (err) {
                console.error("Gagal mengambil jadwal:", err);
                setError("Gagal memuat jadwal mata kuliah.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const kelasTersedia = Array.from(
        new Set(dataJadwal.map((jadwal) => jadwal.kelas))
    ).sort();
    const filteredJadwal = dataJadwal.filter((jadwal) => {
        const keyword = search.toLowerCase();
        const cocokPencarian =
            jadwal.mataKuliah.toLowerCase().includes(keyword) ||
            jadwal.kode.toLowerCase().includes(keyword) ||
            jadwal.namaDosen.toLowerCase().includes(keyword) ||
            jadwal.ruangan.toLowerCase().includes(keyword) ||
            jadwal.kelas.toLowerCase().includes(keyword) ||
            jadwal.idDosen.toLowerCase().includes(keyword);
        const cocokKelas =
            filterKelas === "Semua" || jadwal.kelas === filterKelas;

        return cocokPencarian && cocokKelas;
    });

    const hariAktif = daftarHari.filter((hari) =>
        filteredJadwal.some((jadwal) => jadwal.hari === hari)
    ).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
        >
            {loading && (
                <div className="rounded-xl border border-border-color bg-surface p-6 text-center text-secondary-text">
                    Memuat jadwal mata kuliah...
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>

                    {/* Header */}
                    <div className="rounded-lg bg-[#3E3636] px-4 py-3 text-white dark:bg-[#222831]">
                        <h2 className="text-sm font-bold tracking-wide">
                            AKADEMIK - JADWAL KULIAH
                        </h2>
                    </div>

                    {/* Judul */}
                    <div>
                        <h3 className="text-2xl font-bold text-foreground">
                            Jadwal Mata Kuliah
                        </h3>

                        <p className="mt-1 text-sm text-secondary-text">
                            Semester Ganjil 2026/2027 · Jadwal Mingguan
                        </p>
                    </div>

                    {/* Ringkasan */}
                    <div className="grid grid-cols-2 gap-3">

                        {/* Total Jadwal */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            whileHover={{
                                y: -5,
                                scale: 1.02,
                            }}
                            className="rounded-xl border border-border-color bg-surface p-4 shadow-sm transition-shadow hover:shadow-lg"
                        >
                            <p className="text-sm text-secondary-text">
                                Total Jadwal
                            </p>

                            <motion.p
                                key={filteredJadwal.length}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-1 text-2xl font-bold text-accent"
                            >
                                {filteredJadwal.length}
                            </motion.p>
                        </motion.div>

                        {/* Hari Perkuliahan */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            whileHover={{
                                y: -5,
                                scale: 1.02,
                            }}
                            className="rounded-xl border border-border-color bg-surface p-4 shadow-sm transition-shadow hover:shadow-lg"
                        >
                            <p className="text-sm text-secondary-text">
                                Hari Perkuliahan
                            </p>

                            <motion.p
                                key={hariAktif}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-1 text-2xl font-bold text-accent"
                            >
                                {hariAktif}
                            </motion.p>
                        </motion.div>

                    </div>

                    {/* Filter */}
                    <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-color bg-surface p-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-foreground">
                                Pencarian
                            </label>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari mata kuliah, kode, atau dosen..."
                                className="w-full rounded-lg border border-border-color bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-secondary-text focus:border-accent"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-foreground">
                                Filter Kelas
                            </label>

                            <select
                                value={filterKelas}
                                onChange={(e) => setFilterKelas(e.target.value)}
                                className="w-full rounded-lg border border-border-color bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                            >
                                <option value="Semua">Semua Kelas</option>

                                {kelasTersedia.map((kelas) => (
                                    <option key={kelas} value={kelas}>
                                        Kelas {kelas}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Daftar Jadwal Per Hari */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">
                                Jadwal Perkuliahan Mingguan
                            </h3>

                            <p className="mt-1 text-sm text-secondary-text">
                                Pilih tombol detail untuk melihat informasi mata kuliah.
                            </p>
                        </div>

                        {daftarHari.map((hari, dayIndex) => {
                            const jadwalHari = filteredJadwal
                                .filter((jadwal) => jadwal.hari === hari)
                                .sort((a, b) => a.waktu.localeCompare(b.waktu));

                            return (
                                <motion.div
                                    key={hari}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: dayIndex * 0.08,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{ y: -2 }}
                                    className="overflow-hidden rounded-xl border border-border-color bg-surface shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between bg-background px-4 py-3">
                                        <h4 className="font-bold text-accent">
                                            {hari}
                                        </h4>

                                        <span className="rounded-full border border-border-color bg-surface px-3 py-1 text-xs font-semibold text-secondary-text">
                                            {jadwalHari.length} Mata Kuliah
                                        </span>
                                    </div>

                                    {jadwalHari.length > 0 ? (
                                        <div className="divide-y divide-border-color">
                                            {jadwalHari.map((jadwal, index) => (
                                                <div
                                                    key={`${jadwal.kode}-${index}`}
                                                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 transition-all duration-200 hover:bg-red-100 dark:hover:bg-[#3E3636]/70"
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h5 className="font-semibold text-foreground">
                                                                {jadwal.mataKuliah}
                                                            </h5>

                                                            <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
                                                                Sesi {jadwal.sesi}
                                                            </span>
                                                        </div>

                                                        <p className="mt-1 text-xs text-secondary-text">
                                                            {jadwal.waktu} · {jadwal.ruangan} · Kelas {jadwal.kelas}
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() => setSelectedJadwal(jadwal)}
                                                        className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                                                    >
                                                        Detail
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-5 text-sm text-secondary-text">
                                            Tidak ada jadwal kuliah.
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {selectedJadwal && (
                        <div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
                            onClick={() => setSelectedJadwal(null)}
                        >
                            <div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="detail-title"
                                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border-color bg-surface p-6 text-foreground shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="mb-5 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-accent">
                                            DETAIL MATA KULIAH
                                        </p>

                                        <h3
                                            id="detail-title"
                                            className="mt-1 text-xl font-bold text-foreground"
                                        >
                                            {selectedJadwal.mataKuliah}
                                        </h3>

                                        <p className="mt-1 text-sm text-secondary-text">
                                            {selectedJadwal.kode} · {selectedJadwal.sks} SKS
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedJadwal(null)}
                                        className="rounded-lg px-3 py-1 text-xl text-secondary-text transition-colors hover:bg-background"
                                        aria-label="Tutup detail"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {[
                                        ["Hari", selectedJadwal.hari],
                                        ["Waktu", selectedJadwal.waktu],
                                        ["Kelas", selectedJadwal.kelas],
                                        ["Keterangan", selectedJadwal.keterangan],
                                        ["Ruangan", selectedJadwal.ruangan],
                                        ["Kode Dosen", selectedJadwal.kodeDosen],
                                        ["Kode Join Microsoft Teams", selectedJadwal.kodeTeams],
                                        ["Email Dosen", selectedJadwal.email],
                                    ].map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="rounded-lg border border-border-color bg-background p-3"
                                        >
                                            <p className="text-xs text-secondary-text">
                                                {label}
                                            </p>

                                            <p className="mt-1 break-words text-sm font-semibold text-foreground">
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 rounded-lg border border-border-color bg-background p-3">
                                    <p className="text-xs text-secondary-text">
                                        Dosen Pengajar
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-foreground">
                                        {selectedJadwal.namaDosen}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedJadwal(null)}
                                    className="mt-5 w-full rounded-lg bg-accent py-3 font-semibold text-white transition-opacity hover:opacity-80"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </motion.div>
    );
}

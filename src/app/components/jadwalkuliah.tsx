
"use client";

import { useState } from "react";

type Jadwal = {
    kode: string;
    mataKuliah: string;
    sks: number;
    kelas: string;
    kodeDosen: string;
    namaDosen: string;
    ruangan: string;
    hari: string;
    waktu: string;
    keterangan: string;
    kodeTeams: string;
    email: string;
};

const dataJadwal: Jadwal[] = [
    {
        kode: "TK23019",
        mataKuliah: "Mobile Programming",
        sks: 4,
        kelas: "D",
        kodeDosen: "10809003",
        namaDosen: "Darius Andana Haris, S.Kom., M.T.I.",
        ruangan: "R1007",
        hari: "Kamis",
        waktu: "15:30 - 17:10",
        keterangan: "Teori",
        kodeTeams: "dsw4mca",
        email: "dariush@fti.untar.ac.id",
    },
    {
        kode: "TK23019",
        mataKuliah: "Mobile Programming",
        sks: 4,
        kelas: "D",
        kodeDosen: "10812001",
        namaDosen: "Janson Hendryli, S.Kom., M.Kom.",
        ruangan: "R0902",
        hari: "Rabu",
        waktu: "15:30 - 17:10",
        keterangan: "Teori",
        kodeTeams: "dsw4mca",
        email: "jansonh@fti.untar.ac.id",
    },
    {
        kode: "TK23023",
        mataKuliah: "Front-End Programming",
        sks: 4,
        kelas: "D",
        kodeDosen: "10812001",
        namaDosen: "Janson Hendryli, S.Kom., M.Kom.",
        ruangan: "R0905",
        hari: "Senin",
        waktu: "09:30 - 11:10",
        keterangan: "Teori",
        kodeTeams: "khnixym",
        email: "jansonh@fti.untar.ac.id",
    },
    {
        kode: "TK23029",
        mataKuliah: "Computer Architecture & Organization",
        sks: 2,
        kelas: "D",
        kodeDosen: "10393012",
        namaDosen: "Chairisni Lubis, Dra., M.Kom.",
        ruangan: "R0804",
        hari: "Kamis",
        waktu: "13:30 - 15:10",
        keterangan: "Teori",
        kodeTeams: "rgsc64s",
        email: "chairisnil@fti.untar.ac.id",
    },
    {
        kode: "TK24010",
        mataKuliah: "Business Analytics",
        sks: 4,
        kelas: "A",
        kodeDosen: "10396060",
        namaDosen: "Bagus Mulyawan, Dr., S.Kom., M.M.",
        ruangan: "R0701",
        hari: "Kamis",
        waktu: "09:30 - 11:10",
        keterangan: "Teori",
        kodeTeams: "bhh4izu",
        email: "bagusm@fti.untar.ac.id",
    },
    {
        kode: "TK33050",
        mataKuliah: "Scientific Writing",
        sks: 2,
        kelas: "B",
        kodeDosen: "10301014",
        namaDosen: "Lina, Prof. S.T., M.Kom., Ph.D.",
        ruangan: "R0806",
        hari: "Kamis",
        waktu: "07:30 - 09:10",
        keterangan: "Teori",
        kodeTeams: "flptvmg",
        email: "lina@fti.untar.ac.id",
    },
    {
        kode: "TK34005",
        mataKuliah: "Machine Learning",
        sks: 4,
        kelas: "D",
        kodeDosen: "10813002",
        namaDosen: "Teny Handhayani, S.Kom., M.Kom., Ph.D.",
        ruangan: "R0902",
        hari: "Jumat",
        waktu: "07:30 - 09:10",
        keterangan: "Teori",
        kodeTeams: "tdlhy0g",
        email: "tenyh@fti.untar.ac.id",
    },
];

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
    const [selectedJadwal, setSelectedJadwal] =
        useState<Jadwal | null>(null);

    const filteredJadwal = dataJadwal.filter((jadwal) => {
        const keyword = search.toLowerCase();

        const cocokPencarian =
            jadwal.mataKuliah.toLowerCase().includes(keyword) ||
            jadwal.kode.toLowerCase().includes(keyword) ||
            jadwal.namaDosen.toLowerCase().includes(keyword);

        const cocokKelas =
            filterKelas === "Semua" || jadwal.kelas === filterKelas;

        return cocokPencarian && cocokKelas;
    });

    const hariAktif = daftarHari.filter((hari) =>
        filteredJadwal.some((jadwal) => jadwal.hari === hari)
    ).length;

    return (
        <div className="space-y-6">

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
                <div className="rounded-xl border border-border-color bg-surface p-4 shadow-sm">
                    <p className="text-sm text-secondary-text">
                        Total Jadwal
                    </p>
                    <p className="mt-1 text-2xl font-bold text-accent">
                        {filteredJadwal.length}
                    </p>
                </div>

                <div className="rounded-xl border border-border-color bg-surface p-4 shadow-sm">
                    <p className="text-sm text-secondary-text">
                        Hari Perkuliahan
                    </p>
                    <p className="mt-1 text-2xl font-bold text-accent">
                        {hariAktif}
                    </p>
                </div>
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
                        <option value="A">Kelas A</option>
                        <option value="B">Kelas B</option>
                        <option value="D">Kelas D</option>
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

                {daftarHari.map((hari) => {
                    const jadwalHari = filteredJadwal
                        .filter((jadwal) => jadwal.hari === hari)
                        .sort((a, b) => a.waktu.localeCompare(b.waktu));

                    return (
                        <div
                            key={hari}
                            className="overflow-hidden rounded-xl border border-border-color bg-surface shadow-sm"
                        >
                            {/* Nama Hari */}
                            <div className="flex items-center justify-between bg-background px-4 py-3">
                                <h4 className="font-bold text-accent">
                                    {hari}
                                </h4>

                                <span className="rounded-full border border-border-color bg-surface px-3 py-1 text-xs font-semibold text-secondary-text">
                                    {jadwalHari.length} Mata Kuliah
                                </span>
                            </div>

                            {/* Mata Kuliah */}
                            {jadwalHari.length > 0 ? (
                                <div className="divide-y divide-border-color">
                                    {jadwalHari.map((jadwal, index) => (
                                        <div
                                            key={`${jadwal.kode}-${index}`}
                                            className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-background"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <h5 className="font-semibold text-foreground">
                                                    {jadwal.mataKuliah}
                                                </h5>

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
                        </div>
                    );
                })}
            </div>

            {/* Modal Detail Mata Kuliah */}
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
        </div>
    );
}

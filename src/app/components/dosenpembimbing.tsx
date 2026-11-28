"use client";

import { useEffect, useState } from "react";

interface Dosen {
    _id: string;
    nama: string;
    idDosen: string;
    email: string;
    ruangan: string;
    kodeTeams: string;
    foto: string;
    jadwalKonsultasi: string;
    aktif: boolean;
}

export default function DosenPembimbing() {
    const [dosenList, setDosenList] = useState<Dosen[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDosen = async () => {
            try {
                const response = await fetch("/api/dospem");

                if (!response.ok) {
                    throw new Error("Gagal mengambil data dosen.");
                }

                const data = await response.json();
                setDosenList(data);
            } catch (err) {
                console.error(err);
                setError("Data dosen gagal dimuat.");
            } finally {
                setLoading(false);
            }
        };

        fetchDosen();
    }, []);

    return (
        <section className="mb-8">

            {/* Header */}
            <div className="rounded-t-xl bg-[#D72323] px-6 py-5 dark:bg-[#76ABAE]">
                <p className="text-xs font-semibold tracking-wider text-red-100 dark:text-[#222831]/70">
                    INFORMASI AKADEMIK
                </p>

                <h2 className="mt-1 text-xl font-bold text-white dark:text-[#222831]">
                    Dosen Pembimbing Akademik
                </h2>

                <p className="mt-1 text-sm text-red-100 dark:text-[#222831]/80">
                    Informasi dosen pembimbing akademik mahasiswa.
                </p>
            </div>

            {/* Content */}
            <div className="rounded-b-xl border border-border-color bg-surface p-6 shadow-sm transition-colors duration-200">

                {loading && (
                    <div className="py-10 text-center text-foreground/60">
                        Memuat informasi dosen...
                    </div>
                )}

                {error && (
                    <div className="rounded-xl bg-red-100 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        {error}
                    </div>
                )}

                {!loading && !error && dosenList.length === 0 && (
                    <div className="py-10 text-center text-foreground/60">
                        Informasi dosen belum tersedia.
                    </div>
                )}

                {!loading && !error && dosenList.length > 0 && (
                    <div className="space-y-6">

                        {dosenList.map((dosen) => (
                            <div
                                key={dosen._id}
                                className="rounded-xl border border-border-color bg-background p-5 transition-colors duration-200"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row">

                                    {/* Avatar */}
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface">
                                        {dosen.foto ? (
                                            <img
                                                src={dosen.foto}
                                                alt={dosen.nama}
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-[#D72323] dark:text-[#76ABAE]">
                                                {dosen.nama
                                                    .split(" ")
                                                    .filter(Boolean)
                                                    .slice(0, 2)
                                                    .map((kata) => kata[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Informasi Dosen */}
                                    <div className="flex-1">

                                        <h3 className="text-lg font-bold text-foreground">
                                            {dosen.nama}
                                        </h3>

                                        <p className="mt-1 text-sm text-foreground/60">
                                            Dosen Pembimbing Akademik
                                        </p>

                                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                            {/* ID Dosen */}
                                            <div className="rounded-lg border border-border-color bg-surface p-4">
                                                <p className="mb-1 text-xs text-foreground/60">
                                                    Kode Dosen
                                                </p>

                                                <p className="font-semibold text-foreground">
                                                    {dosen.idDosen}
                                                </p>
                                            </div>

                                            {/* Ruangan */}
                                            <div className="rounded-lg border border-border-color bg-surface p-4">
                                                <p className="mb-1 text-xs text-foreground/60">
                                                    Ruangan
                                                </p>

                                                <p className="font-semibold text-foreground">
                                                    {dosen.ruangan || "-"}
                                                </p>
                                            </div>

                                            {/* Email */}
                                            <div className="rounded-lg border border-border-color bg-surface p-4">
                                                <p className="mb-1 text-xs text-foreground/60">
                                                    Email Dosen
                                                </p>

                                                <a
                                                    href={`mailto:${dosen.email}`}
                                                    className="break-all font-semibold text-[#D72323] hover:underline dark:text-[#76ABAE]"
                                                >
                                                    {dosen.email || "-"}
                                                </a>
                                            </div>

                                            {/* Teams */}
                                            <div className="rounded-lg border border-border-color bg-surface p-4">
                                                <p className="mb-1 text-xs text-foreground/60">
                                                    Kode Join Microsoft Teams
                                                </p>

                                                <p className="font-semibold text-foreground">
                                                    {dosen.kodeTeams || "-"}
                                                </p>
                                            </div>

                                            {/* Jadwal */}
                                            <div className="rounded-lg border border-border-color bg-surface p-4 sm:col-span-2">
                                                <p className="mb-1 text-xs text-foreground/60">
                                                    Jadwal Konsultasi
                                                </p>

                                                <p className="font-semibold text-foreground">
                                                    {dosen.jadwalKonsultasi || "Belum ditentukan"}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 border-t border-border-color pt-4">
                    <p className="text-xs text-foreground/60">
                        Informasi dosen pembimbing akademik ditampilkan
                        berdasarkan data yang tersedia pada sistem.
                    </p>
                </div>

            </div>
        </section>
    );
}

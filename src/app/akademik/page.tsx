
"use client";

import { useState } from "react";
import KalenderAkademik from "../components/kalenderakademik";
import JadwalKuliah from "../components/jadwalkuliah";

export default function AkademikPage() {
    const [activeTab, setActiveTab] = useState("kalender");

    return (
        <main className="min-h-screen bg-background p-6 text-foreground transition-colors duration-200">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-accent">
                        Informasi Akademik
                    </h1>

                    <p className="mt-2 text-secondary-text">
                        Lihat kalender akademik dan jadwal perkuliahan mahasiswa.
                    </p>
                </div>

                {/* Tab Navigasi */}
                <div className="mb-6 flex flex-col gap-2 rounded-xl border border-border-color bg-surface p-2 shadow-sm sm:flex-row">
                    <button
                        onClick={() => setActiveTab("kalender")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors ${activeTab === "kalender"
                                ? "bg-accent text-white"
                                : "text-foreground hover:bg-background"
                            }`}
                    >
                        <span>📅</span>
                        Kalender Akademik
                    </button>

                    <button
                        onClick={() => setActiveTab("jadwal")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors ${activeTab === "jadwal"
                                ? "bg-accent text-white"
                                : "text-foreground hover:bg-background"
                            }`}
                    >
                        <span>🕒</span>
                        Jadwal Mata Kuliah
                    </button>
                </div>

                {/* Konten */}
                <div className="rounded-xl border border-border-color bg-surface p-6 shadow-sm transition-colors duration-200">
                    {activeTab === "kalender" && <KalenderAkademik />}

                    {activeTab === "jadwal" && <JadwalKuliah />}
                </div>

            </div>
        </main>
    );
}

"use client";

import { useState } from "react";
import KalenderAkademik from "../components/kalenderakademik";

export default function AkademikPage() {
    const [activeTab, setActiveTab] = useState("kalender");

    return (
        <main className="min-h-screen bg-[#F5EDED] p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#D72323]">
                        Informasi Akademik
                    </h1>

                    <p className="text-[#3E3636] mt-2">
                        Lihat kalender akademik dan jadwal
                        perkuliahan mahasiswa.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-2 mb-6">

                    <button
                        onClick={() => setActiveTab("kalender")}
                        className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors ${activeTab === "kalender"
                            ? "bg-[#D72323] text-white"
                            : "text-[#3E3636] hover:bg-[#F5EDED]"
                            }`}
                    >
                        <span>📅</span>
                        Kalender Akademik
                    </button>

                    <button
                        onClick={() => setActiveTab("jadwal")}
                        className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors ${activeTab === "jadwal"
                            ? "bg-[#D72323] text-white"
                            : "text-[#3E3636] hover:bg-[#F5EDED]"
                            }`}
                    >
                        <span>🕒</span>
                        Jadwal Mata Kuliah
                    </button>

                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                    {activeTab === "kalender" && (
                        <KalenderAkademik />
                    )}

                    {activeTab === "jadwal" && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Jadwal Mata Kuliah
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Informasi jadwal perkuliahan mahasiswa.
                            </p>
                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}

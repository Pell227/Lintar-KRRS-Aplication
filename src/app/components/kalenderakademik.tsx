
"use client";

import { useState } from "react";

type Category =
    | "administrasi"
    | "pembayaran"
    | "registrasi"
    | "pembelajaran"
    | "ujian"
    | "akademik"
    | "wisuda";

type AcademicEvent = {
    mulai: string;
    selesai: string;
    nama: string;
    kategori: Category;
};

const academicEvents: AcademicEvent[] = [
    {
        mulai: "2026-06-08",
        selesai: "2026-07-17",
        nama: "Pengajuan Permohonan Pindah Semester Ganjil 2026/2027",
        kategori: "administrasi",
    },
    {
        mulai: "2026-06-08",
        selesai: "2026-07-17",
        nama: "Pengajuan Permohonan Aktif Kuliah Kembali Semester Ganjil 2026/2027",
        kategori: "administrasi",
    },
    {
        mulai: "2026-06-08",
        selesai: "2026-07-09",
        nama: "Pembayaran BPP (kelas Pagi) Semester Ganjil 2026/2027",
        kategori: "pembayaran",
    },
    {
        mulai: "2026-06-09",
        selesai: "2026-07-09",
        nama: "Pembayaran Uang Kuliah Tunggal/UKT (kelas sore) Semester Ganjil 2026/2027",
        kategori: "pembayaran",
    },
    {
        mulai: "2026-07-20",
        selesai: "2026-08-14",
        nama: "Pengajuan Permohonan Cuti Akademik Semester Ganjil 2026/2027",
        kategori: "administrasi",
    },
    {
        mulai: "2026-07-20",
        selesai: "2026-08-07",
        nama: "Rencana Registrasi Studi/Perbaikan (RRS) Semester Ganjil 2026/2027",
        kategori: "registrasi",
    },
    {
        mulai: "2026-08-18",
        selesai: "2026-10-02",
        nama: "Proses Pembelajaran Sebelum UTS",
        kategori: "pembelajaran",
    },
    {
        mulai: "2026-08-18",
        selesai: "2026-10-02",
        nama: "Permohonan Dispensasi Cuti Akademik Semester Ganjil 2026/2027",
        kategori: "administrasi",
    },
    {
        mulai: "2026-08-25",
        selesai: "2026-09-23",
        nama: "Pembayaran SKS (kls pagi) Semester Ganjil 2026/2027",
        kategori: "pembayaran",
    },
    {
        mulai: "2026-09-28",
        selesai: "2026-10-02",
        nama: "Cetak Kartu Studi Mahasiswa (KSM)",
        kategori: "registrasi",
    },
    {
        mulai: "2026-10-05",
        selesai: "2026-10-09",
        nama: "Ujian Tengah Semester (UTS) Semester Ganjil 2026/2027",
        kategori: "ujian",
    },
    {
        mulai: "2026-10-12",
        selesai: "2026-11-27",
        nama: "Proses Pembelajaran Setelah UTS",
        kategori: "pembelajaran",
    },
    {
        mulai: "2026-11-30",
        selesai: "2026-12-11",
        nama: "Ujian Akhir Semester (UAS) Semester Ganjil 2026/2027",
        kategori: "ujian",
    },
    {
        mulai: "2026-12-02",
        selesai: "2026-12-17",
        nama: "Remedial",
        kategori: "akademik",
    },
    {
        mulai: "2027-01-04",
        selesai: "2027-01-04",
        nama: "Hasil Studi dan Yudisium",
        kategori: "akademik",
    },
    {
        mulai: "2027-03-15",
        selesai: "2027-04-25",
        nama: "Pendaftaran Wisuda",
        kategori: "wisuda",
    },
    {
        mulai: "2027-05-15",
        selesai: "2027-05-15",
        nama: "Pelaksanaan Wisuda",
        kategori: "wisuda",
    },
];

const categoryInfo: Record<
    Category,
    { label: string; color: string }
> = {
    administrasi: {
        label: "Administrasi Akademik",
        color: "#2563EB",
    },
    pembayaran: {
        label: "Pembayaran",
        color: "#D97706",
    },
    registrasi: {
        label: "Registrasi",
        color: "#9333EA",
    },
    pembelajaran: {
        label: "Proses Pembelajaran",
        color: "#16A34A",
    },
    ujian: {
        label: "UTS dan UAS",
        color: "#1D4ED8",
    },
    akademik: {
        label: "Akademik Lainnya",
        color: "#D72323",
    },
    wisuda: {
        label: "Wisuda",
        color: "#6B7280",
    },
};

function parseDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatDate(value: string) {
    return parseDate(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function KalenderAkademik() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];

    function changeMonth(direction: number) {
        setCurrentDate(new Date(year, month + direction, 1));
        setSelectedDate(null);
    }

    function getEventsForDay(day: number) {
        const date = new Date(year, month, day);

        return academicEvents.filter((event) => {
            const start = parseDate(event.mulai);
            const end = parseDate(event.selesai);

            return date >= start && date <= end;
        });
    }

    const selectedEvents = selectedDate
        ? academicEvents.filter((event) => {
            const start = parseDate(event.mulai);
            const end = parseDate(event.selesai);

            return selectedDate >= start && selectedDate <= end;
        })
        : [];

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Kalender Bulanan */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-black">
                            {monthNames[month]} {year}
                        </h2>
                        <p className="mt-1 text-sm text-[#3E3636]">
                            Kalender Akademik Semester Ganjil 2026/2027
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-black hover:bg-[#F5EDED]"
                            aria-label="Bulan sebelumnya"
                        >
                            ←
                        </button>

                        <button
                            onClick={() => changeMonth(1)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-black hover:bg-[#F5EDED]"
                            aria-label="Bulan berikutnya"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Nama Hari */}
                <div className="grid grid-cols-7 gap-2 text-center">
                    {dayNames.map((day) => (
                        <div
                            key={day}
                            className="py-2 text-sm font-bold text-[#3E3636]"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Tanggal */}
                    {calendarDays.map((day, index) => {
                        if (day === null) {
                            return <div key={`empty-${index}`} />;
                        }

                        const events = getEventsForDay(day);

                        const isSelected =
                            selectedDate?.getFullYear() === year &&
                            selectedDate?.getMonth() === month &&
                            selectedDate?.getDate() === day;

                        return (
                            <button
                                key={day}
                                onClick={() =>
                                    setSelectedDate(new Date(year, month, day))
                                }
                                className={`flex min-h-14 flex-col items-center justify-center rounded-lg p-1 transition-colors ${isSelected
                                        ? "bg-[#D72323] text-white"
                                        : events.length > 0
                                            ? "bg-red-50 text-black hover:bg-red-100"
                                            : "bg-[#F5EDED] text-black hover:bg-red-100"
                                    }`}
                            >
                                <span
                                    className={`text-sm ${isSelected ? "font-bold" : ""
                                        }`}
                                >
                                    {day}
                                </span>

                                {/* Titik warna setiap event */}
                                {events.length > 0 && (
                                    <div className="mt-1 flex flex-wrap justify-center gap-1">
                                        {events.map((event, eventIndex) => (
                                            <span
                                                key={eventIndex}
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    backgroundColor: categoryInfo[event.kategori].color,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-5 border-t border-gray-200 pt-4">
                    <h4 className="mb-3 text-sm font-bold text-black">
                        Keterangan Agenda
                    </h4>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {(Object.entries(categoryInfo) as [
                            Category,
                            { label: string; color: string }
                        ][]).map(([key, info]) => (
                            <div key={key} className="flex items-center gap-2">
                                <span
                                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                                    style={{ backgroundColor: info.color }}
                                />
                                <span className="text-xs text-[#3E3636]">
                                    {info.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail Agenda */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-black">
                    Detail Agenda
                </h3>

                <div className="mt-2 h-1 w-12 rounded-full bg-[#D72323]" />

                {!selectedDate ? (
                    <p className="mt-5 text-sm text-[#3E3636]">
                        Pilih tanggal pada kalender untuk melihat agenda akademik.
                    </p>
                ) : (
                    <>
                        <p className="mt-4 text-sm font-semibold text-[#D72323]">
                            {selectedDate.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                        {selectedEvents.length > 0 ? (
                            <div className="mt-4 space-y-3">
                                {selectedEvents.map((event, index) => {
                                    const category = categoryInfo[event.kategori];

                                    return (
                                        <div
                                            key={index}
                                            className="rounded-lg bg-[#F5EDED] p-4"
                                            style={{
                                                borderLeft: `4px solid ${category.color}`,
                                            }}
                                        >
                                            <div className="mb-2 flex items-center gap-2">
                                                <span
                                                    className="h-2.5 w-2.5 rounded-full"
                                                    style={{
                                                        backgroundColor: category.color,
                                                    }}
                                                />
                                                <span
                                                    className="text-xs font-semibold"
                                                    style={{ color: category.color }}
                                                >
                                                    {category.label}
                                                </span>
                                            </div>

                                            <h4 className="text-sm font-bold text-black">
                                                {event.nama}
                                            </h4>

                                            <p className="mt-2 text-xs leading-relaxed text-[#3E3636]">
                                                {formatDate(event.mulai)} – {formatDate(event.selesai)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="mt-4 rounded-lg bg-[#F5EDED] p-4 text-sm text-[#3E3636]">
                                Tidak ada agenda akademik pada tanggal ini.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

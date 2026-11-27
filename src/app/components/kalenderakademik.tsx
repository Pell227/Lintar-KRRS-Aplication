"use client";

import { useEffect, useState } from "react";

type Category =
    | "administrasi"
    | "pembayaran"
    | "registrasi"
    | "pembelajaran"
    | "ujian"
    | "akademik"
    | "wisuda";

type AcademicEvent = {
    _id?: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    judul: string;
    kategori: Category;
    deskripsi?: string;
    semester?: string;
};

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

function getCategoryInfo(value: string) {
    const normalized = value?.toLowerCase().trim() as Category;

    return categoryInfo[normalized] ?? {
        label: value || "Kategori Lainnya",
        color: "#6B7280",
    };
}

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
    const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("/api/kalenderakademik");

                if (!response.ok) {
                    throw new Error("Gagal mengambil data kalender akademik");
                }

                const data = await response.json();
                setAcademicEvents(data);
            } catch (error) {
                console.error("Error mengambil kalender akademik:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

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
            const start = parseDate(event.tanggalMulai);
            const end = parseDate(event.tanggalSelesai);

            return date >= start && date <= end;
        });
    }

    const selectedEvents = selectedDate
        ? academicEvents.filter((event) => {
            const start = parseDate(event.tanggalMulai);
            const end = parseDate(event.tanggalSelesai);

            return selectedDate >= start && selectedDate <= end;
        })
        : [];
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            <div className="rounded-xl border border-border-color bg-surface p-5 shadow-sm transition-colors duration-200 lg:col-span-2">

                <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            {monthNames[month]} {year}
                        </h2>

                        <p className="mt-1 text-sm text-secondary-text">
                            Kalender Akademik Semester Ganjil 2026/2027
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="rounded-lg border border-border-color bg-background px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-white"
                            aria-label="Bulan sebelumnya"
                        >
                            ←
                        </button>

                        <button
                            onClick={() => changeMonth(1)}
                            className="rounded-lg border border-border-color bg-background px-3 py-2 text-foreground transition-colors hover:bg-accent hover:text-white"
                            aria-label="Bulan berikutnya"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                    {dayNames.map((day) => (
                        <div
                            key={day}
                            className="py-2 text-sm font-bold text-secondary-text"
                        >
                            {day}
                        </div>
                    ))}

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
                                    ? "bg-accent text-white"
                                    : events.length > 0
                                        ? "bg-red-50 text-foreground hover:bg-red-100 dark:bg-[#222831] dark:hover:bg-[#454C56]"
                                        : "bg-background text-foreground hover:bg-accent/20"
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
                                                    backgroundColor: getCategoryInfo(event.kategori).color,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-5 border-t border-border-color pt-4">
                    <h4 className="mb-3 text-sm font-bold text-foreground">
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

                                <span className="text-xs text-secondary-text">
                                    {info.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-border-color bg-surface p-5 shadow-sm transition-colors duration-200">
                <h3 className="text-lg font-bold text-foreground">
                    Detail Agenda
                </h3>

                <div className="mt-2 h-1 w-12 rounded-full bg-accent" />

                {!selectedDate ? (
                    <p className="mt-5 text-sm text-secondary-text">
                        Pilih tanggal pada kalender untuk melihat agenda akademik.
                    </p>
                ) : (
                    <>
                        <p className="mt-4 text-sm font-semibold text-accent">
                            {selectedDate.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                        {selectedEvents.length > 0 ? (
                            <div className="mt-4 space-y-3">
                                {selectedEvents.map((event, index) => {
                                    const category = getCategoryInfo(event.kategori);

                                    return (
                                        <div
                                            key={index}
                                            className="rounded-lg border border-border-color bg-background p-4 transition-colors duration-200"
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

                                            <h4 className="text-sm font-bold text-foreground">
                                                {event.judul}
                                            </h4>

                                            <p className="mt-2 text-xs leading-relaxed text-secondary-text">
                                                {formatDate(event.tanggalMulai)} – {formatDate(event.tanggalSelesai)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="mt-4 rounded-lg bg-background p-4 text-sm text-secondary-text">
                                Tidak ada agenda akademik pada tanggal ini.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

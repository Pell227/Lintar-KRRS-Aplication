'use client';

import { Printer } from "lucide-react";
import { useState } from "react";
import PrintStyles from "../components/Print";

const columns = [
    "No", "Kode MK", "Nama Mata Kuliah",
    "Status", "Kredit (SKS)", "Nilai (Huruf)",
    "Nilai (Angka)", "Bobot kualitas (sksN)", "ket",
];

type Course = {
    kode: string;
    nama: string;
    status: string;
    sks: number;
    huruf: string;
    angka: number;
    bobot: number;
    ket: string;
};

type Semester = {
    id: string;
    label: string;
    jmlSks: number;
    ips: number;
    kreditDiambil: number;
    kreditDiperoleh: number;
    ipk: number;
    courses: Course[];
};

// newest semester first
const semesters: Semester[] = [
    {
        id: "2025-ganjil",
        label: "Ganjil 2025/2026",
        jmlSks: 21,
        ips: 3.6,
        kreditDiambil: 62,
        kreditDiperoleh: 62,
        ipk: 3.5,
        courses: [
            { kode: "IF301", nama: "Basis Data", status: "Baru", sks: 3, huruf: "A", angka: 4, bobot: 12, ket: "" },
            { kode: "IF302", nama: "Jaringan Komputer", status: "Baru", sks: 3, huruf: "B+", angka: 3.3, bobot: 9.9, ket: "" },
        ],
    },
    {
        id: "2024-genap",
        label: "Genap 2024/2025",
        jmlSks: 20,
        ips: 3.4,
        kreditDiambil: 41,
        kreditDiperoleh: 41,
        ipk: 3.4,
        courses: [
            { kode: "IF201", nama: "Algoritma", status: "Baru", sks: 3, huruf: "B+", angka: 3.3, bobot: 9.9, ket: "" },
        ],
    },
];

const cell = "border border-foreground px-2 py-2";

// oldest semester first, so the progress bar reads left to right
const timeline = [...semesters].reverse();

export default function Card() {
    const [detailOpen, setDetailOpen] = useState(false);
    const [semesterId, setSemesterId] = useState(semesters[0].id);

    const semester = semesters.find((s) => s.id === semesterId) ?? semesters[0];
    const selectedIndex = timeline.findIndex((s) => s.id === semesterId);

    function handleRowClick(kode: string) {
        // placeholder: replace with what should happen (open a modal, navigate, etc.)
        console.log("clicked course", kode);
    }

    function selectSemester(id: string) {
        setSemesterId(id);
        setDetailOpen(false);
    }

    return (
        <div className="p-12 md:p-8 text-foreground">
            <PrintStyles />

            {/* Semester progress bar (not printed) */}
            <nav aria-label="Pilih semester" className="mb-6 overflow-x-auto print:hidden">
                <ol className="flex min-w-max items-start">
                    {timeline.map((s, i) => {
                        const reached = i <= selectedIndex;
                        const active = i === selectedIndex;

                        return (
                            <li key={s.id} className="relative flex min-w-28 flex-1 flex-col items-center">
                                {/* line from the previous circle to this one */}
                                {i > 0 && (
                                    <div
                                        className={`absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 ${
                                            reached ? "bg-foreground" : "bg-foreground/25"
                                        }`}
                                    />
                                )}

                                <button
                                    type="button"
                                    onClick={() => selectSemester(s.id)}
                                    aria-current={active ? "step" : undefined}
                                    className="relative z-10 flex flex-col items-center hover:cursor-pointer"
                                >
                                    <span
                                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground text-sm font-semibold ${
                                            reached ? "bg-foreground text-surface" : "bg-surface"
                                        } ${active ? "ring-4 ring-accent/40" : ""}`}
                                    >
                                        {i + 1}
                                    </span>
                                    <span className={`mt-2 text-center text-xs ${active ? "font-semibold" : ""}`}>
                                        {s.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* The card (this id must match the one used in ../components/Print) */}
            <div id="forPrint" className="grid gap-4 border-2 border-foreground bg-surface p-12">
                <header className="grid grid-cols-12 items-start gap-4">
                    <div className="col-span-12 text-center md:col-span-6 md:col-start-4">
                        <h1 className="text-3xl font-semibold">Kartu Hasil Studi</h1>
                        <p className="text-xl">{semester.label}</p>
                    </div>
                    <div className="col-span-12 flex justify-end md:col-span-3 print:hidden">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="flex items-center gap-2 border-2 border-foreground px-6 py-2 hover:cursor-pointer"
                        >
                            <Printer className="h-5 w-5" />
                            print
                        </button>
                    </div>
                </header>

                <section className="grid grid-cols-12 items-end gap-4">
                    <div className="col-span-12 grid content-start gap-4 md:col-span-9">
                        <table className="w-64 border-collapse text-center">
                            <thead>
                                <tr><th colSpan={2} className={cell}>Hasil Studi Semester</th></tr>
                                <tr>
                                    <th className={cell}>JML SKs</th>
                                    <th className={cell}>IPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`${cell} text-center`}>{semester.jmlSks}</td>
                                    <td className={`${cell} text-center`}>{semester.ips.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="w-92 border-collapse">
                            <thead>
                                <tr><th colSpan={3} className={cell}>Hasil Studi Kumulatif</th></tr>
                                <tr>
                                    <th className={`${cell} wrap-break-word`}>Kredit Diambil</th>
                                    <th className={`${cell} wrap-break-word`}>Kredit Diperoleh</th>
                                    <th className={cell}>IPK</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={`${cell} text-center`}>{semester.kreditDiambil}</td>
                                    <td className={`${cell} text-center`}>{semester.kreditDiperoleh}</td>
                                    <td className={`${cell} text-center`}>{semester.ipk.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-span-12 flex justify-end md:col-span-3 print:hidden">
                        <button
                            type="button"
                            onClick={() => setDetailOpen((open) => !open)}
                            aria-pressed={detailOpen}
                            className="border-2 border-foreground px-6 py-2 hover:cursor-pointer"
                        >
                            {detailOpen ? "Tutup Detail" : "Detail"}
                        </button>
                    </div>
                </section>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] table-fixed border-collapse">
                        <colgroup>
                            <col className="w-12" />
                            <col className="w-28" />
                            <col />
                            <col className="w-16" />
                            <col className="w-16" />
                            <col className="w-16" />
                            <col className="w-20" />
                            <col className="w-28" />
                            <col className="w-20" />
                        </colgroup>

                        <thead>
                            <tr>
                                {columns.map((c) => (
                                    <th key={c} className={`${cell} text-left font-semibold`}>{c}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {semester.courses.map((c, i) => (
                                <tr key={c.kode}>
                                    <td className={cell}>{i + 1}</td>
                                    <td className={cell}>{c.kode}</td>

                                    {detailOpen ? (
                                        <td className="border border-foreground p-0">
                                            <button
                                                type="button"
                                                onClick={() => handleRowClick(c.kode)}
                                                className="block w-full px-2 py-2 text-left hover:bg-accent/20 hover:cursor-pointer"
                                            >
                                                {c.nama}
                                            </button>
                                        </td>
                                    ) : (
                                        <td className={cell}>{c.nama}</td>
                                    )}

                                    <td className={cell}>{c.status}</td>
                                    <td className={cell}>{c.sks}</td>
                                    <td className={cell}>{c.huruf}</td>
                                    <td className={cell}>{c.angka}</td>
                                    <td className={cell}>{c.bobot}</td>
                                    <td className={cell}>{c.ket}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                {columns.map((c) => (
                                    <td key={c} className={`${cell} font-semibold`}>&nbsp;</td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
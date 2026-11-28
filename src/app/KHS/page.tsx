'use client';

import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import PrintStyles from "../components/Print";
import { CURRENT_NIM, KHS_PATH, bobotKualitas, nilaiAngka, type Semester } from "./data/dataKHS";
import AnimatedPrinter from "@/app/components/printer";
import HoverGifButton from "../components/gif";

const columns = [
    "No", "Kode MK", "Nama Mata Kuliah",
    "Status", "Kredit (SKS)", "Nilai (Huruf)",
    "Nilai (Angka)", "Bobot kualitas (sksN)", "ket",
];

const cell = "border border-foreground px-2 py-2";

export default function KhsPage() {
    const [semesters, setSemesters] = useState<Semester[] | null>(null);
    const [failed, setFailed] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [semesterId, setSemesterId] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`/api/khs?nim=${encodeURIComponent(CURRENT_NIM)}`)
            .then((res) => {
                if (!res.ok) throw new Error("request failed");
                return res.json() as Promise<Semester[]>;
            })
            .then((data) => {
                if (!cancelled) setSemesters(data);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (failed) {
        return <p className="p-12 md:p-8 text-foreground">Gagal memuat data nilai.</p>;
    }
    if (!semesters) {
        return <p className="p-12 md:p-8 text-foreground">Memuat data nilai...</p>;
    }
    if (semesters.length === 0) {
        return <p className="p-12 md:p-8 text-foreground">Belum ada data nilai.</p>;
    }

    const semester = semesters.find((s) => s.id === semesterId) ?? semesters[0];
    const timeline = [...semesters].reverse();
    const selectedIndex = timeline.findIndex((s) => s.id === semester.id);

    function selectSemester(id: string) {
        setSemesterId(id);
        setDetailOpen(false);
    }

    return (
        <div
        style={
            detailOpen
                ? {
                      cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E") 10 10, zoom-in`,
                  }
                : undefined
            }
            className={`p-12 md:p-8 text-foreground ${detailOpen ? "cursor-zoom-in" : ""}`}
        >

        <div className="p-12 md:p-8 text-foreground">
            <PrintStyles />

            <div id="forPrint" className="grid gap-4 border-2 border-foreground bg-surface p-12 rounded-2xl">
                <nav aria-label="Pilih semester" className="-mx-12 -mt-12 overflow-x-auto border-b-2 border-foreground px-12 py-5 print:hidden">
                    <ol className="flex min-w-max items-start">
                        {timeline.map((s, i) => {
                            const reached = i <= selectedIndex;
                            const active = i === selectedIndex;

                            return (
                                <li key={s.id} className="relative flex min-w-28 flex-1 flex-col items-center">
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

                <header className="grid grid-cols-12 items-start gap-4">
                    <div className="col-span-12 text-center md:col-span-6 md:col-start-4">
                        <h1 className="text-3xl font-semibold">Kartu Hasil Studi</h1>
                        <p className="text-xl">{semester.label}</p>
                    </div>
                    <div className="col-span-12 flex justify-end md:col-span-3 print:hidden">
                       <AnimatedPrinter />                            
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
                        <HoverGifButton
                            src="/analytics.gif"
                            stillSrc="/analytics.png"
                            alt={detailOpen ? "Tutup Detail" : "Detail"}
                            active={detailOpen}
                            onClick={() => setDetailOpen((open) => !open)}
                        />
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
                                <tr key={c.id}>
                                    <td className={cell}>{i + 1}</td>
                                    <td className={cell}>{c.id}</td>

                                    {detailOpen ? (
                                        <td className="border border-foreground p-0">
                                            <Link
                                                href={`${KHS_PATH}/${encodeURIComponent(c.id)}`}
                                                className="block w-full px-2 py-2 text-left hover:bg-accent/20"
                                            >
                                                {c.nama}
                                            </Link>
                                        </td>
                                    ) : (
                                        <td className={cell}>{c.nama}</td>
                                    )}

                                    <td className={cell}>{c.status}</td>
                                    <td className={cell}>{c.sks}</td>
                                    <td className={cell}>{c.huruf}</td>
                                    <td className={cell}>{nilaiAngka(c).toFixed(2)}</td>
                                    <td className={cell}>{bobotKualitas(c).toFixed(2)}</td>
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
        </div>
    );
}
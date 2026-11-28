'use client';

import { useEffect, useState } from "react";
import PrintStyles from "../components/Print";
import { CURRENT_NIM, bobotKualitas, nilaiAngka, type Semester } from "../KHS/data/dataKHS";
import AnimatedPrinter from "@/app/components/printer";

const columns = [
    "No", "Kode MK", "Nama Mata Kuliah",
    "Status", "Kredit (SKS)", "Nilai (Huruf)",
    "Nilai (Angka)", "Bobot kualitas (sksN)", "ket",
];

const cell = "border border-foreground px-2 py-2";

export default function TranskripPage() {
    const [semesters, setSemesters] = useState<Semester[] | null>(null);
    const [failed, setFailed] = useState(false);

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

    const courses = [...semesters]
        .reverse()
        .flatMap((s) => s.courses.map((c) => ({ ...c, semesterId: s.id })));

    const totalSks = courses.reduce((total, c) => total + c.sks, 0);
    const totalBobot = courses.reduce((total, c) => total + bobotKualitas(c), 0);
    const ipk = totalSks ? totalBobot / totalSks : 0;

    return (
        <div className="p-12 md:p-8 text-foreground">
            <PrintStyles />

            <div id="forPrint" className="grid gap-4 border-2 border-foreground bg-surface p-12 rounded-2xl">
                <header className="grid grid-cols-12 items-start gap-4">
                    <div className="col-span-12 text-center md:col-span-6 md:col-start-4">
                        <h1 className="text-3xl font-semibold">Transkrip Nilai</h1>
                        {/* <p className="text-xl">Nama : </p> */}
                        <p className="text-xl">NIM : {CURRENT_NIM}</p>
                    </div>
                    <div className="col-span-12 flex justify-end md:col-span-3 print:hidden">
                        <AnimatedPrinter />
                    </div>
                </header>

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
                            {courses.map((c, i) => (
                                <tr key={`${c.semesterId}-${c.id}`}>
                                    <td className={cell}>{i + 1}</td>
                                    <td className={cell}>{c.id}</td>
                                    <td className={cell}>{c.nama}</td>
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
                                <td colSpan={4} className={`${cell} text-right font-semibold`}>Total</td>
                                <td className={`${cell} font-semibold`}>{totalSks}</td>
                                <td colSpan={2} className={cell}></td>
                                <td className={`${cell} font-semibold`}>{totalBobot.toFixed(2)}</td>
                                <td className={cell}></td>
                            </tr>
                            <tr>
                                <td colSpan={7} className={`${cell} text-right font-semibold`}>
                                    IPK (Total Bobot / Total SKS)
                                </td>
                                <td colSpan={2} className={`${cell} font-semibold`}>{ipk.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
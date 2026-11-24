'use client';

import { Printer } from "lucide-react";
import { useState } from "react";

const columns = [
    "No", "Kode MK", "Nama Mata Kuliah", 
    "Status", "Kredit (SKS)", "Nilai (Huruf)", 
    "Nilai (Angka)", "Bobot kualitas (sksN)", "ket",
];
const subheader = [
    "Ganjil 2025/2026"
]
const rows = [1, 2, 3];
const cell = "border border-foreground px-2 py-2";

export default function Card() {
    return (
        <div className="p-12 md:p-8 text-foreground">
            <div className="grid gap-4 border-2 border-foreground bg-surface p-12">
                <header className="grid grid-cols-12 items-start gap-4">
                    <div className="col-span-12 text-center md:col-span-6 md:col-start-4">
                        <h1 className="text-3xl font-semibold">Kartu Hasil Studi</h1>
                        <p className="text-xl">{subheader}</p>
                    </div>
                    <div className="col-span-12 flex justify-end md:col-span-3">
                        <button type="button" className="border-2 border-foreground px-6 py-2 hover:cursor-pointer">
                            print 
                        </button>
                    </div>
                </header>

                <section className="grid grid-cols-12 items-end gap-4">
                    <div className="col-span-12 grid content-start gap-4 md:col-span-9">
                        <table className="w-64 border-collapse">
                            <thead>
                                <tr><th colSpan={2} className={cell}>&nbsp;</th></tr>
                            </thead>
                            <tbody>
                                <tr><td className={cell}></td><td className={cell}></td></tr>
                                <tr><td className={cell}></td><td className={cell}></td></tr>
                            </tbody>
                        </table>

                        <table className="w-72 border-collapse">
                            <thead>
                                <tr><th colSpan={3} className={cell}>&nbsp;</th></tr>
                            </thead>
                            <tbody>
                                <tr><td className={cell}></td><td className={cell}></td><td className={cell}></td></tr>
                                <tr><td className={cell}></td><td className={cell}></td><td className={cell}></td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-span-12 flex justify-end md:col-span-3">
                        <button type="button" className="border-2 border-foreground px-6 py-2 hover:cursor-pointer">
                            Detail
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
                            {rows.map((n) => (
                                <tr key={n}>
                                    <td className={cell}>{n}</td>
                                    <td className={cell}></td>

                                    <td className="border border-foreground p-0">
                                        <button
                                            type="button"
                                            className="block w-full px-2 py-2 text-left hover:bg-accent/20"
                                        >
                                            &nbsp;
                                        </button>
                                    </td>

                                    <td className={cell}></td>
                                    <td className={cell}></td>
                                    <td className={cell}></td>
                                    <td className={cell}></td>
                                    <td className={cell}></td>
                                    <td className={cell}></td>
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
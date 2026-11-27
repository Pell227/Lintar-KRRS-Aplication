import Link from "next/link";
import { notFound } from "next/navigation";
import { CURRENT_NIM, KHS_PATH, bobotKualitas, findCourse, nilaiAngka } from "../data/dataKHS";
import { getSemesters } from "../queries";

export const dynamic = "force-dynamic";

const cell = "border border-foreground px-2 py-2";

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const semesters = await getSemesters(CURRENT_NIM);
    const found = findCourse(semesters, decodeURIComponent(id));

    if (!found) notFound();

    const { course, semester } = found;

    return (
        <div className="p-12 md:p-8 text-foreground">
            <div className="grid gap-4 border-2 border-foreground bg-surface p-12">
                <header className="grid grid-cols-12 items-start gap-4">
                    <div className="col-span-12 md:col-span-3">
                        <Link
                            href={KHS_PATH}
                            className="inline-block border-2 border-foreground px-6 py-2 hover:cursor-pointer"
                        >
                            Kembali
                        </Link>
                    </div>
                    <div className="col-span-12 text-center md:col-span-6">
                        <h1 className="text-3xl font-semibold">Detail Mata Kuliah</h1>
                        <p className="text-xl">{semester.label}</p>
                    </div>
                </header>

                <table className="w-64 border-collapse">
                    <tbody>
                        <tr>
                            <th className={`${cell} text-left`}>id MK</th>
                            <td className={cell}>{course.id}</td>
                        </tr>
                        <tr>
                            <th className={`${cell} text-left`}>Mata Kuliah</th>
                            <td className={cell}>{course.nama}</td>
                        </tr>
                        <tr>
                            <th className={`${cell} text-left`}>Kredit (SKS)</th>
                            <td className={cell}>{course.sks}</td>
                        </tr>
                        <tr>
                            <th className={`${cell} text-left`}>Status</th>
                            <td className={cell}>{course.status}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse text-center">
                        <thead>
                            <tr>
                                <th className={cell}>Tugas</th>
                                <th className={cell}>UTS</th>
                                <th className={cell}>UAS</th>
                                <th className={cell}>Nilai (Angka)</th>
                                <th className={cell}>Nilai (Huruf)</th>
                                <th className={cell}>Bobot kualitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cell}>{course.tugas.toFixed(2)}</td>
                                <td className={cell}>{course.uts.toFixed(2)}</td>
                                <td className={cell}>{course.uas.toFixed(2)}</td>
                                <td className={`${cell} font-semibold`}>{nilaiAngka(course).toFixed(2)}</td>
                                <td className={cell}>{course.huruf}</td>
                                <td className={cell}>{bobotKualitas(course).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
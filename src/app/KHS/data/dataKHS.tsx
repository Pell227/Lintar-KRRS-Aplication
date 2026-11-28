export const KHS_PATH = "/KHS";

export const CURRENT_NIM = "2025535250166";

export type Course = {
    id: string;
    nama: string;
    status: string;
    sks: number;
    huruf: string;
    tugas: number;
    uts: number;
    uas: number;
    ket: string;
};

export type Semester = {
    id: string;
    label: string;
    jmlSks: number;
    ips: number;
    kreditDiambil: number;
    kreditDiperoleh: number;
    ipk: number;
    courses: Course[];
};

export type NilaiRow = {
    TahunAjaran: string;
    Semester: "Ganjil" | "Genap";
    KodeMK: string;
    NamaMK: string;
    SKS: number;
    Status?: string;
    Tugas: number;
    UTS: number;
    UAS: number;
    Huruf?: string;
    Ket?: string;
};

export function nilaiAngka(c: Course): number {
    return (c.tugas + c.uts + c.uas) / 3;
}

export function bobotKualitas(c: Course): number {
    return c.sks * nilaiAngka(c);
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

function order(row: NilaiRow): number {
    return parseInt(row.TahunAjaran.slice(0, 4), 10) * 2 + (row.Semester === "Genap" ? 1 : 0);
}

export function buildSemesters(rows: NilaiRow[]): Semester[] {
    const groups = new Map<number, NilaiRow[]>();
    for (const row of rows) {
        const key = order(row);
        groups.set(key, [...(groups.get(key) ?? []), row]);
    }

    let totalSks = 0;
    let passedSks = 0;
    let totalBobot = 0;
    const result: Semester[] = [];

    for (const key of [...groups.keys()].sort((a, b) => a - b)) {
        const group = groups.get(key)!;

        const courses: Course[] = group.map((r) => ({
            id: r.KodeMK,
            nama: r.NamaMK,
            status: r.Status ?? "Baru",
            sks: r.SKS,
            huruf: r.Huruf ?? "",
            tugas: r.Tugas,
            uts: r.UTS,
            uas: r.UAS,
            ket: r.Ket ?? "",
        }));

        const sks = sum(courses.map((c) => c.sks));
        const bobot = sum(courses.map(bobotKualitas));

        totalSks += sks;
        totalBobot += bobot;
        passedSks += sum(courses.filter((c) => c.huruf !== "" && c.huruf !== "E").map((c) => c.sks));

        result.push({
            id: `${group[0].TahunAjaran.slice(0, 4)}-${group[0].Semester.toLowerCase()}`,
            label: `${group[0].Semester} ${group[0].TahunAjaran}`,
            jmlSks: sks,
            ips: sks ? bobot / sks : 0,
            kreditDiambil: totalSks,
            kreditDiperoleh: passedSks,
            ipk: totalSks ? totalBobot / totalSks : 0,
            courses,
        });
    }

    return result.reverse();
}

export function findCourse(
    semesters: Semester[],
    id: string,
): { course: Course; semester: Semester } | null {
    for (const semester of semesters) {
        const course = semester.courses.find((c) => c.id === id);
        if (course) return { course, semester };
    }
    return null;
}
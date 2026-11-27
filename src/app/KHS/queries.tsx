import connectDB from "@/lib/mongodb";
import Nilai from "@/models/nilai";
import { buildSemesters, type NilaiRow, type Semester } from "./data/dataKHS";

export async function getSemesters(nim: string): Promise<Semester[]> {
    await connectDB();

    const rows = await Nilai.find({ NIM: nim }).lean<NilaiRow[]>();

    return buildSemesters(rows);
}
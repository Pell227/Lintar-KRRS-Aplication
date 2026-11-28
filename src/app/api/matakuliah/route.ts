
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Matakuliah from "@/models/matakuliah";
import Dosen from "@/models/dosen";

export async function GET() {
  try {
    await connectDB();

    const matakuliah = await Matakuliah.find()
      .select("-__v")
      .sort({ kode: 1 })
      .lean();

    const daftarIdDosen = [
      ...new Set(
        matakuliah
          .map((item: any) => item.idDosen)
          .filter((id: string) => id && id.trim() !== "")
      ),
    ];

    const dosen = await Dosen.find({
      idDosen: { $in: daftarIdDosen },
    })
      .select("idDosen nama")
      .lean();

    const dosenMap = new Map(
      dosen.map((item: any) => [item.idDosen, item.nama])
    );

    const data = matakuliah.map((item: any) => ({
      ...item,
      namaDosen: dosenMap.get(item.idDosen) || "",
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Gagal mengambil data mata kuliah:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data mata kuliah",
      },
      { status: 500 }
    );
  }
}
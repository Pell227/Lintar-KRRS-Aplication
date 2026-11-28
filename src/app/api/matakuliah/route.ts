import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Matakuliah from "@/models/matakuliah";

export async function GET() {
  try {
    await connectDB();

    const matakuliah = await Matakuliah.find()
      .select("-__v")
      .sort({ kode: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: matakuliah,
    });
  } catch (error) {
    console.error("Gagal mengambil data mata kuliah:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data mata kuliah",
      },
      { status: 500 },
    );
  }
}

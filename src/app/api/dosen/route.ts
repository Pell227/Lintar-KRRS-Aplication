
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Dosen from "@/models/dosen";

export async function GET() {
  try {
    await connectDB();

    const dosen = await Dosen.find({ aktif: true })
      .select("-__v")
      .sort({ nama: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: dosen,
    });
  } catch (error) {
    console.error("Gagal mengambil data dosen:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data dosen",
      },
      { status: 500 },
    );
  }
}

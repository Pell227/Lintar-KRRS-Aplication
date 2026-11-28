import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import KalenderAkademik from "@/models/kalenderakademik";

export async function GET() {
  try {
    await connectDB();

    const data = await KalenderAkademik.find().sort({ tanggalMulai: 1 });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil data kalender akademik:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data kalender akademik" },
      { status: 500 }
    );
  }
}

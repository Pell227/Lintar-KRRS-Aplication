
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FAQ from "@/models/faq";

export async function GET() {
  try {
    await connectDB();

    const data = await FAQ.find({ aktif: true }).sort({ urutan: 1 });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil data FAQ:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data FAQ" },
      { status: 500 }
    );
  }
}

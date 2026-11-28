// src/app/api/pengumuman/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Pengumuman from "@/models/pengumuman";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Pengumuman.find().sort({ Tanggal: -1 }).lean());
}
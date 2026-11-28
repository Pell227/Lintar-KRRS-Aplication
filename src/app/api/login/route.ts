import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Akun, { cekPassword, teks } from "@/app/auth/akun";

const gagal = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const NIM = teks(body.NIM).trim();
    const Password = teks(body.Password);

    if (!NIM || !Password) return gagal("NIM dan password wajib diisi.");

    const data = await Akun.findOne({ NIM });
    if (!data || !cekPassword(Password, data.Password)) {
      return gagal("NIM atau password salah.", 401);
    }

    return NextResponse.json({ NIM: data.NIM, Nama: data.Nama });
  } catch (err) {
    console.error("Gagal login:", err);
    return gagal("Server sedang bermasalah. Coba lagi sebentar lagi.", 500);
  }
}
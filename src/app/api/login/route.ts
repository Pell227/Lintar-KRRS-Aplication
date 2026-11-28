import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Akun, { cekPassword, teks } from "@/app/auth/akun";

const gagal = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const Email = teks(body.Email).trim().toLowerCase();
    const Password = teks(body.Password);

    if (!Email || !Password) return gagal("Email dan password wajib diisi.");

    const data = await Akun.findOne({ Email });
    if (!data || !cekPassword(Password, data.Password)) {
      return gagal("Email atau password salah.", 401);
    }

    return NextResponse.json({ NIM: data.NIM, Nama: data.Nama });
  } catch (err) {
    console.error("Gagal login:", err);
    return gagal("Server sedang bermasalah. Coba lagi sebentar lagi.", 500);
  }
}
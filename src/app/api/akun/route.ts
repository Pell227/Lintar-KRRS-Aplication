import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Akun, { buatHash, cekPassword, teks } from "@/app/auth/akun";

const gagal = (error: string, status = 400) =>
  NextResponse.json({ error }, { status });

const galat = "Server sedang bermasalah. Coba lagi sebentar lagi.";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const Nama = teks(body.Nama).trim();
    const NIM = teks(body.NIM).trim();
    const Email = teks(body.Email).trim().toLowerCase();
    const Password = teks(body.Password);

    if (!Nama || !NIM || !Email || !Password) {
      return gagal("Semua kolom wajib diisi.");
    }
    if (!/^\d{9}$/.test(NIM)) return gagal("NIM harus 9 digit angka.");
    if (!/^\S+@\S+\.\S+$/.test(Email)) {
      return gagal("Format email belum benar.");
    }
    if (Password.length < 8 || Password.length > 64) {
      return gagal("Password harus 8 sampai 64 karakter.");
    }

    const sudahAda = await Akun.findOne({ $or: [{ NIM }, { Email }] });
    if (sudahAda) return gagal("NIM atau email sudah terdaftar.", 409);

    await Akun.create({ Nama, NIM, Email, Password: buatHash(Password) });
    return NextResponse.json(
      { pesan: "Akun berhasil dibuat." },
      { status: 201 },
    );
  } catch (err) {
    console.error("Gagal daftar:", err);
    return gagal(galat, 500);
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const NIM = teks(body.NIM).trim();
    const PasswordLama = teks(body.PasswordLama);
    const PasswordBaru = teks(body.PasswordBaru);

    if (!NIM || !PasswordLama || !PasswordBaru) {
      return gagal("Semua kolom wajib diisi.");
    }
    if (PasswordBaru.length < 8 || PasswordBaru.length > 64) {
      return gagal("Password baru harus 8 sampai 64 karakter.");
    }
    if (PasswordBaru === PasswordLama) {
      return gagal("Password baru harus berbeda dari password lama.");
    }

    const data = await Akun.findOne({ NIM });
    if (!data || !cekPassword(PasswordLama, data.Password)) {
      return gagal("Password lama salah.", 401);
    }

    await Akun.updateOne({ NIM }, { Password: buatHash(PasswordBaru) });
    return NextResponse.json({ pesan: "Password berhasil diubah." });
  } catch (err) {
    console.error("Gagal ganti password:", err);
    return gagal(galat, 500);
  }
}
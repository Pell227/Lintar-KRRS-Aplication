import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Mahasiswa from "@/models/mahasiswa";

export async function GET(req: Request) {
  await connectDB();

  const nim = new URL(req.url).searchParams.get("nim");
  if (!nim) {
    return NextResponse.json({ error: "NIM wajib diisi" }, { status: 400 });
  }

  const data = await Mahasiswa.findOne({ NIM: nim });
  if (!data) {
    return NextResponse.json(
      { error: "Mahasiswa tidak ditemukan" },
      { status: 404 },
    );
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const baru = await Mahasiswa.create(body);
    return NextResponse.json(baru, { status: 201 });
  } catch (err) {
    const pesan = err instanceof Error ? err.message : "Gagal menyimpan";
    return NextResponse.json({ error: pesan }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  await connectDB();

  const { NIM, ...perubahan } = await req.json();
  if (!NIM) {
    return NextResponse.json({ error: "NIM wajib diisi" }, { status: 400 });
  }

  const data = await Mahasiswa.findOneAndUpdate({ NIM }, perubahan, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return NextResponse.json(
      { error: "Mahasiswa tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}


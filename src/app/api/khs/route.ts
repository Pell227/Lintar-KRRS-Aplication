import { NextResponse } from "next/server";
import { getSemesters } from "@/app/KHS/queries";

export async function GET(req: Request) {
  const nim = new URL(req.url).searchParams.get("nim");
  if (!nim) {
    return NextResponse.json({ error: "NIM wajib diisi" }, { status: 400 });
  }

  try {
    return NextResponse.json(await getSemesters(nim));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Mahasiswa from "@/models/mahasiswa";
import KtmCard from "../components/ktmcard";
import ProfileShell from "../components/profileshell";

export const dynamic = "force-dynamic";

const NIM_AKTIF = "2025535250166";

export default async function ProfilePage() {
  await connectDB();
  const mhs = await Mahasiswa.findOne({ NIM: NIM_AKTIF }).lean();

  if (!mhs) {
    return <p className="p-8">Data mahasiswa belum ada di database.</p>;
  }

  return (
    <ProfileShell>
      <Link
        href="/biodata"
        className="block cursor-pointer transition hover:scale-[1.02]"
      >
        <KtmCard
          nama={mhs.Nama}
          prodi={mhs.Jurusan}
          fakultas={mhs.Fakultas}
          nim={mhs.NIM}
          foto="/foto.jpg"
        />
      </Link>
    </ProfileShell>
  );
}

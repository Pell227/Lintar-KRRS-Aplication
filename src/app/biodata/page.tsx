import connectDB from "@/lib/mongodb";
import Mahasiswa from "@/models/mahasiswa";
import BiodataCards from "../components/biodatacard";

export const dynamic = "force-dynamic";

const NIM_AKTIF = "2025535250166";

export default async function BiodataPage() {
  await connectDB();
  const mhs = await Mahasiswa.findOne({ NIM: NIM_AKTIF }).lean();

  if (!mhs) {
    return <p className="p-8">Data mahasiswa belum ada di database.</p>;
  }

  const data = JSON.parse(JSON.stringify(mhs));

  return (
    <main className="p-8">
      <BiodataCards mhs={data} />
    </main>
  );
}

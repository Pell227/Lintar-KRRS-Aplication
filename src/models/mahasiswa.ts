import mongoose from "mongoose";

const mahasiswaSchema = new mongoose.Schema(
  {
    NIM: { type: String, required: true, unique: true, trim: true },
    Nama: { type: String, required: true, trim: true },
    tgllahir: { type: Date },
    Fakultas: { type: String, trim: true },
    Jurusan: { type: String, trim: true },
    Agama: { type: String },
    Email: { type: String, unique: true, lowercase: true, trim: true },
    Sekolah: { type: String, trim: true },
    Ijazah: { type: String, trim: true },
    tglijazah: { type: Date },
    namaortu: { type: String, trim: true },
    alamat: { type: String, trim: true },
    NoHp: { type: String, trim: true },
  },
  { timestamps: true },
);

export default mongoose.models.Mahasiswa ||
  mongoose.model("Mahasiswa", mahasiswaSchema);

import mongoose from "mongoose";

const jadwalSchema = new mongoose.Schema(
  {
    sesi: { type: Number, required: true },
    hari: { type: String, trim: true },
    mulai: { type: String, required: true },
    selesai: { type: String, required: true },
    ruang: { type: String, trim: true },
  },
  { _id: false },
);

const matakuliahSchema = new mongoose.Schema(
  {
    kode: { type: String, required: true, unique: true, trim: true },
    nama: { type: String, required: true, trim: true },
    sks: { type: Number, required: true },
    kelas: { type: String, trim: true },
    kategori: {
      type: String,
      enum: ["Wajib", "Pilihan"],
      required: true,
    },
    jadwal: {
      type: [jadwalSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Matakuliah ||
  mongoose.model("Matakuliah", matakuliahSchema, "matakuliah");

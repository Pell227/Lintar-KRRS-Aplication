import mongoose from "mongoose";

const pengumumanSchema = new mongoose.Schema(
  {
    Judul: { type: String, required: true, trim: true },
    Isi: { type: String, required: true },
    Tanggal: { type: Date, default: Date.now },
  },
  { collection: "pengumuman" },
);

export default mongoose.models.Pengumuman || mongoose.model("Pengumuman", pengumumanSchema);
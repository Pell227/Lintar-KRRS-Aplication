import mongoose from "mongoose";

const nilaiSchema = new mongoose.Schema(
  {
    NIM: { type: String, required: true, trim: true, index: true },
    TahunAjaran: { type: String, required: true, trim: true }, // "2025/2026"
    Semester: { type: String, required: true, enum: ["Ganjil", "Genap"] },
    KodeMK: { type: String, required: true, trim: true },
    NamaMK: { type: String, required: true, trim: true },
    SKS: { type: Number, required: true },
    Status: { type: String, default: "Baru", trim: true },
    Tugas: { type: Number, required: true },
    UTS: { type: Number, required: true },
    UAS: { type: Number, required: true },
    Huruf: { type: String, trim: true },
    Ket: { type: String, trim: true },
  },
  { timestamps: true, collection: "nilai" },
);

nilaiSchema.index(
  { NIM: 1, TahunAjaran: 1, Semester: 1, KodeMK: 1 },
  { unique: true },
);

export default mongoose.models.Nilai || mongoose.model("Nilai", nilaiSchema);
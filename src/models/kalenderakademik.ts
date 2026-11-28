import mongoose, { Schema, models, model } from "mongoose";

const KalenderAkademikSchema = new Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    tanggalMulai: {
      type: String,
      required: true,
    },
    tanggalSelesai: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
    },
    semester: {
      type: String,
    },
  },
  {
    collection: "kalenderakademik",
  }
);

const KalenderAkademik =
  models.KalenderAkademik ||
  model("KalenderAkademik", KalenderAkademikSchema);

export default KalenderAkademik;
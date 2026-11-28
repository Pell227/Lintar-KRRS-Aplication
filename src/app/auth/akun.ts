import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import mongoose from "mongoose";

const akunSchema = new mongoose.Schema(
  {
    Nama: { type: String, required: true, trim: true },
    NIM: { type: String, required: true, unique: true, trim: true },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    Password: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Akun || mongoose.model("Akun", akunSchema);

export function buatHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function cekPassword(password: string, tersimpan?: string | null) {
  const [salt, hash] = (tersimpan || "").split(":");
  if (!salt || !hash) return false;

  const asli = Buffer.from(hash, "hex");
  const coba = scryptSync(password, salt, 64);
  return asli.length === coba.length && timingSafeEqual(asli, coba);
}

export function teks(nilai: unknown) {
  return typeof nilai === "string" ? nilai : "";
}
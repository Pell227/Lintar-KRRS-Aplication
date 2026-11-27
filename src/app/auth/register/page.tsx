"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";

const kolom = [
  { name: "Nama", label: "Nama lengkap", type: "text", hint: "Sesuai KTM" },
  { name: "NIM", label: "NIM", type: "text", hint: "9 digit angka" },
  { name: "Email", label: "Email", type: "email", hint: "nama@email.com" },
  {
    name: "Password",
    label: "Password",
    type: "password",
    hint: "Minimal 8 karakter",
  },
  { name: "Ulangi", label: "Ulangi password", type: "password", hint: "" },
] as const;

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#ab1509] focus:ring-2 focus:ring-[#ab1509]/15 sm:text-sm";

export default function Register() {
  const [form, setForm] = useState({
    Nama: "",
    NIM: "",
    Email: "",
    Password: "",
    Ulangi: "",
  });
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (form.Password !== form.Ulangi) {
      setError("Password dan ulangi password tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/akun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nama: form.Nama,
          NIM: form.NIM,
          Email: form.Email,
          Password: form.Password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSukses(true);
    } catch {
      setError("Tidak bisa menghubungi server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="scheme-light fixed inset-0 z-60 overflow-y-auto bg-[linear-gradient(115deg,#5c0b06_0%,#7c1009_35%,#ab1509_75%,#c52a1d_100%)] text-slate-800">
      <div className="relative flex min-h-full items-center justify-center overflow-hidden px-4 py-10">
        <Image
          src="/pngwing.com.png"
          alt=""
          width={697}
          height={680}
          loading="eager"
          className="pointer-events-none absolute -right-24 top-1/2 h-[120%] w-auto -translate-y-1/2 opacity-10 brightness-0 invert"
        />

        <div className="relative w-full max-w-md">
          <Link
            href="/"
            className="mb-4 inline-block text-sm font-medium text-white hover:underline"
          >
            ← Kembali ke beranda
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <Image
                src="/pngwing.com.png"
                alt="Logo Untar"
                width={697}
                height={680}
                loading="eager"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-[#ab1509]">Lintar</span>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Buat akun Lintar
            </h1>

            {sukses ? (
              <div className="mt-4 space-y-5">
                <p role="status" className="text-sm text-slate-700">
                  Akun berhasil dibuat. Sekarang kamu bisa masuk dengan NIM dan
                  password tadi.
                </p>
                <Link
                  href="/login"
                  className="block w-full rounded-lg bg-[#ab1509] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#861007]"
                >
                  Masuk sekarang
                </Link>
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  Isi data di bawah, lalu masuk dengan NIM kamu.
                </p>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-4"
                >
                  {error && (
                    <p
                      role="alert"
                      className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-[#861007]"
                    >
                      {error}
                    </p>
                  )}

                  {kolom.map((k) => (
                    <div key={k.name}>
                      <label htmlFor={k.name} className={labelClass}>
                        {k.label}
                      </label>
                      <input
                        id={k.name}
                        name={k.name}
                        type={k.type}
                        inputMode={k.name === "NIM" ? "numeric" : undefined}
                        autoComplete={
                          k.type === "password" ? "new-password" : undefined
                        }
                        placeholder={k.hint}
                        value={form[k.name]}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#ab1509] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#861007] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Membuat akun..." : "Buat akun"}
                  </button>
                </form>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-white">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
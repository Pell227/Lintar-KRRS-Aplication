"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

const kolom = [
  { name: "PasswordLama", label: "Password saat ini" },
  { name: "PasswordBaru", label: "Password baru" },
  { name: "Ulangi", label: "Ulangi password baru" },
] as const;

const kosong = { PasswordLama: "", PasswordBaru: "", Ulangi: "" };

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#ab1509] focus:ring-2 focus:ring-[#ab1509]/15 sm:text-sm";

export default function GantiPassword() {
  const router = useRouter();
  const [user, setUser] = useState<{ NIM: string; Nama: string } | null>(null);
  const [form, setForm] = useState(kosong);
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lintar-user");

    if (saved) {
      try {
        setUser(JSON.parse(saved));
        return;
      } catch {
        localStorage.removeItem("lintar-user");
      }
    }
    router.push("/auth/login");
  }, [router]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSukses("");

    if (form.PasswordBaru !== form.Ulangi) {
      setError("Password baru dan ulangi password tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/akun", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          NIM: user?.NIM,
          PasswordLama: form.PasswordLama,
          PasswordBaru: form.PasswordBaru,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSukses(data.pesan);
      setForm(kosong);
    } catch {
      setError("Tidak bisa menghubungi server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-md rounded-2xl border-t-4 border-[#ab1509] bg-white p-6 text-slate-800 shadow-lg sm:p-8">
      <h1 className="text-2xl font-bold text-slate-900">Ganti Password</h1>
      <p className="mt-2 break-words text-sm text-slate-600">
        Masuk sebagai {user.Nama} ({user.NIM})
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-[#861007]"
          >
            {error}
          </p>
        )}
        {sukses && (
          <p
            role="status"
            className="rounded-lg border border-[#ab1509]/25 px-3.5 py-2.5 text-sm text-slate-800"
          >
            <span className="font-bold text-[#ab1509]">✓</span> {sukses}
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
              type="password"
              autoComplete={
                k.name === "PasswordLama" ? "current-password" : "new-password"
              }
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
          {loading ? "Menyimpan..." : "Simpan password baru"}
        </button>
      </form>
    </div>
  );
}
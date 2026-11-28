"use client";

import { useTheme } from "../components/themeprovider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NIM_AKTIF = "2025535250166";

type FormData = {
  Nama: string;
  tgllahir: string;
  Agama: string;
  Email: string;
  NoHp: string;
  alamat: string;
  Fakultas: string;
  Jurusan: string;
  Sekolah: string;
  Ijazah: string;
  tglijazah: string;
  namaortu: string;
};

type FieldProps = {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

function Field({ label, name, value, onChange, type = "text" }: FieldProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <label className="flex flex-col gap-1 text-sm font-semibold">
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`rounded-lg border-2 px-3 py-2 font-normal ${
          isDark
            ? "border-white/40 bg-[#222831] text-white [color-scheme:dark]"
            : "border-black bg-white text-black"
        }`}
      />
    </label>
  );
}

const kosong: FormData = {
  Nama: "",
  tgllahir: "",
  Agama: "",
  Email: "",
  NoHp: "",
  alamat: "",
  Fakultas: "",
  Jurusan: "",
  Sekolah: "",
  Ijazah: "",
  tglijazah: "",
  namaortu: "",
};

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(kosong);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    fetch(`/api/profile?nim=${NIM_AKTIF}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setForm({
            Nama: d.Nama ?? "",
            tgllahir: d.tgllahir ? d.tgllahir.slice(0, 10) : "",
            Agama: d.Agama ?? "",
            Email: d.Email ?? "",
            NoHp: d.NoHp ?? "",
            alamat: d.alamat ?? "",
            Fakultas: d.Fakultas ?? "",
            Jurusan: d.Jurusan ?? "",
            Sekolah: d.Sekolah ?? "",
            Ijazah: d.Ijazah ?? "",
            tglijazah: d.tglijazah ? d.tglijazah.slice(0, 10) : "",
            namaortu: d.namaortu ?? "",
          });
        }
        setLoading(false);
      });
  }, []);

  const ubah = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const simpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        NIM: NIM_AKTIF,
        ...form,
        tgllahir: form.tgllahir || undefined,
        tglijazah: form.tglijazah || undefined,
      }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal menyimpan");
      return;
    }
    router.push("/profile");
    router.refresh();
  };

  if (loading) return <p className="p-8">Memuat data...</p>;

  return (
    <main
      className={`min-h-screen p-8 transition-colors ${
        isDark ? "bg-[#222831]" : "bg-[#F5ECEC]"
      }`}
    >
      <form
        onSubmit={simpan}
        className={`mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border-2 p-6 ${
          isDark
            ? "border-white/40 bg-[#31363F] text-white"
            : "border-black bg-white text-black"
        }`}
      >
        <h1 className="font-serif text-2xl uppercase">Edit Profile</h1>

        <label className="flex flex-col gap-1 text-sm font-semibold">
          NIM
          <input
            value={NIM_AKTIF}
            disabled
            className={`rounded-lg border-2 px-3 py-2 font-normal ${
              isDark
                ? "border-white/20 bg-white/10 text-white/60"
                : "border-black/30 bg-gray-100"
            }`}
          />
        </label>

        <h2 className="mt-2 font-serif text-lg">Mahasiswa</h2>
        <Field label="Nama" name="Nama" value={form.Nama} onChange={ubah} />
        <Field
          label="Tanggal Lahir"
          name="tgllahir"
          type="date"
          value={form.tgllahir}
          onChange={ubah}
        />
        <Field label="Agama" name="Agama" value={form.Agama} onChange={ubah} />
        <Field
          label="Email"
          name="Email"
          type="email"
          value={form.Email}
          onChange={ubah}
        />
        <Field label="No. HP" name="NoHp" value={form.NoHp} onChange={ubah} />
        <Field
          label="Fakultas"
          name="Fakultas"
          value={form.Fakultas}
          onChange={ubah}
        />
        <Field
          label="Jurusan"
          name="Jurusan"
          value={form.Jurusan}
          onChange={ubah}
        />

        <h2 className="mt-2 font-serif text-lg">Orang Tua</h2>
        <Field
          label="Nama Orang Tua"
          name="namaortu"
          value={form.namaortu}
          onChange={ubah}
        />
        <Field
          label="Alamat"
          name="alamat"
          value={form.alamat}
          onChange={ubah}
        />

        <h2 className="mt-2 font-serif text-lg">Sekolah</h2>
        <Field
          label="Asal Sekolah"
          name="Sekolah"
          value={form.Sekolah}
          onChange={ubah}
        />
        <Field
          label="No. Ijazah"
          name="Ijazah"
          value={form.Ijazah}
          onChange={ubah}
        />
        <Field
          label="Tanggal Ijazah"
          name="tglijazah"
          type="date"
          value={form.tglijazah}
          onChange={ubah}
        />

        {error && (
          <p
            className={`text-sm font-semibold ${isDark ? "text-red-300" : "text-red-600"}`}
          >
            {error}
          </p>
        )}

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full border-2 border-black bg-[#D72323] px-6 py-2 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          <Link
            href="/profile"
            className={`rounded-full border-2 px-6 py-2 font-semibold ${
              isDark
                ? "border-white/40 bg-[#222831] text-white hover:bg-[#454C56]"
                : "border-black bg-white text-black"
            }`}
          >
            Batal
          </Link>
        </div>
      </form>
    </main>
  );
}

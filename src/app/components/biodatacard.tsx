"use client";

import FlipCard from "./flipcard";

const tgl = (v?: string) =>
  v
    ? new Date(v).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between gap-3 border-b border-black/10 py-2 text-sm">
    <span className="font-semibold">{label}</span>
    <span className="text-right">{value || "-"}</span>
  </div>
);

export default function BiodataCards({ mhs }: { mhs: any }) {
  const cards = [
    {
      title: "Biodata Mahasiswa",
      bg: "#C8D8EE",
      rows: [
        ["Nama", mhs.Nama],
        ["NIM", mhs.NIM],
        ["Tanggal Lahir", tgl(mhs.tgllahir)],
        ["Agama", mhs.Agama],
        ["Email", mhs.Email],
        ["No. HP", mhs.NoHp],
      ],
    },
    {
      title: "Biodata Orang Tua",
      bg: "#F3E3D0",
      rows: [
        ["Nama Orang Tua", mhs.namaortu],
        ["Alamat", mhs.alamat],
      ],
    },
    {
      title: "Biodata Sekolah",
      bg: "#E0DAF3",
      rows: [
        ["Asal Sekolah", mhs.Sekolah],
        ["No. Ijazah", mhs.Ijazah],
        ["Tanggal Ijazah", tgl(mhs.tglijazah)],
      ],
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {cards.map((c) => (
        <FlipCard
          key={c.title}
          width={300}
          height={400}
          background={c.bg}
          color="#1a1a1a"
          front={
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <h2 className="text-xl font-bold">{c.title}</h2>
              <p className="text-xs opacity-60">Klik untuk membalik</p>
            </div>
          }
          back={
            <div className="p-6">
              <h3 className="mb-3 text-lg font-bold">{c.title}</h3>
              {c.rows.map(([label, value]) => (
                <Row key={label} label={label} value={value} />
              ))}
            </div>
          }
        />
      ))}
    </div>
  );
}

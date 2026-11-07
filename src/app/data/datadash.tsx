export type Mahasiswa = {
  Nama: string;
  NIM: string;
  Prodi: string;
};

export type Akademik = {
  Semester: number;
  ips: number;
  ipk: number;
  sks: number;
};

export type Pengumuman = {
  id: number;
  judul: string;
  tanggal: Date;
};

export type Jadwal = {
  kodemat: string;
  matkul: string;
  hari: string;
  jam: string;
  ruang: string;
};

export type DosenPa = {
  npd: string;
  namadosen: string;
  email: string;
  telp: string;
};

export const dataMahasiswa: Mahasiswa = {
  Nama: "Pel",
  NIM: "535250166",
  Prodi: "Teknik Informatika",
};

export const dataAkademik: Akademik = {
  Semester: 3,
  ips: 3.91,
  ipk: 3.85,
  sks: 86,
};

export const dataPengumuman: Pengumuman[] = [
  { id: 1, judul: "Libur semester", tanggal: new Date(2026, 6, 20) },
  { id: 2, judul: "Jadwal UAS dirilis", tanggal: new Date(2026, 10, 10) },
  { id: 3, judul: "Batas pengisian KRRS", tanggal: new Date(2026, 10, 15) },
];

export const dataJadwal: Jadwal[] = [
  {
    kodemat: "TK1023",
    matkul: "Front End Programming",
    hari: "Senin",
    jam: "09.30 - 11.10",
    ruang: "905",
  },
  {
    kodemat: "TK2041",
    matkul: "Machine Learning",
    hari: "Selasa",
    jam: "10.00 - 11.40",
    ruang: "204",
  },
  {
    kodemat: "TK1055",
    matkul: "Sistem Basis Data",
    hari: "Rabu",
    jam: "13.00 - 14.40",
    ruang: "Lab 3",
  },
];

export const dataDosenPa: DosenPa = {
  npd: "10240089",
  namadosen: "Steve",
  email: "steve@gmail.com",
  telp: "089338338908",
};

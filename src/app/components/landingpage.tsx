"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";


const menu = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "FAQ", href: "/faq" },
];

const tentang = [
  {
    judul: "Dashboard",
    isi: "Lihat IPK, IPS, total SKS, jadwal kuliah, dan data dosen PA kamu dalam satu layar.",
    ikon: "dashboard",
  },
  {
    judul: "KRRS",
    isi: "Pilih mata kuliah semester ini. Total SKS dihitung otomatis dengan batas pengambilan 24 SKS.",
    ikon: "krrs",
  },
  {
    judul: "Pengumuman",
    isi: "Baca kabar terbaru dari kampus, mulai dari jadwal UAS sampai batas pengisian KRRS.",
    ikon: "pengumuman",
  },
] as const;

const bentukIkon = {
  wisuda: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" />
      <path d="M6 11.8V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.2" />
      <path d="M21.5 9.5V15" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
      <rect x="3.5" y="15.5" width="7" height="5" rx="1.5" />
    </>
  ),
  krrs: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="m9 13 2.2 2.2L15.5 11" />
    </>
  ),
  pengumuman: (
    <>
      <path d="M3.5 10v4a1 1 0 0 0 1 1H8l8.5 4V5L8 9H4.5a1 1 0 0 0-1 1Z" />
      <path d="M19.5 9.5a4 4 0 0 1 0 5" />
      <path d="m8 15 1.3 4.2a1 1 0 0 0 1 .8h.7" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  tutup: <path d="m6 6 12 12M18 6 6 18" />,
};

function Ikon({
  nama,
  className,
}: {
  nama: keyof typeof bentukIkon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {bentukIkon[nama]}
    </svg>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/pngwing.com.png"
        alt="Logo Untar"
        width={697}
        height={680}
        loading="eager"
        className="h-8 w-auto brightness-0 invert"
      />
      <span className="text-xl font-bold tracking-tight text-white">
        Lintar
      </span>
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [pekat, setPekat] = useState(false);

  useEffect(() => {
    const cek = () => setPekat(window.scrollY > 24);
    cek();
    window.addEventListener("scroll", cek, { passive: true });
    return () => window.removeEventListener("scroll", cek);
  }, []);

  useEffect(() => {
    if (!open) return;
    const tutup = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", tutup);
    return () => document.removeEventListener("keydown", tutup);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-30 -mb-16 transition-colors duration-300 ${
        pekat || open
          ? "bg-[#7c1009] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[75rem] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Lintar, ke beranda"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Menu utama"
          className="hidden items-center gap-1 md:flex"
        >
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/login"
            className="ml-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#ab1509] transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Daftar
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-hp"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="rounded-md p-2 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white md:hidden"
        >
          <Ikon nama={open ? "tutup" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <nav
          id="menu-hp"
          aria-label="Menu utama"
          className="absolute inset-x-0 top-full grid gap-1 border-t border-white/15 bg-[#7c1009] px-4 pb-5 pt-3 shadow-lg shadow-black/20 md:hidden"
        >
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/40 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#ab1509] hover:bg-red-50"
            >
              Daftar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default function LandingPage() {
  const area = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = area.current?.closest("main");
    const induk = main?.parentElement;
    if (!main || !induk) return;

    const dimatikan: Element[] = [];
    for (const el of Array.from(induk.children)) {
      if (el === main) break;
      if (!el.hasAttribute("inert") && !el.hasAttribute("hidden")) {
        el.setAttribute("inert", "");
        dimatikan.push(el);
      }
    }
    return () => dimatikan.forEach((el) => el.removeAttribute("inert"));
  }, []);

  function klik(e: MouseEvent<HTMLDivElement>) {
    const href = (e.target as Element).closest("a")?.getAttribute("href");
    if (!href || !href.startsWith("#") || href.length < 2) return;

    const tujuan = document.getElementById(href.slice(1));
    if (!tujuan) return;

    e.preventDefault();
    const kurangiGerak = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    tujuan.scrollIntoView({ behavior: kurangiGerak ? "auto" : "smooth" });
  }

  return (
    <div
      ref={area}
      data-halaman-publik
      onClick={klik}
      className="absolute inset-x-0 top-0 z-60 min-h-dvh bg-white font-sans text-slate-800"
    >
      <Navbar />

      <section
        id="beranda"
        className="relative isolate flex min-h-[34rem] items-center justify-center overflow-hidden bg-[linear-gradient(115deg,#5c0b06_0%,#7c1009_35%,#ab1509_75%,#c52a1d_100%)] px-6 pb-20 pt-32 text-center text-white lg:min-h-[41rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square h-[125%] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]"
        >
          <Image
            src="/pngwing.com.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 720px, 90vw"
            loading="eager"
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Portal akademik mahasiswa Untar
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            Lintar membantu kamu mengisi KRRS, memantau IPK dan jadwal kuliah,
            serta membaca pengumuman kampus dalam satu tempat.
          </p>
          <Link
            href="/register"
            className="mt-9 inline-block rounded-full bg-white px-9 py-3.5 text-sm font-semibold text-[#ab1509] shadow-lg shadow-black/20 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Mulai Sekarang
          </Link>
          <p className="mt-5 text-sm text-white/80">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-white underline underline-offset-4"
            >
              Masuk
            </Link>
          </p>
        </div>
      </section>

      <section id="tentang" className="scroll-mt-16 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Ikon nama="wisuda" className="mx-auto h-8 w-8 text-[#ab1509]" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tentang <span className="text-[#ab1509]">Lintar</span>
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-slate-600">
              Lintar adalah portal akademik untuk mahasiswa Untar. Jadwal, KRRS,
              dan kabar kampus ada di satu tempat, jadi kamu tidak perlu
              pindah-pindah halaman.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {tentang.map((kartu) => (
              <li
                key={kartu.judul}
                className="rounded-md border border-slate-100 bg-white px-7 py-9 text-center shadow-[0_12px_40px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-22px_rgba(171,21,9,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Ikon
                  nama={kartu.ikon}
                  className="mx-auto h-10 w-10 text-[#ab1509]"
                />
                <span className="mx-auto my-5 block h-0.5 w-8 bg-[#ab1509]" />
                <h3 className="font-semibold text-slate-900">{kartu.judul}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {kartu.isi}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="bg-[#4a0904] px-6 py-10 text-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Portal akademik mahasiswa Untar.
            </p>
          </div>
          <p className="text-sm text-white/70">
            © 2026 Lintar · Universitas Tarumanagara
          </p>
        </div>
      </footer>
    </div>
  );
}
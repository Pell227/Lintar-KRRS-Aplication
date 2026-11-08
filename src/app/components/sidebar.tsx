"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Side = {
  label: string;
  href: string;
};

const sidebar: Side[] = [
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Dashboard", href: "/Dashboard" },
  { label: "KRRS", href: "/Krrs" },
  { label: "FAQ", href: "/faq" },
  { label: "Landpage", href: "/" },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, SetOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => SetOpen(!open)}
        className="fixed left-3 top-3 z-50 rounded-md bg-slate-900 px-3 py-1.5 text-xl text-white md:hidden"
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => SetOpen(false)}
          className="fixed inset-0 z-30 bg-[#ffffff] md:hidden"
        ></div>
      )}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-60 bg-[#ffffff] p-4 text-black transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-6 mt-2 text-2xl font-bold">Lintar</h2>
        <nav>
          <ul className="space-y-1">
            {sidebar.map((item) => {
              const isActive = path === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => SetOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 transition-colors ${
                      isActive
                        ? "bg-[#f31313] text-white"
                        : "text-black hover:bg-[#f31313] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

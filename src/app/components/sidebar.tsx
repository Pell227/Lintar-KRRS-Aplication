"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./themeprovider";

type Side = {
  label: string;
  href: string;
};

const sidebar: Side[] = [
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Dashboard", href: "/Dashboard" },
  { label: "KRRS", href: "/Krrs" },
  { label: "Akademik", href: "/akademik" },
  { label: "FAQ", href: "/faq" },
  { label: "Landpage", href: "/" },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-3 top-3 z-50 rounded-md bg-[#3E3636] px-3 py-1.5 text-xl text-white md:hidden"
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-60 flex-col rounded-2xl p-4 transition-all duration-300 md:translate-x-0 ${
          isDark ? "bg-[#31363F] text-[#EEEEEE]" : "bg-white text-black"
        } ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="mb-8 mt-2 text-2xl font-bold">Lintar</h2>

        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebar.map((item) => {
              const isActive = path === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 transition-colors ${
                      isActive
                        ? isDark
                          ? "bg-[#76ABAE] text-[#222831] font-semibold"
                          : "bg-[#D72323] text-white font-semibold"
                        : isDark
                          ? "text-[#EEEEEE] hover:bg-[#454C56]"
                          : "text-black hover:bg-[#F5EDED]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`mb-2 mt-auto w-full rounded-xl border p-3 ${
            isDark
              ? "border-[#454C56] bg-[#222831]"
              : "border-gray-200 bg-[#F5EDED]"
          }`}
        >
          <p
            className={`mb-3 text-sm font-semibold ${
              isDark ? "text-[#EEEEEE]" : "text-[#3E3636]"
            }`}
          >
            Tampilan
          </p>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Ganti tema tampilan"
            aria-pressed={isDark}
            className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-lg px-2 py-3 transition-colors ${
              isDark
                ? "bg-[#31363F] text-[#EEEEEE] hover:bg-[#454C56]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
              <span className="shrink-0">{isDark ? "🌙" : "☀️"}</span>

              <span className="truncate">
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </span>

            <span
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                isDark ? "bg-[#76ABAE]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

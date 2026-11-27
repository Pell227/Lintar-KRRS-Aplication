"use client";

import Link from "next/link";
import { useTheme } from "./themeprovider";

export default function ProfileShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-6 p-8 transition-colors ${
        isDark ? "bg-[#222831]" : "bg-[#F5ECEC]"
      }`}
    >
      {children}

      <Link
        href="/edit"
        className={`rounded-full border-2 px-6 py-2 font-serif font-semibold transition ${
          isDark
            ? "border-white/40 bg-[#31363F] text-white hover:bg-[#76ABAE] hover:text-[#222831]"
            : "border-black bg-white text-black hover:bg-[#D72323] hover:text-white"
        }`}
      >
        Edit Profile
      </Link>
    </main>
  );
}

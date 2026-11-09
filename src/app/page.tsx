import type { Metadata } from "next";
import LandingPage from "@/app/components/landingpage";

export const metadata: Metadata = {
  title: "Lintar | Portal Akademik Untar",
  description:
    "Lintar membantu mahasiswa Untar mengisi KRRS, memantau jadwal dan IPK, serta membaca pengumuman kampus dalam satu tempat.",
};

export default function Home() {
  return <LandingPage />;
}
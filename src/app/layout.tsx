import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "./components/themeprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lintar KRRS",
  description: "Sistem Informasi Akademik Lintar KRRS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Sidebar />

          <main className="min-h-screen bg-background p-6 pt-16 text-foreground transition-colors duration-200 md:ml-60 md:pt-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

import FAQAccordion from "@/app/components/faqsection";
import DosenPembimbing from "../components/dosenpembimbing";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-5xl">

        {/* Header FAQ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#D72323] dark:text-[#76ABAE]">
            Frequently Asked Questions
          </h1>

          <p className="mt-2 text-foreground/70">
            Temukan jawaban dari berbagai pertanyaan
            seputar layanan akademik.
          </p>
        </div>

        {/* Card Dosen Pembimbing */}
        <DosenPembimbing />

        {/* Daftar Pertanyaan */}
        <FAQAccordion />

      </div>
    </main>
  );
}
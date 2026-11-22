import FAQAccordion from "@/app/components/faqsection";
import DosenPembimbing from "../components/dosenpembimbing";

export default function FAQPage() {

  return (
    <main className="min-h-screen bg-[#F5EDED] p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header FAQ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#D72323]">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-600 mt-2">
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


import FAQAccordion from "@/app/components/FAQ/faqsection";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#AB1509]">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-600 mt-2">
            Temukan jawaban dari berbagai pertanyaan seputar layanan akademik.
          </p>
        </div>

        <FAQAccordion />

      </div>
    </main>
  );
}

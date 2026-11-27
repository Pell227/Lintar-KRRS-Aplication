
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function FAQAccordion() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      pertanyaan: "Apa itu Lintar KRRS?",
      jawaban:
        "Lintar KRRS merupakan sistem informasi akademik yang digunakan mahasiswa untuk mengakses berbagai layanan akademik."
    },
    {
      id: 2,
      pertanyaan: "Bagaimana cara mengisi KRRS?",
      jawaban:
        "Mahasiswa dapat mengisi KRRS melalui sistem akademik sesuai periode pengisian yang telah ditentukan."
    },
    {
      id: 3,
      pertanyaan: "Apa yang harus dilakukan jika mata kuliah tidak muncul?",
      jawaban:
        "Mahasiswa dapat menghubungi bagian akademik atau dosen wali untuk mendapatkan bantuan."
    },
    {
      id: 4,
      pertanyaan: "Bagaimana cara mengetahui jadwal perkuliahan?",
      jawaban:
        "Mahasiswa dapat melihat jadwal perkuliahan melalui menu Jadwal pada sistem akademik."
    },
    {
      id: 5,
      pertanyaan: "Siapa yang dapat dihubungi jika mengalami kendala?",
      jawaban:
        "Mahasiswa dapat menghubungi bagian akademik atau dosen wali sesuai dengan permasalahan yang dialami."
    }
  ];

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqData.map((faq) => (
        <motion.div
          key={faq.id}
          layout
          className="overflow-hidden rounded-xl border border-border-color bg-surface shadow-sm transition-colors duration-200"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-background"
          >
            <span className="font-semibold text-foreground">
              {faq.pertanyaan}
            </span>

            <motion.span
              animate={{ rotate: activeId === faq.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold text-[#D72323] dark:text-[#76ABAE]"
            >
              {activeId === faq.id ? "−" : "+"}
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {activeId === faq.id && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="overflow-hidden"
              >
                <div className="border-t border-border-color px-5 pb-5 pt-4 text-foreground/70">
                  {faq.jawaban}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

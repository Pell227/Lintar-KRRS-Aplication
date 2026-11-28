"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface FAQ {
  _id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: string;
  aktif: boolean;
  urutan: number;
}

export default function FAQAccordion() {
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch("/api/faq");

        if (!response.ok) {
          throw new Error("Gagal mengambil data FAQ");
        }

        const data: FAQ[] = await response.json();
        setFaqData(data);
      } catch (err) {
        console.error("Error fetching FAQ:", err);
        setError("FAQ gagal dimuat. Silakan coba kembali.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, []);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-10 text-center text-foreground/70">
        Memuat FAQ...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  // Group FAQ berdasarkan kategori
  const groupedFAQ = faqData.reduce<Record<string, FAQ[]>>(
    (groups, faq) => {
      if (!groups[faq.kategori]) {
        groups[faq.kategori] = [];
      }

      groups[faq.kategori].push(faq);
      return groups;
    },
    {}
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedFAQ).map(([kategori, faqs]) => (
        <section key={kategori} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-[#D72323]/20 bg-[#D72323]/10 px-4 py-2 text-sm font-bold tracking-wide text-[#D72323] dark:border-[#76ABAE]/20 dark:bg-[#76ABAE]/10 dark:text-[#76ABAE]">
              {kategori}
            </span>

            <div className="h-px flex-1 bg-border-color" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq._id}
                layout
                className="overflow-hidden rounded-xl border border-border-color bg-surface shadow-sm transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFAQ(faq._id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-[#F4C2C2] dark:hover:bg-[#354B52]"
                >
                  <span className="font-semibold text-foreground">
                    {faq.pertanyaan}
                  </span>

                  <motion.span
                    animate={{
                      rotate: activeId === faq._id ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-xl font-bold text-[#D72323] dark:text-[#76ABAE]"
                  >
                    {activeId === faq._id ? "−" : "+"}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {activeId === faq._id && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
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
        </section>
      ))}
    </div>
  );
}

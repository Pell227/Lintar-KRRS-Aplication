"use client";

import { useState } from "react";

export default function FAQAccordion() {
  const [activeId, setActiveId] = useState<number | null>(null);

  // Data FAQ sementara
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
        <div
          key={faq.id}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full flex justify-between items-center p-5 text-left"
          >
            <span className="font-semibold text-gray-800">
              {faq.pertanyaan}
            </span>

            <span className="text-xl font-bold text-[#AB1509]">
              {activeId === faq.id ? "−" : "+"}
            </span>
          </button>

          {activeId === faq.id && (
            <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
              {faq.jawaban}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

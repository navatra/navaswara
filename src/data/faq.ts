// src/data/faq.ts
// FAQ data — source of truth for FAQ section

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Berapa lama proses pembuatan undangannya?",
    answer:
      "Setelah semua data dan foto diterima, undangan biasanya siap dalam 2-3 hari kerja. Untuk paket Premium dengan custom design, estimasi 3-5 hari kerja.",
  },
  {
    question: "Berapa lama undangan aktif setelah dibuat?",
    answer:
      "Paket Esensial dan Standar aktif selama 12 bulan. Paket Premium aktif selama 24 bulan. Perpanjangan tersedia jika diperlukan — hubungi kami untuk informasi lebih lanjut.",
  },
  {
    question: "Apakah tamuku perlu download aplikasi untuk membuka undangan?",
    answer:
      "Tidak perlu. Undangan dibuka langsung di browser smartphone — cukup tap link, langsung masuk ke pengalaman undangan. Tidak ada instalasi, tidak ada login.",
  },
  {
    question: "Apakah bisa menggunakan foto sendiri?",
    answer:
      "Tentu! Justru kami menganjurkan menggunakan foto-foto personal kalian untuk membuat undangan terasa lebih autentik dan personal. Kirimkan foto terbaik kalian lewat WhatsApp.",
  },
  {
    question: "Bagaimana cara pembayarannya?",
    answer:
      "Pembayaran melalui transfer bank (BCA, BRI, Mandiri, BNI). Kami akan mengirimkan konfirmasi setelah pembayaran diterima. Tidak ada biaya tambahan atau cicilan.",
  },
  {
    question: "Bisa revisi berapa kali?",
    answer:
      "Paket Esensial: 1x revisi konten. Paket Standar: 3x revisi konten. Paket Premium: unlimited revisi. Revisi berlaku untuk perubahan data/teks/foto — perubahan desain fundamental dari paket non-Premium dikenakan biaya tambahan.",
  },
  {
    question: "Apakah undangannya bisa diakses di laptop juga?",
    answer:
      "Ya, undangan responsif dan bisa dibuka di semua device — smartphone, tablet, maupun laptop. Namun pengalaman terbaik dirancang untuk mobile karena mayoritas tamu membuka lewat WhatsApp di smartphone.",
  },
  {
    question: "Apa bedanya dengan template undangan biasa?",
    answer:
      "Template undangan biasa menggunakan desain massal yang dipakai ribuan orang. Setiap undangan Navaswara dikerjakan secara personal — dipilihkan template, dikustomisasi, dan diperhatikan detailnya. Hasilnya terasa dibuat untuk kalian, bukan sekadar diisi data.",
  },
];

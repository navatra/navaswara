import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Halaman Tidak Ditemukan — ${SITE_NAME}`,
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      {/* Large number */}
      <p
        className="font-[family-name:var(--font-playfair)] font-light select-none"
        style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          color: "var(--color-border)",
          lineHeight: 1,
        }}
        aria-hidden
      >
        404
      </p>

      <h1
        className="font-[family-name:var(--font-playfair)] text-2xl mt-4 mb-3"
        style={{ color: "var(--color-warm-black)" }}
      >
        Halaman Tidak Ditemukan
      </h1>

      <p
        className="text-sm mb-8 max-w-sm leading-relaxed"
        style={{ color: "var(--color-warm-gray)" }}
      >
        Mungkin link undangan sudah tidak aktif, atau ada kesalahan penulisan alamat.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{
          backgroundColor: "var(--color-warm-black)",
          color: "var(--color-warm-white)",
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

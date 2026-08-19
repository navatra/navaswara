"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getWhatsAppUrl } from "@/lib/constants";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {/* Top-left soft circle */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--color-sage-light), transparent 70%)",
          }}
        />
        {/* Bottom-right soft circle */}
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--color-rose-light), transparent 70%)",
          }}
        />
        {/* Subtle center gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, var(--color-warm-white), transparent)",
          }}
        />
      </div>

      <div className="container relative z-10 text-center px-4">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-8"
            style={{ color: "var(--color-sage)" }}
          >
            Jasa Undangan Digital Premium
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="font-[family-name:var(--font-playfair)] font-normal leading-tight mb-6"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            color: "var(--color-warm-black)",
            letterSpacing: "-0.02em",
          }}
        >
          Undangan Pernikahan yang{" "}
          <span style={{ color: "var(--color-sage)", fontStyle: "italic" }}>
            Layak
          </span>{" "}
          untuk <br className="hidden sm:block" />
          Hari Paling Berharga
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.25 }}
          className="mx-auto mb-10 leading-relaxed"
          style={{
            maxWidth: "560px",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "var(--color-warm-gray)",
          }}
        >
          Undangan pernikahan digital yang personal, elegan, dan memorable.{" "}
          <em>Karena momen ini tidak akan terulang.</em>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              const el = document.querySelector("#templates");
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="w-full sm:w-auto px-8 py-4 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            style={{
              backgroundColor: "var(--color-warm-black)",
              color: "var(--color-warm-white)",
            }}
          >
            Lihat Contoh Undangan
          </button>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 text-sm font-medium rounded-full border transition-all duration-300 hover:-translate-y-0.5 text-center"
            style={{
              borderColor: "var(--color-sage)",
              color: "var(--color-sage)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--color-sage)";
              (e.currentTarget as HTMLAnchorElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-sage)";
            }}
          >
            Chat via WhatsApp
          </a>
        </motion.div>

        {/* Social proof hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-xs"
          style={{ color: "var(--color-warm-gray-light)" }}
        >
          Harga mulai Rp75.000 · Siap dalam 2–3 hari kerja
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-warm-gray-light)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ backgroundColor: "var(--color-warm-gray-light)" }}
        />
      </motion.div>
    </section>
  );
}

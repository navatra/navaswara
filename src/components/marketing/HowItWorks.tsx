"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MessageCircle, FileText, Image, Send } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    icon: Image,
    title: "Pilih Template",
    description:
      "Jelajahi pilihan tema undangan kami. Coba demo langsung untuk merasakan pengalaman tamumu.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Hubungi via WhatsApp",
    description:
      "Chat dengan kami untuk memilih paket dan mulai proses. Kami siap menjawab pertanyaanmu.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Kirim Data & Foto",
    description:
      "Isi formulir brief yang kami sediakan. Data pengantin, info acara, dan foto-foto favoritmu.",
  },
  {
    number: "04",
    icon: Send,
    title: "Terima Undanganmu",
    description:
      "Dalam 2–3 hari kerja, undanganmu siap. Tinggal disebarkan ke seluruh tamu.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="cara-order"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-sage)" }}
          >
            Cara Order
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Sesederhana{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-sage)" }}>
              4 Langkah
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: 0.1 + i * 0.1,
                }}
                className="relative flex flex-col"
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-[calc(100%_-_1rem)] w-[calc(100%_-_2rem)] h-px"
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-border), transparent)",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--color-ivory)" }}
                  >
                    <Icon size={18} strokeWidth={1.5} style={{ color: "var(--color-sage)" }} />
                  </div>
                  <span
                    className="text-4xl font-[family-name:var(--font-playfair)] leading-none select-none"
                    style={{ color: "var(--color-border)" }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  className="font-[family-name:var(--font-playfair)] text-lg mb-2"
                  style={{ color: "var(--color-warm-black)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-warm-gray)" }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/faq";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      ref={ref}
      id="faq"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="text-center mb-12"
          >
            <span
              className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-sage)" }}
            >
              FAQ
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)]"
              style={{ color: "var(--color-warm-black)" }}
            >
              Pertanyaan yang{" "}
              <span style={{ fontStyle: "italic", color: "var(--color-sage)" }}>
                Sering Ditanyakan
              </span>
            </h2>
          </motion.div>

          {/* Accordion */}
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border)" }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: EASE_OUT_EXPO,
                  delay: 0.05 + i * 0.05,
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer"
                >
                  <span
                    className="font-[family-name:var(--font-playfair)] text-base leading-snug"
                    style={{ color: "var(--color-warm-black)" }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 mt-0.5 transition-colors duration-200"
                    style={{
                      color:
                        openIndex === i ? "var(--color-sage)" : "var(--color-warm-gray-light)",
                    }}
                    aria-hidden="true"
                  >
                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-sm leading-relaxed pb-5"
                        style={{ color: "var(--color-warm-gray)" }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { LoveStoryEvent } from "@/types";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface LoveStorySectionProps {
  story: LoveStoryEvent[];
  brideName: string;
  groomName: string;
}

export function LoveStorySection({ story, brideName, groomName }: LoveStorySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  if (!story || story.length === 0) return null;

  return (
    <section
      ref={ref}
      id="love-story"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-sage)" }}
          >
            Kisah Kami
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Perjalanan {brideName}{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-sage)" }}>&</span>{" "}
            {groomName}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ backgroundColor: "var(--color-border)" }}
            aria-hidden
          />

          <div className="flex flex-col gap-12">
            {story.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: 0.1 + i * 0.12,
                }}
                className={`relative flex gap-6 md:gap-0 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Mobile/desktop dot on line */}
                <div
                  className="absolute left-6 md:left-1/2 top-1 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10"
                  style={{
                    backgroundColor: "var(--color-warm-white)",
                    borderColor: "var(--color-sage)",
                  }}
                  aria-hidden
                />

                {/* Content block */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8 md:text-left"
                  }`}
                >
                  {/* Year */}
                  <p
                    className="font-[family-name:var(--font-playfair)] text-3xl font-light mb-1"
                    style={{ color: "var(--color-sage-light)" }}
                  >
                    {item.year}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-[family-name:var(--font-playfair)] text-lg mb-2"
                    style={{ color: "var(--color-warm-black)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-warm-gray)" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

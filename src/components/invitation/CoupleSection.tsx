"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { InvitationData } from "@/types";
import { formatDateWithDay } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface CoupleSectionProps {
  invitation: InvitationData;
}

export function CoupleSection({ invitation }: CoupleSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const weddingDate = invitation.events[0]?.date;

  return (
    <section
      ref={ref}
      id="couple"
      className="section-spacing text-center relative overflow-hidden"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      {/* Soft background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-sage-light), transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Opening quote */}
        {invitation.openingQuote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="max-w-lg mx-auto mb-16 italic text-sm leading-relaxed"
            style={{ color: "var(--color-warm-gray)" }}
          >
            &ldquo;{invitation.openingQuote}&rdquo;
          </motion.blockquote>
        )}

        {/* Bismillah / prelude */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "var(--color-sage)" }}
        >
          Bismillahirrahmanirrahim
        </motion.p>

        {/* "Kami mengundang" */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="text-base mb-10"
          style={{ color: "var(--color-warm-gray)" }}
        >
          Dengan penuh rasa syukur, kami mengundang Anda
          <br />
          untuk menyaksikan dan mendoakan pernikahan kami.
        </motion.p>

        {/* Bride name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="mb-6"
        >
          <p
            className="font-[family-name:var(--font-playfair)] font-normal italic"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "var(--color-warm-black)",
              letterSpacing: "-0.01em",
            }}
          >
            {invitation.bride.name}
          </p>
          {invitation.bride.fullName && (
            <p className="text-sm mt-1" style={{ color: "var(--color-warm-gray)" }}>
              {invitation.bride.fullName}
            </p>
          )}
          {invitation.bride.parentNames && (
            <p className="text-xs mt-0.5" style={{ color: "var(--color-warm-gray-light)" }}>
              Putri dari {invitation.bride.parentNames}
            </p>
          )}
        </motion.div>

        {/* Ampersand */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="font-[family-name:var(--font-playfair)] italic mb-6"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            color: "var(--color-sage)",
          }}
        >
          &amp;
        </motion.p>

        {/* Groom name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.35 }}
          className="mb-16"
        >
          <p
            className="font-[family-name:var(--font-playfair)] font-normal italic"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "var(--color-warm-black)",
              letterSpacing: "-0.01em",
            }}
          >
            {invitation.groom.name}
          </p>
          {invitation.groom.fullName && (
            <p className="text-sm mt-1" style={{ color: "var(--color-warm-gray)" }}>
              {invitation.groom.fullName}
            </p>
          )}
          {invitation.groom.parentNames && (
            <p className="text-xs mt-0.5" style={{ color: "var(--color-warm-gray-light)" }}>
              Putra dari {invitation.groom.parentNames}
            </p>
          )}
        </motion.div>

        {/* Wedding date */}
        {weddingDate && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.45 }}
            className="inline-block px-8 py-4 rounded-2xl"
            style={{
              backgroundColor: "var(--color-ivory)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: "var(--color-sage)" }}
            >
              Hari Pernikahan
            </p>
            <p
              className="font-[family-name:var(--font-playfair)] text-lg"
              style={{ color: "var(--color-warm-black)" }}
            >
              {formatDateWithDay(weddingDate)}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

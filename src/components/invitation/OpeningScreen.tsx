"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { InvitationData } from "@/types";

interface OpeningScreenProps {
  invitation: InvitationData;
  onOpen: () => void;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function OpeningScreen({ invitation, onOpen }: OpeningScreenProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleOpen = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    setIsAnimatingOut(true);
    // Wait for animation to complete
    setTimeout(onOpen, 900);
  };

  // Listen for any key press too
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") handleOpen();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasInteracted]);

  return (
    <AnimatePresence>
      {!isAnimatingOut ? (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none"
          style={{ backgroundColor: "var(--color-warm-black)" }}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Tap untuk membuka undangan"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpen();
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border"
              style={{ borderColor: "rgba(181, 196, 177, 0.05)" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border"
              style={{ borderColor: "rgba(181, 196, 177, 0.08)" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE_OUT_EXPO }}
              className="text-xs tracking-[0.3em] uppercase mb-10"
              style={{ color: "var(--color-sage-light)" }}
            >
              Undangan Pernikahan
            </motion.p>

            {/* Names */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE_OUT_EXPO }}
              className="font-[family-name:var(--font-playfair)] font-normal"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                color: "var(--color-warm-white)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {invitation.bride.name}
              <br />
              <span
                className="text-lg tracking-[0.15em]"
                style={{ color: "var(--color-sage-light)" }}
              >
                &amp;
              </span>
              <br />
              {invitation.groom.name}
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="mx-auto my-8 h-px w-16"
              style={{ backgroundColor: "var(--color-sage)" }}
            />

            {/* Tap prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 1] }}
              transition={{
                delay: 1.2,
                duration: 0.6,
                times: [0, 0.3, 0.7, 1],
              }}
            >
              <motion.p
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-sm tracking-[0.1em]"
                style={{ color: "rgba(250, 248, 245, 0.5)" }}
              >
                Ketuk untuk membuka
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

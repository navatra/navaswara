"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getTimeRemaining, padNumber } from "@/lib/utils";

interface CountdownProps {
  targetDate: string; // ISO date string
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Countdown({ targetDate }: CountdownProps) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (time.isPast) {
    return (
      <section
        className="py-16 text-center"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        <p
          className="font-[family-name:var(--font-playfair)] text-3xl italic"
          style={{ color: "var(--color-sage)" }}
        >
          Hari yang Ditunggu Telah Tiba ✨
        </p>
      </section>
    );
  }

  const units = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  return (
    <section
      id="countdown"
      className="py-16 text-center"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="container">
        <p
          className="text-xs tracking-[0.2em] uppercase mb-8"
          style={{ color: "var(--color-sage)" }}
        >
          Menuju Hari Bahagia
        </p>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0.5, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-[family-name:var(--font-playfair)] tabular-nums"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3.5rem)",
                    color: "var(--color-warm-black)",
                    lineHeight: 1,
                  }}
                >
                  {padNumber(unit.value)}
                </motion.span>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase mt-2"
                  style={{ color: "var(--color-warm-gray)" }}
                >
                  {unit.label}
                </span>
              </div>

              {/* Separator */}
              {i < units.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                  className="font-[family-name:var(--font-playfair)] text-2xl mb-4"
                  style={{ color: "var(--color-sage-light)" }}
                  aria-hidden
                >
                  :
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

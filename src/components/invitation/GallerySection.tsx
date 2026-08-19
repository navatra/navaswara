"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import type { GalleryPhoto } from "@/types";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export function GallerySection({ photos }: GallerySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-10"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-sage)" }}
          >
            Galeri Foto
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Sekilas Momen Bersama
          </h2>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                ease: EASE_OUT_EXPO,
                delay: 0.05 + i * 0.07,
              }}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative overflow-hidden rounded-xl cursor-pointer",
                "aspect-square group"
              )}
              aria-label={`Lihat foto: ${photo.alt}`}
            >
              {/* Placeholder for demo (no real images yet) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundColor: `hsl(${120 + i * 15}, ${20 + i * 3}%, ${88 - i * 2}%)`,
                }}
              >
                <span
                  className="font-[family-name:var(--font-playfair)] text-4xl opacity-20"
                  aria-hidden
                >
                  {i + 1}
                </span>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(26, 22, 20, 0.3)" }}
              >
                <span className="text-white text-xs tracking-wider">Lihat</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(26, 22, 20, 0.9)" }}
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal
          aria-label="Foto diperbesar"
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl p-2"
            aria-label="Tutup"
          >
            ×
          </button>
          <div
            className="max-w-xl w-full mx-4 rounded-2xl overflow-hidden aspect-square"
            style={{
              backgroundColor: `hsl(${120 + activeIndex * 15}, ${20 + activeIndex * 3}%, ${88 - activeIndex * 2}%)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="font-[family-name:var(--font-playfair)] text-8xl opacity-20"
                style={{ color: "var(--color-warm-black)" }}
              >
                {activeIndex + 1}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

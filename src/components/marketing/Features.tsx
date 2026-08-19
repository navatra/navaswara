"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Link2, Clock, Heart } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: Heart,
    title: "Bukan Undangan Biasa",
    description:
      "Setiap detail dirancang — dari pilihan tipografi, animasi scroll, hingga pengalaman membuka undangan. Tamumu akan tahu ini bukan template biasa.",
  },
  {
    icon: Sparkles,
    title: "Kamu Cerita, Kami yang Buat",
    description:
      "Tidak perlu belajar software atau desain. Cukup kirim data pasangan, foto, dan info acara. Undanganmu siap dalam 2–3 hari kerja.",
  },
  {
    icon: Link2,
    title: "Satu Link, Ribuan Tamu",
    description:
      "Bagikan link lewat WhatsApp, Instagram, atau SMS. Tidak perlu install app. Tamu cukup tap, langsung masuk ke pengalaman undangan.",
  },
  {
    icon: Clock,
    title: "Lihat Dulu, Putuskan Kemudian",
    description:
      "Buka contoh undangan langsung dari browser. Rasakan pengalaman yang akan dirasakan tamumu — sebelum memutuskan untuk order.",
  },
];

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="features"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      <div className="container">
        {/* Section header */}
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
            Kenapa Navaswara
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Undangan yang Terasa{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-sage)" }}>
              Dibuat untuk Kamu
            </span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: 0.1 + i * 0.1,
                }}
                className="flex gap-5"
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: "var(--color-ivory)" }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: "var(--color-sage)" }}
                  />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="font-[family-name:var(--font-playfair)] text-xl mb-2"
                    style={{ color: "var(--color-warm-black)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-warm-gray)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

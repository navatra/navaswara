"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, Star } from "lucide-react";
import { PRICING, formatIDR, getWhatsAppUrlForPackage } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const tiers = Object.values(PRICING);

  return (
    <section
      ref={ref}
      id="harga"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-6"
        >
          <span
            className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-sage)" }}
          >
            Paket & Harga
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Pilih Paket yang{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-sage)" }}>
              Tepat Untukmu
            </span>
          </h2>
        </motion.div>

        {/* Promo notice */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 }}
          className="text-center text-sm mb-12"
          style={{ color: "var(--color-warm-gray)" }}
        >
          🎉 Harga Perkenalan — Terbatas untuk pelanggan awal
        </motion.p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: EASE_OUT_EXPO,
                delay: 0.15 + i * 0.1,
              }}
            >
              <PricingCard tier={tier} />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs mt-8"
          style={{ color: "var(--color-warm-gray-light)" }}
        >
          * Semua paket adalah pembayaran sekali untuk satu event. Tidak ada biaya bulanan.
          <br />
          ** Revisi berlaku untuk perubahan konten (teks, foto, data).
        </motion.p>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: (typeof PRICING)[keyof typeof PRICING] }) {
  const isPopular = tier.isPopular;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 md:p-8 flex flex-col h-full transition-all duration-300",
        isPopular
          ? "shadow-[var(--shadow-card-hover)] md:-translate-y-2"
          : "shadow-[var(--shadow-card)]"
      )}
      style={{
        backgroundColor: isPopular ? "var(--color-warm-black)" : "var(--color-warm-white)",
        border: isPopular ? "none" : "1px solid var(--color-border)",
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
          style={{
            backgroundColor: "var(--color-sage)",
            color: "white",
          }}
        >
          <Star size={10} fill="white" />
          Paling Diminati
        </div>
      )}

      {/* Tier name */}
      <p
        className="text-xs font-medium tracking-[0.15em] uppercase mb-4"
        style={{ color: isPopular ? "var(--color-sage-light)" : "var(--color-sage)" }}
      >
        {tier.name}
      </p>

      {/* Tagline */}
      <p
        className="text-sm leading-relaxed mb-6"
        style={{
          color: isPopular ? "rgba(250, 248, 245, 0.7)" : "var(--color-warm-gray)",
        }}
      >
        {tier.tagline}
      </p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span
            className="font-[family-name:var(--font-playfair)] text-4xl font-medium"
            style={{ color: isPopular ? "var(--color-warm-white)" : "var(--color-warm-black)" }}
          >
            {formatIDR(tier.price)}
          </span>
        </div>
        <p
          className="text-xs mt-1"
          style={{
            color: isPopular ? "rgba(250, 248, 245, 0.5)" : "var(--color-warm-gray-light)",
          }}
        >
          <s>{formatIDR(tier.originalPrice)}</s>
          {" "}· Harga Perkenalan
        </p>
      </div>

      {/* Features list */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check
              size={14}
              className="flex-shrink-0 mt-0.5"
              style={{ color: isPopular ? "var(--color-sage-light)" : "var(--color-sage)" }}
            />
            <span
              style={{
                color: isPopular
                  ? "rgba(250, 248, 245, 0.85)"
                  : "var(--color-warm-gray)",
              }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={getWhatsAppUrlForPackage(tier.name)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "block text-center py-3.5 px-6 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        )}
        style={
          isPopular
            ? {
                backgroundColor: "var(--color-sage)",
                color: "white",
              }
            : {
                backgroundColor: "var(--color-warm-black)",
                color: "var(--color-warm-white)",
              }
        }
      >
        Pesan Paket {tier.name}
      </a>
    </div>
  );
}

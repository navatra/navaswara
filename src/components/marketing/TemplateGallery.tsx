"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { templates } from "@/data/templates";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function TemplateGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="templates"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-ivory)" }}
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
            Koleksi Template
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Pilih Tema yang{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-sage)" }}>
              Berbicara untuk Kalian
            </span>
          </h2>
          <p
            className="mt-4 mx-auto text-sm leading-relaxed"
            style={{ maxWidth: "480px", color: "var(--color-warm-gray)" }}
          >
            Setiap template dikerjakan secara personal — bukan sekadar diisi nama. Coba demo
            langsung sebelum memutuskan.
          </p>
        </motion.div>

        {/* Template cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: EASE_OUT_EXPO,
                delay: 0.1 + i * 0.12,
              }}
            >
              <TemplateCard template={template} />
            </motion.div>
          ))}

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.22 }}
          >
            <ComingSoonCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TemplateCard({
  template,
}: {
  template: (typeof templates)[number];
}) {
  return (
    <div
      className="group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
      style={{
        backgroundColor: "var(--color-warm-white)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Thumbnail placeholder */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        {/* Placeholder visual until real thumbnail exists */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-sage-light)" }}
          >
            <span
              className="font-[family-name:var(--font-playfair)] text-lg"
              style={{ color: "var(--color-sage-dark)" }}
            >
              {template.name[0]}
            </span>
          </div>
          <p
            className="font-[family-name:var(--font-playfair)] text-2xl italic"
            style={{ color: "var(--color-warm-gray)" }}
          >
            {template.name}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--color-border)",
                  color: "var(--color-warm-gray)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(26, 22, 20, 0.5)" }}
        >
          <Link
            href={`/invitation/${template.demoSlug}`}
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--color-warm-white)",
              color: "var(--color-warm-black)",
            }}
          >
            Lihat Demo
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="font-[family-name:var(--font-playfair)] text-xl"
              style={{ color: "var(--color-warm-black)" }}
            >
              {template.name}
            </h3>
            <p
              className="text-sm mt-0.5 leading-relaxed"
              style={{ color: "var(--color-warm-gray)" }}
            >
              {template.description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
          {template.features.slice(0, 4).map((f) => (
            <span
              key={f}
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--color-warm-gray)" }}
            >
              <Check size={11} style={{ color: "var(--color-sage)" }} />
              {f}
            </span>
          ))}
          {template.features.length > 4 && (
            <span
              className="text-xs"
              style={{ color: "var(--color-sage)" }}
            >
              +{template.features.length - 4} lagi
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/invitation/${template.demoSlug}`}
          className="flex items-center gap-2 text-sm font-medium transition-colors group/link"
          style={{ color: "var(--color-sage)" }}
        >
          Lihat Demo Undangan
          <ArrowRight
            size={15}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div
      className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[320px] p-8 text-center"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--color-ivory)" }}
      >
        <span
          className="text-xl"
          style={{ color: "var(--color-warm-gray-light)" }}
        >
          ✦
        </span>
      </div>
      <p
        className="font-[family-name:var(--font-playfair)] text-lg italic mb-2"
        style={{ color: "var(--color-warm-gray)" }}
      >
        Segera Hadir
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-warm-gray-light)" }}
      >
        Template baru sedang dalam pengerjaan. Hubungi kami jika ingin custom desain
        sesuai keinginanmu.
      </p>
    </div>
  );
}

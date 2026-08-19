"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import type { WeddingEvent } from "@/types";
import { formatDateWithDay } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface EventDetailsSectionProps {
  events: WeddingEvent[];
}

export function EventDetailsSection({ events }: EventDetailsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="acara"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-12"
        >
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-sage)" }}
          >
            Informasi Acara
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)]"
            style={{ color: "var(--color-warm-black)" }}
          >
            Turut Mengundang Kehadiran Anda
          </h2>
        </motion.div>

        {/* Events */}
        <div
          className={`grid gap-6 ${events.length === 1 ? "max-w-md mx-auto" : "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"}`}
        >
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: EASE_OUT_EXPO,
                delay: 0.1 + i * 0.1,
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{
        backgroundColor: "var(--color-ivory)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Event name */}
      <p
        className="text-xs tracking-[0.2em] uppercase mb-4"
        style={{ color: "var(--color-sage)" }}
      >
        {event.name}
      </p>

      {/* Date */}
      <p
        className="font-[family-name:var(--font-playfair)] text-xl mb-1"
        style={{ color: "var(--color-warm-black)" }}
      >
        {formatDateWithDay(event.date)}
      </p>

      {/* Time */}
      <div
        className="flex items-center justify-center gap-1.5 text-sm mb-6"
        style={{ color: "var(--color-warm-gray)" }}
      >
        <Clock size={13} strokeWidth={1.5} />
        <span>
          {event.startTime}
          {event.endTime ? ` – ${event.endTime}` : " WIB"}
        </span>
      </div>

      {/* Divider */}
      <div
        className="w-8 h-px mx-auto mb-6"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      {/* Venue */}
      <p
        className="font-[family-name:var(--font-playfair)] text-lg mb-2"
        style={{ color: "var(--color-warm-black)" }}
      >
        {event.venue.name}
      </p>
      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: "var(--color-warm-gray)" }}
      >
        {event.venue.address}
      </p>

      {/* Maps link */}
      <a
        href={event.venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
        style={{
          backgroundColor: "var(--color-warm-black)",
          color: "var(--color-warm-white)",
        }}
      >
        <MapPin size={13} />
        Buka di Maps
        <ExternalLink size={11} />
      </a>
    </div>
  );
}

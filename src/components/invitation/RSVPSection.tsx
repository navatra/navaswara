"use client";

import { useRef, useState, useTransition } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { submitRSVP, submitWishes } from "@/actions/invitation";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RSVPSectionProps {
  invitationSlug: string;
  initialWishes?: Array<{ id: string; guest_name: string; message: string; created_at: string }>;
}

export function RSVPSection({ invitationSlug, initialWishes = [] }: RSVPSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="rsvp"
      className="section-spacing"
      style={{ backgroundColor: "var(--color-warm-white)" }}
    >
      <div className="container">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="text-center mb-12"
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-sage)" }}
            >
              Konfirmasi Kehadiran
            </p>
            <h2
              className="font-[family-name:var(--font-playfair)]"
              style={{ color: "var(--color-warm-black)" }}
            >
              Apakah Anda Dapat Hadir?
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--color-warm-gray)" }}>
              Konfirmasi kehadiran Anda akan sangat membantu kami dalam mempersiapkan
              momen bahagia ini.
            </p>
          </motion.div>

          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 }}
          >
            <RSVPForm invitationSlug={invitationSlug} />
          </motion.div>

          {/* Wishes section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
            className="mt-16"
          >
            <WishesSection invitationSlug={invitationSlug} initialWishes={initialWishes} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── RSVP Form ────────────────────────────────────────────────

function RSVPForm({ invitationSlug }: { invitationSlug: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "">("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await submitRSVP(data);
      if (result.success) {
        setStatus("success");
        form.reset();
        setAttendance("");
      } else {
        setStatus("error");
        const err = result.error;
        setErrorMsg(typeof err === "string" ? err : "Periksa kembali form Anda.");
      }
    });
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          backgroundColor: "var(--color-ivory)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "var(--color-sage)" }}
        >
          <Check size={20} color="white" />
        </div>
        <p
          className="font-[family-name:var(--font-playfair)] text-lg mb-2"
          style={{ color: "var(--color-warm-black)" }}
        >
          Terima kasih!
        </p>
        <p className="text-sm" style={{ color: "var(--color-warm-gray)" }}>
          Konfirmasi kehadiran Anda sudah kami terima. Sampai jumpa di hari bahagia mereka! 🎊
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs underline"
          style={{ color: "var(--color-warm-gray-light)" }}
        >
          Kirim konfirmasi lain
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 md:p-8 flex flex-col gap-5"
      style={{
        backgroundColor: "var(--color-ivory)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="invitationSlug" value={invitationSlug} />

      {/* Name */}
      <div>
        <label
          htmlFor="rsvp-name"
          className="block text-xs font-medium tracking-wide uppercase mb-2"
          style={{ color: "var(--color-warm-gray)" }}
        >
          Nama Anda
        </label>
        <input
          id="rsvp-name"
          name="guestName"
          type="text"
          required
          minLength={2}
          maxLength={100}
          placeholder="Masukkan nama lengkap Anda"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: "var(--color-warm-white)",
            border: "1px solid var(--color-border)",
            color: "var(--color-warm-black)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-sage)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>

      {/* Attendance toggle */}
      <div>
        <p
          className="text-xs font-medium tracking-wide uppercase mb-3"
          style={{ color: "var(--color-warm-gray)" }}
        >
          Konfirmasi Kehadiran
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["hadir", "tidak_hadir"] as const).map((val) => (
            <label
              key={val}
              className={cn(
                "flex items-center justify-center py-3 rounded-xl text-sm font-medium cursor-pointer border transition-all duration-200",
                attendance === val
                  ? "border-transparent text-white"
                  : "border-transparent text-gray-500"
              )}
              style={
                attendance === val
                  ? {
                      backgroundColor:
                        val === "hadir" ? "var(--color-sage)" : "var(--color-warm-gray)",
                      color: "white",
                    }
                  : {
                      backgroundColor: "var(--color-warm-white)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-warm-gray)",
                    }
              }
            >
              <input
                type="radio"
                name="attendance"
                value={val}
                required
                className="sr-only"
                onChange={() => setAttendance(val)}
              />
              {val === "hadir" ? "✓ Hadir" : "✗ Tidak Hadir"}
            </label>
          ))}
        </div>
      </div>

      {/* Pax count (only if attending) */}
      {attendance === "hadir" && (
        <div>
          <label
            htmlFor="rsvp-pax"
            className="block text-xs font-medium tracking-wide uppercase mb-2"
            style={{ color: "var(--color-warm-gray)" }}
          >
            Jumlah Tamu
          </label>
          <select
            id="rsvp-pax"
            name="paxCount"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "var(--color-warm-white)",
              border: "1px solid var(--color-border)",
              color: "var(--color-warm-black)",
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} orang
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error message */}
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || !attendance}
        className={cn(
          "flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-medium transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:shadow-md hover:-translate-y-0.5"
        )}
        style={{
          backgroundColor: "var(--color-warm-black)",
          color: "var(--color-warm-white)",
        }}
      >
        {isPending && <Loader2 size={15} className="animate-spin" />}
        {isPending ? "Mengirim..." : "Konfirmasi Kehadiran"}
      </button>
    </form>
  );
}

// ── Wishes Section ────────────────────────────────────────────

interface WishItem {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

function WishesSection({
  invitationSlug,
  initialWishes,
}: {
  invitationSlug: string;
  initialWishes: WishItem[];
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [wishes, setWishes] = useState<WishItem[]>(initialWishes);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Optimistic update
    const optimisticWish: WishItem = {
      id: Date.now().toString(),
      guest_name: data.get("guestName") as string,
      message: data.get("message") as string,
      created_at: new Date().toISOString(),
    };

    startTransition(async () => {
      const result = await submitWishes(data);
      if (result.success) {
        setWishes((prev) => [optimisticWish, ...prev]);
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 3000);
      }
    });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--color-sage)" }}
        >
          Buku Tamu
        </p>
        <h3
          className="font-[family-name:var(--font-playfair)] text-2xl"
          style={{ color: "var(--color-warm-black)" }}
        >
          Ucapan & Doa
        </h3>
      </div>

      {/* Wishes form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 mb-8"
        style={{
          backgroundColor: "var(--color-ivory)",
          border: "1px solid var(--color-border)",
        }}
      >
        <input type="hidden" name="invitationSlug" value={invitationSlug} />
        <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden />

        <div className="flex flex-col gap-4">
          <input
            name="guestName"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder="Nama Anda"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "var(--color-warm-white)",
              border: "1px solid var(--color-border)",
              color: "var(--color-warm-black)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-sage)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />
          <textarea
            name="message"
            required
            minLength={5}
            maxLength={500}
            rows={3}
            placeholder="Tulis ucapan dan doa untuk pasangan..."
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{
              backgroundColor: "var(--color-warm-white)",
              border: "1px solid var(--color-border)",
              color: "var(--color-warm-black)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-sage)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
          />

          <div className="flex items-center justify-between">
            {status === "success" && (
              <p className="text-xs" style={{ color: "var(--color-sage)" }}>
                ✓ Ucapan terkirim
              </p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50"
              style={{
                backgroundColor: "var(--color-sage)",
                color: "white",
              }}
            >
              {isPending && <Loader2 size={13} className="animate-spin" />}
              Kirim Ucapan
            </button>
          </div>
        </div>
      </form>

      {/* Wishes list */}
      {wishes.length > 0 && (
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: "var(--color-ivory)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="font-[family-name:var(--font-playfair)] text-sm font-medium mb-1"
                  style={{ color: "var(--color-warm-black)" }}
                >
                  {wish.guest_name}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-warm-gray)" }}
                >
                  {wish.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

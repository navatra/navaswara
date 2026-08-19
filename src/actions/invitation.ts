"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const rsvpSchema = z.object({
  invitationSlug: z.string().min(1),
  guestName: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  attendance: z.enum(["hadir", "tidak_hadir"] as const, {
    message: "Pilih status kehadiran",
  }),
  paxCount: z.coerce.number().int().min(1).max(10).default(1),
  notes: z.string().max(200).optional(),
});

const wishesSchema = z.object({
  invitationSlug: z.string().min(1),
  guestName: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  message: z
    .string()
    .min(5, "Ucapan terlalu singkat")
    .max(500, "Ucapan maksimal 500 karakter"),
});

// Simple in-memory rate limiting (resets on cold start, sufficient for MVP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, limit = 3, windowMs = 60_000): boolean {
  const now = Date.now();
  const existing = rateLimitMap.get(key);

  if (!existing || existing.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) return false;
  existing.count++;
  return true;
}

export async function submitRSVP(formData: FormData) {
  // Honeypot check (bot protection)
  if (formData.get("website")) {
    return { success: true }; // Silently succeed for bots
  }

  // Rate limit (3 per slug per minute)
  const slug = formData.get("invitationSlug") as string;
  if (!checkRateLimit(`rsvp:${slug}`, 3, 60_000)) {
    return { success: false, error: "Terlalu banyak percobaan. Silakan tunggu sebentar." };
  }

  // Validate
  const result = rsvpSchema.safeParse({
    invitationSlug: formData.get("invitationSlug"),
    guestName: formData.get("guestName"),
    attendance: formData.get("attendance"),
    paxCount: formData.get("paxCount"),
    notes: formData.get("notes"),
  });

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Insert to Supabase
  const supabase = createServerClient();
  const { error } = await supabase.from("rsvp").insert({
    invitation_slug: result.data.invitationSlug,
    guest_name: result.data.guestName,
    attendance: result.data.attendance,
    pax_count: result.data.paxCount,
    notes: result.data.notes ?? null,
  });

  if (error) {
    console.error("RSVP insert error:", error);
    return { success: false, error: "Gagal menyimpan. Silakan coba lagi." };
  }

  return { success: true };
}

export async function submitWishes(formData: FormData) {
  // Honeypot
  if (formData.get("website")) {
    return { success: true };
  }

  // Rate limit
  const slug = formData.get("invitationSlug") as string;
  if (!checkRateLimit(`wishes:${slug}`, 5, 60_000)) {
    return { success: false, error: "Terlalu banyak percobaan. Silakan tunggu sebentar." };
  }

  // Validate
  const result = wishesSchema.safeParse({
    invitationSlug: formData.get("invitationSlug"),
    guestName: formData.get("guestName"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Insert to Supabase
  const supabase = createServerClient();
  const { error } = await supabase.from("wishes").insert({
    invitation_slug: result.data.invitationSlug,
    guest_name: result.data.guestName,
    message: result.data.message,
  });

  if (error) {
    console.error("Wishes insert error:", error);
    return { success: false, error: "Gagal menyimpan. Silakan coba lagi." };
  }

  return { success: true };
}

export async function getWishes(invitationSlug: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("wishes")
    .select("id, guest_name, message, created_at")
    .eq("invitation_slug", invitationSlug)
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return [];
  return data ?? [];
}

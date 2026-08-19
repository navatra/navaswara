// src/lib/constants.ts
// Central configuration — all business values live here, not scattered in components

export const SITE_NAME = "Navaswara";
export const SITE_TAGLINE = "Undangan Pernikahan yang Layak untuk Hari Paling Berharga";
export const SITE_DESCRIPTION =
  "Undangan pernikahan digital yang personal, elegan, dan memorable. Karena momen ini tidak akan terulang.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://navaswara.id";

// WhatsApp
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285123099276";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage = `Halo, saya tertarik dengan jasa undangan digital Navaswara. Boleh minta informasi lebih lanjut?`;
  const encoded = encodeURIComponent(message || defaultMessage);
  return `${WHATSAPP_BASE_URL}?text=${encoded}`;
}

export function getWhatsAppUrlForPackage(packageName: string): string {
  return getWhatsAppUrl(
    `Halo, saya tertarik dengan paket ${packageName} dari Navaswara. Boleh minta informasi lebih lanjut?`
  );
}

// Social media
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";

// Pricing (all in IDR)
export const PRICING = {
  esensial: {
    name: "Esensial",
    price: 75_000,
    originalPrice: 150_000,
    tagline: "Semua yang kamu butuhkan untuk undangan yang berkesan",
    isPopular: false,
    features: [
      "Pilih dari template tersedia",
      "Informasi pasangan & acara lengkap",
      "Galeri foto (12 foto)",
      "RSVP online",
      "Google Maps",
      "Countdown timer",
      "Buku tamu digital",
      "Aktif 12 bulan",
      "1x revisi konten",
    ],
  },
  standar: {
    name: "Standar",
    price: 125_000,
    originalPrice: 200_000,
    tagline: "Experience undangan yang lebih kaya dan personal",
    isPopular: true,
    features: [
      "Semua fitur Esensial",
      "Galeri foto (30 foto + video)",
      "Love story / timeline",
      "Background music",
      "WhatsApp share dengan teks custom",
      "Ucapan & doa tamu (wishes wall)",
      "3x revisi konten",
      "Aktif 12 bulan",
    ],
  },
  premium: {
    name: "Premium",
    price: 175_000,
    originalPrice: 250_000,
    tagline: "Undangan custom yang dirancang khusus untuk cerita kalian",
    isPopular: false,
    features: [
      "Semua fitur Standar",
      "Custom design (tidak terbatas template)",
      "Animasi opening disesuaikan",
      "Unlimited foto & video",
      "Informasi hadiah / angpao",
      "Unlimited revisi",
      "Priority response (< 12 jam)",
      "Aktif 24 bulan",
    ],
  },
} as const;

export type PricingTier = keyof typeof PRICING;

// Format IDR currency
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

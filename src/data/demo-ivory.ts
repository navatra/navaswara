// src/data/demo-ivory.ts
// Demo invitation data for the "Ivory" template
// This is the sample data used for live demo and portfolio showcase

import type { InvitationData } from "@/types";

export const demoIvoryInvitation: InvitationData = {
  slug: "demo-ivory",
  templateId: "ivory",

  bride: {
    name: "Sinta",
    fullName: "Sinta Rahayu Putri, S.Pd.",
    parentNames: "Bpk. Ahmad Santoso & Ibu Sri Rahayu",
    photoUrl: "/images/demo/bride.webp",
  },

  groom: {
    name: "Dimas",
    fullName: "Dimas Arya Pratama, S.T.",
    parentNames: "Bpk. Heru Pratama & Ibu Dewi Lestari",
    photoUrl: "/images/demo/groom.webp",
  },

  openingQuote:
    "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya. (QS. Ar-Rum: 21)",

  events: [
    {
      name: "Akad Nikah",
      date: "2025-09-20",
      startTime: "09:00",
      endTime: "11:00",
      venue: {
        name: "Masjid Al-Ikhlas",
        address: "Jl. Melati No. 12, Bandung, Jawa Barat",
        mapsUrl: "https://maps.google.com/?q=Bandung",
        mapsEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.54572447534!2d107.5308885!3d-6.903389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866cd%3A0x375218e29f880e4a!2sBandung!5e0!3m2!1sen!2sid!4v1691234567890",
      },
    },
    {
      name: "Resepsi",
      date: "2025-09-20",
      startTime: "12:00",
      endTime: "selesai",
      venue: {
        name: "Gedung Graha Santika",
        address: "Jl. Asia Afrika No. 123, Bandung, Jawa Barat",
        mapsUrl: "https://maps.google.com/?q=Bandung",
        mapsEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.54572447534!2d107.5308885!3d-6.903389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866cd%3A0x375218e29f880e4a!2sBandung!5e0!3m2!1sen!2sid!4v1691234567890",
      },
    },
  ],

  gallery: [
    { src: "/images/demo/gallery-1.webp", alt: "Foto prewedding Sinta dan Dimas di pantai" },
    { src: "/images/demo/gallery-2.webp", alt: "Foto prewedding Sinta dan Dimas di kebun" },
    { src: "/images/demo/gallery-3.webp", alt: "Foto close-up pasangan" },
    { src: "/images/demo/gallery-4.webp", alt: "Foto pasangan di golden hour" },
    { src: "/images/demo/gallery-5.webp", alt: "Foto pasangan di kota" },
    { src: "/images/demo/gallery-6.webp", alt: "Foto pasangan bergandengan" },
  ],

  story: [
    {
      year: "2019",
      title: "Pertama Kali Bertemu",
      description:
        "Kami bertemu di sebuah seminar kampus. Sebuah perkenalan singkat yang tidak kami sangka akan membawa kami sejauh ini.",
    },
    {
      year: "2020",
      title: "Menjadi Lebih Dekat",
      description:
        "Pandemi mengajarkan kami untuk menghargai kehadiran satu sama lain, meski hanya lewat layar.",
    },
    {
      year: "2022",
      title: "Resmi Berpacaran",
      description:
        "Setelah dua tahun perjalanan panjang, akhirnya kami memulai babak baru bersama.",
    },
    {
      year: "2025",
      title: "Menuju Pelaminan",
      description:
        "Dan kini, kami siap memulai perjalanan paling indah dalam hidup — bersama, selamanya.",
    },
  ],

  music: {
    title: "A Thousand Years",
    artist: "Christina Perri",
    url: "/audio/demo-music.mp3",
  },

  gift: {
    bankAccounts: [
      {
        bankName: "BCA",
        accountNumber: "1234567890",
        accountName: "Sinta Rahayu Putri",
      },
      {
        bankName: "BRI",
        accountNumber: "0987654321",
        accountName: "Dimas Arya Pratama",
      },
    ],
  },

  features: {
    rsvp: true,
    wishes: true,
    gift: true,
    music: true,
    story: true,
    openingAnimation: true,
  },

  guestNameParam: "kepada",
};

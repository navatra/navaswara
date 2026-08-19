// src/types/invitation.ts
// Type definitions for invitation data structure

export interface PersonInfo {
  name: string;           // "Sinta"
  fullName?: string;      // "Sinta Rahayu Putri, S.Pd"
  parentNames?: string;   // "Bpk. Ahmad & Ibu Sri"
  photoUrl?: string;
}

export interface EventVenue {
  name: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl?: string;
}

export interface WeddingEvent {
  name: string;           // "Akad Nikah" | "Resepsi"
  date: string;           // ISO date string "2025-06-14"
  startTime: string;      // "09:00"
  endTime?: string;       // "12:00" | "selesai"
  venue: EventVenue;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface LoveStoryEvent {
  year: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface MusicConfig {
  title: string;
  artist: string;
  url: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface GiftConfig {
  bankAccounts?: BankAccount[];
  addressNote?: string;
  addressName?: string;
}

export interface InvitationFeatures {
  rsvp: boolean;
  wishes: boolean;
  gift: boolean;
  music: boolean;
  story: boolean;
  openingAnimation: boolean;
}

export interface InvitationData {
  slug: string;
  templateId: string;

  bride: PersonInfo;
  groom: PersonInfo;

  openingQuote?: string;  // Optional quote/ayat for opening

  events: WeddingEvent[];
  gallery: GalleryPhoto[];
  story?: LoveStoryEvent[];
  music?: MusicConfig;
  gift?: GiftConfig;

  features: InvitationFeatures;
  guestNameParam?: string;  // URL param name for personalized guest name
}

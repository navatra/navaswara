// src/data/templates.ts
// Static template registry — source of truth for template showcase

import type { Template } from "@/types";

export const templates: Template[] = [
  {
    id: "ivory",
    slug: "ivory",
    name: "Ivory",
    description:
      "Elegan dan tenang. Palet warna krem hangat dengan tipografi serif yang sophisticated.",
    tags: ["Minimalist", "Elegant", "Warm"],
    demoSlug: "demo-ivory",
    thumbnailUrl: "/images/templates/ivory-thumb.webp",
    ogImageUrl: "/images/templates/ivory-og.webp",
    features: ["RSVP", "Gallery", "Countdown", "Maps", "Wishes", "Music", "Love Story"],
    style: "minimalist",
  },
  // Future templates will be added here
  // {
  //   id: "sage",
  //   slug: "sage",
  //   name: "Sage",
  //   ...
  // },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
  return templates.map((t) => t.slug);
}

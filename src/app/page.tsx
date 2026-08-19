import type { Metadata } from "next";
import { Navigation } from "@/components/shared/Navigation";
import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { TemplateGallery } from "@/components/marketing/TemplateGallery";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import { Footer } from "@/components/marketing/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Jasa Undangan Pernikahan Digital Premium`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} — Jasa Undangan Pernikahan Digital Premium`,
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Features />
        <TemplateGallery />
        <HowItWorks />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

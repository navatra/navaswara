import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { demoIvoryInvitation } from "@/data/demo-ivory";
import { getWishes } from "@/actions/invitation";
import { InvitationClient } from "@/components/invitation/InvitationClient";
import { SITE_NAME } from "@/lib/constants";
import type { InvitationData } from "@/types";

// Registry of all available invitations
// In Phase 2, this will be fetched from database
const invitationRegistry: Record<string, InvitationData> = {
  "demo-ivory": demoIvoryInvitation,
  // Add new invitations here as: "slug": invitationData
};

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = invitationRegistry[slug];

  if (!invitation) {
    return { title: "Undangan tidak ditemukan" };
  }

  const title = `Undangan Pernikahan ${invitation.bride.name} & ${invitation.groom.name}`;

  return {
    title,
    description: `Anda diundang ke pernikahan ${invitation.bride.fullName ?? invitation.bride.name} dan ${invitation.groom.fullName ?? invitation.groom.name}. Konfirmasi kehadiran Anda sekarang.`,
    openGraph: {
      title,
      type: "website",
    },
    robots: {
      index: true,
      follow: false,
    },
  };
}

export default async function InvitationPage({
  params,
  searchParams,
}: InvitationPageProps) {
  const { slug } = await params;
  const invitation = invitationRegistry[slug];

  if (!invitation) {
    notFound();
  }

  // Fetch initial wishes from Supabase (server-side)
  let initialWishes: Awaited<ReturnType<typeof getWishes>> = [];
  if (invitation.features.wishes) {
    try {
      initialWishes = await getWishes(slug);
    } catch {
      // Graceful fallback — show empty wishes if DB unavailable
      initialWishes = [];
    }
  }

  return (
    <InvitationClient
      invitation={invitation}
      initialWishes={initialWishes}
    />
  );
}

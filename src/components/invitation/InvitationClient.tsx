"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { InvitationData } from "@/types";
import { OpeningScreen } from "@/components/invitation/OpeningScreen";
import { CoupleSection } from "@/components/invitation/CoupleSection";
import { Countdown } from "@/components/invitation/Countdown";
import { EventDetailsSection } from "@/components/invitation/EventDetails";
import { GallerySection } from "@/components/invitation/GallerySection";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { LoveStorySection } from "@/components/invitation/LoveStorySection";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";

interface InvitationClientProps {
  invitation: InvitationData;
  initialWishes: Array<{
    id: string;
    guest_name: string;
    message: string;
    created_at: string;
  }>;
}

export function InvitationClient({ invitation, initialWishes }: InvitationClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  const showOpening = invitation.features.openingAnimation;
  const contentVisible = isOpen || !showOpening;

  return (
    <>
      {/* Opening screen overlay */}
      {showOpening && !isOpen && (
        <OpeningScreen invitation={invitation} onOpen={() => setIsOpen(true)} />
      )}

      {/* Floating music player — appears after opening */}
      {contentVisible && invitation.features.music && invitation.music && (
        <MusicPlayer music={invitation.music} />
      )}

      {/* Main invitation content */}
      {contentVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CoupleSection invitation={invitation} />

          {/* Countdown to first event */}
          {invitation.events[0] && (
            <Countdown targetDate={invitation.events[0].date} />
          )}

          <EventDetailsSection events={invitation.events} />

          {/* Love Story (if enabled) */}
          {invitation.features.story && invitation.story && invitation.story.length > 0 && (
            <LoveStorySection
              story={invitation.story}
              brideName={invitation.bride.name}
              groomName={invitation.groom.name}
            />
          )}

          <GallerySection photos={invitation.gallery} />

          {invitation.features.rsvp && (
            <RSVPSection
              invitationSlug={invitation.slug}
              initialWishes={invitation.features.wishes ? initialWishes : []}
            />
          )}

          {/* Footer */}
          <footer
            className="py-10 text-center"
            style={{ backgroundColor: "var(--color-warm-black)" }}
          >
            <p
              className="font-[family-name:var(--font-playfair)] italic text-sm"
              style={{ color: "rgba(250, 248, 245, 0.5)" }}
            >
              Dibuat dengan ♥ oleh Navaswara
            </p>
          </footer>
        </motion.div>
      )}
    </>
  );
}

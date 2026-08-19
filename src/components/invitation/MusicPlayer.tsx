"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Music2 } from "lucide-react";
import type { MusicConfig } from "@/types";

interface MusicPlayerProps {
  music: MusicConfig;
}

export function MusicPlayer({ music }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = async () => {
    if (!audioRef.current) {
      // Lazy-create audio element on first interaction
      audioRef.current = new Audio(music.url);
      audioRef.current.loop = true;
      audioRef.current.addEventListener("canplay", () => setIsLoading(false));
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch {
        // Autoplay blocked or file not found (demo mode)
        setIsLoading(false);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={toggle}
        className="group flex items-center gap-3 pl-3 pr-4 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        style={{
          backgroundColor: "var(--color-warm-white)",
          border: "1px solid var(--color-border)",
        }}
        aria-label={isPlaying ? "Pause musik" : "Putar musik"}
      >
        {/* Icon */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: isPlaying ? "var(--color-sage)" : "var(--color-ivory)" }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Music2 size={13} style={{ color: isPlaying ? "white" : "var(--color-sage)" }} />
            </motion.div>
          ) : isPlaying ? (
            <Pause size={13} color="white" />
          ) : (
            <Play size={13} style={{ color: "var(--color-sage)" }} />
          )}
        </div>

        {/* Label */}
        <div className="text-left overflow-hidden" style={{ maxWidth: 120 }}>
          <p
            className="text-xs font-medium truncate leading-none mb-0.5"
            style={{ color: "var(--color-warm-black)" }}
          >
            {music.title}
          </p>
          <p
            className="text-[10px] truncate leading-none"
            style={{ color: "var(--color-warm-gray-light)" }}
          >
            {music.artist}
          </p>
        </div>

        {/* Playing waves */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-end gap-0.5 overflow-hidden"
              style={{ height: 16 }}
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-0.5 rounded-full"
                  style={{
                    height: 14,
                    backgroundColor: "var(--color-sage)",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

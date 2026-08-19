"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle size={24} color="white" fill="white" />

      {/* Ping animation */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ backgroundColor: "#25D366" }}
        aria-hidden
      />
    </motion.a>
  );
}

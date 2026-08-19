"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAME, getWhatsAppUrl } from "@/lib/constants";

const navLinks = [
  { label: "Template", href: "#templates" },
  { label: "Cara Order", href: "#cara-order" },
  { label: "Harga", href: "#harga" },
  { label: "FAQ", href: "#faq" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[var(--color-warm-white)]/95 backdrop-blur-sm shadow-[var(--shadow-nav)]"
            : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl tracking-tight text-[var(--color-warm-black)] hover:text-[var(--color-sage)] transition-colors duration-300"
            aria-label={`${SITE_NAME} — Kembali ke beranda`}
          >
            {SITE_NAME}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-warm-black)] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300",
              "bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] hover:shadow-md"
            )}
          >
            Hubungi Kami
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--color-warm-black)] hover:text-[var(--color-sage)] transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi mobile"
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--color-warm-black)]/50"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 bg-[var(--color-warm-white)] shadow-xl",
            "transition-transform duration-300 ease-[var(--ease-out-expo)]",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 h-16">
            <span className="font-[family-name:var(--font-playfair)] text-lg">
              {SITE_NAME}
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 text-[var(--color-warm-gray)] hover:text-[var(--color-warm-black)]"
              aria-label="Tutup menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 text-base text-[var(--color-warm-gray)] hover:text-[var(--color-warm-black)] border-b border-[var(--color-border)] transition-colors last:border-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-6 flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] transition-colors"
            >
              Hubungi Kami via WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

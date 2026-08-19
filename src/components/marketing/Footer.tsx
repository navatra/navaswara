"use client";

import { SITE_NAME, getWhatsAppUrl } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-16"
      style={{ backgroundColor: "var(--color-warm-black)" }}
      role="contentinfo"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <p
              className="font-[family-name:var(--font-playfair)] text-2xl mb-3"
              style={{ color: "var(--color-warm-white)" }}
            >
              {SITE_NAME}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(250, 248, 245, 0.5)" }}
            >
              Undangan digital yang dibuat dengan niat, untuk momen yang tak terlupakan.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <p
                className="text-xs font-medium tracking-[0.15em] uppercase mb-4"
                style={{ color: "var(--color-sage-light)" }}
              >
                Navigasi
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Template", href: "#templates" },
                  { label: "Cara Order", href: "#cara-order" },
                  { label: "Harga", href: "#harga" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:opacity-100"
                      style={{ color: "rgba(250, 248, 245, 0.5)" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "rgba(250, 248, 245, 1)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "rgba(250, 248, 245, 0.5)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-xs font-medium tracking-[0.15em] uppercase mb-4"
                style={{ color: "var(--color-sage-light)" }}
              >
                Hubungi Kami
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors"
                    style={{ color: "rgba(250, 248, 245, 0.5)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "rgba(250, 248, 245, 1)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "rgba(250, 248, 245, 0.5)")
                    }
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(250, 248, 245, 0.08)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(250, 248, 245, 0.3)" }}
          >
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(250, 248, 245, 0.2)" }}
          >
            Dibuat dengan ♥ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

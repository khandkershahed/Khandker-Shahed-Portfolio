"use client";

import { useCallback, useState, type ReactNode } from "react";
import type { SiteContent } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/controls/LanguageSwitcher";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { BackgroundLingo } from "@/components/layout/BackgroundLingo";
import { SiteEffects } from "@/components/layout/SiteEffects";

interface SiteShellProps {
  locale: Locale;
  content: SiteContent; 
  children: ReactNode;
}

export function SiteShell({ locale, content, children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className={`site-shell${menuOpen ? " header-is-active" : ""}`}>
      <SiteEffects />
      <div className="bg-image" style={{ backgroundImage: "url('/legacy/images/bg.jpg')" }} aria-hidden="true" />
      <BackgroundLingo />

      <div className="page-cover">
        <div id="page-scroll">
          <main>
            <div className="container">
              <div className="page-wrapper">
                <div className="site-toolbar" aria-label={locale === "it" ? "Preferenze e navigazione del sito" : "Site preferences and navigation"}>
                  <ThemeToggle locale={locale} />
                  <LanguageSwitcher locale={locale} />
                  <SiteHeader
                    locale={locale}
                    navigation={content.navigation}
                    isOpen={menuOpen}
                    onToggle={() => setMenuOpen((value) => !value)}
                    onClose={closeMenu}
                  />
                </div>

                {children}
              </div>
            </div>

            <Footer content={content} />
          </main>
        </div>
      </div>
    </div>
  );
}

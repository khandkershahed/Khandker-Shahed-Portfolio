"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

interface SiteHeaderProps {
  locale: Locale;
  navigation: NavigationItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function SiteHeader({ locale, navigation, isOpen, onToggle, onClose }: SiteHeaderProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <header id="fixed" className="site-header">
      <button
        className={`hamburger hamburger--elastic${isOpen ? " is-active" : ""}`}
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
      >
        <span className="hamburger-box" aria-hidden="true">
          <span className="hamburger-inner" />
        </span>
      </button>

      <nav id="primary-navigation" aria-label="Primary navigation" aria-hidden={!isOpen}>
        <ul>
          {navigation.map((item) => {
            const href = localizedPath(locale, item.path);
            const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
            const isActive = normalizedPath === href;
            return (
              <li key={item.path}>
                <Link className={isActive ? "active" : ""} href={href} aria-current={isActive ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

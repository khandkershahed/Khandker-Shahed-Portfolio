"use client";

import { useLayoutEffect } from "react";
import { UiIcon } from "@/components/common/UiIcon";
import type { Locale } from "@/lib/i18n";

type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <button
      className="utility-button theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={locale === "it" ? "Cambia tema colore" : "Toggle color theme"}
      title={locale === "it" ? "Cambia tema colore" : "Toggle color theme"}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        <UiIcon className="theme-toggle__icon theme-toggle__icon--sun" name="sun" />
        <UiIcon className="theme-toggle__icon theme-toggle__icon--moon" name="moon" />
      </span>
      <span className="utility-button__text" aria-hidden="true">
        <span className="theme-toggle__label theme-toggle__label--light">{locale === "it" ? "Chiaro" : "Light"}</span>
        <span className="theme-toggle__label theme-toggle__label--dark">{locale === "it" ? "Scuro" : "Dark"}</span>
      </span>
    </button>
  );
}

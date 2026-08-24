"use client";

import { useEffect } from "react";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "portfolio-locale";
const COUNTRY_ENDPOINT = "https://ipapi.co/country/";

function browserFallback(): Locale {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone === "Europe/Rome" || navigator.language?.toLowerCase().startsWith("it")) {
    return "it";
  }
  return defaultLocale;
}

export function LocaleRedirect() {
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved && isLocale(saved)) {
      window.location.replace(`/${saved}/`);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1800);

    async function resolveRegion() {
      let target: Locale = browserFallback();

      try {
        const response = await fetch(COUNTRY_ENDPOINT, {
          method: "GET",
          headers: { Accept: "text/plain" },
          signal: controller.signal,
          cache: "no-store",
        });

        if (response.ok) {
          const country = (await response.text()).trim().toUpperCase();
          target = country === "IT" ? "it" : "en";
        }
      } catch {
        target = browserFallback();
      } finally {
        window.clearTimeout(timeout);
        window.location.replace(`/${target}/`);
      }
    }

    void resolveRegion();

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return null;
}

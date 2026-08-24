
"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { UiIcon } from "@/components/common/UiIcon";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: Locale = locale === "en" ? "it" : "en";

  function switchLanguage() {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${nextLocale}/`);
      return;
    }

    segments[0] = nextLocale;
    localStorage.setItem("portfolio-locale", nextLocale);
    router.push(`/${segments.join("/")}/`);
  }

  const label = locale === "en" ? "Passa all'italiano" : "Switch to English";

  return (
    <button className="utility-button" type="button" onClick={switchLanguage} aria-label={label} title={label}>
      <UiIcon className="ui-icon" name="globe" aria-hidden="true" />
      <span className="utility-button__text">{nextLocale.toUpperCase()}</span>
    </button>
  );
}

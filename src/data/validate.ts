import type { SiteContent } from "@/data/types";
import type { Locale } from "@/lib/i18n";

export function assertSiteContent(value: unknown, locale: Locale): asserts value is SiteContent {
  if (!value || typeof value !== "object") {
    throw new Error(`Invalid portfolio content for locale: ${locale}`);
  }

  const candidate = value as Partial<SiteContent>;
  if (candidate.locale !== locale) {
    throw new Error(`Portfolio content locale mismatch. Expected ${locale}.`);
  }

  if (
    !candidate.profile ||
    !candidate.home ||
    !candidate.about ||
    !candidate.resume ||
    !candidate.portfolio ||
    !candidate.blog ||
    !candidate.contact ||
    !candidate.footer
  ) {
    throw new Error(`Portfolio content is missing required sections for locale: ${locale}`);
  }

  if (!Array.isArray(candidate.navigation) || candidate.navigation.length === 0) {
    throw new Error(`Portfolio navigation is invalid for locale: ${locale}`);
  }

  if (!candidate.seo?.home || !candidate.seo.about || !candidate.seo.resume || !candidate.seo.portfolio || !candidate.seo.blog || !candidate.seo.contact) {
    throw new Error(`Portfolio SEO content is incomplete for locale: ${locale}`);
  }
}

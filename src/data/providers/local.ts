
import enContent from "@/content/en/site.json";
import itContent from "@/content/it/site.json";
import type { DataProvider, SiteContent } from "@/data/types";
import { assertSiteContent } from "@/data/validate";
import type { Locale } from "@/lib/i18n";

const contentByLocale: Record<Locale, unknown> = {
  en: enContent,
  it: itContent,
};

export const localProvider: DataProvider = {
  async getSiteContent(locale: Locale): Promise<SiteContent> {
    const content = contentByLocale[locale];
    assertSiteContent(content, locale);
    return content;
  },
};

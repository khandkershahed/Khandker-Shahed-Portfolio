
import { apiProvider } from "@/data/providers/api";
import { localProvider } from "@/data/providers/local";
import type { SiteContent } from "@/data/types";
import type { Locale } from "@/lib/i18n";

const activeProvider = process.env.DATA_SOURCE === "api" ? apiProvider : localProvider;

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  return activeProvider.getSiteContent(locale);
}

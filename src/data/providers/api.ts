
import type { DataProvider, SiteContent } from "@/data/types";
import { assertSiteContent } from "@/data/validate";
import type { Locale } from "@/lib/i18n";

export const apiProvider: DataProvider = {
  async getSiteContent(locale: Locale): Promise<SiteContent> {
    const baseUrl = process.env.CONTENT_API_URL;

    if (!baseUrl) {
      throw new Error("CONTENT_API_URL is required when DATA_SOURCE=api.");
    }

    const url = new URL("/api/portfolio/site", baseUrl);
    url.searchParams.set("locale", locale);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Portfolio API request failed with status ${response.status}.`);
    }

    const content: unknown = await response.json();
    assertSiteContent(content, locale);
    return content;
  },
};

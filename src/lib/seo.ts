import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export interface PageSeoInput {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
}

export function buildMetadata(locale: Locale, input: PageSeoInput): Metadata {
  const canonical = localizedPath(locale, input.path);
  const english = localizedPath("en", input.path);
  const italian = localizedPath("it", input.path);

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical,
      languages: {
        en: english,
        it: italian,
        "x-default": english,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: input.title,
      description: input.description,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      alternateLocale: locale === "it" ? ["en_US"] : ["it_IT"],
      images: [
        {
          url: "/legacy/images/profile.jpg",
          width: 600,
          height: 600,
          alt: "Khandker Shahed",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: ["/legacy/images/profile.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

import type { MetadataRoute } from "next";
import { getSiteContent } from "@/data/provider";
import { locales, localizedPath } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const paths = ["/", "about", "resume", "portfolio", "blog", "contact"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageLastModified = new Date("2026-08-23T00:00:00+02:00");

  const baseEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.url}${localizedPath(locale, path)}`,
      lastModified: pageLastModified,
      changeFrequency: path === "blog" ? "weekly" as const : "monthly" as const,
      priority:
        path === "/"
          ? 1
          : path === "portfolio"
            ? 0.9
            : path === "about"
              ? 0.85
              : path === "blog"
                ? 0.85
                : 0.75,
    }))
  );

  const english = await getSiteContent("en");

  const postEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    english.blog.posts.map((post) => ({
      url: `${siteConfig.url}/${locale}/blog/${post.slug}/`,
      lastModified: new Date(
        post.modifiedIso ??
          post.publishedIso ??
          "2026-08-23T00:00:00+02:00"
      ),
      changeFrequency: "monthly" as const,
      priority: 0.78,
    }))
  );

  return [...baseEntries, ...postEntries];
}
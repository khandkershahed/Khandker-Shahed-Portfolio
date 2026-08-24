import type { SiteContent } from "@/data/types";
import { siteConfig } from "@/lib/site-config";

interface PersonJsonLdProps {
  content: SiteContent;
}

export function PersonJsonLd({ content }: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: content.profile.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/legacy/images/profile.jpg`,
        jobTitle: content.locale === "it" ? "Sviluppatore Web Full-Stack" : "Full-Stack Web Developer",
        email: `mailto:${content.profile.email}`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bologna",
          addressRegion: "Emilia-Romagna",
          addressCountry: "IT",
        },
        sameAs: content.profile.socials.map((social) => social.url),
        knowsAbout: [
          "Laravel",
          "PHP",
          "MySQL",
          "JavaScript",
          "REST APIs",
          "E-commerce development",
          "Web application development",
          "Linux deployment",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Jashore University of Science and Technology",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${content.profile.name} Portfolio`,
        inLanguage: ["en", "it"],
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

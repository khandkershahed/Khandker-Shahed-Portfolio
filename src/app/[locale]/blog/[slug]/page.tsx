import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/data/provider";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { UiIcon } from "@/components/common/UiIcon";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const english = await getSiteContent("en");
  return english.blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const content = await getSiteContent(locale);
  const post = content.blog.posts.find((item) => item.slug === slug);
  if (!post) return {};

  const path = `/${locale}/blog/${post.slug}/`;
  const publishedTime = post.publishedIso ?? "2026-08-12T00:00:00+02:00";
  const modifiedTime = post.modifiedIso ?? publishedTime;

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    alternates: {
      canonical: path,
      languages: {
        en: `/en/blog/${post.slug}/`,
        it: `/it/blog/${post.slug}/`,
        "x-default": `/en/blog/${post.slug}/`,
      },
    },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.excerpt,
      publishedTime,
      modifiedTime,
      authors: [siteConfig.name],
      tags: post.tags,
      siteName: siteConfig.name,
      locale: locale === "it" ? "it_IT" : "en_US",
      alternateLocale: locale === "it" ? ["en_US"] : ["it_IT"],
      images: [{ url: "/legacy/images/profile.jpg", width: 600, height: 600, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
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

export default async function BlogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent(locale);
  const post = content.blog.posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleUrl = `${siteConfig.url}/${locale}/blog/${post.slug}/`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedIso ?? "2026-08-12T00:00:00+02:00",
    dateModified: post.modifiedIso ?? post.publishedIso ?? "2026-08-12T00:00:00+02:00",
    inLanguage: locale,
    mainEntityOfPage: articleUrl,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    image: `${siteConfig.url}/legacy/images/profile.jpg`,
  };

  return (
    <article className="blog-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />

      <div className="blog-detail__nav">
        <Link className="blog-back-link" href={`/${locale}/blog/`}>
          <UiIcon className="ui-icon" name="arrow-left" aria-hidden="true" />
          <span>{content.blog.backToBlog}</span>
        </Link>
      </div>

      <header className="blog-detail__hero">
        <div className="blog-detail__meta">
          <span className="blog-detail__category">{post.category}</span>
          <span>{post.published}</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="blog-detail__title">{post.title}</h1>

        <p className="blog-detail__lead">{post.intro}</p>

        <div className="blog-detail__tags" aria-label={locale === "it" ? "Argomenti dell’articolo" : "Article topics"}>
          {post.tags.map((tag) => (
            <span key={tag} className="blog-tag-pill">#{tag}</span>
          ))}
        </div>
      </header>

      <div className="blog-detail__content">
        {post.sections.map((section, index) => (
          <section className="blog-article-section" key={`${section.heading ?? "section"}-${index}`}>
            {section.heading && (
              <h2>
                <span className="section-index">0{index + 1}.</span> {section.heading}
              </h2>
            )}
            
            <div className="blog-article-section__body">
              {section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {section.bullets?.length ? (
              <ul className="blog-bullet-card-list">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <span className="bullet-dot" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {post.closing && (
          <div className="blog-detail__closing">
            <p>{post.closing}</p>
          </div>
        )}

        {post.sources?.length ? (
          <aside className="blog-sources">
            <h2>{content.blog.sourcesLabel}</h2>
            <ul>
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
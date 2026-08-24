import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/common/BlogCard";
import { getSiteContent } from "@/data/provider";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getSiteContent(locale);
  return buildMetadata(locale, { ...content.seo.blog, path: "blog" });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent(locale);

  return (
    <section className="blog-page">
      <h1 className="underline-title page-title">{content.blog.title}</h1>
      <p className="page-intro blog-page__intro">{content.blog.intro}</p>

      <div className="blog-card-grid">
        {content.blog.posts.map((post) => (
          <BlogCard key={post.slug} locale={locale} post={post} readArticle={content.blog.readArticle} articleLabel={content.blog.articleLabel} />
        ))}
      </div>
    </section>
  );
}

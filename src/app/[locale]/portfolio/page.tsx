import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
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
  return buildMetadata(locale, { ...content.seo.portfolio, path: "portfolio" });
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getSiteContent(locale);
  const portfolio = content.portfolio;

  return (
    <section className="portfolio-page">
      <h1 className="underline-title page-title">{portfolio.title}</h1>
      <p className="page-intro">{portfolio.intro}</p>

      <article className="current-build-card">
        <div className="current-build-card__content">
          <span className="resume-eyebrow">{portfolio.currentBuild.eyebrow}</span>
          <h2>{portfolio.currentBuild.title}</h2>
          <p>{portfolio.currentBuild.description}</p>
        </div>
        <div className="chip-list current-build-card__tags">
          {portfolio.currentBuild.tags.map((tag) => <span className="resume-chip resume-chip--learning" key={tag}>{tag}</span>)}
        </div>
      </article>

      <PortfolioFilter filters={portfolio.filters} projects={portfolio.projects} locale={locale} />
    </section>
  );
}

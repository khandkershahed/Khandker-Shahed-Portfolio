import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UiIcon } from "@/components/common/UiIcon";
import { getSiteContent } from "@/data/provider";
import { isLocale, localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getSiteContent(locale);
  return buildMetadata(locale, { ...content.seo.about, path: "about" });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getSiteContent(locale);
  const about = content.about;

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: about.title,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: content.profile.name,
      jobTitle: locale === "it" ? "Sviluppatore Web Full-Stack" : "Full-Stack Web Developer",
      url: "https://khandkershahed.com",
      image: "https://khandkershahed.com/legacy/images/profile.jpg",
      sameAs: content.profile.socials.map((social) => social.url),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bologna",
        addressCountry: "IT",
      },
    },
  };

  return (
    <section className="about-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />

      <div className="about-hero">
        <div className="about-hero__content">
          <span className="section-eyebrow">{about.eyebrow}</span>
          <h1>{about.title}</h1>
          <h2>{about.headline}</h2>
          <p>{about.intro}</p>
          <div className="hero-actions">
            <Link className="site-btn" href={localizedPath(locale, "resume")}>{about.primaryCta}</Link>
            <Link className="site-btn site-btn--secondary" href={localizedPath(locale, "contact")}>{about.secondaryCta}</Link>
          </div>
        </div>

        <div className="about-hero__image-wrap">
          <Image
            className="about-hero__image"
            src="/legacy/images/profile_OLD.jpg"
            alt={content.profile.name}
            width={520}
            height={650}
            priority
            sizes="(max-width: 767px) 70vw, 320px"
          />
        </div>
      </div>

      <div className="metric-grid about-metrics">
        {about.stats.map((stat) => (
          <article className="metric-card" key={`${stat.value}-${stat.label}`}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="about-quote-grid">
        <blockquote>{about.quotePrimary}</blockquote>
        <blockquote>{about.quoteSecondary}</blockquote>
      </div>

      <section className="about-section" aria-labelledby="about-pillars-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{about.pillarsEyebrow}</span>
            <h2 id="about-pillars-title">{about.pillarsTitle}</h2>
          </div>
        </div>
        <div className="pillar-grid">
          {about.pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.number}>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-work-grid" aria-labelledby="about-experience-title">
        <div>
          <div className="section-heading-row">
            <div>
              <span className="section-eyebrow">{about.experienceEyebrow}</span>
              <h2 id="about-experience-title">{about.experienceTitle}</h2>
            </div>
          </div>

          <div className="about-timeline">
            {content.resume.experience.map((experience) => (
              <article className="about-timeline__item" key={`${experience.company}-${experience.period}`}>
                <span className="about-timeline__period">{experience.period}</span>
                <h3>{experience.role}</h3>
                <strong>{experience.company}</strong>
                <p>{experience.bullets[0]}</p>
                <div className="featured-project-card__tags">
                  {experience.stack.map((item) => <small key={item}>{item}</small>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="about-skills-card" aria-labelledby="about-skills-title">
          <h2 id="about-skills-title">{about.skillsTitle}</h2>
          {content.resume.skillGroups.map((group) => (
            <div className="about-skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </aside>
      </section>

      <section className="about-section" aria-labelledby="about-education-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{about.educationEyebrow}</span>
            <h2 id="about-education-title">{about.educationTitle}</h2>
          </div>
        </div>
        <div className="credential-grid">
          {content.resume.education.map((item) => (
            <article className="credential-card" key={`${item.institution}-${item.period}`}>
              <span className="credential-card__period">{item.period}</span>
              <h3>{item.degree}</h3>
              <p className="credential-card__institution">{item.institution}</p>
              {item.details?.map((detail) => <p className="credential-card__detail" key={detail}>{detail}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-research" aria-labelledby="about-research-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{about.researchEyebrow}</span>
            <h2 id="about-research-title">{about.researchTitle}</h2>
            <p>{about.researchIntro}</p>
          </div>
        </div>

        <h3 className="about-publications-title">{about.publicationsTitle}</h3>
        <div className="publication-grid">
          {about.publications.map((publication) => (
            <a className="publication-card" href={publication.url} target="_blank" rel="noopener noreferrer" key={publication.url}>
              <span>{publication.year}</span>
              <h3>{publication.title}</h3>
              <p>{publication.venue}</p>
              <span className="publication-card__link">
                DOI <UiIcon className="ui-icon" name="external" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}

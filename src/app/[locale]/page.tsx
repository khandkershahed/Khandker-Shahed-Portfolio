import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/common/BlogCard";
import { ClientMarquee } from "@/components/common/ClientMarquee";
import { PersonJsonLd } from "@/components/common/PersonJsonLd";
import { TechnologyMarquee } from "@/components/common/TechnologyMarquee";
import { UiIcon, iconNameFromLegacyClass } from "@/components/common/UiIcon";
import { RoleRotator } from "@/components/home/RoleRotator";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { getSiteContent } from "@/data/provider";
import { buildMetadata } from "@/lib/seo";
import { isLocale, localizedPath } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getSiteContent(locale);
  return buildMetadata(locale, { ...content.seo.home, path: "/" });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getSiteContent(locale);

  const featuredProjects = content.home.featuredProjects
    .map((name) => content.portfolio.projects.find((project) => project.name === name))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <>
      <PersonJsonLd content={content} />

      <section className="hero">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-4 col-md-6 profile-pic">
            <div className="image clip-animation from-left">
              <Image src="/legacy/images/profile_OLD.jpg" alt="Khandker Shahed" width={520} height={650} priority sizes="(max-width: 767px) 260px, 25vw" />
            </div>
            <div className="social-links clip-animation">
              <ul>
                {content.profile.socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <UiIcon className="ui-icon" name={iconNameFromLegacyClass(social.iconClass)} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-6 right-content">
            <h5 className="hi classic-animation">
              {content.profile.greeting} <span>👋</span>
            </h5>
            <div className="spacer-15" />
            <h1 className="hero-big classic-animation">
              {content.profile.identityLine}
              <br />
              {content.profile.rolePrefix} <RoleRotator roles={content.profile.roles} />
            </h1>
            <div className="spacer-30" />
            <hr className="clip-animation" />
            <ul className="row profile-info clip-animation">
              <li className="col-xl-3 col-lg-5">
                <a target="_blank" rel="noopener noreferrer" href={content.profile.whatsappHref}>
                  <UiIcon className="ui-icon" name="whatsapp" aria-hidden="true" />
                  <span>{content.profile.phoneDisplay}</span>
                </a>
              </li>
              <li className="col-xl-5 col-lg-7">
                <a href={`mailto:${content.profile.email}`}>
                  <UiIcon className="ui-icon" name="email" aria-hidden="true" />
                  <span>{content.profile.emailDisplay}</span>
                </a>
              </li>
              <li className="col-xl-3 col-lg-6">
                <UiIcon className="ui-icon" name="location" aria-hidden="true" />
                <span>{content.profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="spacer-30" />
        <p className="clip-animation home-about">{content.profile.about}</p>
        <div className="hero-actions clip-animation">
          <Link className="site-btn" href={localizedPath(locale, "portfolio")}>{content.home.featuredCta}</Link>
          <Link className="site-btn site-btn--secondary" href={localizedPath(locale, "contact")}>{content.home.ctaPrimary}</Link>
        </div>

        <ul className="hero-highlights clip-animation" aria-label={locale === "it" ? "Punti chiave" : "Key working points"}>
          {content.home.heroHighlights.map((item) => (
            <li key={item}>
              <span className="hero-highlights__icon" aria-hidden="true">
                <UiIcon className="ui-icon" name="check" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section home-tech" aria-labelledby="technology-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.technologyEyebrow}</span>
            <h2 id="technology-title">{content.home.technologyTitle}</h2>
          </div>
        </div>
        <TechnologyMarquee technologies={content.home.technologies} ariaLabel={content.home.technologyTitle} />
      </section>

      <section className="home-section services-section" aria-labelledby="services-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.servicesEyebrow}</span>
            <h2 id="services-title">{content.home.servicesTitle}</h2>
            <p>{content.home.servicesIntro}</p>
          </div>
        </div>

        <div className="service-card-grid">
          {content.home.services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-card__icon">
                <UiIcon className="ui-icon" name={iconNameFromLegacyClass(service.iconClass)} aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-card__tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section snapshot-section" aria-labelledby="snapshot-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.snapshotEyebrow}</span>
            <h2 id="snapshot-title">{content.home.snapshotTitle}</h2>
          </div>
          <Link className="section-link" href={localizedPath(locale, "about")}>{content.navigation.find((item) => item.path === "about")?.label ?? "About"}<UiIcon className="ui-icon" name="arrow-right" aria-hidden="true" /></Link>
        </div>
        <div className="metric-grid">
          {content.home.stats.map((stat) => (
            <article className="metric-card" key={`${stat.value}-${stat.label}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section approach-section" aria-labelledby="approach-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.approachEyebrow}</span>
            <h2 id="approach-title">{content.home.approachTitle}</h2>
            <p>{content.home.approachIntro}</p>
          </div>
        </div>
        <div className="pillar-grid">
          {content.home.approachItems.map((item) => (
            <article className="pillar-card" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section featured-work" aria-labelledby="featured-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.featuredEyebrow}</span>
            <h2 id="featured-title">{content.home.featuredTitle}</h2>
            <p>{content.home.featuredIntro}</p>
          </div>
          <Link className="section-link" href={localizedPath(locale, "portfolio")}>{content.home.featuredCta}<UiIcon className="ui-icon" name="arrow-right" aria-hidden="true" /></Link>
        </div>

        <div className="featured-project-grid">
          {featuredProjects.map((project) => (
            <a className="featured-project-card" href={project.url} target="_blank" rel="noopener noreferrer" key={project.name}>
              <div className="featured-project-card__media">
                <Image src={project.image} alt={project.alt} width={600} height={360} sizes="(max-width: 767px) 100vw, 33vw" />
              </div>
              <div className="featured-project-card__body">
                <span>{project.categoryLabel}</span>
                <h3>{project.name}</h3>
                {project.description ? <p>{project.description}</p> : null}
                {project.stack?.length ? (
                  <div className="featured-project-card__tags">
                    {project.stack.slice(0, 3).map((technology) => <small key={technology}>{technology}</small>)}
                  </div>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section testimonials-section" aria-labelledby="testimonials-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.testimonialsEyebrow}</span>
            <h2 id="testimonials-title">{content.home.testimonialsTitle}</h2>
          </div>
        </div>
        <TestimonialCarousel testimonials={content.home.testimonials} locale={locale} />
      </section>

      <section className="home-section home-blog" aria-labelledby="home-blog-title">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">{content.home.blogEyebrow}</span>
            <h2 id="home-blog-title">{content.home.blogTitle}</h2>
            <p>{content.home.blogIntro}</p>
          </div>
          <Link className="section-link" href={localizedPath(locale, "blog")}>{content.home.blogCta}<UiIcon className="ui-icon" name="arrow-right" aria-hidden="true" /></Link>
        </div>
        <div className="blog-card-grid blog-card-grid--home">
          {content.blog.posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} locale={locale} post={post} readArticle={content.blog.readArticle} articleLabel={content.blog.articleLabel} />
          ))}
        </div>
      </section>

      <ClientMarquee clients={content.home.clients} locale={locale} />

      <section className="home-cta" aria-labelledby="home-cta-title">
        <span className="section-eyebrow">{content.home.ctaEyebrow}</span>
        <h2 id="home-cta-title">{content.home.ctaTitle}</h2>
        <p>{content.home.ctaText}</p>
        <div className="hero-actions">
          <Link className="site-btn" href={localizedPath(locale, "contact")}>{content.home.ctaPrimary}</Link>
          <Link className="site-btn site-btn--secondary" href={localizedPath(locale, "resume")}>{content.home.ctaSecondary}</Link>
        </div>
      </section>
    </>
  );
}

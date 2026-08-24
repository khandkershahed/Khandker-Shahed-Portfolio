import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/data/provider";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { UiIcon } from "@/components/common/UiIcon";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getSiteContent(locale);
  return buildMetadata(locale, { ...content.seo.resume, path: "resume" });
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getSiteContent(locale);
  const resume = content.resume;

  return (
    <section className="resume-page">
      <h1 className="underline-title page-title">{resume.title}</h1>

      <section className="resume-summary" aria-labelledby="resume-summary-title">
        <div className="resume-summary__main">
          <span className="resume-eyebrow">{resume.summaryEyebrow}</span>
          <h2 id="resume-summary-title">{resume.summaryTitle}</h2>
          <p>{resume.summary}</p>
        </div>

        <div className="resume-summary__aside">
          <div className="resume-meta-block">
            <span>{resume.targetLabel}</span>
            <div className="chip-list">
              {resume.targetRoles.map((role) => <span className="resume-chip" key={role}>{role}</span>)}
            </div>
          </div>
          <div className="resume-meta-block">
            <span>{resume.coreStackLabel}</span>
            <div className="chip-list chip-list--compact">
              {resume.coreStack.map((technology) => <span className="resume-chip resume-chip--muted" key={technology}>{technology}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="resume-learning" aria-labelledby="learning-heading">
        <div>
          <span className="resume-eyebrow">{resume.learningLabel}</span>
          <p id="learning-heading">{resume.learningText}</p>
        </div>
        <div className="chip-list chip-list--learning">
          {resume.learningStack.map((technology) => <span className="resume-chip resume-chip--learning" key={technology}>{technology}</span>)}
        </div>
      </section>

      <section className="resume-section" aria-labelledby="experience-heading">
        <div className="resume-section__heading">
          <span className="resume-section__icon" aria-hidden="true"><UiIcon className="ui-icon" name="briefcase" /></span>
          <div>
            <span className="resume-section__kicker">01</span>
            <h2 id="experience-heading">{resume.workLabel}</h2>
          </div>
        </div>

        <div className="experience-list">
          {resume.experience.map((item) => (
            <article className="experience-card" key={`${item.company}-${item.period}`}>
              <div className="experience-card__top">
                <div className="experience-card__identity">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <div className="experience-card__meta">
                  <span className="experience-card__period">{item.period}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <ul className="experience-card__bullets">
                {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>

              <div className="experience-card__stack" aria-label={locale === "it" ? "Tecnologie utilizzate" : "Technologies used"}>
                {item.stack.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" aria-labelledby="skills-heading">
        <div className="resume-section__heading">
          <span className="resume-section__icon" aria-hidden="true"><UiIcon className="ui-icon" name="code" /></span>
          <div>
            <span className="resume-section__kicker">02</span>
            <h2 id="skills-heading">{resume.skillsLabel}</h2>
          </div>
        </div>

        <div className="skill-group-grid">
          {resume.skillGroups.map((group) => (
            <article className="skill-group-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="language-strip">
          <strong>{resume.languageLabel}</strong>
          <div>
            <span>{resume.languages.join(" ; \u00A0\u00A0\u00A0")}</span>
            {/* {resume.languages.map((language) => <span key={language}>{language}</span>)} */}
          </div>
        </div>
      </section>

      <section className="resume-section" aria-labelledby="education-heading">
        <div className="resume-section__heading">
          <span className="resume-section__icon" aria-hidden="true"><UiIcon className="ui-icon" name="graduation" /></span>
          <div>
            <span className="resume-section__kicker">03</span>
            <h2 id="education-heading">{resume.educationLabel}</h2>
          </div>
        </div>

        <div className="credential-grid">
          {resume.education.map((item) => (
            <article className="credential-card" key={`${item.institution}-${item.period}`}>
              <span className="credential-card__period">{item.period}</span>
              <h3>{item.degree}</h3>
              <p className="credential-card__institution">{item.institution}</p>
              {item.details?.map((detail) => <p className="credential-card__detail" key={detail}>{detail}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section" aria-labelledby="training-heading">
        <div className="resume-section__heading">
          <span className="resume-section__icon" aria-hidden="true"><UiIcon className="ui-icon" name="certificate" /></span>
          <div>
            <span className="resume-section__kicker">04</span>
            <h2 id="training-heading">{resume.trainingLabel}</h2>
          </div>
        </div>

        <div className="credential-grid credential-grid--training">
          {resume.training.map((item) => (
            <article className="credential-card" key={`${item.title}-${item.institution}`}>
              {item.period ? <span className="credential-card__period">{item.period}</span> : null}
              <h3>{item.title}</h3>
              <p className="credential-card__institution">{item.institution}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

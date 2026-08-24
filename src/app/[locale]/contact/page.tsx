import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientMarquee } from "@/components/common/ClientMarquee";
import { ContactForm } from "@/components/contact/ContactForm";
import { UiIcon, iconNameFromLegacyClass } from "@/components/common/UiIcon";
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
  return buildMetadata(locale, { ...content.seo.contact, path: "contact" });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = await getSiteContent(locale);
  const contact = content.contact;

  return (
    <>
      <section className="contact-page">
        <h1 className="underline-title page-title">{contact.title}</h1>
        <p className="page-intro">{contact.intro}</p>

        <div className="contact-layout">
          <aside className="contact-sidebar" aria-label={contact.writeMe}>
            <div className="contact-info-card">
              <p className="contact-section-label">{contact.writeMe}</p>

              <a className="contact-channel" href={content.profile.whatsappHref} target="_blank" rel="noopener noreferrer">
                <span className="contact-channel__icon"><UiIcon className="ui-icon" name="whatsapp" aria-hidden="true" /></span>
                <span>
                  <small>{contact.whatsappLabel}</small>
                  <strong>{content.profile.phoneDisplay}</strong>
                </span>
              </a>

              <a className="contact-channel" href={`mailto:${content.profile.email}`}>
                <span className="contact-channel__icon"><UiIcon className="ui-icon" name="email" aria-hidden="true" /></span>
                <span>
                  <small>{contact.emailLabelText}</small>
                  <strong>{content.profile.email}</strong>
                </span>
              </a>

              <div className="contact-channel contact-channel--static">
                <span className="contact-channel__icon"><UiIcon className="ui-icon" name="location" aria-hidden="true" /></span>
                <span>
                  <small>{contact.locationLabel}</small>
                  <strong>{content.profile.location}</strong>
                </span>
              </div>
            </div>

            <div className="contact-info-card contact-social-card">
              <p className="contact-section-label">{contact.followMe}</p>
              <div className="contact-socials">
                {content.profile.socials.map((social) => (
                  <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} key={social.label}>
                    <UiIcon className="ui-icon" name={iconNameFromLegacyClass(social.iconClass)} aria-hidden="true" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <ContactForm endpointEmail={content.profile.email} copy={contact} />
        </div>
      </section>

      <ClientMarquee clients={content.home.clients} locale={locale} />
    </>
  );
}

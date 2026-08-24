import type { Locale } from "@/lib/i18n";

export interface NavigationItem {
  label: string;
  path: string;
}

export interface SocialLink {
  label: string;
  url: string;
  iconClass: string;
}

export interface TechnologyItem {
  name: string;
  mark: string;
  status?: "core" | "used" | "learning";
  statusLabel?: string;
}

export interface ServiceItem {
  title: string;
  iconClass: string;
  description: string;
  tags: string[];
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface ClientLogo {
  image: string;
  alt: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  details?: string[];
}

export interface TrainingItem {
  title: string;
  institution: string;
  period?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface PortfolioFilter {
  key: string;
  label: string;
}

export interface ProjectItem {
  name: string;
  category: string;
  categoryLabel: string;
  url: string;
  image: string;
  alt: string;
  description?: string;
  stack?: string[];
}

export interface CurrentBuild {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
}

export interface PageSeo {
  title: string;
  description: string;
  keywords?: string[];
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogSource {
  label: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: string;
  publishedIso?: string;
  modifiedIso?: string;
  readTime: string;
  tags: string[];
  intro: string;
  sections: BlogSection[];
  closing: string;
  sources?: BlogSource[];
}

export interface PublicationItem {
  year: string;
  title: string;
  venue: string;
  url: string;
}

export interface SiteContent {
  locale: Locale;
  navigation: NavigationItem[];
  seo: {
    home: PageSeo;
    about: PageSeo;
    resume: PageSeo;
    portfolio: PageSeo;
    blog: PageSeo;
    contact: PageSeo;
  };
  profile: {
    name: string;
    greeting: string;
    identityLine: string;
    rolePrefix: string;
    roles: string[];
    about: string;
    phoneDisplay: string;
    phoneHref: string;
    whatsappHref: string;
    email: string;
    emailDisplay: string;
    location: string;
    socials: SocialLink[];
  };
  home: {
    technologyEyebrow: string;
    technologyTitle: string;
    technologies: TechnologyItem[];
    heroHighlights: string[];
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    services: ServiceItem[];
    snapshotEyebrow: string;
    snapshotTitle: string;
    stats: MetricItem[];
    approachEyebrow: string;
    approachTitle: string;
    approachIntro: string;
    approachItems: PillarItem[];
    featuredEyebrow: string;
    featuredTitle: string;
    featuredIntro: string;
    featuredProjects: string[];
    featuredCta: string;
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonials: Testimonial[];
    blogEyebrow: string;
    blogTitle: string;
    blogIntro: string;
    blogCta: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaText: string;
    ctaPrimary: string;
    ctaSecondary: string;
    clients: ClientLogo[];
  };
  about: {
    title: string;
    eyebrow: string;
    headline: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    stats: MetricItem[];
    quotePrimary: string;
    quoteSecondary: string;
    pillarsEyebrow: string;
    pillarsTitle: string;
    pillars: PillarItem[];
    experienceEyebrow: string;
    experienceTitle: string;
    skillsTitle: string;
    educationEyebrow: string;
    educationTitle: string;
    researchEyebrow: string;
    researchTitle: string;
    researchIntro: string;
    publicationsTitle: string;
    publications: PublicationItem[];
  };
  resume: {
    title: string;
    summaryEyebrow: string;
    summaryTitle: string;
    summary: string;
    targetLabel: string;
    targetRoles: string[];
    coreStackLabel: string;
    coreStack: string[];
    learningLabel: string;
    learningText: string;
    learningStack: string[];
    workLabel: string;
    educationLabel: string;
    trainingLabel: string;
    skillsLabel: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    training: TrainingItem[];
    skillGroups: SkillGroup[];
    languageLabel: string;
    languages: string[];
  };
  portfolio: {
    title: string;
    intro: string;
    currentBuild: CurrentBuild;
    filters: PortfolioFilter[];
    projects: ProjectItem[];
  };
  blog: {
    title: string;
    intro: string;
    readArticle: string;
    backToBlog: string;
    sourcesLabel: string;
    articleLabel: string;
    posts: BlogPost[];
  };
  contact: {
    title: string;
    intro: string;
    writeMe: string;
    whatsappLabel: string;
    emailLabelText: string;
    locationLabel: string;
    followMe: string;
    formIntro: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    privacyNote: string;
    subject: string;
  };
  footer: {
    copyright: string;
  };
}

export interface DataProvider {
  getSiteContent(locale: Locale): Promise<SiteContent>;
}

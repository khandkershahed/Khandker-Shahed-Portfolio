
export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = ""): string {
  const cleanPath = path === "/" ? "" : path.replace(/^\/+|\/+$/g, "");
  return cleanPath ? `/${locale}/${cleanPath}/` : `/${locale}/`;
}

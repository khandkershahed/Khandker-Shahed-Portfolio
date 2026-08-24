import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "@/app/globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteContent } from "@/data/provider";
import { isLocale, locales } from "@/lib/i18n";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const dynamicParams = false;

export const metadata: Metadata = {
  icons: {
    icon: "/legacy/images/profile.jpg",
    apple: "/legacy/images/profile.jpg",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const content = await getSiteContent(rawLocale);

  return (
    <html lang={rawLocale} suppressHydrationWarning className={poppins.variable} data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={poppins.className}>
        <SiteShell locale={rawLocale} content={content}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}

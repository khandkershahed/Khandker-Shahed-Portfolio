"use client";

import Image from "next/image";
import type { ClientLogo } from "@/data/types";
import type { Locale } from "@/lib/i18n";

interface ClientMarqueeProps {
  clients: ClientLogo[];
  locale: Locale;
}

export function ClientMarquee({ clients, locale }: ClientMarqueeProps) {
  if (clients.length === 0) return null;

  const repeated = [...clients, ...clients];

  return (
    <div className="client-marquee" aria-label={locale === "it" ? "Loghi di clienti e progetti selezionati" : "Selected client and project logos"}>
      <div className="client-marquee__viewport">
        <div className="client-marquee__track">
          {repeated.map((client, index) => {
            const duplicate = index >= clients.length;
            return (
              <div
                className="client-marquee__item"
                key={`${client.image}-${index}`}
                aria-hidden={duplicate ? "true" : undefined}
              >
                <Image src={client.image} alt={duplicate ? "" : client.alt} width={210} height={78} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

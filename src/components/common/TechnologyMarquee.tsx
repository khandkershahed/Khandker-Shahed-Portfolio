"use client";

import type { CSSProperties } from "react";
import type { TechnologyItem } from "@/data/types";
import { UiIcon, type UiIconName } from "@/components/common/UiIcon";

interface TechnologyMarqueeProps {
  technologies: TechnologyItem[];
  ariaLabel: string;
}

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons";

const brandIcons: Record<string, string> = {
  L: `${DEVICON_BASE}/laravel/laravel-original.svg`,
  PHP: `${DEVICON_BASE}/php/php-original.svg`,
  B: `${DEVICON_BASE}/laravel/laravel-original.svg`,
  SQL: `${DEVICON_BASE}/mysql/mysql-original.svg`,
  JS: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  jQ: `${DEVICON_BASE}/jquery/jquery-original.svg`,
  "<>": `${DEVICON_BASE}/html5/html5-original.svg`,
  "{}": `${DEVICON_BASE}/css3/css3-original.svg`,
  Git: `${DEVICON_BASE}/git/git-original.svg`,
  GH: `${DEVICON_BASE}/github/github-original.svg`,
  J: `${DEVICON_BASE}/jira/jira-original.svg`,
  Linux: `${DEVICON_BASE}/linux/linux-original.svg`,
  U: `${DEVICON_BASE}/ubuntu/ubuntu-original.svg`,
  N: `${DEVICON_BASE}/nginx/nginx-original.svg`,
  cP: `${DEVICON_BASE}/cpanel/cpanel-original.svg`,
  D: `${DEVICON_BASE}/docker/docker-original.svg`,
  DO: `${DEVICON_BASE}/digitalocean/digitalocean-original.svg`,
  Py: `${DEVICON_BASE}/python/python-original.svg`,
  SP: `${DEVICON_BASE}/apachespark/apachespark-original.svg`,
  R: `${DEVICON_BASE}/r/r-original.svg`,
  MAT: `${DEVICON_BASE}/matlab/matlab-original.svg`,
  "⚛": `${DEVICON_BASE}/react/react-original.svg`,
  "N.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  Node: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  Ex: `${DEVICON_BASE}/express/express-original.svg`,
  M: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
};

const conceptIcons: Record<string, UiIconName> = {
  API: "network",
  MVC: "layers",
  OOP: "braces",
  ZK: "fingerprint",
  DS: "chart",
  ML: "brain",
  NN: "network",
  DL: "brain",
  NLP: "quote",
  BIO: "dna",
};

function TechnologyIcon({ technology }: { technology: TechnologyItem }) {
  const brandIcon = brandIcons[technology.mark];
  if (brandIcon) {
    return (
      <span
        className="tech-marquee__brand-icon"
        aria-hidden="true"
        style={{ backgroundImage: `url(${brandIcon})` } as CSSProperties}
      />
    );
  }

  return (
    <span className="tech-marquee__concept-icon" aria-hidden="true">
      <UiIcon className="ui-icon" name={conceptIcons[technology.mark] ?? "code"} />
    </span>
  );
}

export function TechnologyMarquee({ technologies, ariaLabel }: TechnologyMarqueeProps) {
  if (technologies.length === 0) return null;

  const repeated = [...technologies, ...technologies];

  return (
    <div className="tech-marquee" aria-label={ariaLabel}>
      <div className="tech-marquee__viewport">
        <div className="tech-marquee__track">
          {repeated.map((technology, index) => {
            const duplicate = index >= technologies.length;
            return (
              <div
                className={`tech-marquee__item${technology.status === "learning" ? " is-learning" : ""}`}
                key={`${technology.name}-${index}`}
                aria-hidden={duplicate ? "true" : undefined}
              >
                <TechnologyIcon technology={technology} />
                <span className="tech-marquee__name">{technology.name}</span>
                {technology.statusLabel ? <small>{technology.statusLabel}</small> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

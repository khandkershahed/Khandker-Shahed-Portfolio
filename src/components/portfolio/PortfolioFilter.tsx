"use client";

import Image from "next/image";
import { useState } from "react";
import type { PortfolioFilter as Filter, ProjectItem } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { UiIcon } from "@/components/common/UiIcon";

interface PortfolioFilterProps {
  filters: Filter[];
  projects: ProjectItem[];
  locale: Locale;
}

export function PortfolioFilter({ filters, projects, locale }: PortfolioFilterProps) {
  const [active, setActive] = useState(filters[0]?.key ?? "all");
  const visibleProjects = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <div className="portfolio-filters" aria-label={locale === "it" ? "Filtri dei progetti" : "Project filters"}>
        {filters.map((filter) => (
          <button
            className={filter.key === active ? "active" : ""}
            type="button"
            key={filter.key}
            onClick={() => setActive(filter.key)}
            aria-pressed={filter.key === active}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {visibleProjects.map((project) => (
          <a className="portfolio-item" href={project.url} target="_blank" rel="noopener noreferrer" key={project.name}>
            <div className="portfolio-item__media">
              <Image src={project.image} alt={project.alt} width={800} height={500} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              <span className="portfolio-item__external" aria-hidden="true"><UiIcon className="ui-icon" name="external" /></span>
            </div>
            <div className="portfolio-item__body">
              <span className="portfolio-item__category">{project.categoryLabel}</span>
              <h3>{project.name}</h3>
              {project.description ? <p>{project.description}</p> : null}
              {project.stack?.length ? (
                <div className="portfolio-item__tags">
                  {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

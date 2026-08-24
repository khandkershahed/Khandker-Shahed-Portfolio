"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { UiIcon } from "@/components/common/UiIcon";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  locale: Locale;
}

export function TestimonialCarousel({ testimonials, locale }: TestimonialCarouselProps) {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(max-width: 1100px)");

    const update = () => {
      if (mobile.matches) setItemsPerView(1);
      else if (tablet.matches) setItemsPerView(2);
      else setItemsPerView(3);
    };

    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);

    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, testimonials.length - itemsPerView),
    [itemsPerView, testimonials.length]
  );

  const safeActiveIndex = Math.min(activeIndex, maxIndex);

  // useEffect(() => {
  //   setActiveIndex((current) => Math.min(current, maxIndex));
  // }, [maxIndex]);


  useEffect(() => {
    if (maxIndex === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 6500);

    return () => window.clearInterval(timer);
  }, [maxIndex]);

  if (testimonials.length === 0) return null;

  const step = 100 / itemsPerView;

  return (
    <div className="testimonial-carousel" aria-roledescription="carousel" aria-label={locale === "it" ? "Testimonianze" : "Testimonials"}>
      <div className="testimonial-viewport">
        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${safeActiveIndex * step}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <article
              className="testimonial-card"
              key={`${testimonial.author}-${testimonial.role}`}
              style={{ flexBasis: `${step}%` }}
              aria-hidden={index < safeActiveIndex || index >= safeActiveIndex + itemsPerView}
            >
              <div className="testimonial-card__inner">
                <div className="testimonial-card__quote" aria-hidden="true">
                  <UiIcon className="ui-icon" name="quote" />
                </div>

                <p>{testimonial.quote}</p>

                <div className="testimonial-card__author">
                  <Image
                    className="author-image"
                    src={testimonial.image}
                    alt={`${testimonial.author} portrait`}
                    width={64}
                    height={64}
                  />
                  <div>
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {maxIndex > 0 ? (
        <div className="testimonial-pagination" aria-label={locale === "it" ? "Navigazione testimonianze" : "Testimonial navigation"}>
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={`testimonial-dot-${index}`}
              className={index === safeActiveIndex ? "is-active" : ""}
              type="button"
              aria-label={`${locale === "it" ? "Mostra testimonianza" : "Show testimonial"} ${index + 1}`}
              aria-current={index === safeActiveIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

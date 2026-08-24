"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

interface Particle {
  id: number;
  text: string;
  left: number;
  top: number;
  destX: number;
  destY: number;
  destZ: number;
  duration: number;
  fontSize: number;
  opacity: number;
  kind: "binary" | "code";
}

type AmbientStyle = CSSProperties & {
  "--lingo-row": number;
};

type ParticleStyle = CSSProperties & {
  "--lingo-dest-x": string;
  "--lingo-dest-y": string;
  "--lingo-dest-z": string;
  "--lingo-duration": string;
  "--lingo-opacity": string;
};

const codePhrases = [
  "Laravel",
  "PHP",
  "MySQL",
  "REST API",
  "JavaScript",
  "React",
  "Next.js",
  "Git",
  "Linux",
  "NGINX",
  "Docker",
  "MVC",
  "OOP",
  "SEO",
  "Backend",
  "Full-Stack",
  "Deployment",
  "Performance",
  "Security",
  "E-commerce",
  "SaaS",
  "Debugging",
  "Testing",
  "Jira",
  "API",
  "Database",
  "Component()",
  "useState()",
  "App Router",
  "0",
  "1",
];

const ambientRows = [
  "10110010 00101101 11001010 01010110 10100101 00110110 11001001 01001101 10110100",
  "01001101 10110110 00101011 11010100 01011010 10100110 00110101 11001010 01010101",
  "11010010 01001101 10101001 00110110 11001010 01010101 10110010 00101101 11001010",
];

const MAX_PARTICLES = 44;
const INITIAL_PARTICLES = 18;
const SPAWN_INTERVAL = 620;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomBinary(length: number) {
  return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
}

function createParticle(id: number): Particle {
  const left = randomBetween(2, 98);
  const top = randomBetween(2, 98);
  const horizontalDirection = left < 50 ? -1 : 1;
  const verticalDirection = top < 50 ? -1 : 1;
  const kind: Particle["kind"] = Math.random() < 0.72 ? "binary" : "code";

  return {
    id,
    text: kind === "binary" ? randomBinary(Math.floor(randomBetween(10, 24))) : codePhrases[Math.floor(Math.random() * codePhrases.length)],
    left,
    top,
    destX: horizontalDirection * randomBetween(90, 300),
    destY: verticalDirection * randomBetween(75, 250),
    destZ: randomBetween(150, 560),
    duration: randomBetween(10.5, 15.5),
    fontSize: kind === "binary" ? randomBetween(10, 15) : randomBetween(11, 17),
    opacity: kind === "binary" ? randomBetween(0.34, 0.62) : randomBetween(0.24, 0.46),
    kind,
  };
}

export function BackgroundLingo() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const initial = Array.from({ length: INITIAL_PARTICLES }, () => createParticle(nextId.current++));
    setParticles(initial);

    const timer = window.setInterval(() => {
      setParticles((current) => {
        const next = [...current, createParticle(nextId.current++)];
        return next.slice(-MAX_PARTICLES);
      });
    }, SPAWN_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="lingo-layer" aria-hidden="true">
      <div className="lingo-ambient">
        {ambientRows.map((row, index) => (
          <span key={row} style={{ "--lingo-row": index } as AmbientStyle}>{row}</span>
        ))}
      </div>

      {particles.map((particle) => (
        <span
          className={`lingo-particle lingo-particle--${particle.kind}`}
          key={particle.id}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            fontSize: `${particle.fontSize}px`,
            "--lingo-dest-x": `${particle.destX}px`,
            "--lingo-dest-y": `${particle.destY}px`,
            "--lingo-dest-z": `${particle.destZ}px`,
            "--lingo-duration": `${particle.duration}s`,
            "--lingo-opacity": `${particle.opacity}`,
          } as ParticleStyle}
          onAnimationEnd={() => {
            setParticles((current) => current.filter((item) => item.id !== particle.id));
          }}
        >
          {particle.text}
        </span>
      ))}
    </div>
  );
}

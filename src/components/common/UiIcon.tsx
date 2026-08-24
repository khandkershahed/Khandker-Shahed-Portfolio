import type { SVGProps } from "react";

export type UiIconName =
  | "facebook"
  | "linkedin"
  | "github"
  | "whatsapp"
  | "email"
  | "location"
  | "globe"
  | "sun"
  | "moon"
  | "code"
  | "laptop"
  | "database"
  | "react"
  | "server"
  | "web"
  | "quote"
  | "briefcase"
  | "graduation"
  | "certificate"
  | "arrow-right"
  | "arrow-left"
  | "check"
  | "layers"
  | "network"
  | "fingerprint"
  | "chart"
  | "brain"
  | "dna"
  | "braces"
  | "external";

interface UiIconProps extends SVGProps<SVGSVGElement> {
  name: UiIconName;
}

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function UiIcon({ name, ...props }: UiIconProps) {
  if (name === "facebook") {
    return <svg {...common} {...props}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3.5l.5-4H13V9c0-.7.3-1 1-1Z" fill="currentColor" stroke="none" /></svg>;
  }
  if (name === "linkedin") {
    return <svg {...common} {...props}><path fill="currentColor" stroke="none" d="M5.1 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM3.6 8.5h3V20h-3V8.5Zm5 0h2.9v1.6h.1c.4-.8 1.4-2 3.8-2 4 0 4.7 2.6 4.7 6V20h-3v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V20h-3V8.5Z" /></svg>;
  }
  if (name === "github") {
    return <svg {...common} {...props}><path fill="currentColor" stroke="none" d="M12 2.4a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 3 .8.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2V21c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.4Z" /></svg>;
  }
  if (name === "whatsapp") {
    return <svg {...common} {...props}><path d="M20.5 11.7A8.5 8.5 0 0 1 8 19.2L3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="M8.2 7.8c.4 3 2.6 5.2 5.6 6 .7.2 1.7-1 1.8-1.5.1-.4-1.7-1.2-2-1.2-.3 0-.7.8-.9.9-.2.1-1.3-.5-2-1.2-.7-.7-1.3-1.8-1.2-2 .1-.2.8-.6.9-.9 0-.3-.8-2.1-1.2-2-.5.1-1.2 1.1-1 1.9Z" /></svg>;
  }
  if (name === "email") return <svg {...common} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === "location") return <svg {...common} {...props}><path d="M12 21s6-5 6-11a6 6 0 1 0-12 0c0 6 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></svg>;
  if (name === "globe") return <svg {...common} {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  if (name === "sun") return <svg {...common} {...props}><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
  if (name === "moon") return <svg {...common} {...props}><path d="M20 15.7A8.4 8.4 0 0 1 8.3 4 8.5 8.5 0 1 0 20 15.7Z" /></svg>;
  if (name === "code") return <svg {...common} {...props}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>;
  if (name === "laptop") return <svg {...common} {...props}><rect x="5" y="4" width="14" height="11" rx="1.5" /><path d="M3 19h18M9 8l-2 2 2 2M15 8l2 2-2 2" /></svg>;
  if (name === "database") return <svg {...common} {...props}><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>;
  if (name === "react") return <svg {...common} {...props}><circle cx="12" cy="12" r="1.6" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="3.4" /><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)" /></svg>;
  if (name === "server") return <svg {...common} {...props}><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5" /></svg>;
  if (name === "web") return <svg {...common} {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M7 6h.01M10 6h.01" /></svg>;
  if (name === "quote") return <svg {...common} {...props}><path d="M9 11H5a5 5 0 0 1 5-5v8a4 4 0 0 1-4 4M19 11h-4a5 5 0 0 1 5-5v8a4 4 0 0 1-4 4" /></svg>;
  if (name === "briefcase") return <svg {...common} {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2" /></svg>;
  if (name === "graduation") return <svg {...common} {...props}><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 11.5V16c2.7 2 7.3 2 10 0v-4.5M21 9v6" /></svg>;
  if (name === "certificate") return <svg {...common} {...props}><circle cx="12" cy="10" r="5" /><path d="m9 14-1 7 4-2 4 2-1-7" /><path d="m10.5 10 1 1 2-2" /></svg>;
  if (name === "arrow-right") return <svg {...common} {...props}><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
  if (name === "arrow-left") return <svg {...common} {...props}><path d="M19 12H5M10 7l-5 5 5 5" /></svg>;
  if (name === "check") return <svg {...common} {...props}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === "layers") return <svg {...common} {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
  if (name === "network") return <svg {...common} {...props}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="m10.7 7.2-4.4 8.5M13.3 7.2l4.4 8.5M7.5 18h9" /></svg>;
  if (name === "fingerprint") return <svg {...common} {...props}><path d="M8 8.6a5.5 5.5 0 0 1 8.8 4.4c0 3.9-1.1 6.8-2.5 8M6.2 12.7A5.8 5.8 0 0 1 12 7a5.8 5.8 0 0 1 5.8 5.8c0 2.7-.5 5.2-1.5 7.2M4 13a8 8 0 0 1 16 0M8.8 12.8A3.2 3.2 0 0 1 12 9.6a3.2 3.2 0 0 1 3.2 3.2c0 3.2-.7 5.7-1.6 7.7M11.9 12.8c0 3.6-.4 6.4-1.4 8.2M6.7 17.3c.1 1.4-.1 2.6-.5 3.7" /></svg>;
  if (name === "chart") return <svg {...common} {...props}><path d="M4 19V5M4 19h16" /><path d="m7 15 3-4 3 2 4-6" /><circle cx="7" cy="15" r=".8" fill="currentColor" /><circle cx="10" cy="11" r=".8" fill="currentColor" /><circle cx="13" cy="13" r=".8" fill="currentColor" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></svg>;
  if (name === "brain") return <svg {...common} {...props}><path d="M9.5 4.5A3 3 0 0 0 5 7v.4A3.4 3.4 0 0 0 4 14a3 3 0 0 0 3 3 3 3 0 0 0 5 2.2V5.8a3 3 0 0 0-2.5-1.3ZM14.5 4.5A3 3 0 0 1 19 7v.4a3.4 3.4 0 0 1 1 6.6 3 3 0 0 1-3 3 3 3 0 0 1-5 2.2V5.8a3 3 0 0 1 2.5-1.3Z" /><path d="M8 9c1.3 0 2.3.7 2.8 1.8M16 9c-1.3 0-2.3.7-2.8 1.8M8 15c1.1 0 2 .5 2.6 1.3M16 15c-1.1 0-2 .5-2.6 1.3" /></svg>;
  if (name === "dna") return <svg {...common} {...props}><path d="M7 3c5 3 5 15 10 18M17 3C12 6 12 18 7 21M8.5 6h7M7.5 10h9M7.5 14h9M8.5 18h7" /></svg>;
  if (name === "braces") return <svg {...common} {...props}><path d="M9 4H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2M15 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2" /></svg>;
  return <svg {...common} {...props}><path d="M9 5h10v10M19 5 9 15" /><path d="M15 11v8H5V9h8" /></svg>;
}

export function iconNameFromLegacyClass(iconClass: string): UiIconName {
  if (iconClass.includes("facebook")) return "facebook";
  if (iconClass.includes("linkedin")) return "linkedin";
  if (iconClass.includes("github")) return "github";
  if (iconClass.includes("whatsapp")) return "whatsapp";
  if (iconClass.includes("envelope")) return "email";
  if (iconClass.includes("location")) return "location";
  if (iconClass.includes("globe")) return "globe";
  if (iconClass.includes("react")) return "react";
  if (iconClass.includes("database")) return "database";
  if (iconClass.includes("server")) return "server";
  if (iconClass.includes("briefcase")) return "briefcase";
  if (iconClass.includes("laptop")) return "laptop";
  if (iconClass.includes("web-development")) return "web";
  return "code";
}

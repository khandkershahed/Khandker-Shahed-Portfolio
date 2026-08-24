
import type { SiteContent } from "@/data/types";

interface FooterProps {
  content: SiteContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="copyright">
            <p>
              Copyright {new Date().getFullYear()} - {content.footer.copyright} &copy; {content.profile.name}
            </p>
          </div>
          <ul className="social">
            {content.profile.socials.map((social) => (
              <li key={social.label}>
                <a target="_blank" rel="noopener noreferrer" href={social.url}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { LocaleRedirect } from "@/components/controls/LocaleRedirect";

export default function RootPage() {
  return (
    <main className="locale-entry-page">
      <LocaleRedirect />
      <div className="locale-entry-card">
        <h1>Khandker Shahed</h1>
        <p>Choose a language while I detect the best regional default.</p>
        <div className="locale-entry-links">
          <Link href="/en/">English</Link>
          <Link href="/it/">Italiano</Link>
        </div>
      </div>
    </main>
  );
}

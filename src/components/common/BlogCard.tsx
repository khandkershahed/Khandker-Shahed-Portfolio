import Link from "next/link";
import type { BlogPost } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { UiIcon } from "@/components/common/UiIcon";

interface BlogCardProps {
  locale: Locale;
  post: BlogPost;
  readArticle: string;
  articleLabel: string;
}

export function BlogCard({ locale, post, readArticle, articleLabel }: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card__topline">
        <span className="blog-card__category">{post.category}</span>
        <span className="blog-card__status">{articleLabel}</span>
      </div>

      <Link className="blog-title" href={`/${locale}/blog/${post.slug}/`}>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
      </Link>

      <div className="blog-card__tags" aria-label={locale === "it" ? "Argomenti dell’articolo" : "Article topics"}>
        {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <div className="blog-card__footer">
        <span>{post.published} · {post.readTime}</span>
        <Link href={`/${locale}/blog/${post.slug}/`}>
          {readArticle}
          <UiIcon className="ui-icon" name="arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

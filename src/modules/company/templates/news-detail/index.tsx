import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { formatDate, type NewsArticle } from "../../data/news"
import styles from "./article.module.css"

export default function NewsDetailTemplate({ article }: { article: NewsArticle }) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12" data-testid="company-news-detail">
      <div className="max-w-3xl mx-auto">
        <LocalizedClientLink
          href="/company/news"
          className="inline-block text-small-regular text-ui-fg-subtle hover:text-ui-fg-base underline"
        >
          ← Back to News
        </LocalizedClientLink>

        {article.urlToImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-auto max-h-[400px] object-cover rounded-lg mt-6"
          />
        )}

        <h1 className="text-2xl-semi small:text-3xl-semi mt-6">{article.title}</h1>
        <p className="text-small-regular text-ui-fg-muted mt-3">
          {formatDate(article.publishedAt)} · by {article.author}
        </p>

        <div
          className={`${styles.body} mt-6`}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-10 pt-6 border-t border-ui-border-base flex flex-wrap items-center gap-4">
          <LocalizedClientLink
            href="/company/news"
            className="rounded-full border border-ui-fg-base px-5 py-2 text-small-regular hover:bg-ui-fg-base hover:text-white transition-colors"
          >
            All news
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="text-small-regular text-ui-fg-subtle hover:text-ui-fg-base underline"
          >
            Browse products
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { formatDate, NEWS_ARTICLES } from "../../data/news"

export default function NewsListTemplate() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 small:px-6 py-12 small:py-16" data-testid="company-news-list">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl-semi">Industry News</h1>
          <p className="text-small-regular text-ui-fg-subtle mt-2 max-w-2xl">
            ABB, Schneider Electric, Siemens, automation and electrical
            equipment updates from Toastduck.
          </p>
        </div>
        <LocalizedClientLink
          href="/company/home"
          className="text-small-regular text-ui-fg-subtle hover:text-ui-fg-base underline whitespace-nowrap"
        >
          ← Back to company
        </LocalizedClientLink>
      </div>

      <div className="mt-8 divide-y divide-ui-border-base border-y border-ui-border-base">
        {NEWS_ARTICLES.map((article) => (
          <LocalizedClientLink
            key={article.url}
            href={`/company/news/${article.url}`}
            className="group flex flex-col xsmall:flex-row gap-4 xsmall:gap-6 py-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full xsmall:w-[200px] h-[150px] object-cover rounded-lg flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1">
              <p className="text-small-regular text-ui-fg-muted">
                {formatDate(article.publishedAt)} · by {article.author}
              </p>
              <h2 className="text-large-semi text-ui-fg-base mt-1 group-hover:underline">
                {article.title}
              </h2>
              <p className="text-small-regular text-ui-fg-subtle mt-2 leading-relaxed">
                {article.description}
              </p>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

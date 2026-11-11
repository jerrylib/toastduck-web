import { Metadata } from "next"
import { notFound } from "next/navigation"

import NewsDetailTemplate from "@modules/company/templates/news-detail"
import { getArticle, NEWS_ARTICLES } from "@modules/company/data/news"
import { getCanonicalUrl, getHreflangAlternates } from "@lib/util/seo"

type Props = {
  params: Promise<{ countryCode: string; id: string }>
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ id: article.url }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = getArticle(id)

  if (!article) {
    return { title: "News Detail | Toastduck" }
  }

  const path = `/company/news/${article.url}`
  const canonicalUrl = getCanonicalUrl(path)
  const alternates = await getHreflangAlternates(path)

  return {
    title: `${article.title} | Toastduck`,
    description: article.description,
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.title,
      description: article.description,
      images: article.urlToImage ? [article.urlToImage] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
  }
}

export default async function CompanyNewsDetailPage({ params }: Props) {
  const { id } = await params
  const article = getArticle(id)

  if (!article) {
    notFound()
  }

  return <NewsDetailTemplate article={article} />
}

import { Metadata } from "next"

import NewsListTemplate from "@modules/company/templates/news-list"
import { getCanonicalUrl, getHreflangAlternates } from "@lib/util/seo"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  const canonicalUrl = getCanonicalUrl("/company/news")
  const alternates = await getHreflangAlternates("/company/news")

  return {
    title: "Industry News - ABB & Schneider Electric | Toastduck",
    description:
      "Stay updated with the latest industry news on ABB, Schneider Electric, Siemens, automation, and electrical equipment from Toastduck.",
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: "Industry News - ABB & Schneider Electric | Toastduck",
      description:
        "Stay updated with the latest industry news on ABB, Schneider Electric, Siemens, automation, and electrical equipment.",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
  }
}

export default async function CompanyNewsPage(_props: Props) {
  return <NewsListTemplate />
}

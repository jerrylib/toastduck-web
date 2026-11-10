import { Metadata } from "next"

import CompanyHomeTemplate from "@modules/company/templates/home"
import { getCanonicalUrl, getHreflangAlternates } from "@lib/util/seo"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  const canonicalUrl = getCanonicalUrl("/company/home")
  const alternates = await getHreflangAlternates("/company/home")

  return {
    title:
      "Toastduck International – Import & Export International Business in Hong Kong",
    description:
      "Toastduck International Business Co., Limited is a Hong Kong-based international business specializing in e-commerce products, electronic components, hardware, clothing, footwear, bags, and sports equipment. Serving global clients.",
    keywords: [
      "Toastduck International",
      "ABB Schneider Electric exporter",
      "Hong Kong import export",
      "electrical components distributor",
    ],
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title:
        "Toastduck International – Import & Export International Business in Hong Kong",
      description:
        "Hong Kong-based international business specializing in e-commerce, electronics, hardware, clothing, and sports equipment.",
      images: ["https://images.toastduck.com/toastduck_banner_3x_black.png"],
      siteName: "Toastduck International",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
  }
}

export default async function CompanyHomePage(_props: Props) {
  return <CompanyHomeTemplate />
}

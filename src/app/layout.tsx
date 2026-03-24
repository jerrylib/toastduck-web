import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Toast Duck Store - Professional Power Distribution Components",
    template: "%s | Toast Duck Store",
  },
  description: "Professional supplier of Schneider, ABB miniature circuit breakers MCB and power distribution components. CE/UL certified, EU shipping, bulk pricing.",
  keywords: ["circuit breaker", "MCB", "Schneider", "ABB", "power distribution", "electrical components", "EU certified", "wholesale electrical"],
  authors: [{ name: "Toastduck International Business Co., Limited" }],
  creator: "Toast Duck",
  publisher: "Toast Duck Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_TW",
    url: "https://www.toastduck.com",
    siteName: "Toast Duck Store",
    title: "Toast Duck Store - Professional Power Distribution Components | Schneider / ABB",
    description: "Professional supplier of Schneider, ABB miniature circuit breakers MCB and power distribution components. CE/UL certified, EU shipping, bulk pricing.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Toast Duck Store - Professional Power Distribution Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toast Duck Store - Professional Power Distribution Components",
    description: "Professional supplier of Schneider, ABB miniature circuit breakers MCB and power distribution components. CE/UL certified, EU shipping.",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Toastduck International Business Co., Limited",
    alternateName: "多士達國際商務有限公司",
    url: "https://www.toastduck.com",
    logo: "https://www.toastduck.com/logo.png",
    description: "Professional supplier of Schneider, ABB miniature circuit breakers MCB and power distribution components. CE/UL certified, EU shipping, bulk pricing.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Chinese", "Danish"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "HK",
      addressLocality: "Hong Kong",
    },
  }

  return (
    <html lang="en" data-mode="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}

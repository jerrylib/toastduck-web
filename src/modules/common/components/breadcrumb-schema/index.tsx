import { getBaseURL } from "@lib/util/env"

type BreadcrumbItem = {
  name: string
  url?: string
}

export default function BreadcrumbSchema({
  items,
  countryCode,
}: {
  items: BreadcrumbItem[]
  countryCode: string
}) {
  const baseUrl = getBaseURL()

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/${countryCode}`,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        ...(item.url ? { item: `${baseUrl}/${countryCode}${item.url}` } : {}),
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  )
}

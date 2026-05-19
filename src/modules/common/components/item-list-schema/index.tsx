import { getBaseURL } from "@lib/util/env"

type ItemListProduct = {
  title?: string
  handle?: string
  thumbnail?: string | null
}

export default function ItemListSchema({
  items,
  listName,
  countryCode,
}: {
  items: ItemListProduct[]
  listName: string
  countryCode: string
}) {
  const baseUrl = getBaseURL()

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 30).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/${countryCode}/products/${item.handle}`,
      name: item.title,
      ...(item.thumbnail ? { image: item.thumbnail } : {}),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

import { HttpTypes } from "@medusajs/types"
import { getBaseURL } from "@lib/util/env"

export default function ProductSchema({ 
  product, 
  region, 
  countryCode 
}: { 
  product: HttpTypes.StoreProduct, 
  region: HttpTypes.StoreRegion,
  countryCode: string
}) {
  const baseUrl = getBaseURL()
  const price = product.variants?.[0]?.prices?.[0]
  
  const isSecondHand = product.tags?.some((tag) => tag.value === "second-hand")

  const schema: Record<string, any> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images?.map(img => img.url) || [product.thumbnail],
    "description": product.description || product.subtitle,
    "sku": product.variants?.[0]?.sku,
    "mpn": product.variants?.[0]?.sku || product.metadata?.mpn,
    "brand": {
      "@type": "Brand",
      "name": product.metadata?.brand || "Toast Duck"
    },
    "itemCondition": isSecondHand
      ? "https://schema.org/UsedCondition"
      : "https://schema.org/NewCondition",
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${countryCode}/products/${product.handle}`,
      "priceCurrency": price?.currency_code?.toUpperCase(),
      "price": price?.amount ? price.amount / 100 : 0,
      "availability": product.variants?.some(v => v.inventory_quantity && v.inventory_quantity > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": isSecondHand
        ? "https://schema.org/UsedCondition"
        : "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Toast Duck Store"
      }
    }
  }

  if (product.metadata?.gtin) {
    schema.gtin = product.metadata.gtin
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

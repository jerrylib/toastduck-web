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
  
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images?.map(img => img.url) || [product.thumbnail],
    "description": product.description || product.subtitle,
    "sku": product.variants?.[0]?.sku,
    "brand": {
      "@type": "Brand",
      "name": product.metadata?.brand || "Toast Duck"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${countryCode}/products/${product.handle}`,
      "priceCurrency": price?.currency_code?.toUpperCase(),
      "price": price?.amount ? price.amount / 100 : 0,
      "availability": product.variants?.[0]?.inventory_quantity && product.variants[0].inventory_quantity > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/InStock", // Default to InStock for commerce if not specified
      "seller": {
        "@type": "Organization",
        "name": "Toast Duck Store"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

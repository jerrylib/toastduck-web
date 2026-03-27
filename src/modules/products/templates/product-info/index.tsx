import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // 生成 Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.subtitle || "",
    image: product.thumbnail || (product.images && product.images[0]?.url) || "",
    brand: {
      "@type": "Brand",
      name: product.collection?.title || "Toast Duck Store",
    },
    offers: product.variants?.[0] ? {
      "@type": "Offer",
      price: product.variants[0].prices?.[0]
        ? (product.variants[0].prices[0].amount / 100).toFixed(2)
        : "0",
      priceCurrency: product.variants[0].prices?.[0]?.currency || "USD",
      availability: product.variants[0].inventory_quantity && product.variants[0].inventory_quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: typeof window !== "undefined" ? window.location.href : "",
    } : undefined,
  }

  return (
    <div id="product-info">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h1"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo

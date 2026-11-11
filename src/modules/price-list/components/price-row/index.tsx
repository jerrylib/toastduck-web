import { HttpTypes } from "@medusajs/types"

import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CopyTitleButton from "@modules/price-list/components/copy-title-button"
import PriceThumbnail from "@modules/price-list/components/price-thumbnail"
import { isProductInStock } from "@modules/price-list/utils/product-stock"

type CheapestPrice = {
  amount: number
  hasMultiplePrices: boolean
}

const getCheapestCnyPrice = (
  product: HttpTypes.StoreProduct
): CheapestPrice | null => {
  const pricedVariants = ((product.variants ?? []) as any[]).filter(
    (variant) =>
      variant?.calculated_price?.currency_code === "cny" &&
      typeof variant?.calculated_price?.calculated_amount === "number"
  )

  if (!pricedVariants.length) {
    return null
  }

  const amounts = pricedVariants.map(
    (variant) => variant.calculated_price.calculated_amount as number
  )

  return {
    amount: Math.min(...amounts),
    hasMultiplePrices: pricedVariants.length > 1,
  }
}

const formatCny = (amount: number) =>
  convertToLocale({
    amount,
    currency_code: "cny",
    locale: "zh-CN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export default function PriceRow({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const cheapestPrice = getCheapestCnyPrice(product)
  const thumbnail = product.thumbnail || product.images?.[0]?.url
  const inStock = isProductInStock(product)

  return (
    <li
      className="py-4 flex items-start gap-x-4 small:gap-x-6"
      data-testid="price-list-row"
    >
      <div className="relative w-16 small:w-20 shrink-0 aspect-[3/4] overflow-hidden rounded-lg bg-white border border-ui-border-base">
        <PriceThumbnail src={thumbnail} alt={product.title} />
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-y-2 small:grid small:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] small:items-baseline small:gap-x-8">
        <div className="min-w-0">
          <div className="flex items-center gap-x-2">
            <LocalizedClientLink
              href={`/products/${product.handle}`}
              className="text-base-semi hover:underline"
            >
              {product.title}
            </LocalizedClientLink>
            {product.title && <CopyTitleButton text={product.title} />}
          </div>
        </div>
        <div className="min-w-0">
          {product.description && (
            <p className="text-small-regular text-ui-fg-subtle whitespace-pre-line">
              {product.description}
            </p>
          )}
        </div>
        <div className="min-w-0 small:text-right">
          {cheapestPrice ? (
            <span
              className="text-base-semi whitespace-nowrap"
              data-testid="price-list-price"
            >
              {cheapestPrice.hasMultiplePrices && (
                <span className="text-ui-fg-subtle mr-1">From</span>
              )}
              {formatCny(cheapestPrice.amount)}
            </span>
          ) : (
            <span
              className="text-small-regular text-ui-fg-subtle"
              data-testid="price-list-no-price"
            >
              No price available for now
            </span>
          )}
          {!inStock && (
            <div className="text-small-regular mt-1">
              <span className="text-red-600" data-testid="price-list-stock">
                Out of stock
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

"use client"

import { useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { trackViewItem } from "@lib/analytics"

type ProductAnalyticsProps = {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
}

export default function ProductAnalytics({
  product,
  region,
}: ProductAnalyticsProps) {
  useEffect(() => {
    // Track view_item when product page loads
    trackViewItem(product, product.variants?.[0], region)
  }, [product, region])

  return null
}

"use client"

import { useEffect, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import { trackPurchase } from "@lib/analytics"

type PurchaseAnalyticsProps = {
  order: HttpTypes.StoreOrder
  region?: HttpTypes.StoreRegion
}

export default function PurchaseAnalytics({
  order,
  region,
}: PurchaseAnalyticsProps) {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Track purchase only once
    if (!hasTracked.current && order && order.id) {
      trackPurchase(order, region)
      hasTracked.current = true
    }
  }, [order, region])

  return null
}

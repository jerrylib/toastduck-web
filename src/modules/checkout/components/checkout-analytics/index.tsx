"use client"

import { useEffect, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import { trackBeginCheckout } from "@lib/analytics"

type CheckoutAnalyticsProps = {
  cart: HttpTypes.StoreCart
  region?: HttpTypes.StoreRegion
}

export default function CheckoutAnalytics({
  cart,
  region,
}: CheckoutAnalyticsProps) {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Track begin_checkout only once when the checkout page loads
    if (!hasTracked.current && cart && cart.items && cart.items.length > 0) {
      trackBeginCheckout(cart, region)
      hasTracked.current = true
    }
  }, [cart, region])

  return null
}

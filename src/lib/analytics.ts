"use client"

import { GA_MEASUREMENT_ID } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Check if GA is available
const isGAEnabled = () => {
  return typeof window !== "undefined" && typeof window.gtag === "function" && GA_MEASUREMENT_ID
}

// Get currency code from region
const getCurrency = (region?: HttpTypes.StoreRegion): string => {
  return region?.currency_code?.toUpperCase() || "USD"
}

// Format price to cents
const formatPrice = (amount?: number, currency?: string): number => {
  return Math.round(amount || 0)
}

// Track view_item event
export const trackViewItem = (
  product: HttpTypes.StoreProduct,
  variant?: HttpTypes.StoreProductVariant,
  region?: HttpTypes.StoreRegion
) => {
  if (!isGAEnabled()) return

  const item = {
    item_id: product.id,
    item_name: product.title,
    item_variant: variant?.title || "",
    price: formatPrice(variant?.prices?.[0]?.amount),
    currency: getCurrency(region),
    quantity: 1,
  }

  window.gtag("event", "view_item", {
    currency: getCurrency(region),
    value: formatPrice(variant?.prices?.[0]?.amount) / 100,
    items: [item],
  })
}

// Track add_to_cart event
export const trackAddToCart = (
  product: HttpTypes.StoreProduct,
  variant: HttpTypes.StoreProductVariant,
  quantity: number = 1,
  region?: HttpTypes.StoreRegion
) => {
  if (!isGAEnabled()) return

  const item = {
    item_id: product.id,
    item_name: product.title,
    item_variant: variant.title || variant.id,
    price: formatPrice(variant.prices?.[0]?.amount),
    currency: getCurrency(region),
    quantity: quantity,
  }

  window.gtag("event", "add_to_cart", {
    currency: getCurrency(region),
    value: (formatPrice(variant.prices?.[0]?.amount) * quantity) / 100,
    items: [item],
  })
}

// Track begin_checkout event
export const trackBeginCheckout = (
  cart: HttpTypes.StoreCart,
  region?: HttpTypes.StoreRegion
) => {
  if (!isGAEnabled()) return

  const items = (cart.items || []).map((item) => ({
    item_id: item.product_id,
    item_name: item.product?.title || "",
    item_variant: item.variant?.title || "",
    price: formatPrice(item.unit_price),
    currency: getCurrency(region),
    quantity: item.quantity,
  }))

  window.gtag("event", "begin_checkout", {
    currency: getCurrency(region),
    value: (cart.total || 0) / 100,
    items: items,
  })
}

// Track purchase event
export const trackPurchase = (
  order: HttpTypes.StoreOrder,
  region?: HttpTypes.StoreRegion
) => {
  if (!isGAEnabled()) return

  const items = (order.items || []).map((item) => ({
    item_id: item.product_id,
    item_name: item.product?.title || "",
    item_variant: item.variant?.title || "",
    price: formatPrice(item.unit_price),
    currency: getCurrency(region),
    quantity: item.quantity,
  }))

  window.gtag("event", "purchase", {
    transaction_id: order.id,
    currency: getCurrency(region),
    value: (order.total || 0) / 100,
    tax: (order.tax_total || 0) / 100,
    shipping: (order.shipping_total || 0) / 100,
    items: items,
  })
}

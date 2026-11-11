import { HttpTypes } from "@medusajs/types"

/**
 * 判断商品是否有库存。
 * 未开启库存管理的变体视为可售；开启库存管理的变体需要有数量或允许缺货下单。
 * 库存数量未知（详情接口补数失败）时按可售处理，避免把有货商品误标成「无库存」。
 */
export const isProductInStock = (product: HttpTypes.StoreProduct) => {
  const variants = (product.variants ?? []) as any[]

  if (!variants.length) {
    return false
  }

  return variants.some((variant) => {
    if (!variant?.manage_inventory) {
      return true
    }

    if (typeof variant.inventory_quantity !== "number") {
      return true
    }

    return variant.inventory_quantity > 0 || variant.allow_backorder
  })
}

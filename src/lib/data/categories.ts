import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (
  query?: Record<string, any>,
  options: { revalidate?: number | false } = {}
) => {
  const baseCache = await getCacheOptions("categories")
  const next = {
    ...baseCache,
    tags: [...("tags" in baseCache ? baseCache.tags : []), "categories"],
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        // 默认强缓存；调用方可指定 revalidate 秒数或 false 跳过缓存
        ...(options.revalidate === false
          ? { cache: "no-store" as const }
          : options.revalidate
            ? { next: { ...next, revalidate: options.revalidate } }
            : { next, cache: "force-cache" as const }),
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])
}

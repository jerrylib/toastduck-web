"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
        cache: "force-cache",
      }
    )
    .then(({ collection }) => collection)
}

export const listCollections = async (
  queryParams: Record<string, string> = {},
  options: { revalidate?: number | false } = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const baseCache = await getCacheOptions("collections")
  const next = {
    ...baseCache,
    tags: [...("tags" in baseCache ? baseCache.tags : []), "collections"],
  }

  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      "/store/collections",
      {
        query: queryParams,
        // 默认强缓存；调用方可指定 revalidate 秒数或 false 跳过缓存
        ...(options.revalidate === false
          ? { cache: "no-store" as const }
          : options.revalidate
            ? { next: { ...next, revalidate: options.revalidate } }
            : { next, cache: "force-cache" as const }),
      }
    )
    .then(({ collections }) => ({ collections, count: collections.length }))
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: "*products" },
      next,
      cache: "force-cache",
    })
    .then(({ collections }) => collections[0])
}

import { MetadataRoute } from "next"
import { sdk } from "@lib/config"

const BASE_URL = "https://www.toastduck.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 使用 /us 作为根 URL（与实际访问路径一致）
  const defaultPages = [
    {
      url: `${BASE_URL}/us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  try {
    // Fetch regions to get available country codes
    const { regions } = await sdk.client.fetch<{ regions: any[] }>("/store/regions", {
      method: "GET",
      cache: "force-cache",
    })

    // Fetch products for dynamic URLs
    const { products } = await sdk.client.fetch<{ products: any[] }>("/store/products", {
      method: "GET",
      query: { limit: 100 },
      cache: "force-cache",
    })

    // Fetch collections
    const { collections } = await sdk.client.fetch<{ collections: any[] }>("/store/collections", {
      method: "GET",
      cache: "force-cache",
    })

    // Fetch product categories
    const { product_categories } = await sdk.client.fetch<{ product_categories: any[] }>("/store/product-categories", {
      method: "GET",
      cache: "force-cache",
      query: { limit: 100 },
    })

    const regionUrls: MetadataRoute.Sitemap = []

    // Generate URLs for each region
    for (const region of regions ?? []) {
      const countryCode = region.countries?.[0]?.iso_2?.toLowerCase() ?? "us"
      const regionBase = `${BASE_URL}/${countryCode}`

      // Store page per region
      regionUrls.push({
        url: `${regionBase}/store`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      })

      // Products
      for (const product of products ?? []) {
        regionUrls.push({
          url: `${regionBase}/products/${product.handle}`,
          lastModified: new Date(product.updated_at),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      // Collections
      for (const collection of collections ?? []) {
        regionUrls.push({
          url: `${regionBase}/collections/${collection.handle}`,
          lastModified: new Date(collection.updated_at),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      // Product Categories
      for (const category of product_categories ?? []) {
        regionUrls.push({
          url: `${regionBase}/categories/${category.handle}`,
          lastModified: new Date(category.updated_at || new Date()),
          changeFrequency: "weekly",
          priority: 0.6,
        })
      }
    }

    return [...defaultPages, ...regionUrls]
  } catch (error) {
    // Return basic sitemap if API fails
    return defaultPages
  }
}
import { MetadataRoute } from "next"
import { sdk } from "@lib/config"

const BASE_URL = "https://toastduck.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/store`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
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
    }

    return [...defaultPages, ...regionUrls]
  } catch (error) {
    // Return basic sitemap if API fails
    return defaultPages
  }
}
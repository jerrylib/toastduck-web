import { MetadataRoute } from "next"
import { sdk } from "@lib/config"
import { getBaseURL } from "@lib/util/env"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = getBaseURL()
  const defaultPages: MetadataRoute.Sitemap = []

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

    const allCountryCodes: string[] = []
    regions.forEach((region) => {
      region.countries?.forEach((c: any) => {
        if (c.iso_2) allCountryCodes.push(c.iso_2.toLowerCase())
      })
    })

    const regionUrls: MetadataRoute.Sitemap = []

    const getLanguages = (path: string) => {
      const languages: Record<string, string> = {}
      allCountryCodes.forEach((code) => {
        languages[code] = `${BASE_URL}/${code}${path}`
      })
      return languages
    }

    // Generate URLs for each country
    for (const countryCode of allCountryCodes) {
      const regionBase = `${BASE_URL}/${countryCode}`

      // Home page
      regionUrls.push({
        url: regionBase,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: countryCode === "us" ? 1 : 0.9,
        languages: getLanguages(""),
      })

      // Store page
      regionUrls.push({
        url: `${regionBase}/store`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
        languages: getLanguages("/store"),
      })

      // Products
      for (const product of products ?? []) {
        regionUrls.push({
          url: `${regionBase}/products/${product.handle}`,
          lastModified: new Date(product.updated_at),
          changeFrequency: "weekly",
          priority: 0.7,
          languages: getLanguages(`/products/${product.handle}`),
        })
      }

      // Collections
      for (const collection of collections ?? []) {
        regionUrls.push({
          url: `${regionBase}/collections/${collection.handle}`,
          lastModified: new Date(collection.updated_at),
          changeFrequency: "weekly",
          priority: 0.7,
          languages: getLanguages(`/collections/${collection.handle}`),
        })
      }

      // Product Categories
      for (const category of product_categories ?? []) {
        regionUrls.push({
          url: `${regionBase}/categories/${category.handle}`,
          lastModified: new Date(category.updated_at || new Date()),
          changeFrequency: "weekly",
          priority: 0.6,
          languages: getLanguages(`/categories/${category.handle}`),
        })
      }
    }

    return [...defaultPages, ...regionUrls]
  } catch (error) {
    return defaultPages
  }
}
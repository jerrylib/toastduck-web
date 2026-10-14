import { listRegions } from "@lib/data/regions"
import { getBaseURL } from "./env"

/**
 * Generates alternates for hreflang based on available regions.
 * @param path The path without the country code, e.g., "" for home, "/products/my-product"
 * @returns Alternates object for metadata
 */
export async function getHreflangAlternates(path: string) {
  const regions = await listRegions()
  const baseUrl = getBaseURL()
  
  if (!regions) return {}

  const languages: Record<string, string> = {}
  
  regions.forEach((region) => {
    region.countries?.forEach((country) => {
      const code = country.iso_2?.toLowerCase()
      if (code) {
        languages[code] = `${baseUrl}/${code}${path}`
      }
    })
  })

  // Add x-default (usually US or the most common region)
  languages["x-default"] = `${baseUrl}/us${path}`

  return {
    languages,
  }
}

/**
 * 生成 canonical URL：所有国家版本统一指向默认国家 us 的主版本，
 * 避免 Google Search Console 报"重复的网址"。
 * @param path 不含国家前缀的路径，如 ""、"/store"、"/products/my-product"
 * @returns canonical URL
 */
export const getCanonicalUrl = (path: string) => {
  return `${getBaseURL()}/us${path}`
}

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

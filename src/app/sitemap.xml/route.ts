import { sdk } from "@lib/config"
import { getBaseURL } from "@lib/util/env"

export const dynamic = "force-static"

async function getCountryCodes(): Promise<string[]> {
  try {
    const { regions } = await sdk.client.fetch<{ regions: any[] }>(
      "/store/regions",
      {
        method: "GET",
        cache: "force-cache",
      }
    )

    const codes: string[] = []
    regions?.forEach((region) => {
      region.countries?.forEach((c: any) => {
        if (c.iso_2) codes.push(c.iso_2.toLowerCase())
      })
    })

    return codes
  } catch (error) {
    console.error(
      `Failed to fetch regions for sitemap index: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

/**
 * Sitemap index：指向每个国家的子 sitemap，如 /sitemap.xml/us。
 * 产品 URL 只出现在默认国家（us）的子 sitemap 中，其余国家子 sitemap
 * 仅包含首页 / store / 集合 / 分类，避免 Google 索引重复产品页。
 */
export async function GET() {
  const BASE_URL = getBaseURL()
  const countryCodes = await getCountryCodes()

  const sitemaps = countryCodes
    .map(
      (cc) => `  <sitemap>
    <loc>${BASE_URL}/sitemap-${cc}.xml</loc>
  </sitemap>`
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}

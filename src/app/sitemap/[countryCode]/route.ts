import { sdk } from "@lib/config"
import { getBaseURL } from "@lib/util/env"

export const dynamic = "force-static"

const DEFAULT_COUNTRY = "cn"

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

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
      `Failed to fetch regions for sitemap: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

function buildUrlEntry(
  baseUrl: string,
  countryCode: string,
  path: string,
  allCountryCodes: string[],
  lastModified: Date,
  changeFrequency: string,
  priority: number
): string {
  const loc = `${baseUrl}/${countryCode}${path}`

  const hreflangLinks = allCountryCodes
    .map(
      (cc) =>
        `    <xhtml:link rel="alternate" hreflang="${cc}" href="${escapeXml(
          `${baseUrl}/${cc}${path}`
        )}"/>`
    )
    .join("\n")

  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
    `${baseUrl}/${DEFAULT_COUNTRY}${path}`
  )}"/>`

  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks}
${xDefault}
  </url>`
}

export async function generateStaticParams() {
  const countryCodes = await getCountryCodes()
  return countryCodes.map((countryCode) => ({ countryCode }))
}

/**
 * 每个国家的子 sitemap（内部路径 /sitemap/{cc}，对外由 rewrites
 * 映射为 /sitemap-{cc}.xml）。
 * - 默认国家（cn）：首页 / store / 全部产品 / 集合 / 分类
 * - 其他国家：首页 / store / 集合 / 分类（不含产品，产品 URL 只归 cn）
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ countryCode: string }> }
) {
  const { countryCode } = await params
  const BASE_URL = getBaseURL()
  const isDefault = countryCode === DEFAULT_COUNTRY
  const allCountryCodes = await getCountryCodes()

  const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
</urlset>
`

  if (!allCountryCodes.includes(countryCode)) {
    return new Response(emptyXml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    })
  }

  try {
    // 产品数据仅在默认国家需要
    const products: any[] = []
    if (isDefault) {
      let offset = 0
      const limit = 100
      while (true) {
        const {
          products: batch,
          count,
        } = await sdk.client.fetch<{ products: any[]; count: number }>(
          "/store/products",
          {
            method: "GET",
            query: { limit, offset },
            cache: "force-cache",
          }
        )
        products.push(...(batch || []))
        if (!batch || products.length >= count || batch.length < limit) break
        offset += limit
      }
    }

    const { collections } = await sdk.client.fetch<{ collections: any[] }>(
      "/store/collections",
      {
        method: "GET",
        cache: "force-cache",
      }
    )

    const { product_categories } = await sdk.client.fetch<{
      product_categories: any[]
    }>("/store/product-categories", {
      method: "GET",
      cache: "force-cache",
      query: { limit: 100 },
    })

    const urls: string[] = []

    // Home page
    urls.push(
      buildUrlEntry(
        BASE_URL,
        countryCode,
        "",
        allCountryCodes,
        new Date(),
        "daily",
        isDefault ? 1 : 0.9
      )
    )

    // Store page
    urls.push(
      buildUrlEntry(
        BASE_URL,
        countryCode,
        "/store",
        allCountryCodes,
        new Date(),
        "daily",
        0.8
      )
    )

    // Products（仅默认国家）
    for (const product of products ?? []) {
      urls.push(
        buildUrlEntry(
          BASE_URL,
          countryCode,
          `/products/${product.handle}`,
          allCountryCodes,
          new Date(product.updated_at),
          "weekly",
          0.7
        )
      )
    }

    // Collections
    for (const collection of collections ?? []) {
      urls.push(
        buildUrlEntry(
          BASE_URL,
          countryCode,
          `/collections/${collection.handle}`,
          allCountryCodes,
          new Date(collection.updated_at),
          "weekly",
          0.7
        )
      )
    }

    // Product Categories
    for (const category of product_categories ?? []) {
      urls.push(
        buildUrlEntry(
          BASE_URL,
          countryCode,
          `/categories/${category.handle}`,
          allCountryCodes,
          new Date(category.updated_at || new Date()),
          "weekly",
          0.6
        )
      )
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    })
  } catch (error) {
    console.error(
      `Failed to generate sitemap for ${countryCode}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return new Response(emptyXml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    })
  }
}

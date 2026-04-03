import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
    )
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    console.log("[Middleware] Fetching regions request:", {
      url: `${BACKEND_URL}/store/regions`,
      method: "GET",
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY ? "***" : undefined,
      },
    })
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    }).then(async (response) => {
      console.log("[Middleware] Regions response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      })
      const json = await response.json()
      console.log("[Middleware] Regions response JSON:", JSON.stringify(json).slice(0, 200))

      if (!response.ok) {
        console.error("[Middleware] Regions fetch failed:", json.message)
        throw new Error(json.message)
      }

      return json
    })

    if (!regions?.length) {
      console.log("[Middleware] No regions found in response")
      throw new Error(
        "No regions found. Please set up regions in your Medusa Admin."
      )
    }

    // Create a map of country codes to regions.
    console.log("[Middleware] Building region map for", regions.length, "regions")
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
    console.log("[Middleware] Region map built successfully")
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    console.log("[Middleware] getCountryCode - URL country:", urlCountryCode, "Vercel country:", vercelCountryCode, "Default:", DEFAULT_REGION)

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    console.error("[Middleware] getCountryCode error:", error)
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  console.log("[Middleware] ===== Request Start =====")
  console.log("[Middleware] Request URL:", request.nextUrl.href)
  console.log("[Middleware] Request method:", request.method)
  console.log("[Middleware] Request headers:", {
    host: request.headers.get("host"),
    "x-vercel-ip-country": request.headers.get("x-vercel-ip-country"),
    "user-agent": request.headers.get("user-agent"),
  })

  let redirectUrl = request.nextUrl.href

  let response = NextResponse.redirect(redirectUrl, 307)

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")

  let cacheId = cacheIdCookie?.value || crypto.randomUUID()
  console.log("[Middleware] Cache ID:", cacheId, "Existing cookie:", !!cacheIdCookie)

  const regionMap = await getRegionMap(cacheId)
  console.log("[Middleware] Region map size:", regionMap.size)

  const countryCode = regionMap && (await getCountryCode(request, regionMap))
  console.log("[Middleware] Country code:", countryCode)

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1]?.includes(countryCode)
  console.log("[Middleware] URL has country code:", urlHasCountryCode)

  // if one of the country codes is in the url and the cache id is set, return next
  if (urlHasCountryCode && cacheIdCookie) {
    console.log("[Middleware] Returning NextResponse.next() - cached")
    return NextResponse.next()
  }

  // if one of the country codes is in the url and the cache id is not set, set the cache id and redirect
  if (urlHasCountryCode && !cacheIdCookie) {
    console.log("[Middleware] Setting cache cookie and redirecting")
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })

    return response
  }

  // check if the url is a static asset
  if (request.nextUrl.pathname.includes(".")) {
    console.log("[Middleware] Static asset, returning next")
    return NextResponse.next()
  }

  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  // If no country code is set, rewrite to the relevant region (US by default) without redirect
  if (!urlHasCountryCode && countryCode) {
    const rewriteUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    console.log("[Middleware] Rewriting to:", rewriteUrl)
    response = NextResponse.rewrite(rewriteUrl)
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
  }

  console.log("[Middleware] ===== Request End =====")
  console.log("[Middleware] Response type:", response.headers.get("location") ? "redirect" : "next")
  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp|robots.txt).*)",
  ],
}

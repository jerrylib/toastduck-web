import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/_next/", "/account/", "/cart", "/checkout", "/order/"],
    },
    sitemap: "https://www.toastduck.com/sitemap.xml",
  }
}
const excludedPaths = ["/checkout", "/account/*", "/order/*", "/cart", "/api/*"]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.toastduck.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: excludedPaths + ["/[sitemap]"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
    additionalSitemaps: ["https://www.toastduck.com/sitemap.xml"],
  },
}

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"

import { getBaseURL } from "@lib/util/env"
import { getHreflangAlternates } from "@lib/util/seo"
import ProductSchema from "@modules/products/components/product-schema"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const baseUrl = getBaseURL()
  const productUrl = `${baseUrl}/${params.countryCode}/products/${handle}`
  const alternates = await getHreflangAlternates(`/products/${handle}`)
  const firstPrice = product.variants?.[0]?.prices?.[0]
  const priceInfo = firstPrice
    ? `Starting from ${firstPrice.currency === "EUR" ? "€" : "$"}${(firstPrice.amount / 100).toFixed(2)}`
    : ""

  return {
    title: `${product.title} - ${product.title.toLowerCase().includes("dz47") ? "Miniature Circuit Breaker MCB" : "Power Distribution Component"} | Toast Duck`,
    description: `${product.title}. CE certified, suitable for industrial power distribution and building electrical. EU warehouse shipping, bulk pricing available. ${priceInfo} Contact us today.`,
    keywords: [product.title, "circuit breaker", "MCB", "miniature circuit breaker", "Schneider", "ABB", "power distribution", "CE certified", "electrical components"],
    openGraph: {
      title: `${product.title} | Toast Duck Store`,
      description: `${product.title}. CE certified, suitable for industrial power distribution and building electrical. EU warehouse shipping, bulk pricing.`,
      url: productUrl,
      images: product.thumbnail ? [{ url: product.thumbnail }] : [],
      type: "website",
    },
    alternates: {
      canonical: productUrl,
      languages: alternates.languages,
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  return (
    <>
      <ProductSchema product={pricedProduct} region={region} countryCode={params.countryCode} />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </>
  )
}

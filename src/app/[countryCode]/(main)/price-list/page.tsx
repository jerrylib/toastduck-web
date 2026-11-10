import { Metadata } from "next"

import PriceListTemplate from "@modules/price-list/templates"
import { StockFilter } from "@modules/price-list/templates"
import { getCanonicalUrl, getHreflangAlternates } from "@lib/util/seo"

type Props = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<{
    page?: string
    stock?: string
    q?: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const canonicalUrl = getCanonicalUrl("/price-list")
  const alternates = await getHreflangAlternates("/price-list")

  return {
    title: "Price List | RMB Prices | Toast Duck",
    description:
      "Product price list with RMB (CNY) pricing for circuit breakers, contactors, variable frequency drives and other industrial electrical components.",
    keywords: [
      "price list",
      "RMB price",
      "CNY price",
      "circuit breaker price",
      "industrial electrical components",
    ],
    openGraph: {
      title: "Price List | RMB Prices | Toast Duck",
      description:
        "Product price list with RMB (CNY) pricing for circuit breakers, contactors and variable frequency drives.",
      type: "website",
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
  }
}

export default async function PriceListPage(props: Props) {
  const searchParams = await props.searchParams
  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1
  const currentPage = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber

  // 库存筛选：in=仅有货，out=仅无货，其他值/缺省=全部
  const stockParam = searchParams.stock
  const stock: StockFilter | undefined =
    stockParam === "in" || stockParam === "out" ? stockParam : undefined

  // 关键词搜索：去掉首尾空白，过长内容截断，避免恶意超长参数
  const qParam = searchParams.q?.trim().slice(0, 100)
  const q = qParam || undefined

  return <PriceListTemplate page={currentPage} stock={stock} q={q} />
}

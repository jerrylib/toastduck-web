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
    collection?: string
    category?: string
  }>
}

// 集合/分类/商品缓存 24 小时；需要立即生效时调用 /api/revalidate?tag=...
export const revalidate = 86400

export async function generateMetadata(props: Props): Promise<Metadata> {
  const canonicalUrl = getCanonicalUrl("/products")
  const alternates = await getHreflangAlternates("/products")

  return {
    title: "Products | RMB Prices | Toast Duck",
    description:
      "Product list with RMB (CNY) pricing for circuit breakers, contactors, variable frequency drives and other industrial electrical components.",
    keywords: [
      "product list",
      "RMB price",
      "CNY price",
      "circuit breaker price",
      "industrial electrical components",
    ],
    openGraph: {
      title: "Products | RMB Prices | Toast Duck",
      description:
        "Product list with RMB (CNY) pricing for circuit breakers, contactors and variable frequency drives.",
      type: "website",
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternates.languages,
    },
  }
}

export default async function ProductsPage(props: Props) {
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

  // 集合/分类筛选用 handle，超长参数截断
  const collectionParam = searchParams.collection?.trim().slice(0, 100)
  const collection = collectionParam || undefined

  const categoryParam = searchParams.category?.trim().slice(0, 100)
  const category = categoryParam || undefined

  return (
    <PriceListTemplate
      page={currentPage}
      stock={stock}
      q={q}
      collection={collection}
      category={category}
    />
  )
}

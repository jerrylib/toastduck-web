import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Pagination } from "@modules/store/components/pagination"

import PriceRow from "@modules/price-list/components/price-row"
import SearchBox from "@modules/price-list/components/search-box"
import { isProductInStock } from "@modules/price-list/utils/product-stock"

const PAGE_SIZE = 20
// 筛选库存时需要读取全量商品，按每次 100 条分批拉取
const FETCH_SIZE = 100

// 显式带上库存字段，Medusa 不传 inventory_quantity 时不会返回该字段
const PRODUCT_FIELDS = "*variants.calculated_price,*variants.inventory_quantity"

export type StockFilter = "in" | "out"

const fetchAllProducts = async (regionId: string) => {
  const first = await listProducts({
    pageParam: 1,
    regionId,
    queryParams: {
      limit: FETCH_SIZE,
      order: "-created_at",
      fields: PRODUCT_FIELDS,
    },
  })

  const total = first.response.count
  let products: HttpTypes.StoreProduct[] = first.response.products

  const totalRequests = Math.ceil(total / FETCH_SIZE)

  for (let page = 2; page <= totalRequests; page++) {
    const next = await listProducts({
      pageParam: page,
      regionId,
      queryParams: {
        limit: FETCH_SIZE,
        order: "-created_at",
        fields: PRODUCT_FIELDS,
      },
    })

    products = products.concat(next.response.products)
  }

  return products
}

const filterOptions: { value?: StockFilter; label: string }[] = [
  { label: "All products" },
  { value: "in", label: "In stock" },
  { value: "out", label: "Out of stock" },
]

/**
 * 按关键词模糊匹配商品：不区分大小写、按空白分词，所有词都要在标题或描述里出现。
 */
const matchesQuery = (
  product: HttpTypes.StoreProduct,
  keyword: string
): boolean => {
  const haystack = `${product.title ?? ""} ${product.description ?? ""} ${
    product.subtitle ?? ""
  }`.toLowerCase()

  const tokens = keyword
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  return tokens.every((token) => haystack.includes(token))
}

const buildFilterHref = (stock?: StockFilter, q?: string) => {
  const params = new URLSearchParams()

  if (stock) {
    params.set("stock", stock)
  }

  if (q) {
    params.set("q", q)
  }

  const query = params.toString()

  return `/price-list${query ? `?${query}` : ""}`
}

export default async function PriceListTemplate({
  page,
  stock,
  q,
}: {
  page: number
  stock?: StockFilter
  q?: string
}) {
  // 人民币价格来自 cn 区域，固定读取该区域，保证任何国家前缀下都以 CNY 展示
  const region = await getRegion("cn")

  if (!region) {
    return null
  }

  let products: HttpTypes.StoreProduct[] = []
  let count = 0
  let currentPage = page

  // 库存筛选和关键词搜索都需要按完整商品集合计算，才能保证分页准确
  if (stock || q) {
    const allProducts = await fetchAllProducts(region.id)
    const filtered = allProducts.filter(
      (product) =>
        (!stock || isProductInStock(product) === (stock === "in")) &&
        (!q || matchesQuery(product, q))
    )

    count = filtered.length
    const totalPages = Math.max(Math.ceil(count / PAGE_SIZE), 1)
    currentPage = Math.min(Math.max(page, 1), totalPages)

    const offset = (currentPage - 1) * PAGE_SIZE
    products = filtered.slice(offset, offset + PAGE_SIZE)
  } else {
    const response = await listProducts({
      pageParam: page,
      regionId: region.id,
      queryParams: {
        limit: PAGE_SIZE,
        // 最新商品优先，保证有人民币价格的商品排在前面
        order: "-created_at",
        fields: PRODUCT_FIELDS,
      },
    })

    products = response.response.products
    count = response.response.count
  }

  const totalPages = Math.ceil(count / PAGE_SIZE)

  return (
    <div className="content-container py-10" data-testid="price-list-page">
      <div className="mb-8">
        <h1 className="text-2xl-semi">Price List</h1>
        <p className="text-small-regular text-ui-fg-subtle mt-2">
          All prices are in RMB (CNY), tax exclusive. The lowest price of each
          product is shown.
        </p>
      </div>

      <div className="flex flex-col gap-y-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <SearchBox q={q} />
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-2"
            data-testid="price-list-stock-filter"
          >
            <span className="text-small-regular text-ui-fg-subtle mr-1">
              Filter:
            </span>
            {filterOptions.map((option) => {
              const isActive = stock === option.value

              return (
                <LocalizedClientLink
                  key={option.label}
                  href={buildFilterHref(option.value, q)}
                  className={clx(
                    "rounded-full border px-3 py-1 text-small-regular transition-colors",
                    {
                      "border-ui-fg-base bg-ui-fg-base text-white": isActive,
                      "border-ui-border-base text-ui-fg-subtle hover:text-ui-fg-base":
                        !isActive,
                    }
                  )}
                  data-testid={`price-list-filter-${option.value ?? "all"}`}
                >
                  {option.label}
                </LocalizedClientLink>
              )
            })}
            <span className="text-small-regular text-ui-fg-muted ml-1">
              {count} products
            </span>
          </div>
        </div>
        {q && (
          <p className="text-small-regular text-ui-fg-subtle">
            Results for “{q}”
          </p>
        )}
      </div>

      {products.length > 0 ? (
        <>
          <ul
            className="divide-y divide-ui-border-base border-t border-b border-ui-border-base"
            data-testid="price-list"
          >
            {products.map((product) => (
              <PriceRow key={product.id} product={product} />
            ))}
          </ul>
          {totalPages > 1 && (
            <Pagination
              data-testid="price-list-pagination"
              page={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <p className="text-base-regular text-ui-fg-subtle">
          {q ? "No products match your search." : "No products available."}
        </p>
      )}
    </div>
  )
}

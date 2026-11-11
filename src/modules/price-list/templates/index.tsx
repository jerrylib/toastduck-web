import { clx } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Pagination } from "@modules/store/components/pagination"

import FilterSelects from "@modules/price-list/components/filter-selects"
import PriceRow from "@modules/price-list/components/price-row"
import SearchBox from "@modules/price-list/components/search-box"
import { isProductInStock } from "@modules/price-list/utils/product-stock"

const PAGE_SIZE = 20
// 筛选库存时需要读取全量商品，按每次 100 条分批拉取
const FETCH_SIZE = 100
// 集合/分类/商品统一缓存 24 小时，后台改动可通过 /api/revalidate 立即清理
const CACHE_SECONDS = 24 * 60 * 60

// 传了 fields 就只返回这里列出的字段，所以标题/描述/缩略图/handle 必须显式写全，
// 否则列表只剩价格（缩略图会退化成占位图）
const PRODUCT_FIELDS = [
  "id",
  "title",
  "handle",
  "subtitle",
  "description",
  "thumbnail",
  "collection_id",
  "*variants.calculated_price",
  "*variants.inventory_quantity",
].join(",")

export type StockFilter = "in" | "out"

type ResolvedFilters = {
  collection_id?: string
  category_id?: string
}

/**
 * 集合/分类筛选交给后端，避免把 388 条商品全量拉到前端再做过滤。
 */
const buildApiQuery = (filters: ResolvedFilters) => {
  const query: Record<string, string[]> = {}

  if (filters.collection_id) {
    query.collection_id = [filters.collection_id]
  }

  if (filters.category_id) {
    query.category_id = [filters.category_id]
  }

  return query
}

/**
 * 后端偶发连接超时（fetch failed），缓存未命中时会让整页 500。
 * 这里对取数做 3 次小退避重试，避免单次抖动打到用户。
 */
const withRetry = async <T,>(fn: () => Promise<T>, attempts = 3): Promise<T> => {
  let lastError: unknown

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt < attempts - 1) {
        console.warn(`products list fetch failed, retry ${attempt + 1}`)
        await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)))
      }
    }
  }

  throw lastError
}

const fetchAllProducts = async (
  regionId: string,
  filters: ResolvedFilters
) => {
  const apiQuery = buildApiQuery(filters)

  const first = await withRetry(() =>
    listProducts({
      pageParam: 1,
      regionId,
      revalidate: CACHE_SECONDS,
      queryParams: {
        limit: FETCH_SIZE,
        order: "-created_at",
        fields: PRODUCT_FIELDS,
        ...apiQuery,
      },
    })
  )

  const total = first.response.count
  let products: HttpTypes.StoreProduct[] = first.response.products

  const totalRequests = Math.ceil(total / FETCH_SIZE)

  for (let page = 2; page <= totalRequests; page++) {
    const next = await withRetry(() =>
      listProducts({
        pageParam: page,
        regionId,
        revalidate: CACHE_SECONDS,
        queryParams: {
          limit: FETCH_SIZE,
          order: "-created_at",
          fields: PRODUCT_FIELDS,
          ...apiQuery,
        },
      })
    )

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

const buildFilterHref = ({
  stock,
  q,
  collection,
  category,
}: {
  stock?: StockFilter
  q?: string
  collection?: string
  category?: string
}) => {
  const params = new URLSearchParams()

  if (stock) {
    params.set("stock", stock)
  }

  if (q) {
    params.set("q", q)
  }

  if (collection) {
    params.set("collection", collection)
  }

  if (category) {
    params.set("category", category)
  }

  const query = params.toString()

  return `/products${query ? `?${query}` : ""}`
}

export default async function PriceListTemplate({
  page,
  stock,
  q,
  collection,
  category,
}: {
  page: number
  stock?: StockFilter
  q?: string
  collection?: string
  category?: string
}) {
  // 人民币价格来自 cn 区域，固定读取该区域，保证任何国家前缀下都以 CNY 展示
  const region = await getRegion("cn")

  if (!region) {
    return null
  }

  // 集合与分类下拉的可选项，handle 作为 URL 参数，两边都用小写比对。
  // 数据缓存 24 小时，后台调整后需要立即生效时调用 /api/revalidate 清理。
  const [collectionsResult, categoriesResult] = await Promise.all([
    withRetry(() => listCollections({}, { revalidate: CACHE_SECONDS })),
    withRetry(() => listCategories(undefined, { revalidate: CACHE_SECONDS })),
  ])

  const collectionOptions = collectionsResult.collections
    .filter((item) => Boolean(item.handle))
    .map((item) => ({
      value: item.handle as string,
      label: item.title ?? (item.handle as string),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const categoryOptions = categoriesResult
    .filter((item) => Boolean(item.handle))
    .map((item) => ({ value: item.handle as string, label: item.name ?? item.handle as string }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const selectedCollection = collection
    ? collectionsResult.collections.find(
        (item) => item.handle?.toLowerCase() === collection.toLowerCase()
      )
    : undefined

  const selectedCategory = category
    ? categoriesResult.find(
        (item) => item.handle?.toLowerCase() === category.toLowerCase()
      )
    : undefined

  const filters: ResolvedFilters = {
    collection_id: selectedCollection?.id,
    category_id: selectedCategory?.id,
  }

  // 后台改了 handle 之后，旧链接带的分参会解析不到对应集合/分类。
  // 这种情况不能退化成"显示全部商品"，否则用户以为筛选生效了。
  const unknownCollection = Boolean(collection) && !selectedCollection
  const unknownCategory = Boolean(category) && !selectedCategory
  const hasUnknownFilter = unknownCollection || unknownCategory

  const hasFilters = Boolean(stock || q)

  let products: HttpTypes.StoreProduct[] = []
  let count = 0
  let currentPage = page

  if (hasUnknownFilter) {
    count = 0
    currentPage = 1
  } else if (hasFilters) {
    // 库存筛选和关键词搜索都需要按完整商品集合计算，才能保证分页准确
    const allProducts = await fetchAllProducts(region.id, filters)
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
    const response = await withRetry(() =>
      listProducts({
        pageParam: page,
        regionId: region.id,
        revalidate: CACHE_SECONDS,
        queryParams: {
          limit: PAGE_SIZE,
          // 最新商品优先，保证有人民币价格的商品排在前面
          order: "-created_at",
          fields: PRODUCT_FIELDS,
          ...buildApiQuery(filters),
        },
      })
    )

    products = response.response.products
    count = response.response.count
  }

  const totalPages = Math.ceil(count / PAGE_SIZE)

  return (
    <div className="content-container py-10" data-testid="price-list-page">
      <div className="mb-8">
        <h1 className="text-2xl-semi">Products</h1>
        <p className="text-small-regular text-ui-fg-subtle mt-2">
          All prices are in RMB (CNY), tax exclusive. The lowest price of each
          product is shown.
        </p>
      </div>

      <div className="flex flex-col gap-y-4 mb-6">
        <SearchBox q={q} />
        <div className="flex flex-col gap-y-3">
          <FilterSelects
            collections={collectionOptions}
            categories={categoryOptions}
            collection={selectedCollection?.handle}
            category={selectedCategory?.handle}
          />
          <div
            className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5"
            data-testid="price-list-stock-filter"
          >
            <span className="text-xs text-ui-fg-subtle mr-1">Filter:</span>
            {filterOptions.map((option) => {
              const isActive = stock === option.value

              return (
                <LocalizedClientLink
                  key={option.label}
                  href={buildFilterHref({
                    stock: option.value,
                    q,
                    collection: selectedCollection?.handle ?? undefined,
                    category: selectedCategory?.handle ?? undefined,
                  })}
                  className={clx(
                    "rounded-full border px-2 py-0.5 text-xs transition-colors",
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
        {(q || collection || category) && (
          <p className="text-small-regular text-ui-fg-subtle">
            {q && <>Results for “{q}”</>}
            {q && (collection || category) && " · "}
            {collection && (
              <>
                Collection:{" "}
                {selectedCollection ? (
                  selectedCollection.title
                ) : (
                  <span className="text-ui-fg-error">
                    “{collection}” (not found)
                  </span>
                )}
              </>
            )}
            {collection && category && " · "}
            {category && (
              <>
                Category:{" "}
                {selectedCategory ? (
                  selectedCategory.name
                ) : (
                  <span className="text-ui-fg-error">
                    “{category}” (not found)
                  </span>
                )}
              </>
            )}
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
          {hasUnknownFilter
            ? "This filter no longer exists. Please pick another collection or category."
            : q
              ? "No products match your search."
              : "No products available for this filter."}
        </p>
      )}
    </div>
  )
}

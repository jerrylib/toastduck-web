"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { clx } from "@medusajs/ui"

type Option = {
  value: string
  label: string
}

/**
 * Collection / category chips for the products page.
 * 平铺展示（不用下拉框），点击后把 handle 写进 URL，保留搜索词与库存筛选，
 * 并重置分页。
 */
const FilterChips = ({
  collections,
  categories,
  collection,
  category,
}: {
  collections: Option[]
  categories: Option[]
  collection?: string
  category?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = (key: "collection" | "category", value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // 换筛选条件后从第一页开始
    params.delete("page")

    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`)
  }

  const renderGroup = (
    key: "collection" | "category",
    title: string,
    allLabel: string,
    options: Option[],
    activeValue?: string
  ) => {
    const items: { value: string; label: string }[] = [
      { value: "", label: allLabel },
      ...options.map((option) => ({ value: option.value, label: option.label })),
    ]

    return (
      <div
        className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5"
        data-testid={`price-list-${key}-chips`}
      >
        <span className="text-xs text-ui-fg-subtle mr-1">{title}:</span>
        {items.map((item) => {
          const isActive = (activeValue ?? "").toLowerCase() === item.value.toLowerCase()

          return (
            <button
              key={item.value || "all"}
              type="button"
              onClick={() => updateParam(key, item.value)}
              className={clx(
                "rounded-full border px-2 py-0.5 text-xs transition-colors",
                {
                  "border-ui-fg-base bg-ui-fg-base text-white": isActive,
                  "border-ui-border-base text-ui-fg-subtle hover:text-ui-fg-base":
                    !isActive,
                }
              )}
              data-testid={`price-list-${key}-${item.value || "all"}`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className="flex flex-col gap-y-2"
      data-testid="price-list-select-filters"
    >
      {renderGroup(
        "collection",
        "Collection",
        "All collections",
        collections,
        collection
      )}
      {renderGroup("category", "Category", "All categories", categories, category)}
    </div>
  )
}

export default FilterChips

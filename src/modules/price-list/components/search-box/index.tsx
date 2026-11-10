"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { clx } from "@medusajs/ui"

/**
 * 产品搜索框：提交后把关键词写入 URL 的 q 参数，保留其他筛选参数并重置页码。
 */
const SearchBox = ({ q }: { q?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(q ?? "")

  const navigate = (keyword?: string) => {
    const params = new URLSearchParams(searchParams)

    if (keyword) {
      params.set("q", keyword)
    } else {
      params.delete("q")
    }

    // 关键词变化后从第一页开始
    params.delete("page")

    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(value.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-x-2 w-full small:w-[26rem]"
      data-testid="price-list-search"
    >
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by product name or description"
        className="flex-1 rounded-full border border-ui-border-base bg-ui-bg-field px-4 py-2 text-small-regular text-ui-fg-base placeholder:text-ui-fg-muted outline-none focus:border-ui-fg-base"
        data-testid="price-list-search-input"
      />
      <button
        type="submit"
        className="rounded-full border border-ui-fg-base bg-ui-fg-base px-4 py-2 text-small-regular text-white"
        data-testid="price-list-search-button"
      >
        Search
      </button>
      {q && (
        <button
          type="button"
          onClick={() => {
            setValue("")
            navigate()
          }}
          className={clx(
            "text-small-regular text-ui-fg-subtle hover:text-ui-fg-base whitespace-nowrap"
          )}
          data-testid="price-list-search-clear"
        >
          Clear
        </button>
      )}
    </form>
  )
}

export default SearchBox

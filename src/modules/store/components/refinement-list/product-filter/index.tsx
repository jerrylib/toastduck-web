"use client"

import { useState } from "react"

const AVAILABLE_TAGS = [
  { value: "second-hand", label: "Used Products" },
]

type ProductFilterProps = {
  q?: string
  tags?: string
  setQueryParams: (name: string, value: string) => void
}

const ProductFilter = ({ q, tags, setQueryParams }: ProductFilterProps) => {
  const [searchValue, setSearchValue] = useState(q || "")
  const selectedTags = tags ? tags.split(",") : []

  const handleSearch = () => {
    setQueryParams("q", searchValue.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleTagChange = (tagValue: string, checked: boolean) => {
    let newTags: string[]
    if (checked) {
      newTags = [...selectedTags, tagValue]
    } else {
      newTags = selectedTags.filter((t) => t !== tagValue)
    }
    setQueryParams("tags", newTags.join(","))
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-base-semi">Filter</span>
      <input
        type="text"
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-[80%] border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-gray-400"
      />
      <div className="flex flex-col gap-2">
        {AVAILABLE_TAGS.map((tag) => (
          <label key={tag.value} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.value)}
              onChange={(e) => handleTagChange(tag.value, e.target.checked)}
              className="rounded border-gray-300"
            />
            {tag.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default ProductFilter

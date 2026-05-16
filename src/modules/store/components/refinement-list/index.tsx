"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import SortProducts, { SortOptions } from "./sort-products"
import ProductFilter from "./product-filter"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  q?: string
  tags?: string
  'data-testid'?: string
}

const RefinementList = ({ sortBy, q, tags, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setQueryParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <ProductFilter q={q} tags={tags} setQueryParams={setQueryParams} />
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
    </div>
  )
}

export default RefinementList

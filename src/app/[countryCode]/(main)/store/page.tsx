import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "All Products - Power Distribution Components | Toast Duck Store",
  description: "Professional supplier of Schneider, ABB circuit breakers and power distribution components. CE/UL certified, EU shipping, bulk pricing. Browse our full range of miniature circuit breakers MCB, RCCB, distribution boxes and more.",
  keywords: ["circuit breaker", "MCB", "power distribution", "Schneider", "ABB", "electrical components", "CE certified", "wholesale", "electrical equipment"],
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}

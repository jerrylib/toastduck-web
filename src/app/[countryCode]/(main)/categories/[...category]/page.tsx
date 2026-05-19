import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import { getBaseURL } from "@lib/util/env"
import { getHreflangAlternates } from "@lib/util/seo"
import BreadcrumbSchema from "@modules/common/components/breadcrumb-schema"
import ItemListSchema from "@modules/common/components/item-list-schema"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)
    const categoryName = productCategory.name || ""

    const title = categoryName + " - Professional Power Distribution Supplier"

    const description = productCategory.description ||
      `${categoryName} series products. CE/UL certified, EU shipping, bulk pricing. Professional supplier of Schneider, ABB circuit breakers and power distribution components.`

    const baseUrl = getBaseURL()
    const categoryPath = `/categories/${params.category.join("/")}`
    const categoryUrl = `${baseUrl}/${params.countryCode}${categoryPath}`
    const alternates = await getHreflangAlternates(categoryPath)

    return {
      title: `${title} | Toast Duck Store`,
      description,
      keywords: [categoryName, "circuit breaker", "MCB", "power distribution", "CE certified", "EU shipping", "electrical components"],
      openGraph: {
        title: `${title} | Toast Duck Store`,
        description,
        url: categoryUrl,
        type: "website",
      },
      alternates: {
        canonical: categoryUrl,
        languages: alternates.languages,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  const { response } = await listProducts({
    countryCode: params.countryCode,
    queryParams: { category_id: [productCategory.id], limit: 30, fields: "handle,title,thumbnail" } as any,
  })

  return (
    <>
      <BreadcrumbSchema
        countryCode={params.countryCode}
        items={[
          { name: "Categories", url: "/store" },
          { name: productCategory.name || "" },
        ]}
      />
      <ItemListSchema
        items={response.products}
        listName={productCategory.name || "Category"}
        countryCode={params.countryCode}
      />
      <CategoryTemplate
        category={productCategory}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}

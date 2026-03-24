import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const collectionTitle = collection.title || ""
  const brandDescriptions: Record<string, string> = {
    schneider: "Schneider Electric authorized distributor: iCNV, iDPNa series miniature circuit breakers, ABB SH200 series, DZ47 series. CE/UL certified, fast EU shipping.",
    abb: "ABB authentic power distribution components: SH200 series miniature circuit breakers, electrical protection equipment. CE/UL certified, EU warehouse shipping.",
    chsrme: "Chsrme brand power distribution components, professional electrical protection equipment. CE/UL certified, EU shipping.",
  }

  const handleLower = collectionTitle.toLowerCase()
  let description = `${collectionTitle} series products. CE/UL certified, EU shipping, bulk pricing available.`

  for (const [brand, desc] of Object.entries(brandDescriptions)) {
    if (handleLower.includes(brand)) {
      description = desc
      break
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "https://www.toastduck.com"
  const collectionUrl = `${baseUrl}/${params.countryCode}/collections/${params.handle}`

  const metadata = {
    title: `${collectionTitle} - Circuit Breakers & Power Distribution | Toast Duck Store`,
    description: description,
    keywords: [collectionTitle, "circuit breaker", "MCB", "miniature circuit breaker", "power distribution", "CE certified", "EU shipping"],
    openGraph: {
      title: `${collectionTitle} - Circuit Breakers & Power Distribution | Toast Duck Store`,
      description: description,
      url: collectionUrl,
      type: "website",
    },
    alternates: {
      canonical: collectionUrl,
    },
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}

import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import New from "@modules/home/components/new"
import Hot from "@modules/home/components/hot"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getBaseURL } from "@lib/util/env"

type Props = {
  params: Promise<{ countryCode: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const baseUrl = getBaseURL()
  const canonicalUrl = `${baseUrl}/${params.countryCode}`

  return {
    title: "Toast Duck Store - Professional Power Distribution Components | Schneider, ABB",
    description:
      "Professional supplier of Schneider, ABB miniature circuit breakers MCB and power distribution components. CE/UL certified, EU shipping, bulk pricing. Contact us today.",
    keywords: ["circuit breaker", "MCB", "Schneider", "ABB", "power distribution", "electrical components", "EU certified", "wholesale electrical"],
    openGraph: {
      title: "Toast Duck Store - Professional Power Distribution Components | Schneider, ABB",
      description: "Professional supplier of Schneider, ABB miniature circuit breakers MCB and power distribution components. CE/UL certified, EU shipping, bulk pricing.",
      type: "website",
      images: [
        {
          url: "https://www.toastduck.online/static/og-image.png",
          width: 1200,
          height: 630,
          alt: "Toast Duck Store - Professional Power Distribution Components",
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <h1 className="sr-only">Professional Power Distribution Components Supplier - Schneider, ABB</h1>
      <New countryCode={countryCode} />
      <Hot countryCode={countryCode} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}

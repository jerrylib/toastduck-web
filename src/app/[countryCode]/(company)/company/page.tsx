import { permanentRedirect } from "next/navigation"

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

/**
 * The standalone company overview page was replaced by the full company site
 * home, so `/company` now permanently redirects to `/company/home`.
 */
export default async function CompanyRedirectPage(props: Props) {
  const { countryCode } = await props.params

  permanentRedirect(`/${countryCode}/company/home`)
}

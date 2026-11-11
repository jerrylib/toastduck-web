import { permanentRedirect } from "next/navigation"

type Props = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/**
 * `/price-list` 已改名为 `/products`，旧链接永久跳转并保留筛选参数。
 */
export default async function PriceListRedirectPage(props: Props) {
  const { countryCode } = await props.params
  const searchParams = await props.searchParams

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item))
    } else if (typeof value === "string" && value) {
      params.set(key, value)
    }
  }

  const query = params.toString()

  permanentRedirect(`/${countryCode}/products${query ? `?${query}` : ""}`)
}

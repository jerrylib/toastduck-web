import { retrieveOrder } from "@lib/data/orders"
import { getRegion } from "@lib/data/regions"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import PurchaseAnalytics from "@modules/order/components/purchase-analytics"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string; countryCode: string }>
}
export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  const region = await getRegion(params.countryCode)

  return (
    <>
      <PurchaseAnalytics order={order} region={region || undefined} />
      <OrderCompletedTemplate order={order} />
    </>
  )
}

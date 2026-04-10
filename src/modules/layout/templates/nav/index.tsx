import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const noticeMessages: Record<string, { message: string }> = {
  us: { message: "Now we support PayPal and Stripe payment, start your procurement with us!" },
  gb: { message: "Now we support PayPal and Stripe payment, start your procurement with us!" },
  de: { message: "Jetzt unterstützen wir PayPal und Stripe-Zahlung, beginnen Sie Ihre Beschaffung mit uns!" },
  dk: { message: "Nu supporterer vi PayPal og Stripe-betaling, start din indkøbsrejse med os!" },
  fr: { message: "Maintenant, nous supportons les paiements PayPal et Stripe, commencez vos achats avec nous!" },
  es: { message: "¡Ahora apoyamos PayPal y Stripe, comienza tu procurement con nosotros!" },
  it: { message: "Ora supportiamo pagamenti PayPal e Stripe, inizia il tuo approvvigionamento con noi!" },
  nl: { message: "Nu ondersteunen we PayPal en Stripe betalingen, begin met je procurement bij ons!" },
  zh: { message: "现在我们支持PayPal和Stripe支付，快开始我们的采购吧!" },
  tw: { message: "現在我們支援PayPal和Stripe支付，快開始我們的採購吧!" },
  default: { message: "Now we support PayPal and Stripe payment, start your procurement with us!" },
}

type NavProps = {
  countryCode?: string
}

export default async function Nav({ countryCode }: NavProps) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const notice = noticeMessages[countryCode?.toLowerCase() ?? ""] || noticeMessages["default"]

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <div className="bg-yellow-300 text-center py-2 text-sm font-medium text-yellow-900">
        {notice.message}
      </div>
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Toast Duck Store
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

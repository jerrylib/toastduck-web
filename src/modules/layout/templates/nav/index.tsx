import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const noticeMessages: Record<string, { message: string }> = {
  us: { message: "We now support PayPal, Stripe, and xTransfer! Start your procurement plan with us!" },
  gb: { message: "We now support PayPal, Stripe, and xTransfer! Start your procurement plan with us!" },
  de: { message: "Wir unterstützen jetzt PayPal, Stripe und xTransfer! Starten Sie Ihren Beschaffungsplan mit uns!" },
  dk: { message: "Vi understøtter nu PayPal, Stripe og xTransfer! Start din indkøbsplan med os!" },
  fr: { message: "Nous prenons désormais en charge PayPal, Stripe et xTransfer ! Commencez votre plan d'approvisionnement avec nous !" },
  es: { message: "¡Ahora apoyamos PayPal, Stripe y xTransfer! ¡Comienza tu plan de compras con nosotros!" },
  it: { message: "Ora supportiamo PayPal, Stripe e xTransfer! Inizia il tuo piano di approvvigionamento con noi!" },
  nl: { message: "We ondersteunen nu PayPal, Stripe en xTransfer! Begin met je inkoopplan bij ons!" },
  pt: { message: "Agora suportamos PayPal, Stripe e xTransfer! Comece seu plano de compras conosco!" },
  ru: { message: "Теперь мы поддерживаем PayPal, Stripe и xTransfer! Начните свой план закупок с нами!" },
  ja: { message: "PayPal、Stripe、xTransferをサポートするようになりました！ご購入をお楽しみください！" },
  ko: { message: "이제 PayPal, Stripe, xTransfer를 지원합니다. 구매 계획을 시작하세요!" },
  zh: { message: "我们已支持paypal、stripe、xTransfer啦，开始您的采购计划吧！" },
  tw: { message: "我們已支援paypal、stripe、xTransfer啦，開始您的採購計劃吧！" },
  ar: { message: "نحن ندعم الآن PayPal وStripe وxTransfer. ابدأ خطة الشراء الخاصة بك معنا!" },
  hi: { message: "अब हम PayPal, Stripe और xTransfer का समर्थन करते हैं. अपनी खरीद योजना शुरू करें!" },
  vi: { message: "Bây giờ chúng tôi hỗ trợ PayPal, Stripe và xTransfer. Bắt đầu kế hoạch mua hàng của bạn với chúng tôi!" },
  default: { message: "We now support PayPal, Stripe, and xTransfer! Start your procurement plan with us!" },
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

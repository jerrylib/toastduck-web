import React from "react"
import { CreditCard, Window, History } from "@medusajs/icons"

import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  "pp_ttlater_tt": {
    title: 'Make a T/T transfer later',
    icon: <Window />,
  },
  "pp_xtransferpayment_xtransfer": {
    title: 'Make a xTransfer transfer later',
    icon: <Window />,
  },
  "pp_picturepayment_alipay": {
    title: 'Alipay - Please note your order number when transferring',
    icon: <History />,
  },
  "pp_picturepayment_wechat": {
    title: 'Wechat Pay - Please note your order number when transferring',
    icon: <History />,
  }
  // Add more payment providers here
}

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_")
}
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}
export const isTtLater = (providerId?: string) => {
  return providerId?.startsWith("pp_ttlater_tt")
}

export const isXtransfer = (providerId?: string) => {
  return providerId === 'pp_xtransferpayment_xtransfer'
}

export const isPicturePayment = (providerId?: string) => {
  return providerId === 'pp_picturepayment_alipay' || providerId === 'pp_picturepayment_wechat'
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]

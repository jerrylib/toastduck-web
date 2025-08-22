import { Container, Heading, Text } from "@medusajs/ui"

import { isStripe, isTtLater, paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { BasePayment } from "@medusajs/types/dist/http/payment/common"

import { CloneDashed } from '@medusajs/icons'

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]
  const paymentDetail = (payment: BasePayment) => {
    if (isStripe(payment.provider_id) && payment.data?.card_last4) {
      return <Text data-testid="payment-amount">{`**** **** **** ${payment.data.card_last4}`}</Text>
    } else if (isTtLater(payment.provider_id)) {
      const { data } = payment
      //TODO: 增加TT付款信息展示
      return <div className="bg-white p-2 rounded-lg max-w-md mx-auto">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          {/* 标签部分 */}
          <div className="text-right text-gray-600 text-[12px]">Name:</div>
          <div className="text-sky-500 font-mono cursor-pointer hover:text-sky-600 transition-colors">
            {data.account_name}
          </div>
          <CloneDashed className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2" />

          <div className="text-right text-gray-600 text-[12px]">Bank Account:</div>
          <div className="text-sky-500 font-mono cursor-pointer hover:text-sky-600 transition-colors">
            {data.bank_account}
          </div>
          <CloneDashed className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2" />

          <div className="text-right text-gray-600 text-[12px]">Bank Name:</div>
          <div className="text-sky-500 font-mono cursor-pointer hover:text-sky-600 transition-colors">
            {data.bank_name}
          </div>
          <CloneDashed className="cursor-pointer text-gray-500 hover:text-gray-700 ml-2" />
        </div>
      </div>
    } else {
      return <Text data-testid="payment-amount">
        {`${convertToLocale({
          amount: payment.amount,
          currency_code: order.currency_code,
        })} paid at ${new Date(
          payment.created_at ?? ""
        ).toLocaleString()}`}
      </Text>
    }
  }
  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        Payment
      </Heading>
      <div>
        {payment && (
          <div className="flex items-start gap-x-1 w-full">
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
            <div className="flex flex-col w-2/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment details
              </Text>
              <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center">
                <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                {paymentDetail(payment)}
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails

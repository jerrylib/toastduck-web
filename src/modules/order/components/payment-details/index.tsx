"use client"

import { Container, Heading, Text } from "@medusajs/ui"
import { useState } from "react"

import { isStripe, isTtLater, isXtransfer, paymentInfoMap } from "@lib/constants"
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
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (value: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      // silent fail
    }
  }
  const paymentDetail = (payment: BasePayment) => {
    if (isStripe(payment.provider_id) && payment.data?.card_last4) {
      return <Text data-testid="payment-amount">{`**** **** **** ${payment.data.card_last4}`}</Text>
    } else if (isXtransfer(payment.provider_id)) {
      const { data } = payment
      return <div className="bg-white rounded-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Account Number:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.account_number}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'account_number' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(String(data.account_number), 'account_number')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Account Name:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.account_name}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'account_name' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.account_name, 'account_name')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Bank Name:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.bank_name}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'bank_name' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.bank_name, 'bank_name')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Bank Code:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.bank_code}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'bank_code' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(String(data.bank_code), 'bank_code')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Branch Code:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.branch_code}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'branch_code' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(String(data.branch_code), 'branch_code')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">SWIFT/BIC:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.swift_bic_code}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'swift_bic_code' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.swift_bic_code, 'swift_bic_code')}
            />
          </div>

          <div className="flex items-start gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Bank Address:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.bank_address}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'bank_address' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.bank_address, 'bank_address')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Country/Region:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.country_region}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'country_region' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.country_region, 'country_region')}
            />
          </div>

          <div className="flex items-center gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Account Type:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.type_of_account}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'type_of_account' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.type_of_account, 'type_of_account')}
            />
          </div>

          <div className="flex items-start gap-2 hover:bg-gray-100 rounded px-1 py-1">
            <div className="text-gray-600 text-[12px] w-32 shrink-0">Payment Message:</div>
            <div className="text-ui-fg-interactive font-mono cursor-pointer hover:text-sky-600 transition-colors flex-1">
              {data.payment_message}
            </div>
            <CloneDashed
              className={`cursor-pointer shrink-0 ml-auto ${copiedField === 'payment_message' ? 'text-green-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleCopy(data.payment_message, 'payment_message')}
            />
          </div>
        </div>
      </div>
    } else if (isTtLater(payment.provider_id)) {
      const { data } = payment
      //TODO: 增加TT付款信息展示
      return <div className="bg-white rounded-lg">
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
              <div className={`flex txt-medium text-ui-fg-subtle items-center${isXtransfer(payment.provider_id) || isTtLater(payment.provider_id) ? '' : ' gap-2'}`}>
                {isXtransfer(payment.provider_id) || isTtLater(payment.provider_id) ? null : (
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[payment.provider_id].icon}
                  </Container>
                )}
                {paymentDetail(payment)}
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div >
  )
}

export default PaymentDetails

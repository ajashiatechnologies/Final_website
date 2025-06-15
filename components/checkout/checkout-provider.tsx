"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface ShippingAddress {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  saveAddress: boolean
}

interface PaymentInfo {
  method: "card" | "paypal" | "apple"
  orderId?: string
  cardData?: {
    number: string
    expiry: string
    cvv: string
    name: string
  }
}

interface CheckoutContextType {
  shippingAddress: ShippingAddress | null
  paymentInfo: PaymentInfo | null
  setShippingAddress: (address: ShippingAddress) => void
  setPaymentInfo: (info: PaymentInfo) => void
  resetCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)

  const resetCheckout = () => {
    setShippingAddress(null)
    setPaymentInfo(null)
  }

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        paymentInfo,
        setShippingAddress,
        setPaymentInfo,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
} 
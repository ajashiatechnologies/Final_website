"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PaymentMethod {
  type: "card" | "paypal" | "bank"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  email?: string
}

interface PaymentMethodFormProps {
  method?: PaymentMethod | null
  onClose: () => void
  onSave: (method: PaymentMethod) => void
}

export function PaymentMethodForm({ method, onClose, onSave }: PaymentMethodFormProps) {
  const [formData, setFormData] = useState<PaymentMethod>({
    type: method?.type || "card",
    last4: method?.last4 || "",
    brand: method?.brand || "",
    expiryMonth: method?.expiryMonth || new Date().getMonth() + 1,
    expiryYear: method?.expiryYear || new Date().getFullYear(),
    isDefault: method?.isDefault || false,
    email: method?.email || "",
  })

  const [cardData, setCardData] = useState({
    number: "",
    cvv: "",
    name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.type === "card") {
      // Extract last 4 digits and brand from card number
      const last4 = cardData.number.slice(-4)
      const brand = cardData.number.startsWith("4") ? "Visa" : cardData.number.startsWith("5") ? "Mastercard" : "Card"

      onSave({
        ...formData,
        last4,
        brand,
      })
    } else {
      onSave(formData)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{method ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Payment Method Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value: any) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.type === "card" && (
            <>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  value={cardData.name}
                  onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData((prev) => ({ ...prev, number: e.target.value.replace(/\s/g, "") }))}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Select
                    value={formData.expiryMonth?.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, expiryMonth: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {(i + 1).toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expiryYear">Year</Label>
                  <Select
                    value={formData.expiryYear?.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, expiryYear: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {formData.type === "paypal" && (
            <div>
              <Label htmlFor="email">PayPal Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isDefault: checked as boolean }))}
            />
            <Label htmlFor="isDefault">Set as default payment method</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {method ? "Update" : "Add"} Payment Method
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

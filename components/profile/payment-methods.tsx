"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, CreditCard } from "lucide-react"
import { PaymentMethodForm } from "./payment-method-form"

interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "bank"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  email?: string
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "2",
    type: "paypal",
    email: "john.doe@example.com",
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [showForm, setShowForm] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "paypal":
        return <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">P</div>
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getMethodDisplay = (method: PaymentMethod) => {
    if (method.type === "card") {
      return `${method.brand} ending in ${method.last4}`
    } else if (method.type === "paypal") {
      return `PayPal (${method.email})`
    }
    return "Unknown payment method"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getMethodIcon(method.type)}
                  <div>
                    <p className="font-medium">{getMethodDisplay(method)}</p>
                    {method.type === "card" && (
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    )}
                  </div>
                  {method.isDefault && <Badge variant="default">Default</Badge>}
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(method)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(method.id)} disabled={method.isDefault}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!method.isDefault && (
                <Button variant="outline" size="sm" className="mt-3" onClick={() => handleSetDefault(method.id)}>
                  Set as Default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {paymentMethods.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No payment methods added yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {showForm && (
        <PaymentMethodForm
          method={editingMethod}
          onClose={() => {
            setShowForm(false)
            setEditingMethod(null)
          }}
          onSave={(method) => {
            if (editingMethod) {
              setPaymentMethods((prev) =>
                prev.map((m) => (m.id === editingMethod.id ? { ...method, id: editingMethod.id } : m)),
              )
            } else {
              setPaymentMethods((prev) => [...prev, { ...method, id: Date.now().toString() }])
            }
            setShowForm(false)
            setEditingMethod(null)
          }}
        />
      )}
    </div>
  )
}

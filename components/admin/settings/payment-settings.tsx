"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Shield } from "lucide-react"

export function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState({
    stripe: {
      enabled: true,
      publicKey: "pk_test_...",
      secretKey: "sk_test_...",
      webhookSecret: "whsec_...",
    },
    paypal: {
      enabled: true,
      clientId: "AYiPC...",
      clientSecret: "EHuc...",
    },
    bankTransfer: {
      enabled: false,
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      instructions: "",
    },
  })

  const [taxSettings, setTaxSettings] = useState({
    enableTax: true,
    taxRate: "8.5",
    taxIncluded: false,
    taxLabel: "Sales Tax",
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <CardTitle>Stripe Payment Gateway</CardTitle>
            <Badge variant={paymentMethods.stripe.enabled ? "default" : "secondary"}>
              {paymentMethods.stripe.enabled ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="stripe-enabled">Enable Stripe</Label>
            <Switch
              id="stripe-enabled"
              checked={paymentMethods.stripe.enabled}
              onCheckedChange={(checked) =>
                setPaymentMethods({
                  ...paymentMethods,
                  stripe: { ...paymentMethods.stripe, enabled: checked },
                })
              }
            />
          </div>
          {paymentMethods.stripe.enabled && (
            <>
              <div>
                <Label htmlFor="stripe-public-key">Publishable Key</Label>
                <Input
                  id="stripe-public-key"
                  value={paymentMethods.stripe.publicKey}
                  onChange={(e) =>
                    setPaymentMethods({
                      ...paymentMethods,
                      stripe: { ...paymentMethods.stripe, publicKey: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="stripe-secret-key">Secret Key</Label>
                <Input
                  id="stripe-secret-key"
                  type="password"
                  value={paymentMethods.stripe.secretKey}
                  onChange={(e) =>
                    setPaymentMethods({
                      ...paymentMethods,
                      stripe: { ...paymentMethods.stripe, secretKey: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                <Input
                  id="stripe-webhook"
                  type="password"
                  value={paymentMethods.stripe.webhookSecret}
                  onChange={(e) =>
                    setPaymentMethods({
                      ...paymentMethods,
                      stripe: { ...paymentMethods.stripe, webhookSecret: e.target.value },
                    })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <CardTitle>PayPal</CardTitle>
            <Badge variant={paymentMethods.paypal.enabled ? "default" : "secondary"}>
              {paymentMethods.paypal.enabled ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="paypal-enabled">Enable PayPal</Label>
            <Switch
              id="paypal-enabled"
              checked={paymentMethods.paypal.enabled}
              onCheckedChange={(checked) =>
                setPaymentMethods({
                  ...paymentMethods,
                  paypal: { ...paymentMethods.paypal, enabled: checked },
                })
              }
            />
          </div>
          {paymentMethods.paypal.enabled && (
            <>
              <div>
                <Label htmlFor="paypal-client-id">Client ID</Label>
                <Input
                  id="paypal-client-id"
                  value={paymentMethods.paypal.clientId}
                  onChange={(e) =>
                    setPaymentMethods({
                      ...paymentMethods,
                      paypal: { ...paymentMethods.paypal, clientId: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="paypal-client-secret">Client Secret</Label>
                <Input
                  id="paypal-client-secret"
                  type="password"
                  value={paymentMethods.paypal.clientSecret}
                  onChange={(e) =>
                    setPaymentMethods({
                      ...paymentMethods,
                      paypal: { ...paymentMethods.paypal, clientSecret: e.target.value },
                    })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <CardTitle>Tax Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-tax">Enable Tax Calculation</Label>
            <Switch
              id="enable-tax"
              checked={taxSettings.enableTax}
              onCheckedChange={(checked) => setTaxSettings({ ...taxSettings, enableTax: checked })}
            />
          </div>
          {taxSettings.enableTax && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    step="0.01"
                    value={taxSettings.taxRate}
                    onChange={(e) => setTaxSettings({ ...taxSettings, taxRate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tax-label">Tax Label</Label>
                  <Input
                    id="tax-label"
                    value={taxSettings.taxLabel}
                    onChange={(e) => setTaxSettings({ ...taxSettings, taxLabel: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="tax-included">Tax Included in Prices</Label>
                <Switch
                  id="tax-included"
                  checked={taxSettings.taxIncluded}
                  onCheckedChange={(checked) => setTaxSettings({ ...taxSettings, taxIncluded: checked })}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Button>Save Payment Settings</Button>
    </div>
  )
}

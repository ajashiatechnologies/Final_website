"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Truck, Plus, Edit, Trash2 } from "lucide-react"

const shippingMethods = [
  {
    id: 1,
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 9.99,
    freeThreshold: 50,
    enabled: true,
  },
  {
    id: 2,
    name: "Express Shipping",
    description: "2-3 business days",
    price: 19.99,
    freeThreshold: 100,
    enabled: true,
  },
  {
    id: 3,
    name: "Overnight Shipping",
    description: "Next business day",
    price: 39.99,
    freeThreshold: 200,
    enabled: false,
  },
]

export function ShippingSettings() {
  const [settings, setSettings] = useState({
    enableShipping: true,
    freeShippingThreshold: 50,
    weightUnit: "kg",
    dimensionUnit: "cm",
    originAddress: {
      street: "123 Warehouse St",
      city: "City",
      state: "State",
      zipCode: "12345",
      country: "US",
    },
  })

  const [showAddMethod, setShowAddMethod] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-shipping">Enable Shipping</Label>
            <Switch
              id="enable-shipping"
              checked={settings.enableShipping}
              onCheckedChange={(checked) => setSettings({ ...settings, enableShipping: checked })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="free-shipping-threshold">Free Shipping Threshold ($)</Label>
              <Input
                id="free-shipping-threshold"
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="weight-unit">Weight Unit</Label>
              <Select
                value={settings.weightUnit}
                onValueChange={(value) => setSettings({ ...settings, weightUnit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="lb">Pounds (lb)</SelectItem>
                  <SelectItem value="g">Grams (g)</SelectItem>
                  <SelectItem value="oz">Ounces (oz)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dimension-unit">Dimension Unit</Label>
              <Select
                value={settings.dimensionUnit}
                onValueChange={(value) => setSettings({ ...settings, dimensionUnit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Centimeters (cm)</SelectItem>
                  <SelectItem value="in">Inches (in)</SelectItem>
                  <SelectItem value="m">Meters (m)</SelectItem>
                  <SelectItem value="ft">Feet (ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Origin Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="origin-street">Street Address</Label>
            <Input
              id="origin-street"
              value={settings.originAddress.street}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  originAddress: { ...settings.originAddress, street: e.target.value },
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin-city">City</Label>
              <Input
                id="origin-city"
                value={settings.originAddress.city}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    originAddress: { ...settings.originAddress, city: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="origin-state">State/Province</Label>
              <Input
                id="origin-state"
                value={settings.originAddress.state}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    originAddress: { ...settings.originAddress, state: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin-zip">ZIP/Postal Code</Label>
              <Input
                id="origin-zip"
                value={settings.originAddress.zipCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    originAddress: { ...settings.originAddress, zipCode: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="origin-country">Country</Label>
              <Select
                value={settings.originAddress.country}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    originAddress: { ...settings.originAddress, country: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Shipping Methods</CardTitle>
            <Button onClick={() => setShowAddMethod(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    <p className="text-sm text-muted-foreground">
                      ${method.price} • Free over ${method.freeThreshold}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={method.enabled ? "default" : "secondary"}>
                    {method.enabled ? "Active" : "Inactive"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button>Save Shipping Settings</Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Package } from "lucide-react"

const recentAdjustments = [
  {
    id: 1,
    product: "Wireless Headphones",
    sku: "WH-001",
    type: "increase",
    quantity: 50,
    reason: "New shipment received",
    date: "2024-01-15",
    user: "Admin",
  },
  {
    id: 2,
    product: "Smart Watch",
    sku: "SW-002",
    type: "decrease",
    quantity: 5,
    reason: "Damaged items removed",
    date: "2024-01-14",
    user: "Manager",
  },
  {
    id: 3,
    product: "USB-C Cable",
    sku: "UC-004",
    type: "increase",
    quantity: 100,
    reason: "Bulk order restocking",
    date: "2024-01-13",
    user: "Admin",
  },
]

export function StockAdjustments() {
  const [showForm, setShowForm] = useState(false)
  const [adjustmentData, setAdjustmentData] = useState({
    product: "",
    type: "",
    quantity: "",
    reason: "",
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stock Adjustments</h2>
        <Button onClick={() => setShowForm(true)}>
          <Package className="w-4 h-4 mr-2" />
          New Adjustment
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Stock Adjustment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product">Product</Label>
              <Select
                value={adjustmentData.product}
                onValueChange={(value) => setAdjustmentData({ ...adjustmentData, product: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WH-001">Wireless Headphones (WH-001)</SelectItem>
                  <SelectItem value="SW-002">Smart Watch (SW-002)</SelectItem>
                  <SelectItem value="UC-004">USB-C Cable (UC-004)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adjustment-type">Adjustment Type</Label>
                <Select
                  value={adjustmentData.type}
                  onValueChange={(value) => setAdjustmentData({ ...adjustmentData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">Increase Stock</SelectItem>
                    <SelectItem value="decrease">Decrease Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={adjustmentData.quantity}
                  onChange={(e) => setAdjustmentData({ ...adjustmentData, quantity: e.target.value })}
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                value={adjustmentData.reason}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                placeholder="Reason for adjustment"
                rows={3}
              />
            </div>

            <div className="flex space-x-4">
              <Button>Apply Adjustment</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Adjustments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAdjustments.map((adjustment) => (
              <div key={adjustment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {adjustment.type === "increase" ? (
                    <Plus className="w-6 h-6 text-green-600" />
                  ) : (
                    <Minus className="w-6 h-6 text-red-600" />
                  )}
                  <div>
                    <h3 className="font-medium">{adjustment.product}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {adjustment.sku}</p>
                    <p className="text-sm text-muted-foreground">{adjustment.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={adjustment.type === "increase" ? "default" : "destructive"}>
                    {adjustment.type === "increase" ? "+" : "-"}
                    {adjustment.quantity}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{adjustment.date}</p>
                  <p className="text-xs text-muted-foreground">by {adjustment.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Package, ShoppingCart } from "lucide-react"

const lowStockItems = [
  {
    id: 1,
    name: "Smart Watch",
    sku: "SW-002",
    currentStock: 8,
    threshold: 10,
    category: "Electronics",
    lastRestocked: "2024-01-10",
  },
  {
    id: 2,
    name: "Phone Case",
    sku: "PC-005",
    currentStock: 3,
    threshold: 15,
    category: "Accessories",
    lastRestocked: "2024-01-08",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    sku: "BS-006",
    currentStock: 5,
    threshold: 12,
    category: "Electronics",
    lastRestocked: "2024-01-05",
  },
]

const outOfStockItems = [
  {
    id: 1,
    name: "Laptop Stand",
    sku: "LS-003",
    category: "Accessories",
    lastSold: "2024-01-15",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    sku: "WM-007",
    category: "Electronics",
    lastSold: "2024-01-14",
  },
]

export function LowStockAlerts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <CardTitle>Low Stock Alerts</CardTitle>
            <Badge variant="secondary">{lowStockItems.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8 text-orange-500" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {item.currentStock} (Threshold: {item.threshold})
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Stock
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <CardTitle>Out of Stock</CardTitle>
            <Badge variant="destructive">{outOfStockItems.length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outOfStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    <p className="text-sm text-muted-foreground">Last sold: {item.lastSold}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Restock Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

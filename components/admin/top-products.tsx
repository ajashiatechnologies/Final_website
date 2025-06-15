"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const topProducts = [
  { name: "Wireless Headphones", sales: 1234, revenue: "$24,680" },
  { name: "Smart Watch", sales: 987, revenue: "$19,740" },
  { name: "Laptop Stand", sales: 756, revenue: "$15,120" },
  { name: "USB-C Cable", sales: 654, revenue: "$6,540" },
  { name: "Phone Case", sales: 543, revenue: "$5,430" },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="text-right">
                <p className="font-medium">{product.revenue}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sold</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

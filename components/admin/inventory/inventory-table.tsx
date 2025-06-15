"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, AlertTriangle } from "lucide-react"

const inventory = [
  {
    id: 1,
    name: "Wireless Headphones",
    sku: "WH-001",
    category: "Electronics",
    stock: 45,
    lowStockThreshold: 10,
    price: "$99.99",
    status: "in-stock",
  },
  {
    id: 2,
    name: "Smart Watch",
    sku: "SW-002",
    category: "Electronics",
    stock: 8,
    lowStockThreshold: 10,
    price: "$199.99",
    status: "low-stock",
  },
  {
    id: 3,
    name: "Laptop Stand",
    sku: "LS-003",
    category: "Accessories",
    stock: 0,
    lowStockThreshold: 5,
    price: "$29.99",
    status: "out-of-stock",
  },
  {
    id: 4,
    name: "USB-C Cable",
    sku: "UC-004",
    category: "Accessories",
    stock: 120,
    lowStockThreshold: 20,
    price: "$12.99",
    status: "in-stock",
  },
]

export function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockBadge = (item: (typeof inventory)[0]) => {
    if (item.stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (item.stock <= item.lowStockThreshold) {
      return <Badge variant="secondary">Low Stock</Badge>
    } else {
      return <Badge variant="default">In Stock</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Inventory Overview</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">SKU</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      {item.stock <= item.lowStockThreshold && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-2 font-mono text-sm">{item.sku}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">
                    <span className={item.stock <= item.lowStockThreshold ? "text-orange-600" : ""}>{item.stock}</span>
                  </td>
                  <td className="p-2">{item.price}</td>
                  <td className="p-2">{getStockBadge(item)}</td>
                  <td className="p-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    sku: "WH-001",
    price: "$99.99",
    stock: 45,
    category: "Electronics",
    status: "active",
  },
  {
    id: 2,
    name: "Smart Watch",
    sku: "SW-002",
    price: "$199.99",
    stock: 8,
    category: "Electronics",
    status: "active",
  },
  {
    id: 3,
    name: "Laptop Stand",
    sku: "LS-003",
    price: "$29.99",
    stock: 0,
    category: "Accessories",
    status: "inactive",
  },
  {
    id: 4,
    name: "USB-C Cable",
    sku: "UC-004",
    price: "$12.99",
    stock: 120,
    category: "Accessories",
    status: "active",
  },
]

export function BulkOperations() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [bulkValue, setBulkValue] = useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const executeBulkAction = () => {
    console.log("Executing bulk action:", bulkAction, "on products:", selectedProducts, "with value:", bulkValue)
    // Implement bulk action logic here
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={handleSelectAll} />
                <span className="text-sm font-medium">
                  {selectedProducts.length} of {products.length} selected
                </span>
              </div>
              {selectedProducts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Bulk Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="update-price">Update Price</SelectItem>
                      <SelectItem value="update-stock">Update Stock</SelectItem>
                      <SelectItem value="change-category">Change Category</SelectItem>
                      <SelectItem value="activate">Activate</SelectItem>
                      <SelectItem value="deactivate">Deactivate</SelectItem>
                      <SelectItem value="delete">Delete</SelectItem>
                    </SelectContent>
                  </Select>
                  {(bulkAction === "update-price" || bulkAction === "update-stock") && (
                    <Input
                      placeholder="Value"
                      value={bulkValue}
                      onChange={(e) => setBulkValue(e.target.value)}
                      className="w-24"
                    />
                  )}
                  <Button onClick={executeBulkAction} disabled={!bulkAction}>
                    Apply
                  </Button>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-12"></th>
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">SKU</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                        />
                      </td>
                      <td className="p-2 font-medium">{product.name}</td>
                      <td className="p-2 font-mono text-sm">{product.sku}</td>
                      <td className="p-2">{product.price}</td>
                      <td className="p-2">{product.stock}</td>
                      <td className="p-2">{product.category}</td>
                      <td className="p-2">
                        <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

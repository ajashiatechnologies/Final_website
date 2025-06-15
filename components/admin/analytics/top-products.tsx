"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Eye, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface TopProduct {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
  views: number
  conversionRate: number
  trend: "up" | "down" | "stable"
  trendPercentage: number
}

const mockTopProducts: TopProduct[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    sales: 1247,
    revenue: 124700,
    views: 15420,
    conversionRate: 8.1,
    trend: "up",
    trendPercentage: 12.5,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    sales: 892,
    revenue: 178400,
    views: 12340,
    conversionRate: 7.2,
    trend: "up",
    trendPercentage: 8.3,
  },
  {
    id: "3",
    name: "Laptop Stand Adjustable",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
    sales: 634,
    revenue: 31700,
    views: 9876,
    conversionRate: 6.4,
    trend: "down",
    trendPercentage: 3.2,
  },
  {
    id: "4",
    name: "Wireless Charging Pad",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop",
    sales: 567,
    revenue: 22680,
    views: 8765,
    conversionRate: 6.5,
    trend: "stable",
    trendPercentage: 0.5,
  },
  {
    id: "5",
    name: "USB-C Hub Multiport",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=100&h=100&fit=crop",
    sales: 445,
    revenue: 26700,
    views: 7234,
    conversionRate: 6.2,
    trend: "up",
    trendPercentage: 15.7,
  },
]

export function TopProducts() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Products</CardTitle>
        <CardDescription>Best selling products based on sales volume and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTopProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <ShoppingCart className="h-3 w-3" />
                      <span>{formatNumber(product.sales)} sales</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(product.views)} views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-right">
                <div>
                  <div className="font-semibold text-sm">{formatCurrency(product.revenue)}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>

                <div>
                  <div className="font-semibold text-sm">{product.conversionRate}%</div>
                  <div className="text-xs text-muted-foreground">Conversion</div>
                </div>

                <div className="flex items-center space-x-1">
                  {getTrendIcon(product.trend)}
                  <span className={`text-xs font-medium ${getTrendColor(product.trend)}`}>
                    {product.trendPercentage}%
                  </span>
                </div>

                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing top 5 products from last 30 days</div>
            <Button variant="outline" size="sm">
              View All Products
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

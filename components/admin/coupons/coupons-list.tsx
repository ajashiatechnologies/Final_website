"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Copy } from "lucide-react"

const coupons = [
  {
    id: 1,
    code: "SUMMER20",
    discount: "20%",
    type: "percentage",
    minOrder: "$50",
    maxUses: 1000,
    used: 245,
    expiresAt: "2024-08-31",
    isActive: true,
  },
  {
    id: 2,
    code: "WELCOME10",
    discount: "$10",
    type: "fixed",
    minOrder: "$25",
    maxUses: 500,
    used: 89,
    expiresAt: "2024-12-31",
    isActive: true,
  },
  {
    id: 3,
    code: "EXPIRED15",
    discount: "15%",
    type: "percentage",
    minOrder: "$30",
    maxUses: 200,
    used: 200,
    expiresAt: "2024-01-15",
    isActive: false,
  },
]

export function CouponsList() {
  return (
    <div className="space-y-4">
      {coupons.map((coupon) => (
        <Card key={coupon.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-lg">
                  <span className="font-mono font-bold text-blue-800 dark:text-blue-200">{coupon.code}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-lg">{coupon.discount} off</span>
                    <Badge variant={coupon.isActive ? "default" : "secondary"}>
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Min order: {coupon.minOrder} • Used: {coupon.used}/{coupon.maxUses}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires: {coupon.expiresAt}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

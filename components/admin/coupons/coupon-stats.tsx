"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "SUMMER20", uses: 245, revenue: 4900 },
  { name: "WELCOME10", uses: 89, revenue: 890 },
  { name: "FLASH15", uses: 156, revenue: 2340 },
  { name: "SAVE25", uses: 78, revenue: 1950 },
]

const stats = [
  { label: "Active Coupons", value: "12" },
  { label: "Total Uses", value: "1,234" },
  { label: "Revenue Impact", value: "$24,680" },
  { label: "Avg Discount", value: "18%" },
]

export function CouponStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

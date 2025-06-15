"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", conversions: 65, rate: 3.2 },
  { name: "Feb", conversions: 59, rate: 2.8 },
  { name: "Mar", conversions: 80, rate: 4.1 },
  { name: "Apr", conversions: 81, rate: 4.3 },
  { name: "May", conversions: 56, rate: 2.9 },
  { name: "Jun", conversions: 55, rate: 2.7 },
]

export function ConversionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rate" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

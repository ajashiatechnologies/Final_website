"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", visitors: 2400, pageViews: 4000 },
  { name: "Tue", visitors: 1398, pageViews: 3000 },
  { name: "Wed", visitors: 9800, pageViews: 2000 },
  { name: "Thu", visitors: 3908, pageViews: 2780 },
  { name: "Fri", visitors: 4800, pageViews: 1890 },
  { name: "Sat", visitors: 3800, pageViews: 2390 },
  { name: "Sun", visitors: 4300, pageViews: 3490 },
]

export function TrafficChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

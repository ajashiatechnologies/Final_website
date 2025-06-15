"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, UserCheck, UserX } from "lucide-react"

const userStats = [
  {
    title: "Total Users",
    value: "12,234",
    change: "+5.2%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "New Users (30d)",
    value: "234",
    change: "+12.5%",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    title: "Active Users",
    value: "11,890",
    change: "+3.1%",
    icon: UserCheck,
    color: "text-purple-600",
  },
  {
    title: "Suspended Users",
    value: "344",
    change: "-8.2%",
    icon: UserX,
    color: "text-red-600",
  },
]

const userSegments = [
  { segment: "New Customers", count: 2340, percentage: 19.1 },
  { segment: "Returning Customers", count: 7890, percentage: 64.5 },
  { segment: "VIP Customers", count: 1560, percentage: 12.7 },
  { segment: "Inactive", count: 444, percentage: 3.6 },
]

export function UserStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userSegments.map((segment) => (
              <div key={segment.segment} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{segment.segment}</span>
                  <span className="text-sm text-muted-foreground">{segment.count} users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${segment.percentage}%` }} />
                  </div>
                  <span className="text-sm font-medium">{segment.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

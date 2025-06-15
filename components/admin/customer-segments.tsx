"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users } from "lucide-react"

const segments = [
  {
    id: 1,
    name: "High Value Customers",
    description: "Customers who have spent over $500",
    criteria: "Total spent > $500",
    userCount: 1234,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    name: "Frequent Buyers",
    description: "Customers with 5+ orders in the last 6 months",
    criteria: "Orders >= 5 AND Last order < 6 months",
    userCount: 2567,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "At Risk Customers",
    description: "Customers who haven't ordered in 3+ months",
    criteria: "Last order > 3 months",
    userCount: 890,
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: 4,
    name: "New Customers",
    description: "Customers who joined in the last 30 days",
    criteria: "Join date < 30 days",
    userCount: 456,
    color: "bg-purple-100 text-purple-800",
  },
]

export function CustomerSegments() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newSegment, setNewSegment] = useState({
    name: "",
    description: "",
    criteria: {
      field: "",
      operator: "",
      value: "",
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Segments</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Segment
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {segments.map((segment) => (
          <Card key={segment.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{segment.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{segment.description}</p>
                  <Badge className={segment.color}>{segment.criteria}</Badge>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{segment.userCount.toLocaleString()} customers</span>
                </div>
                <Button variant="outline" size="sm">
                  View Customers
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Segment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="segment-name">Segment Name</Label>
              <Input
                id="segment-name"
                value={newSegment.name}
                onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
                placeholder="e.g., Premium Customers"
              />
            </div>
            <div>
              <Label htmlFor="segment-description">Description</Label>
              <Input
                id="segment-description"
                value={newSegment.description}
                onChange={(e) => setNewSegment({ ...newSegment, description: e.target.value })}
                placeholder="Describe this customer segment"
              />
            </div>
            <div>
              <Label>Criteria</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={newSegment.criteria.field}
                  onValueChange={(value) =>
                    setNewSegment({
                      ...newSegment,
                      criteria: { ...newSegment.criteria, field: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total_spent">Total Spent</SelectItem>
                    <SelectItem value="order_count">Order Count</SelectItem>
                    <SelectItem value="last_order">Last Order</SelectItem>
                    <SelectItem value="join_date">Join Date</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={newSegment.criteria.operator}
                  onValueChange={(value) =>
                    setNewSegment({
                      ...newSegment,
                      criteria: { ...newSegment.criteria, operator: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater_than">Greater than</SelectItem>
                    <SelectItem value="less_than">Less than</SelectItem>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="between">Between</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={newSegment.criteria.value}
                  onChange={(e) =>
                    setNewSegment({
                      ...newSegment,
                      criteria: { ...newSegment.criteria, value: e.target.value },
                    })
                  }
                  placeholder="Value"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button>Create Segment</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

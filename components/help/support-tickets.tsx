"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

const tickets = [
  {
    id: "TICK-001",
    subject: "Order not received",
    status: "open",
    priority: "high",
    created: "2024-01-15",
    lastUpdate: "2024-01-16",
  },
  {
    id: "TICK-002",
    subject: "Refund request",
    status: "in-progress",
    priority: "medium",
    created: "2024-01-14",
    lastUpdate: "2024-01-15",
  },
  {
    id: "TICK-003",
    subject: "Product question",
    status: "resolved",
    priority: "low",
    created: "2024-01-13",
    lastUpdate: "2024-01-14",
  },
]

export function SupportTickets() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                  <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={ticket.status === "resolved" ? "default" : "secondary"}>{ticket.status}</Badge>
                  <Badge variant={ticket.priority === "high" ? "destructive" : "outline"}>{ticket.priority}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Created: {ticket.created}</span>
                <span>Last update: {ticket.lastUpdate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

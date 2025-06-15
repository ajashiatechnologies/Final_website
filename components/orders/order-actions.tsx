"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Download, RotateCcw, AlertCircle } from "lucide-react"

interface OrderActionsProps {
  orderId: string
}

export function OrderActions({ orderId }: OrderActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>

        <Button variant="outline" className="w-full justify-start">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reorder Items
        </Button>

        <Button variant="outline" className="w-full justify-start">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Support
        </Button>

        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
          <AlertCircle className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </CardContent>
    </Card>
  )
}

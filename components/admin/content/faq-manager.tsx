"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'Order History' section.",
    category: "Orders",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Items must be in original condition.",
    category: "Returns",
  },
]

export function FAQManager() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">FAQ Management</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground mb-2">{faq.answer}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{faq.category}</span>
                </div>
                <div className="flex space-x-2">
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

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="faq-question">Question</Label>
              <Input id="faq-question" placeholder="Enter the question" />
            </div>
            <div>
              <Label htmlFor="faq-answer">Answer</Label>
              <Textarea id="faq-answer" placeholder="Enter the answer" rows={4} />
            </div>
            <div>
              <Label htmlFor="faq-category">Category</Label>
              <Input id="faq-category" placeholder="e.g., Orders, Returns, Shipping" />
            </div>
            <div className="flex space-x-4">
              <Button>Save FAQ</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

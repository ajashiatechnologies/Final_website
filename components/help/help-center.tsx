"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Book, MessageCircle, Phone, Mail } from "lucide-react"

const helpCategories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of using our platform",
    articles: 12,
  },
  {
    icon: MessageCircle,
    title: "Orders & Shipping",
    description: "Track orders, shipping info, and returns",
    articles: 8,
  },
  {
    icon: Phone,
    title: "Account & Billing",
    description: "Manage your account and payment methods",
    articles: 15,
  },
  {
    icon: Mail,
    title: "Technical Support",
    description: "Troubleshoot technical issues",
    articles: 6,
  },
]

export function HelpCenter() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for help articles..." className="pl-10" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {helpCategories.map((category) => (
          <Card key={category.title} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <category.icon className="w-8 h-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

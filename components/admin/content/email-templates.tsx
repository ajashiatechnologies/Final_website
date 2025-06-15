"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Eye } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Order Confirmation",
    subject: "Your order has been confirmed",
    content: "Thank you for your order! Your order #{{orderNumber}} has been confirmed and will be processed shortly.",
  },
  {
    id: 2,
    name: "Shipping Notification",
    subject: "Your order is on the way",
    content: "Great news! Your order #{{orderNumber}} has been shipped and is on its way to you.",
  },
  {
    id: 3,
    name: "Welcome Email",
    subject: "Welcome to Ajashia",
    content: "Welcome to Ajashia! We're excited to have you as part of our community.",
  },
]

export function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Email Templates</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate.id === template.id
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.subject}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Edit Template: {selectedTemplate.name}</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input id="subject" value={selectedTemplate.subject} onChange={() => {}} />
                </div>
                <div>
                  <Label htmlFor="content">Email Content</Label>
                  <Textarea
                    id="content"
                    value={selectedTemplate.content}
                    onChange={() => {}}
                    rows={10}
                    placeholder="Use {{variables}} for dynamic content"
                  />
                </div>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input id="from-name" placeholder="Ajashia Team" />
                </div>
                <div>
                  <Label htmlFor="from-email">From Email</Label>
                  <Input id="from-email" placeholder="noreply@ajashia.com" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

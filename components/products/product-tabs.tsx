"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/types"

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  const specifications = {
    Model: product.name,
    Brand: "Ajashia Technologies",
    Category: product.category || "Electronics",
    Stock: product.stock.toString(),
    Weight: "150g",
    Dimensions: "10 x 5 x 2 cm",
    Power: "5V DC",
    "Operating Temperature": "-10°C to 60°C",
    Warranty: "2 years",
  }

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Product Description</h3>
              <p className="mb-4">{product.description}</p>

              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>High-quality electronic components</li>
                <li>Easy to use and integrate</li>
                <li>Compatible with Arduino and Raspberry Pi</li>
                <li>Comprehensive documentation included</li>
                <li>Perfect for beginners and professionals</li>
              </ul>

              <h4 className="font-semibold mb-2">What's in the Box:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>1x {product.name}</li>
                <li>1x Quick start guide</li>
                <li>1x Warranty card</li>
                <li>Sample code and tutorials (digital download)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="shipping" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Shipping Options:</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Standard Shipping (5-7 business days)</span>
                    <span className="font-medium">$5.99</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Express Shipping (2-3 business days)</span>
                    <span className="font-medium">$12.99</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Overnight Shipping (1 business day)</span>
                    <span className="font-medium">$24.99</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Free Shipping (orders over $50)</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">International Shipping:</h4>
                <p className="text-muted-foreground">
                  We ship worldwide! International shipping rates vary by destination. Delivery time is typically 7-14
                  business days.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Order Processing:</h4>
                <p className="text-muted-foreground">
                  Orders placed before 2 PM EST are processed the same day. Orders placed after 2 PM EST are processed
                  the next business day.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="support" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Technical Support:</h4>
                <p className="text-muted-foreground mb-2">
                  Our technical support team is available to help with any questions about this product.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• Email: support@ajashia.com</li>
                  <li>• Phone: 1-800-AJASHIA</li>
                  <li>• Live Chat: Available 9 AM - 6 PM EST</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Documentation:</h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    •{" "}
                    <a href="#" className="text-primary hover:underline">
                      Download User Manual (PDF)
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a href="#" className="text-primary hover:underline">
                      Sample Code Repository
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a href="#" className="text-primary hover:underline">
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    •{" "}
                    <a href="#" className="text-primary hover:underline">
                      Community Forum
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Warranty:</h4>
                <p className="text-muted-foreground">
                  This product comes with a 2-year manufacturer warranty covering defects in materials and workmanship.
                  Warranty does not cover damage from misuse or normal wear and tear.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

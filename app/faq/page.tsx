"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const faqCategories = [
  {
    title: "Orders & Shipping",
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping are also available. Free shipping is offered on orders over $50.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your orders in your account dashboard.",
      },
      {
        question: "What if my order is damaged?",
        answer:
          "We're sorry to hear that! Please contact our support team within 48 hours of delivery with photos of the damaged items. We'll arrange a replacement or refund immediately.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Please check our shipping calculator at checkout.",
      },
    ],
  },
  {
    title: "Products & Technical",
    faqs: [
      {
        question: "Are your products genuine?",
        answer:
          "All our products are sourced directly from manufacturers or authorized distributors. We guarantee 100% authentic components with full warranty coverage.",
      },
      {
        question: "Do you provide technical support?",
        answer:
          "Yes! Our team of electronics engineers provides free technical support via email, live chat, and phone. We also have extensive documentation and tutorials available.",
      },
      {
        question: "What's included with Arduino boards?",
        answer:
          "Our Arduino boards come with the board itself, a USB cable, quick start guide, and access to our online tutorials and sample code library.",
      },
      {
        question: "Can I get bulk pricing?",
        answer:
          "Yes! We offer volume discounts for orders over 10 units of the same product. Contact our sales team for custom pricing on large orders.",
      },
    ],
  },
  {
    title: "Returns & Warranty",
    faqs: [
      {
        question: "What's your return policy?",
        answer:
          "We offer a 30-day return policy for unused items in original packaging. Electronic components must be in new condition. Return shipping is free for defective items.",
      },
      {
        question: "How long is the warranty?",
        answer:
          "Most products come with a 2-year manufacturer warranty. Some specialized components may have different warranty periods - check the product page for details.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Log into your account, go to Order History, and click 'Return Item' next to the product. Print the prepaid return label and drop off at any shipping location.",
      },
    ],
  },
  {
    title: "Account & Payment",
    faqs: [
      {
        question: "Do I need an account to order?",
        answer:
          "Yes, we require account creation for all orders to ensure order tracking, warranty coverage, and the best customer service experience.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes! We use industry-standard SSL encryption and are PCI DSS compliant. We never store your full credit card information on our servers.",
      },
      {
        question: "Can I save multiple addresses?",
        answer:
          "Yes! You can save multiple shipping and billing addresses in your account for faster checkout. You can also set a default address.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about our products and services
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Contact Support */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                <MessageCircle className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <h3 className="font-semibold">Still need help?</h3>
                  <p className="text-sm text-muted-foreground">Our support team is here to help</p>
                </div>
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <Card key={faqIndex}>
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                        >
                          <h3 className="font-semibold pr-4">{faq.question}</h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </button>

                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          <div className="px-6 pb-6">
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">Try different keywords or browse our categories above</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

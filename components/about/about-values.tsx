"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Zap, Users } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make puts our customers at the center",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data and transactions are protected with enterprise-grade security",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously evolve to bring you the latest technology and features",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building lasting relationships with customers, partners, and team members",
  },
]

export function AboutValues() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6 text-center">
                <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

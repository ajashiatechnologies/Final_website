"use client"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Happy Customers", value: "2M+" },
  { label: "Products Sold", value: "10M+" },
  { label: "Countries Served", value: "25+" },
  { label: "Team Members", value: "500+" },
]

export function AboutStats() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

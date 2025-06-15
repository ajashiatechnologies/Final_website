"use client"

import { Card, CardContent } from "@/components/ui/card"

const timeline = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to revolutionize online shopping",
  },
  {
    year: "2021",
    title: "First Million Users",
    description: "Reached our first major milestone with 1M registered users",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded operations to 15 countries worldwide",
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Launched AI-powered recommendations and customer service",
  },
  {
    year: "2024",
    title: "Sustainability Focus",
    description: "Committed to carbon-neutral shipping and eco-friendly packaging",
  },
]

export function AboutTimeline() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <div key={item.year} className="flex items-start mb-8">
              <div className="flex-shrink-0 w-24 text-right mr-8">
                <span className="text-2xl font-bold text-blue-600">{item.year}</span>
              </div>
              <div className="flex-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

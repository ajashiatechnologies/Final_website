"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Headphones, Award } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50. Express delivery available.",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "All products tested and verified. 30-day return policy.",
    color: "text-green-500",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Technical support from electronics engineers and makers.",
    color: "text-purple-500",
  },
  {
    icon: Award,
    title: "Trusted Brand",
    description: "Over 5 years serving the maker community worldwide.",
    color: "text-orange-500",
  },
]

export function FeaturesHighlight() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Ajashia Technologies?</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            We're committed to providing the best experience for makers and tech enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-background p-3 shadow-sm">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

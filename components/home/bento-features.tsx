"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Shield, Headphones, Zap, Award, Globe } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free shipping on orders over $50. Express delivery available.",
    color: "bg-blue-500/10 text-blue-500",
    size: "large",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "All products tested and verified.",
    color: "bg-green-500/10 text-green-500",
    size: "small",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert technical support when you need it.",
    color: "bg-purple-500/10 text-purple-500",
    size: "small",
  },
  {
    icon: Zap,
    title: "Latest Technology",
    description: "Cutting-edge components and modules for modern projects.",
    color: "bg-yellow-500/10 text-yellow-500",
    size: "large",
  },
  {
    icon: Award,
    title: "Trusted Brand",
    description: "Over 50,000 satisfied customers worldwide.",
    color: "bg-red-500/10 text-red-500",
    size: "medium",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Shipping to 100+ countries.",
    color: "bg-cyan-500/10 text-cyan-500",
    size: "medium",
  },
]

export function BentoFeatures() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us</h2>
        <p className="mt-4 text-xl text-muted-foreground">Everything you need for your electronics projects</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {features.map((feature, index) => {
          const sizeClasses = {
            small: "md:col-span-2 lg:col-span-2",
            medium: "md:col-span-2 lg:col-span-2",
            large: "md:col-span-4 lg:col-span-3",
          }

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${sizeClasses[feature.size as keyof typeof sizeClasses]}`}
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="flex h-full flex-col justify-center p-6">
                  <div className={`mb-4 inline-flex rounded-full p-3 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  {feature.size === "large" && (
                    <Badge variant="secondary" className="mt-4 w-fit">
                      Popular
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

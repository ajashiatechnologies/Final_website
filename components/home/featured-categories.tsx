"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Zap, Box, PenToolIcon as Tool, Layers, Wifi, Lightbulb, BookOpen } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Arduino",
    icon: Cpu,
    description: "Boards, shields, and accessories",
    href: "/categories/arduino",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Sensors",
    icon: Zap,
    description: "Temperature, motion, light sensors",
    href: "/categories/sensors",
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "Modules",
    icon: Layers,
    description: "Display, audio, and communication modules",
    href: "/categories/modules",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "Kits",
    icon: Box,
    description: "Complete project kits for all levels",
    href: "/categories/kits",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "Components",
    icon: Lightbulb,
    description: "LEDs, resistors, capacitors, and more",
    href: "/categories/components",
    color: "bg-red-500/10 text-red-500",
  },
  {
    name: "Tools",
    icon: Tool,
    description: "Soldering irons, multimeters, and tools",
    href: "/categories/tools",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    name: "IoT",
    icon: Wifi,
    description: "WiFi, Bluetooth, and IoT modules",
    href: "/categories/iot",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    name: "Learning",
    icon: BookOpen,
    description: "Books, courses, and tutorials",
    href: "/categories/learning",
    color: "bg-pink-500/10 text-pink-500",
  },
]

export function FeaturedCategories() {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          Featured Categories
        </motion.h2>
        <p className="mt-4 text-xl text-muted-foreground">Explore our wide range of electronic components and kits</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={category.href} className="block h-full">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className={`mb-4 rounded-full p-3 ${category.color}`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

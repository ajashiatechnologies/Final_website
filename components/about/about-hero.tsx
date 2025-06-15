"use client"

import { Button } from "@/components/ui/button"

export function AboutHero() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About Ajashia</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          We're passionate about bringing you the best products with exceptional service and innovation.
        </p>
        <Button size="lg" variant="secondary">
          Learn More
        </Button>
      </div>
    </section>
  )
}

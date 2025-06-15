"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Marquee } from "@/components/magicui/marquee"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex Chen",
    username: "@alexchen",
    body: "Amazing quality components! My Arduino projects have never been more reliable. Fast shipping and excellent customer service.",
    img: "https://avatar.vercel.sh/alex",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    username: "@sarahj",
    body: "The sensor kit is incredible value for money. Perfect for my engineering students. Highly recommend!",
    img: "https://avatar.vercel.sh/sarah",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    username: "@mikero",
    body: "Been ordering from Ajashia for 2 years. Consistent quality and they always have the latest components in stock.",
    img: "https://avatar.vercel.sh/mike",
    rating: 5,
  },
  {
    name: "Emily Davis",
    username: "@emilyd",
    body: "Great selection of project kits. The documentation and tutorials are really helpful for beginners.",
    img: "https://avatar.vercel.sh/emily",
    rating: 5,
  },
  {
    name: "David Kim",
    username: "@davidk",
    body: "Professional grade components at maker-friendly prices. Their technical support team is incredibly knowledgeable.",
    img: "https://avatar.vercel.sh/david",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    username: "@lisaw",
    body: "The IoT modules work perfectly out of the box. Saved me hours of debugging. Will definitely order again!",
    img: "https://avatar.vercel.sh/lisa",
    rating: 5,
  },
]

const firstRow = testimonials.slice(0, testimonials.length / 2)
const secondRow = testimonials.slice(testimonials.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
}: {
  img: string
  name: string
  username: string
  body: string
  rating: number
}) => {
  return (
    <Card className="w-80 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={img || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-muted-foreground">{username}</div>
          </div>
        </div>
        <div className="flex mb-3">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm">{body}</p>
      </CardContent>
    </Card>
  )
}

export function CustomerTestimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-xl text-muted-foreground">Join thousands of satisfied makers and engineers</p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  )
}

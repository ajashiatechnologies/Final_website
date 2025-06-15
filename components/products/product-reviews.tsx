"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductReviewsProps {
  productId: string
}

const mockReviews = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      verified: true,
    },
    rating: 5,
    title: "Excellent quality and fast shipping!",
    content:
      "This Arduino board exceeded my expectations. The build quality is fantastic and it works perfectly with all my projects. Shipping was incredibly fast too!",
    date: "2024-01-15",
    helpful: 12,
    notHelpful: 1,
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      verified: true,
    },
    rating: 4,
    title: "Great for beginners",
    content:
      "Perfect for someone just starting with electronics. The documentation is clear and the examples work right out of the box. Only minor issue is the packaging could be better.",
    date: "2024-01-10",
    helpful: 8,
    notHelpful: 0,
  },
  {
    id: "3",
    user: {
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: false,
    },
    rating: 5,
    title: "Professional grade components",
    content:
      "I've been using Ajashia products for years and they never disappoint. This latest board is no exception - reliable, well-made, and competitively priced.",
    date: "2024-01-05",
    helpful: 15,
    notHelpful: 2,
  },
]

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, title: "", content: "" })

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: mockReviews.filter((review) => review.rating === rating).length,
    percentage: (mockReviews.filter((review) => review.rating === rating).length / mockReviews.length) * 100,
  }))

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rating Summary */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                      )}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">Based on {mockReviews.length} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-8">{rating}★</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="w-8 text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review */}
            <div className="space-y-4">
              <h3 className="font-semibold">Write a Review</h3>
              {!showReviewForm ? (
                <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewReview((prev) => ({ ...prev, rating }))}
                          className="p-1"
                        >
                          <Star
                            className={cn(
                              "h-6 w-6",
                              rating <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <input
                      type="text"
                      placeholder="Review title"
                      value={newReview.title}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Review</label>
                    <Textarea
                      placeholder="Write your review..."
                      value={newReview.content}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button>Submit Review</Button>
                    <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.user.name}</span>
                    {review.user.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.title}</span>
                  </div>

                  <p className="text-muted-foreground">{review.content}</p>

                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                      <ThumbsDown className="h-4 w-4" />
                      Not helpful ({review.notHelpful})
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

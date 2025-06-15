"use client"

import React, { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Star, Trash2, Edit } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Review {
  id: string
  rating: number
  comment: string
  created_at: string
  product_id: string
  products: {
    name: string
    images: string[]
  }
}

export default function ProductReviewsManagementPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null)
  const [editedRating, setEditedRating] = useState(0)
  const [editedComment, setEditedComment] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError("Please sign in to view your reviews.")
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          comment,
          created_at,
          product_id,
          products ( name, images )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (err: any) {
      console.error("Error fetching reviews:", err)
      setError(err.message || "Failed to load reviews.")
      toast({
        title: "Error",
        description: err.message || "Failed to load reviews.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (reviewId: string) => {
    setReviewToDelete(reviewId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!reviewToDelete) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewToDelete)

      if (error) throw error

      toast({
        title: "Review Deleted",
        description: "Your review has been successfully deleted.",
      })
      fetchReviews() // Refresh reviews
    } catch (err: any) {
      console.error("Error deleting review:", err)
      toast({
        title: "Error",
        description: err.message || "Failed to delete review.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsDeleteDialogOpen(false)
      setReviewToDelete(null)
    }
  }

  const handleEditClick = (review: Review) => {
    setReviewToEdit(review)
    setEditedRating(review.rating)
    setEditedComment(review.comment)
    setIsEditDialogOpen(true)
  }

  const confirmEdit = async () => {
    if (!reviewToEdit) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from("reviews")
        .update({
          rating: editedRating,
          comment: editedComment,
          updated_at: new Date().toISOString(),
        })
        .eq("id", reviewToEdit.id)

      if (error) throw error

      toast({
        title: "Review Updated",
        description: "Your review has been successfully updated.",
      })
      fetchReviews() // Refresh reviews
    } catch (err: any) {
      console.error("Error updating review:", err)
      toast({
        title: "Error",
        description: err.message || "Failed to update review.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsEditDialogOpen(false)
      setReviewToEdit(null)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">My Product Reviews</h1>

      {loading && <p className="text-center text-muted-foreground">Loading your reviews...</p>}
      {error && <p className="text-center text-destructive">Error: {error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">You haven't submitted any reviews yet.</p>
            <Button className="mt-4" asChild>
              <Link href="/products">Browse Products to Review</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="flex-shrink-0">
                {review.products?.images?.[0] ? (
                  <img
                    src={review.products.images[0]}
                    alt={review.products.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{review.products?.name || "Unknown Product"}</h2>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Reviewed on {format(new Date(review.created_at), "PPP")}
                </p>
                <p className="text-sm">{review.comment}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditClick(review)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Review</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(review.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Delete Review</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Review</DialogTitle>
            <DialogDescription>
              Modify your rating and comment for "{reviewToEdit?.products?.name || ""}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="editRating" className="text-right">
                Rating
              </Label>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`cursor-pointer h-6 w-6 ${i < editedRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  onClick={() => setEditedRating(i + 1)}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editComment" className="text-right">
                Comment
              </Label>
              <Textarea
                id="editComment"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="col-span-3"
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmEdit} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const reviewId = params.id
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { rating, comment } = await request.json()

    // Ensure the review belongs to the authenticated user before updating
    const { data: existingReview, error: fetchError } = await supabase
      .from("reviews")
      .select("id, user_id")
      .eq("id", reviewId)
      .single()

    if (fetchError || !existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    if (existingReview.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized to update this review" }, { status: 403 })
    }

    const { data: updatedReview, error } = await supabase
      .from("reviews")
      .update({
        rating,
        comment,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reviewId)
      .select()
      .single()

    if (error) {
      console.error("Error updating review:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(updatedReview, { status: 200 })
  } catch (error: any) {
    console.error("Error in PUT reviews API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const reviewId = params.id
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Ensure the review belongs to the authenticated user before deleting
    const { data: existingReview, error: fetchError } = await supabase
      .from("reviews")
      .select("id, user_id")
      .eq("id", reviewId)
      .single()

    if (fetchError || !existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }

    if (existingReview.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized to delete this review" }, { status: 403 })
    }

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId)

    if (error) {
      console.error("Error deleting review:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Error in DELETE reviews API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
} 
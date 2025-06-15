import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function GET(request: NextRequest) {
  try {
    const supabaseClient = createMiddlewareClient({ req: request, res: NextResponse.next() })
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: wishlistItems, error } = await supabase
      .from("wishlists")
      .select(`
        *,
        products (
          id,
          name,
          price,
          images,
          slug
        )
      `)
      .eq("user_id", session.user.id)

    if (error) {
      console.error("Error fetching wishlist:", error)
      return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
    }

    return NextResponse.json(wishlistItems || [])
  } catch (error) {
    console.error("Error in wishlist API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseClient = createMiddlewareClient({ req: request, res: NextResponse.next() })
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { product_id } = await request.json()

    const { data: wishlistItem, error } = await supabase
      .from("wishlists")
      .insert({
        user_id: session.user.id,
        product_id,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding to wishlist:", error)
      return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
    }

    return NextResponse.json(wishlistItem)
  } catch (error) {
    console.error("Error in wishlist POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabaseClient = createMiddlewareClient({ req: request, res: NextResponse.next() })
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("product_id")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", session.user.id)
      .eq("product_id", productId)

    if (error) {
      console.error("Error removing from wishlist:", error)
      return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in wishlist DELETE API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

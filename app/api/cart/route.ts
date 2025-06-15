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

    const { data: cartItems, error } = await supabase
      .from("cart")
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
      console.error("Error fetching cart:", error)
      return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
    }

    return NextResponse.json(cartItems || [])
  } catch (error) {
    console.error("Error in cart API:", error)
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

    const { product_id, quantity } = await request.json()

    const { data: cartItem, error } = await supabase
      .from("cart")
      .upsert({
        user_id: session.user.id,
        product_id,
        quantity,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding to cart:", error)
      return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
    }

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error("Error in cart POST API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

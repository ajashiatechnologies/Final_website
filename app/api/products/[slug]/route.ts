import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select(`
        *,
        categories (
          id,
          name,
          slug
        ),
        reviews (
          id,
          rating,
          title,
          content,
          created_at,
          users (
            name
          )
        )
      `)
      .eq("slug", params.slug)
      .eq("is_active", true)
      .single()

    if (error || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get related products
    const { data: relatedProducts } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", product.category_id)
      .neq("id", product.id)
      .eq("is_active", true)
      .limit(4)

    return NextResponse.json({
      product,
      relatedProducts: relatedProducts || [],
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

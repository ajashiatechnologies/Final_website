import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// GET /api/admin/categories
export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.user_metadata.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: You must be an administrator." }, { status: 403 })
    }

    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching categories:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(categories, { status: 200 })
  } catch (error: any) {
    console.error("Error in GET categories API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// POST /api/admin/categories
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.user_metadata.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: You must be an administrator." }, { status: 403 })
    }

    const { name, description, slug } = await request.json()

    if (!name || !slug) {
      return NextResponse.json({ error: "Category name and slug are required." }, { status: 400 })
    }

    const { data: newCategory, error } = await supabase
      .from("categories")
      .insert({ name, description, slug })
      .select()
      .single()

    if (error) {
      console.error("Error creating category:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error: any) {
    console.error("Error in POST categories API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
} 
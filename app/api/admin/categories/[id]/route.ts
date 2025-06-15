import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// PUT /api/admin/categories/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const categoryId = params.id
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

    const { data: updatedCategory, error } = await supabase
      .from("categories")
      .update({ name, description, slug, updated_at: new Date().toISOString() })
      .eq("id", categoryId)
      .select()
      .single()

    if (error) {
      console.error("Error updating category:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(updatedCategory, { status: 200 })
  } catch (error: any) {
    console.error("Error in PUT categories API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const categoryId = params.id
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.user_metadata.role !== "admin") {
      return NextResponse.json({ error: "Access Denied: You must be an administrator." }, { status: 403 })
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId)

    if (error) {
      console.error("Error deleting category:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Error in DELETE categories API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
} 
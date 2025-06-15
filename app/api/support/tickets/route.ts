import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { data: tickets, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching tickets:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(tickets, { status: 200 })
  } catch (error: any) {
    console.error("Error in GET tickets API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { subject, description, priority } = await request.json()

    const { data: newTicket, error } = await supabase
      .from("support_tickets")
      .insert({
        user_id: user.id,
        subject,
        description,
        priority,
        status: "open",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating ticket:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(newTicket, { status: 201 })
  } catch (error: any) {
    console.error("Error in POST tickets API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
} 
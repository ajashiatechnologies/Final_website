import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const ticketId = params.id
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("id", ticketId)
      .eq("user_id", user.id) // Ensure users can only fetch their own tickets
      .single()

    if (error) {
      console.error("Error fetching ticket details:", error)
      if (error.code === "PGRST116") { // No rows found
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json(ticket, { status: 200 })
  } catch (error: any) {
    console.error("Error in GET ticket API:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
} 
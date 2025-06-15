import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user's role
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Get user's role from the users table
      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error("Error fetching user role:", error)
        return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=role_fetch_failed`)
      }

      // Redirect based on role
      switch (userData?.role) {
        case "admin":
          return NextResponse.redirect(`${requestUrl.origin}/admin/dashboard`)
        case "vendor":
          return NextResponse.redirect(`${requestUrl.origin}/vendor/dashboard`)
        case "user":
          return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
        default:
          return NextResponse.redirect(`${requestUrl.origin}/sign-in?error=invalid_role`)
      }
    }
  }

  // If no code or user, redirect to sign-in
  return NextResponse.redirect(`${requestUrl.origin}/sign-in`)
} 
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export async function middleware(request: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req: request, res })

//   // Refresh session if expired
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   // If no session, redirect to sign-in
//   if (!session) {
//     const redirectUrl = new URL("/sign-in", request.url)
//     redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname)
//     return NextResponse.redirect(redirectUrl)
//   }

//   // Get user's role
//   const { data: userData, error } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", session.user.id)
//     .single()

//   if (error) {
//     console.error("Error fetching user role:", error)
//     return NextResponse.redirect(new URL("/sign-in", request.url))
//   }

//   const userRole = userData?.role

//   // Protect admin routes
//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     if (userRole !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", request.url))
//     }
//   }

//   // Protect vendor routes
//   if (request.nextUrl.pathname.startsWith("/vendor")) {
//     if (userRole !== "vendor") {
//       return NextResponse.redirect(new URL("/dashboard", request.url))
//     }
//   }

//   // Protect user dashboard
//   if (request.nextUrl.pathname === "/dashboard") {
//     if (userRole !== "user") {
//       if (userRole === "admin") {
//         return NextResponse.redirect(new URL("/admin/dashboard", request.url))
//       }
//       if (userRole === "vendor") {
//         return NextResponse.redirect(new URL("/vendor/dashboard", request.url))
//       }
//     }
//   }

//   return res
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/vendor/:path*",
//     "/profile/:path*",
//     "/orders/:path*",
//   ],
// }
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
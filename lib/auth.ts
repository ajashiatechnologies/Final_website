"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
// Create a singleton client for client-side usage
// let clientSideSupabase: any = null

// export function getClientSupabase() {
//   if (!clientSideSupabase && typeof window !== "undefined") {
//     clientSideSupabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
//     )
//   }
//   return clientSideSupabase
// }

export async function signIn(email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })



  if (error) {
    return {
      status: error?.message,
      user: null
    }
  }

  revalidatePath("/", "layout")
  return { status: "success", user: data.user }
}

export async function signUp(email: string, password: string, name: String) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name
      }
    }
  })

  if (error) {
    return {
      status: error?.message,
      user: null
    }
  }
  // Create user profile
  if (data?.user?.identities?.length === 1) {
    return {
      status: "User Already Exists",
      user: null
    }
  } else {
    revalidatePath("/", "layout")
    return { status: "success", user: data.user }
  }

}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data?.user
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) return null
  return data
}

export async function checkUserRole(userId: string): Promise<string> {
  const profile = await getUserProfile(userId)
  return profile?.role || "customer"
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user profile:", error)
    return null
  }

  return data
}

export async function resetPassword(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

export async function updatePassword(password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}
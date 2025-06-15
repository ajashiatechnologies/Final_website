import { supabase } from "./supabase"
import { createClient } from "@supabase/supabase-js"

// Create a singleton client for client-side usage
let clientSideSupabase: any = null

export function getClientSupabase() {
  if (!clientSideSupabase && typeof window !== "undefined") {
    clientSideSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    )
  }
  return clientSideSupabase
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, userData: any) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw authError

  // Create user profile
  if (authData?.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      name: userData.name,
      role: "customer",
    })

    if (profileError) throw profileError
  }

  return authData
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data?.user
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) return null
  return data
}

export async function checkUserRole(userId: string): Promise<string> {
  const profile = await getUserProfile(userId)
  return profile?.role || "customer"
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user profile:", error)
    return null
  }

  return data
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}

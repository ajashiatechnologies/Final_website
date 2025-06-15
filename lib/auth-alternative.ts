import { supabase } from "./supabase"

export async function createUserProfile(userId: string, email: string, name: string) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: userId,
      email,
      name,
      role: "customer",
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating user profile:", error)
    return null
  }

  return data
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user profile:", error)
    return null
  }

  return data
}

export async function checkUserRole(userId: string): Promise<string> {
  const profile = await getUserProfile(userId)
  return profile?.role || "customer"
}

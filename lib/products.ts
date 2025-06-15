import { supabase } from "./supabase"
import type { Product } from "./types"

export async function getProducts(filters?: {
  category?: string
  search?: string
  priceRange?: [number, number]
  sort?: string
  limit?: number
  offset?: number
}) {
  let query = supabase.from("products").select(`
      *,
      categories (
        name,
        slug
      )
    `)

  if (filters?.category) {
    query = query.eq("categories.slug", filters.category)
  }

  if (filters?.search) {
    query = query.ilike("name", `%${filters.search}%`)
  }

  if (filters?.priceRange) {
    query = query.gte("price", filters.priceRange[0]).lte("price", filters.priceRange[1])
  }

  if (filters?.sort) {
    const [field, direction] = filters.sort.split("-")
    query = query.order(field, { ascending: direction === "asc" })
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

// Update the getProductBySlug function to handle both slug and id
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function getFeaturedProducts(limit = 6) {
  return getProducts({
    sort: "featured-desc",
    limit,
  })
}

export async function getRelatedProducts(categoryId: string, currentProductId: string, limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("id", currentProductId)
    .limit(limit)

  if (error) {
    console.error("Error fetching related products:", error)
    return []
  }

  return data || []
}

export async function searchProducts(query: string, filters?: any) {
  return getProducts({
    search: query,
    ...filters,
  })
}

const UNSPLASH_ACCESS_KEY = "L5YYvOg3w_qNV67bs8xBWhDrpLrcV7dn0HoyKDZNV7Y"
const UNSPLASH_BASE_URL = "https://api.unsplash.com"

export interface UnsplashImage {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  description: string
}

export async function searchUnsplashImages(query: string, count = 10): Promise<UnsplashImage[]> {
  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch images")
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Error fetching Unsplash images:", error)
    return []
  }
}

export async function getRandomUnsplashImage(query: string): Promise<string> {
  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch random image")
    }

    const data = await response.json()
    return data.urls?.regular || "/placeholder.svg"
  } catch (error) {
    console.error("Error fetching random Unsplash image:", error)
    return "/placeholder.svg"
  }
}

export function getUnsplashImageUrl(query: string, width = 400, height = 400): string {
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`
}

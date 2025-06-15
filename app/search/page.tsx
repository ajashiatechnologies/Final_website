"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchSort } from "@/components/search/search-sort"
import { ProductSearch } from "@/components/products/product-search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        {query && (
          <p className="text-muted-foreground">
            Showing results for: <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      <div className="mb-6">
        <ProductSearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchFilters />
        </aside>

        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">Found results for your search</div>
            <SearchSort />
          </div>

          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-muted rounded-lg h-64 mb-4"></div>
          <div className="bg-muted rounded h-4 mb-2"></div>
          <div className="bg-muted rounded h-4 w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

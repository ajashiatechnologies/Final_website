import { CategoryGrid } from "@/components/categories/category-grid"
import { CategoryHero } from "@/components/categories/category-hero"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <CategoryHero />
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully curated categories of electronic components, from beginner-friendly kits to advanced
            modules.
          </p>
        </div>
        <CategoryGrid />
      </div>
    </div>
  )
}

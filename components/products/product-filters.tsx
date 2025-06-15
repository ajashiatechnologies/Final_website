"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  brands: string[]
}

export function ProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    brands: [],
  })

  const [categories, setCategories] = useState<any[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*")
      setCategories(data || [])
    }

    // Fetch brands (assuming brands are stored in products)
    const fetchBrands = async () => {
      const { data } = await supabase.from("products").select("brand").not("brand", "is", null)

      const uniqueBrands = [...new Set(data?.map((item) => item.brand).filter(Boolean))]
      setBrands(uniqueBrands)
    }

    fetchCategories()
    fetchBrands()
  }, [])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, categoryId] : prev.categories.filter((id) => id !== categoryId),
    }))
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked ? [...prev.brands, brand] : prev.brands.filter((b) => b !== brand),
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      brands: [],
    })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.inStock ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Filters</CardTitle>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      rating: checked ? rating : 0,
                    }))
                  }
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                  {rating}+ ⭐
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brands */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Brands</Label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Stock Status */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, inStock: checked as boolean }))}
            />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <div>
              <Label className="text-sm font-medium mb-3 block">Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map((categoryId) => {
                  const category = categories.find((c) => c.id === categoryId)
                  return category ? (
                    <Badge key={categoryId} variant="secondary" className="text-xs">
                      {category.name}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={() => handleCategoryChange(categoryId, false)}
                      />
                    </Badge>
                  ) : null
                })}

                {filters.brands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="text-xs">
                    {brand}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleBrandChange(brand, false)} />
                  </Badge>
                ))}

                {filters.inStock && (
                  <Badge variant="secondary" className="text-xs">
                    In Stock
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((prev) => ({ ...prev, inStock: false }))}
                    />
                  </Badge>
                )}

                {filters.rating > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.rating}+ ⭐
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}
                    />
                  </Badge>
                )}

                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                  <Badge variant="secondary" className="text-xs">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 1000] }))}
                    />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

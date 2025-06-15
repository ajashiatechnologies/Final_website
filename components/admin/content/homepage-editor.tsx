"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function HomepageEditor() {
  const [heroData, setHeroData] = useState({
    title: "Welcome to Ajashia",
    subtitle: "Discover amazing products at great prices",
    ctaText: "Shop Now",
    backgroundImage: "",
    isActive: true,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero-title">Title</Label>
            <Input
              id="hero-title"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hero-cta">Call to Action Text</Label>
            <Input
              id="hero-cta"
              value={heroData.ctaText}
              onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="hero-bg">Background Image URL</Label>
            <Input
              id="hero-bg"
              value={heroData.backgroundImage}
              onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="hero-active"
              checked={heroData.isActive}
              onCheckedChange={(checked) => setHeroData({ ...heroData, isActive: checked })}
            />
            <Label htmlFor="hero-active">Active</Label>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

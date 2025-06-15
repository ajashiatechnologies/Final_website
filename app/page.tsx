import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCategories } from "@/components/home/featured-categories"
import { ProductShowcase } from "@/components/home/product-showcase"
import { FeaturesHighlight } from "@/components/home/features-highlight"
import { CustomerTestimonials } from "@/components/home/customer-testimonials"
import { NewsletterSignup } from "@/components/home/newsletter-signup"
import { TrendingProducts } from "@/components/home/trending-products"
import { BentoFeatures } from "@/components/home/bento-features"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <ProductShowcase />
      <BentoFeatures />
      <FeaturesHighlight />
      <CustomerTestimonials />
      <NewsletterSignup />
    </div>
  )
}

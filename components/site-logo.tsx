"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <ShoppingBag className="h-6 w-6" />
      <span className="font-bold text-xl">Ajashia</span>
    </Link>
  )
}

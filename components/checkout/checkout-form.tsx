"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCheckout } from "./checkout-provider"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"

interface CheckoutFormProps {
  onNext?: () => void
}

export function CheckoutForm({ onNext }: CheckoutFormProps) {
  const { shippingAddress, setShippingAddress } = useCheckout()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    email: shippingAddress?.email || "",
    firstName: shippingAddress?.firstName || "",
    lastName: shippingAddress?.lastName || "",
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    zipCode: shippingAddress?.zipCode || "",
    country: shippingAddress?.country || "IN",
    phone: shippingAddress?.phone || "",
    saveAddress: shippingAddress?.saveAddress || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Please sign in to continue")

      // Save address if requested
      if (formData.saveAddress) {
        const { error } = await supabase
          .from("addresses")
          .upsert({
            user_id: user.id,
            ...formData,
          })

        if (error) throw error
      }

      // Update checkout context
      setShippingAddress(formData)
      toast({
        title: "Shipping information saved",
        description: "Your shipping details have been updated.",
      })

      if (onNext) {
        onNext()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save shipping information",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              required
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AP">Andhra Pradesh</SelectItem>
                <SelectItem value="KA">Karnataka</SelectItem>
                <SelectItem value="TN">Tamil Nadu</SelectItem>
                <SelectItem value="MH">Maharashtra</SelectItem>
                <SelectItem value="DL">Delhi</SelectItem>
                <SelectItem value="GJ">Gujarat</SelectItem>
                <SelectItem value="UP">Uttar Pradesh</SelectItem>
                <SelectItem value="WB">West Bengal</SelectItem>
                {/* Add more states */}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="zipCode">PIN Code</Label>
            <Input
              id="zipCode"
              required
              pattern="[0-9]{6}"
              title="Please enter a valid 6-digit PIN code"
              value={formData.zipCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IN">India</SelectItem>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="saveAddress"
          checked={formData.saveAddress}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, saveAddress: checked as boolean }))}
        />
        <Label htmlFor="saveAddress">Save this address for future orders</Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Continue to Payment"}
      </Button>
    </form>
  )
}

"use client"

import { AdminCheck } from "@/components/admin-check"
import { CouponStats } from "@/components/admin/coupons/coupon-stats"
import { CouponsList } from "@/components/admin/coupons/coupons-list"
import { CreateCouponForm } from "@/components/admin/coupons/create-coupon-form"
import { PromotionScheduler } from "@/components/admin/coupons/promotion-scheduler"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminCouponsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Coupon Management</h1>
            <p className="text-muted-foreground">Create and manage discount coupons and promotions</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </div>

        <CouponStats />

        <div className="mt-8">
          <Tabs defaultValue="coupons" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="coupons">Active Coupons</TabsTrigger>
              <TabsTrigger value="scheduler">Promotion Scheduler</TabsTrigger>
            </TabsList>

            <TabsContent value="coupons" className="mt-8">
              <CouponsList />
            </TabsContent>

            <TabsContent value="scheduler" className="mt-8">
              <PromotionScheduler />
            </TabsContent>
          </Tabs>
        </div>

        {showCreateForm && <CreateCouponForm onClose={() => setShowCreateForm(false)} />}
      </div>
    </AdminCheck>
  )
}

"use client"

import { AdminCheck } from "@/components/admin-check"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentOrders } from "@/components/admin/recent-orders"
import { SalesChart } from "@/components/admin/sales-chart"
import { TopProducts } from "@/components/admin/top-products"

export default function AdminPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your store performance</p>
        </div>

        <AdminStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <SalesChart />
          <TopProducts />
        </div>

        <div className="mt-8">
          <RecentOrders />
        </div>
      </div>
    </AdminCheck>
  )
}

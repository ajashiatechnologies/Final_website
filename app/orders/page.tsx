"use client"

import { AuthCheck } from "@/components/auth-check"
import { OrdersList } from "@/components/orders/orders-list"
import { OrderFilters } from "@/components/orders/order-filters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdersPage() {
  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderFilters />
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            <OrdersList />
          </main>
        </div>
      </div>
    </AuthCheck>
  )
}

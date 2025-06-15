"use client"

import { AuthCheck } from "@/components/auth-check"
import { OrderDetails } from "@/components/orders/order-details"
import { OrderTracking } from "@/components/orders/order-tracking"
import { OrderActions } from "@/components/orders/order-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Order #{params.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order #{params.id}</h1>
          <p className="text-muted-foreground">Order details and tracking information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderDetails orderId={params.id} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <OrderTracking orderId={params.id} />
            <OrderActions orderId={params.id} />
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}

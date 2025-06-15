"use client"

import React from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, ShoppingBag, DollarSign } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CustomerStats {
  totalCustomers: number
  totalOrders: number
  totalRevenue: number
}

export function CustomerStats() {
  const [stats, setStats] = React.useState<CustomerStats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  React.useEffect(() => {
    fetchCustomerStats()
  }, [])

  const fetchCustomerStats = async () => {
    setLoading(true)
    try {
      // Fetch total customers
      const { count: totalCustomers, error: customersError } = await supabase
        .from("users")
        .select("id", { count: "exact" })

      if (customersError) throw customersError

      // Fetch total orders and total revenue
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("total_amount")

      if (ordersError) throw ordersError

      const totalOrders = orders?.length || 0
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0

      setStats({
        totalCustomers: totalCustomers || 0,
        totalOrders,
        totalRevenue,
      })
    } catch (error: any) {
      console.error("Error fetching customer stats:", error.message)
      toast({
        title: "Error",
        description: "Failed to fetch customer statistics.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-2xl font-bold mx-auto">
            {stats?.totalCustomers}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-2xl font-bold mx-auto">
            {stats?.totalOrders}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-600 text-white text-2xl font-bold mx-auto">
            ${stats?.totalRevenue.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
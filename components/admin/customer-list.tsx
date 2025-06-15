"use client"

import React from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

interface Customer {
  id: string
  email: string
  full_name: string | null
  phone_number: string | null
  created_at: string
  total_orders: number
  total_spent: number
}

export function CustomerList() {
  const [customers, setCustomers] = React.useState<Customer[]>([])
  const [loading, setLoading] = React.useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  React.useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("users") // Assuming user data is in 'users' table
        .select("id, email, full_name, phone_number, created_at, orders(id, total_amount)")

      if (error) throw error

      const processedCustomers = data.map(user => {
        const total_orders = user.orders?.length || 0
        const total_spent = user.orders?.reduce((sum: number, order: any) => sum + order.total_amount, 0) || 0
        return {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone_number: user.phone_number,
          created_at: user.created_at,
          total_orders,
          total_spent,
        }
      })

      setCustomers(processedCustomers as Customer[])
    } catch (error: any) {
      console.error("Error fetching customers:", error.message)
      toast({
        title: "Error",
        description: "Failed to fetch customers.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return

    setLoading(true)
    try {
      const { error } = await supabase.from("users").delete().eq("id", id)

      if (error) throw error

      setCustomers(customers.filter(customer => customer.id !== id))
      toast({
        title: "Success",
        description: "Customer deleted successfully.",
      })
    } catch (error: any) {
      console.error("Error deleting customer:", error.message)
      toast({
        title: "Error",
        description: "Failed to delete customer.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.full_name || "N/A"}</TableCell>
                <TableCell>{customer.phone_number || "N/A"}</TableCell>
                <TableCell>{customer.total_orders}</TableCell>
                <TableCell>${customer.total_spent.toFixed(2)}</TableCell>
                <TableCell>{format(new Date(customer.created_at), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/customers/${customer.id}`}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive" size="icon"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 
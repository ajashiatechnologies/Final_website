"use client"

import { AdminCheck } from "@/components/admin-check"
import { UserManagement } from "@/components/admin/user-management"
import { UserStats } from "@/components/admin/user-stats"
import { CustomerSegments } from "@/components/admin/customer-segments"

export default function AdminUsersPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage customers and user accounts</p>
        </div>

        <UserStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <UserManagement />
          </div>

          <div className="lg:col-span-1">
            <CustomerSegments />
          </div>
        </div>
      </div>
    </AdminCheck>
  )
}

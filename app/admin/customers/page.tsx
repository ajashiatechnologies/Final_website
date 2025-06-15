"use client"

import React from 'react';
import { AdminCheck } from "@/components/admin-check"
import { CustomerList } from "@/components/admin/customer-list"
import { CustomerFilters } from "@/components/admin/customer-filters"
import { CustomerStats } from "@/components/admin/customer-stats"

const CustomerManagementPage = () => {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer accounts and data</p>
        </div>

        <CustomerStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <CustomerFilters />
          </aside>

          <main className="lg:col-span-3">
            <CustomerList />
          </main>
        </div>
      </div>
    </AdminCheck>
  );
};

export default CustomerManagementPage; 
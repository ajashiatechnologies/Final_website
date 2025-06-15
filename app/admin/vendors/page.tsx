"use client"

import React from 'react';
import { AdminCheck } from "@/components/admin-check"
import { VendorList } from "@/components/admin/vendor-list"
import { VendorFilters } from "@/components/admin/vendor-filters"
import { VendorStats } from "@/components/admin/vendor-stats"

const VendorManagementPage = () => {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vendor Management</h1>
          <p className="text-muted-foreground">Manage your vendors and their products</p>
        </div>

        <VendorStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <VendorFilters />
          </aside>

          <main className="lg:col-span-3">
            <VendorList />
          </main>
        </div>
      </div>
    </AdminCheck>
  );
};

export default VendorManagementPage; 
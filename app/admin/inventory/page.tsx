"use client"

import React from 'react';
import { AdminCheck } from "@/components/admin-check"
import { InventoryList } from "@/components/admin/inventory-list"
import { InventoryFilters } from "@/components/admin/inventory-filters"
import { InventoryStats } from "@/components/admin/inventory-stats"

const InventoryManagementPage = () => {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your product inventory</p>
        </div>

        <InventoryStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <InventoryFilters />
          </aside>

          <main className="lg:col-span-3">
            <InventoryList />
          </main>
        </div>
      </div>
    </AdminCheck>
  );
};

export default InventoryManagementPage;

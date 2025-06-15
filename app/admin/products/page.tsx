"use client"

import React from 'react';
import { AdminCheck } from "@/components/admin-check"
import { ProductList } from "@/components/admin/product-list"
import { ProductFilters } from "@/components/admin/product-filters"
import { ProductStats } from "@/components/admin/product-stats"

const ProductManagementPage = () => {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>

        <ProductStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>

          <main className="lg:col-span-3">
            <ProductList />
          </main>
        </div>
      </div>
    </AdminCheck>
  );
};

export default ProductManagementPage;

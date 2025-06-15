"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomerFiltersProps {
  onApplyFilters: (filters: {
    search?: string
    minOrders?: number
    maxOrders?: number
    minSpent?: number
    maxSpent?: number
    joinedBefore?: string
    joinedAfter?: string
  }) => void
  onResetFilters: () => void
}

export function CustomerFilters({ onApplyFilters, onResetFilters }: CustomerFiltersProps) {
  const [search, setSearch] = React.useState("")
  const [minOrders, setMinOrders] = React.useState<string>("")
  const [maxOrders, setMaxOrders] = React.useState<string>("")
  const [minSpent, setMinSpent] = React.useState<string>("")
  const [maxSpent, setMaxSpent] = React.useState<string>("")
  const [joinedBefore, setJoinedBefore] = React.useState("")
  const [joinedAfter, setJoinedAfter] = React.useState("")

  const handleApply = () => {
    onApplyFilters({
      search: search || undefined,
      minOrders: minOrders ? Number(minOrders) : undefined,
      maxOrders: maxOrders ? Number(maxOrders) : undefined,
      minSpent: minSpent ? Number(minSpent) : undefined,
      maxSpent: maxSpent ? Number(maxSpent) : undefined,
      joinedBefore: joinedBefore || undefined,
      joinedAfter: joinedAfter || undefined,
    })
  }

  const handleReset = () => {
    setSearch("")
    setMinOrders("")
    setMaxOrders("")
    setMinSpent("")
    setMaxSpent("")
    setJoinedBefore("")
    setJoinedAfter("")
    onResetFilters()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="customer-search">Search Customer</Label>
        <Input
          id="customer-search"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Number of Orders</Label>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min orders"
            value={minOrders}
            onChange={(e) => setMinOrders(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max orders"
            value={maxOrders}
            onChange={(e) => setMaxOrders(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Total Spent ($)</Label>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min spent"
            value={minSpent}
            onChange={(e) => setMinSpent(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max spent"
            value={maxSpent}
            onChange={(e) => setMaxSpent(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Joined Date</Label>
        <div className="flex space-x-2">
          <Input
            type="date"
            placeholder="Joined After"
            value={joinedAfter}
            onChange={(e) => setJoinedAfter(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Joined Before"
            value={joinedBefore}
            onChange={(e) => setJoinedBefore(e.target.value)}
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <Button className="flex-1" onClick={handleApply}>Apply Filters</Button>
        <Button variant="outline" className="flex-1" onClick={handleReset}>Reset Filters</Button>
      </div>
    </div>
  )
} 
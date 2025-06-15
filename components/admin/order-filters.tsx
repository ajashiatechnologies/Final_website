"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"

export function OrderFilters() {
  const [filters, setFilters] = useState({
    status: "",
    dateRange: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
  })
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "")

  const clearFilter = (key: string) => {
    setFilters({ ...filters, [key]: "" })
  }

  const clearAllFilters = () => {
    setFilters({
      status: "",
      dateRange: "",
      paymentMethod: "",
      minAmount: "",
      maxAmount: "",
    })
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Order Status</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              value={filters.paymentMethod}
              onValueChange={(value) => setFilters({ ...filters, paymentMethod: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash-on-delivery">Cash on Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="min-amount">Min Amount ($)</Label>
            <Input
              id="min-amount"
              type="number"
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="max-amount">Max Amount ($)</Label>
            <Input
              id="max-amount"
              type="number"
              placeholder="1000"
              value={filters.maxAmount}
              onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
            />
          </div>
        </div>

        {(activeFilters.length > 0 || startDate || endDate) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Filters:</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(([key, value]) => (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {key}: {value}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter(key)} />
                </Badge>
              ))}
              {startDate && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Start: {format(startDate, "PP")}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setStartDate(undefined)} />
                </Badge>
              )}
              {endDate && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  End: {format(endDate, "PP")}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setEndDate(undefined)} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

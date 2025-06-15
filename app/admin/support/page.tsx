"use client"

import React, { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { MessageSquare, Loader2, Search, Filter, Eye } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Ticket {
  id: string
  subject: string
  description: string
  status: "open" | "pending" | "closed"
  priority: "low" | "medium" | "high"
  created_at: string
  updated_at: string
  user_id: string
  users: { // Assuming users table is joined for user details
    email: string
    user_metadata?: { name?: string }
  } | null
}

export default function AdminSupportManagementPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchTickets()
  }, [filterStatus, filterPriority, searchTerm])

  const fetchTickets = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.user_metadata.role !== "admin") {
        setError("Access Denied: You must be an administrator to view this page.")
        setLoading(false)
        return
      }

      let query = supabase
        .from("support_tickets")
        .select(`
          id,
          subject,
          description,
          status,
          priority,
          created_at,
          updated_at,
          user_id,
          users ( email, user_metadata )
        `)

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus)
      }
      if (filterPriority !== "all") {
        query = query.eq("priority", filterPriority)
      }
      if (searchTerm) {
        query = query.ilike("subject", `%${searchTerm}%`)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) throw error
      setTickets(data || [])
    } catch (err: any) {
      console.error("Error fetching tickets:", err)
      setError(err.message || "Failed to load tickets.")
      toast({
        title: "Error",
        description: err.message || "Failed to load tickets.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive" className="capitalize">Open</Badge>
      case "pending":
        return <Badge variant="secondary" className="capitalize">Pending</Badge>
      case "closed":
        return <Badge className="capitalize">Closed</Badge>
      default:
        return <Badge variant="outline" className="capitalize">N/A</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge variant="secondary" className="capitalize">Low</Badge>
      case "medium":
        return <Badge variant="secondary" className="capitalize">Medium</Badge>
      case "high":
        return <Badge variant="destructive" className="capitalize">High</Badge>
      default:
        return <Badge variant="outline" className="capitalize">N/A</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading support tickets...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-destructive">
        <p className="text-lg">{error}</p>
        {error.includes("administrator") && (
          <p className="text-sm text-muted-foreground mt-2">Please ensure you are signed in as an admin.</p>
        )}
      </div>
    )
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Support Ticket Management</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter and Search Tickets</CardTitle>
          <CardDescription>Refine the list of tickets by status, priority, or search term.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="status-filter">Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority-filter">Priority</Label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger id="priority-filter">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Label htmlFor="search-tickets">Search Subject</Label>
            <Input
              id="search-tickets"
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No support tickets found.
                  </TableCell>
                </TableRow>
              ) : (
                tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id.substring(0, 8)}...</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.users?.email || "N/A"}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{format(new Date(ticket.created_at), "PPP")}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/support/${ticket.id}`}>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

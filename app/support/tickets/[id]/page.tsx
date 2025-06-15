"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { ArrowLeft, MessageSquare, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
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
}

export default function TicketDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (id) {
      fetchTicket(id as string)
    }
  }, [id])

  const fetchTicket = async (ticketId: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to view this ticket.",
          variant: "destructive",
        })
        router.push("/sign-in")
        return
      }

      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", ticketId)
        .eq("user_id", user.id) // Ensure user can only view their own tickets
        .single()

      if (error) throw error

      if (!data) {
        setError("Ticket not found or you don't have permission to view it.")
        return
      }
      setTicket(data)
    } catch (err: any) {
      console.error("Error fetching ticket details:", err)
      setError(err.message || "Failed to load ticket details.")
      toast({
        title: "Error",
        description: err.message || "Failed to load ticket details.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive" className="capitalize"><AlertCircle className="mr-1 h-3 w-3" /> Open</Badge>
      case "pending":
        return <Badge variant="secondary" className="capitalize"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>
      case "closed":
        return <Badge className="capitalize"><CheckCircle className="mr-1 h-3 w-3" /> Closed</Badge>
      default:
        return <Badge variant="outline" className="capitalize">N/A</Badge>
    }
  }

  const getPriorityDisplay = (priority: string) => {
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

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6 flex items-center">
        <Link href="/support/tickets">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to tickets</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Ticket #{id}</h1>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Loading ticket details...</p>
        </div>
      )}

      {error && <p className="text-center text-destructive">Error: {error}</p>}

      {!loading && !error && !ticket && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Ticket not found.</p>
            <Link href="/support/tickets">
              <Button className="mt-4">Back to All Tickets</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!loading && !error && ticket && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Submitted on {format(new Date(ticket.created_at), "PPP")} at {format(new Date(ticket.created_at), "p")}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-muted-foreground">{ticket.description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <h3 className="font-semibold mb-1">Status</h3>
                {getStatusDisplay(ticket.status)}
              </div>
              <div>
                <h3 className="font-semibold mb-1">Priority</h3>
                {getPriorityDisplay(ticket.priority)}
              </div>
              <div>
                <h3 className="font-semibold mb-1">Last Updated</h3>
                <p className="text-muted-foreground">{format(new Date(ticket.updated_at), "PPP")} at {format(new Date(ticket.updated_at), "p")}</p>
              </div>
            </div>

            {/* Future: Add conversation/message history here */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-3">Ticket History (Coming Soon)</h3>
              <p className="text-muted-foreground text-sm">Responses and updates will appear here.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 
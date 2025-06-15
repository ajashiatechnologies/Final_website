"use client"

import React, { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ChevronRight, MessageSquare, PlusCircle } from "lucide-react"
import Link from "next/link"

interface Ticket {
  id: string
  subject: string
  description: string
  status: "open" | "pending" | "closed"
  priority: "low" | "medium" | "high"
  created_at: string
  updated_at: string
}

export default function CustomerSupportTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newTicketSubject, setNewTicketSubject] = useState("")
  const [newTicketDescription, setNewTicketDescription] = useState("")
  const [newTicketPriority, setNewTicketPriority] = useState<"low" | "medium" | "high">("low")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError("Please sign in to view your tickets.")
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("support_tickets")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

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

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a ticket.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      const { error } = await supabase.from("support_tickets").insert({
        user_id: user.id,
        subject: newTicketSubject,
        description: newTicketDescription,
        priority: newTicketPriority,
        status: "open",
      })

      if (error) throw error

      toast({
        title: "Ticket Submitted",
        description: "Your support ticket has been successfully submitted.",
      })
      setNewTicketSubject("")
      setNewTicketDescription("")
      setNewTicketPriority("low")
      fetchTickets() // Refresh the list of tickets
    } catch (err: any) {
      console.error("Error submitting ticket:", err)
      toast({
        title: "Error",
        description: err.message || "Failed to submit ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-5xl py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Support</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Submit a New Support Ticket
          </CardTitle>
          <CardDescription>We're here to help! Please fill out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Briefly describe your issue"
                value={newTicketSubject}
                onChange={(e) => setNewTicketSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about your issue"
                value={newTicketDescription}
                onChange={(e) => setNewTicketDescription(e.target.value)}
                rows={6}
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newTicketPriority}
                onValueChange={(value: "low" | "medium" | "high") => setNewTicketPriority(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Your Open Tickets
          </CardTitle>
          <CardDescription>View the status of your submitted support tickets.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-center text-muted-foreground">Loading your tickets...</p>}
          {error && <p className="text-center text-destructive">Error: {error}</p>}

          {!loading && !error && tickets.length === 0 && (
            <p className="text-center text-muted-foreground">You have no support tickets.</p>
          )}

          {!loading && !error && tickets.length > 0 && (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground">Status: <span className="capitalize font-medium">{ticket.status}</span></p>
                        <p className="text-sm text-muted-foreground">Priority: <span className="capitalize font-medium">{ticket.priority}</span></p>
                        <p className="text-xs text-muted-foreground">Submitted on {format(new Date(ticket.created_at), "PPP")} {format(new Date(ticket.created_at), "p")}</p>
                      </div>
                      <Link href={`/support/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-5 w-5" />
                          <span className="sr-only">View Ticket</span>
                        </Button>
                      </Link>
                    </div>
                    <p className="mt-2 text-sm">{ticket.description.substring(0, 150)}{ticket.description.length > 150 ? "..." : ""}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

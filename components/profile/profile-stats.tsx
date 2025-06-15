"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Calendar, Star } from "lucide-react"
import { useEffect, useState } from "react"

export function ProfileStats() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        setUser({ ...user, ...profile })
      }
    }
    getUser()
  }, [supabase])

  const stats = [
    { label: "Orders", value: "12" },
    { label: "Reviews", value: "8" },
    { label: "Wishlist", value: "15" },
  ]

  if (!user) return null

  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={user.avatar_url || "/placeholder.svg"} />
          <AvatarFallback>
            {user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle>
          {user.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <Badge variant="secondary">{user.role || 'Customer'}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Member since {new Date(user.created_at).getFullYear()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span>4.8 average rating</span>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, MapPin } from "lucide-react"
import { AddressForm } from "./address-form"

interface Address {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  type: "home" | "work" | "other"
}

const mockAddresses: Address[] = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
    isDefault: true,
    type: "home",
  },
  {
    id: "2",
    name: "John Doe",
    address: "456 Office Blvd",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    isDefault: false,
    type: "work",
  },
]

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Address Book</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold capitalize">{address.type}</span>
                {address.isDefault && <Badge variant="default">Default</Badge>}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(address)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(address.id)} disabled={address.isDefault}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{address.name}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
              </div>
              {!address.isDefault && (
                <Button variant="outline" size="sm" className="mt-3" onClick={() => handleSetDefault(address.id)}>
                  Set as Default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <AddressForm
          address={editingAddress}
          onClose={() => {
            setShowForm(false)
            setEditingAddress(null)
          }}
          onSave={(address) => {
            if (editingAddress) {
              setAddresses((prev) =>
                prev.map((addr) => (addr.id === editingAddress.id ? { ...address, id: editingAddress.id } : addr)),
              )
            } else {
              setAddresses((prev) => [...prev, { ...address, id: Date.now().toString() }])
            }
            setShowForm(false)
            setEditingAddress(null)
          }}
        />
      )}
    </div>
  )
}

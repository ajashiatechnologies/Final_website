"use client"

import React from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"
import Image from "next/image"

export default function SettingsPage() {
  const [loading, setLoading] = React.useState(false)
  const [qrCode, setQrCode] = React.useState<string | null>(null)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  React.useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data: settings, error } = await supabase
        .from("settings")
        .select("upi_qr_code")
        .single()

      if (error) throw error
      if (settings?.upi_qr_code) {
        setQrCode(settings.upi_qr_code)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)

      // Upload image to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `upi-qr-${Date.now()}.${fileExt}`
      const { error: uploadError, data } = await supabase.storage
        .from("settings")
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("settings")
        .getPublicUrl(fileName)

      // Update settings
      const { error: updateError } = await supabase
        .from("settings")
        .update({ upi_qr_code: publicUrl })
        .eq("id", 1)

      if (updateError) throw updateError

      setQrCode(publicUrl)
      toast({
        title: "Success",
        description: "UPI QR code updated successfully",
      })
    } catch (error) {
      console.error("Error updating QR code:", error)
      toast({
        title: "Error",
        description: "Failed to update UPI QR code",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>UPI QR Code</Label>
            {qrCode ? (
              <div className="relative h-64 w-64">
                <Image
                  src={qrCode}
                  alt="UPI QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No QR code uploaded</p>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
                id="qr-upload"
              />
              <Label
                htmlFor="qr-upload"
                className="flex cursor-pointer items-center space-x-2"
              >
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  className="flex items-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload QR Code
                    </>
                  )}
                </Button>
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

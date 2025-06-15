"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Bell, Smartphone } from "lucide-react"

export function NotificationSettings() {
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "noreply@ajashia.com",
    smtpPassword: "",
    fromName: "Ajashia",
    fromEmail: "noreply@ajashia.com",
  })

  const [notificationTypes, setNotificationTypes] = useState({
    orderConfirmation: { email: true, sms: false, push: true },
    orderShipped: { email: true, sms: true, push: true },
    orderDelivered: { email: true, sms: false, push: true },
    lowStock: { email: true, sms: false, push: false },
    newUser: { email: true, sms: false, push: false },
    newsletter: { email: true, sms: false, push: false },
  })

  const [smsSettings, setSmsSettings] = useState({
    enabled: false,
    provider: "twilio",
    accountSid: "",
    authToken: "",
    fromNumber: "",
  })

  const updateNotificationType = (type: string, channel: string, enabled: boolean) => {
    setNotificationTypes({
      ...notificationTypes,
      [type]: {
        ...notificationTypes[type as keyof typeof notificationTypes],
        [channel]: enabled,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <CardTitle>Email Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-enabled">Enable Email Notifications</Label>
            <Switch
              id="email-enabled"
              checked={emailSettings.enabled}
              onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enabled: checked })}
            />
          </div>

          {emailSettings.enabled && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-user">SMTP Username</Label>
                  <Input
                    id="smtp-user"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <CardTitle>SMS Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-enabled">Enable SMS Notifications</Label>
            <Switch
              id="sms-enabled"
              checked={smsSettings.enabled}
              onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, enabled: checked })}
            />
          </div>

          {smsSettings.enabled && (
            <>
              <div>
                <Label htmlFor="sms-provider">SMS Provider</Label>
                <Select
                  value={smsSettings.provider}
                  onValueChange={(value) => setSmsSettings({ ...smsSettings, provider: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="nexmo">Nexmo</SelectItem>
                    <SelectItem value="aws-sns">AWS SNS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="account-sid">Account SID</Label>
                  <Input
                    id="account-sid"
                    value={smsSettings.accountSid}
                    onChange={(e) => setSmsSettings({ ...smsSettings, accountSid: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="auth-token">Auth Token</Label>
                  <Input
                    id="auth-token"
                    type="password"
                    value={smsSettings.authToken}
                    onChange={(e) => setSmsSettings({ ...smsSettings, authToken: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="from-number">From Phone Number</Label>
                <Input
                  id="from-number"
                  value={smsSettings.fromNumber}
                  onChange={(e) => setSmsSettings({ ...smsSettings, fromNumber: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notification Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Notification Type</th>
                  <th className="text-center p-2">Email</th>
                  <th className="text-center p-2">SMS</th>
                  <th className="text-center p-2">Push</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(notificationTypes).map(([type, settings]) => (
                  <tr key={type} className="border-b">
                    <td className="p-2 font-medium">
                      {type.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </td>
                    <td className="p-2 text-center">
                      <Switch
                        checked={settings.email}
                        onCheckedChange={(checked) => updateNotificationType(type, "email", checked)}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Switch
                        checked={settings.sms}
                        onCheckedChange={(checked) => updateNotificationType(type, "sms", checked)}
                        disabled={!smsSettings.enabled}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Switch
                        checked={settings.push}
                        onCheckedChange={(checked) => updateNotificationType(type, "push", checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button>Save Notification Settings</Button>
    </div>
  )
}

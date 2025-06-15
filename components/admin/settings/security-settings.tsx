"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, AlertTriangle, Eye } from "lucide-react"

export function SecuritySettings() {
  const [authSettings, setAuthSettings] = useState({
    twoFactorAuth: false,
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
  })

  const [sslSettings, setSslSettings] = useState({
    forceHttps: true,
    hstsEnabled: true,
    hstsMaxAge: 31536000,
  })

  const [apiSettings, setApiSettings] = useState({
    rateLimitEnabled: true,
    requestsPerMinute: 100,
    apiKeyRequired: true,
  })

  const [auditLog, setAuditLog] = useState([
    {
      id: 1,
      action: "User Login",
      user: "admin@ajashia.com",
      ip: "192.168.1.100",
      timestamp: "2024-01-15 10:30:00",
      status: "success",
    },
    {
      id: 2,
      action: "Product Updated",
      user: "manager@ajashia.com",
      ip: "192.168.1.101",
      timestamp: "2024-01-15 10:25:00",
      status: "success",
    },
    {
      id: 3,
      action: "Failed Login Attempt",
      user: "unknown@example.com",
      ip: "203.0.113.1",
      timestamp: "2024-01-15 10:20:00",
      status: "failed",
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <CardTitle>Authentication Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <Switch
              id="two-factor"
              checked={authSettings.twoFactorAuth}
              onCheckedChange={(checked) => setAuthSettings({ ...authSettings, twoFactorAuth: checked })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password-length">Minimum Password Length</Label>
              <Input
                id="password-length"
                type="number"
                value={authSettings.passwordMinLength}
                onChange={(e) => setAuthSettings({ ...authSettings, passwordMinLength: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={authSettings.sessionTimeout}
                onChange={(e) => setAuthSettings({ ...authSettings, sessionTimeout: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password Requirements</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Require special characters</span>
                <Switch
                  checked={authSettings.requireSpecialChars}
                  onCheckedChange={(checked) => setAuthSettings({ ...authSettings, requireSpecialChars: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Require numbers</span>
                <Switch
                  checked={authSettings.requireNumbers}
                  onCheckedChange={(checked) => setAuthSettings({ ...authSettings, requireNumbers: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Require uppercase letters</span>
                <Switch
                  checked={authSettings.requireUppercase}
                  onCheckedChange={(checked) => setAuthSettings({ ...authSettings, requireUppercase: checked })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-attempts">Max Login Attempts</Label>
              <Input
                id="max-attempts"
                type="number"
                value={authSettings.maxLoginAttempts}
                onChange={(e) => setAuthSettings({ ...authSettings, maxLoginAttempts: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
              <Input
                id="lockout-duration"
                type="number"
                value={authSettings.lockoutDuration}
                onChange={(e) => setAuthSettings({ ...authSettings, lockoutDuration: Number(e.target.value) })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <CardTitle>SSL/TLS Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="force-https">Force HTTPS</Label>
              <p className="text-sm text-muted-foreground">Redirect all HTTP traffic to HTTPS</p>
            </div>
            <Switch
              id="force-https"
              checked={sslSettings.forceHttps}
              onCheckedChange={(checked) => setSslSettings({ ...sslSettings, forceHttps: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="hsts-enabled">Enable HSTS</Label>
              <p className="text-sm text-muted-foreground">HTTP Strict Transport Security</p>
            </div>
            <Switch
              id="hsts-enabled"
              checked={sslSettings.hstsEnabled}
              onCheckedChange={(checked) => setSslSettings({ ...sslSettings, hstsEnabled: checked })}
            />
          </div>

          {sslSettings.hstsEnabled && (
            <div>
              <Label htmlFor="hsts-max-age">HSTS Max Age (seconds)</Label>
              <Input
                id="hsts-max-age"
                type="number"
                value={sslSettings.hstsMaxAge}
                onChange={(e) => setSslSettings({ ...sslSettings, hstsMaxAge: Number(e.target.value) })}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <CardTitle>API Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="rate-limit">Enable Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
            </div>
            <Switch
              id="rate-limit"
              checked={apiSettings.rateLimitEnabled}
              onCheckedChange={(checked) => setApiSettings({ ...apiSettings, rateLimitEnabled: checked })}
            />
          </div>

          {apiSettings.rateLimitEnabled && (
            <div>
              <Label htmlFor="requests-per-minute">Requests per Minute</Label>
              <Input
                id="requests-per-minute"
                type="number"
                value={apiSettings.requestsPerMinute}
                onChange={(e) => setApiSettings({ ...apiSettings, requestsPerMinute: Number(e.target.value) })}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="api-key-required">Require API Key</Label>
              <p className="text-sm text-muted-foreground">Require API key for all requests</p>
            </div>
            <Switch
              id="api-key-required"
              checked={apiSettings.apiKeyRequired}
              onCheckedChange={(checked) => setApiSettings({ ...apiSettings, apiKeyRequired: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <CardTitle>Audit Log</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Action</th>
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">IP Address</th>
                  <th className="text-left p-2">Timestamp</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="p-2 font-medium">{entry.action}</td>
                    <td className="p-2">{entry.user}</td>
                    <td className="p-2 font-mono text-sm">{entry.ip}</td>
                    <td className="p-2 text-sm">{entry.timestamp}</td>
                    <td className="p-2">
                      <Badge variant={entry.status === "success" ? "default" : "destructive"}>{entry.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button>Save Security Settings</Button>
    </div>
  )
}

"use client"

import { AdminCheck } from "@/components/admin-check"
import { HomepageEditor } from "@/components/admin/content/homepage-editor"
import { BannerManager } from "@/components/admin/content/banner-manager"
import { FAQManager } from "@/components/admin/content/faq-manager"
import { EmailTemplates } from "@/components/admin/content/email-templates"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminContentPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">Manage website content, banners, and templates</p>
        </div>

        <Tabs defaultValue="homepage" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="emails">Email Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage" className="mt-8">
            <HomepageEditor />
          </TabsContent>

          <TabsContent value="banners" className="mt-8">
            <BannerManager />
          </TabsContent>

          <TabsContent value="faq" className="mt-8">
            <FAQManager />
          </TabsContent>

          <TabsContent value="emails" className="mt-8">
            <EmailTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </AdminCheck>
  )
}

import { HelpCenter } from "@/components/help/help-center"
import { FAQ } from "@/components/help/faq"
import { SupportTickets } from "@/components/help/support-tickets"
import { LiveChat } from "@/components/help/live-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get help with your orders, products, and account. We're here to assist you!
        </p>
      </div>

      <Tabs defaultValue="help-center" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="help-center">Help Center</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="help-center" className="mt-8">
          <HelpCenter />
        </TabsContent>

        <TabsContent value="faq" className="mt-8">
          <FAQ />
        </TabsContent>

        <TabsContent value="support" className="mt-8">
          <SupportTickets />
        </TabsContent>

        <TabsContent value="chat" className="mt-8">
          <LiveChat />
        </TabsContent>
      </Tabs>
    </div>
  )
}

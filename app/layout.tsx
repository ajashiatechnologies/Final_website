import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { ComparisonProvider } from "@/components/comparison-provider";
import { NotificationProvider } from "@/components/notification-provider";
import { Toaster } from "@/components/ui/toaster";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajashia Technologies - Electronics & Components Store",
  description:
    "Your one-stop shop for electronics, Arduino boards, sensors, and development components.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <ComparisonProvider>
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <main className="flex-1">{children}</main>
                    <SiteFooter />
                  </div>
                  <Toaster />
                </ComparisonProvider>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

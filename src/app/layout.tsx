import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/SessionProvider";
import { InventoryProvider } from "@/context/InventoryContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PCOXchange | Connecting Events, Delegates & Travel Solutions",
  description: "Official PCOXchange Platform — Connecting Events, Delegates & Travel Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="font-sans antialiased">
        <AuthProvider>
          <InventoryProvider>
            {children}
            <Toaster />
          </InventoryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


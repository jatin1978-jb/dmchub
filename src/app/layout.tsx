import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DMCXchange | Global B2B Travel Marketplace",
  description: "Connect DMCs with Travel Agents worldwide through an intelligent marketplace platform",
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
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

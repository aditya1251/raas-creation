import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAAS The Creation - Premium Ethnic Wear",
  description: "Premium ethnic wear for women",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import QueryProvider from "@/lib/queryclient";

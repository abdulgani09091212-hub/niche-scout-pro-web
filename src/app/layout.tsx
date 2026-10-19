import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niche Scout Pro | #1 High-Density Etsy Product Research & Remote MCP Engine",
  description: "Instant sub-second Etsy product research, 5-Pillar Core Forensics, store bestseller unmasking, and universal Remote MCP agent integration for Claude, Cursor, and AI agents.",
  keywords: ["Etsy product research", "Etsy SEO", "Etsy tags", "Etsy profit calculator", "MCP server Etsy", "Claude MCP Etsy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

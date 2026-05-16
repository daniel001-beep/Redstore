import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velox - Next-Gen Fintech Ledger Infrastructure",
  description:
    "Zero-latency, double-entry ledger infrastructure. Immutable, hash-chained transactions for mission-critical financial systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617]`}
    >
      <body className="min-h-screen bg-[#020617] text-slate-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

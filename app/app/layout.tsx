import type { Metadata } from "next";
import { WalletContextProvider } from "@/components/WalletProvider";
import { WalletButton } from "@/components/WalletButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "StakeHabit",
  description: "Stake SOL. Build habits. Stay accountable.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        <WalletContextProvider>
          <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800">
            <a href="/" className="text-xl font-bold text-purple-400">StakeHabit</a>
            <div className="flex gap-2 sm:gap-4 items-center">
              <a href="/dashboard" className="text-xs sm:text-sm text-gray-300 hover:text-white">Dashboard</a>
              <a href="/create-goal" className="text-xs sm:text-sm text-gray-300 hover:text-white">New Goal</a>
              <a href="/check-in" className="text-xs sm:text-sm text-gray-300 hover:text-white">Check In</a>
              <a href="/settle" className="text-xs sm:text-sm text-gray-300 hover:text-white hidden sm:inline">Settle</a>
              <WalletButton />
            </div>
          </nav>
          <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        </WalletContextProvider>
      </body>
    </html>
  );
}

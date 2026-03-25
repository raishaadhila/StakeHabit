"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/WalletButton";
import { GoalCardSkeleton } from "@/components/GoalCardSkeleton";
import { getProgram } from "@/lib/program";
import Link from "next/link";

export default function DashboardPage() {
  const { wallet, publicKey } = useWallet();
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!publicKey || !wallet) return;
    setLoading(true);
    setError("");
    const program = getProgram(wallet.adapter);
    (program.account as any).goal
      .all([{ memcmp: { offset: 8, bytes: publicKey.toBase58() } }])
      .then(setGoals)
      .catch(() => setError("Failed to load goals. Check your connection."))
      .finally(() => setLoading(false));
  }, [publicKey, wallet]);

  if (!publicKey) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <p className="text-gray-400">Connect your wallet to view your goals.</p>
        <WalletButton />
      </div>
    );
  }

  const active = goals.filter((g) => g.account.isActive && !g.account.isSettled);
  const history = goals.filter((g) => !g.account.isActive || g.account.isSettled);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-400">My Goals</h1>
        <Link href="/create-goal" className="text-sm bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
          + New Goal
        </Link>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading && (
        <div className="flex flex-col gap-4">
          <GoalCardSkeleton />
          <GoalCardSkeleton />
        </div>
      )}

      {!loading && goals.length === 0 && !error && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🎯</p>
          <p>No goals yet.</p>
          <Link href="/create-goal" className="text-purple-400 underline text-sm mt-1 inline-block">Create your first challenge</Link>
        </div>
      )}

      {active.length > 0 && (
        <>
          <h2 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Active</h2>
          <div className="flex flex-col gap-4 mb-8">
            {active.map((g) => <GoalCard key={g.publicKey.toBase58()} goal={g} />)}
          </div>
        </>
      )}

      {history.length > 0 && (
        <>
          <h2 className="text-xs text-gray-400 uppercase tracking-wider mb-3">History</h2>
          <div className="flex flex-col gap-4">
            {history.map((g) => <GoalCard key={g.publicKey.toBase58()} goal={g} />)}
          </div>
        </>
      )}
    </div>
  );
}

function GoalCard({ goal }: { goal: any }) {
  const { title, durationDays, isActive, isSettled } = goal.account;
  const statusLabel = isSettled ? "Settled" : isActive ? "Active" : "Ended";
  const statusColor = isActive && !isSettled ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-400";

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-base sm:text-lg">{title}</h2>
        <span className={`text-xs px-2 py-1 rounded-full shrink-0 ml-2 ${statusColor}`}>{statusLabel}</span>
      </div>
      <p className="text-sm text-gray-400 mt-1">{durationDays}-day challenge</p>
      <div className="flex gap-4 mt-3">
        {isActive && !isSettled && (
          <Link href="/check-in" className="text-sm text-purple-400 hover:underline">→ Check in</Link>
        )}
        {isActive && !isSettled && (
          <Link href="/settle" className="text-sm text-gray-400 hover:underline">Settle</Link>
        )}
      </div>
    </div>
  );
}

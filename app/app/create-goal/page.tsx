"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/WalletButton";
import { BN, web3 } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getProgram, getGoalPda, getEscrowPda, getProgressPda } from "@/lib/program";

const DURATIONS = [7, 14, 30];

export default function CreateGoalPage() {
  const { wallet, publicKey } = useWallet();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(7);
  const [stake, setStake] = useState(0.1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!publicKey || !wallet) return;

    setLoading(true);
    setStatus("");
    try {
      const program = getProgram(wallet.adapter);
      const [goalPda] = getGoalPda(publicKey, title);
      const [escrowPda] = getEscrowPda(goalPda);
      const [progressPda] = getProgressPda(goalPda);

      const tx = await program.methods
        .createGoal(title, duration, new BN(stake * LAMPORTS_PER_SOL))
        .accounts({
          owner: publicKey,
          goal: goalPda,
          escrow: escrowPda,
          progress: progressPda,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      setStatus(`✅ Goal created! Tx: ${tx.slice(0, 20)}...`);
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (!publicKey) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <p className="text-gray-400">Connect your wallet to create a goal.</p>
        <WalletButton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-purple-400">Create a Goal</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Goal Title</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="e.g. Exercise daily"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={64}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Duration</label>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium ${
                  duration === d
                    ? "bg-purple-600 border-purple-600"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Stake Amount (SOL)</label>
          <input
            type="number"
            min={0.1}
            step={0.1}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            value={stake}
            onChange={(e) => setStake(parseFloat(e.target.value))}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 0.1 SOL</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3 rounded-lg font-semibold mt-2"
        >
          {loading ? "Staking..." : "Stake & Start"}
        </button>

        {status && (
          <p className={`text-sm text-center mt-2 ${status.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

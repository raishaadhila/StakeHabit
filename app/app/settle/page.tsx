"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/WalletButton";
import { getProgram, getGoalPda, getEscrowPda, getProgressPda, PROGRAM_ID } from "@/lib/program";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { web3 } from "@coral-xyz/anchor";

const [prizePoolPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("prize_pool")],
  PROGRAM_ID
);

export default function SettlePage() {
  const { wallet, publicKey } = useWallet();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSettle() {
    if (!publicKey || !wallet || !title) return;
    setLoading(true);
    setStatus("");
    setResult(null);

    try {
      const program = getProgram(wallet.adapter);
      const [goalPda] = getGoalPda(publicKey, title);
      const [escrowPda] = getEscrowPda(goalPda);
      const [progressPda] = getProgressPda(goalPda);

      // Fetch progress before settling for result display
      const prog = await (program.account as any).progress.fetch(progressPda);
      const escrow = await (program.account as any).stakeEscrow.fetch(escrowPda);

      await program.methods
        .settle()
        .accounts({
          owner: publicKey,
          goal: goalPda,
          escrow: escrowPda,
          progress: progressPda,
          prizePool: prizePoolPda,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      const missRate = Math.round(((prog.totalDays - prog.completedDays) / prog.totalDays) * 100);
      const refundRate = missRate < 10 ? 100 : 100 - missRate;
      const refundSol = (escrow.amountLamports.toNumber() * refundRate) / 100 / LAMPORTS_PER_SOL;

      setResult({ completedDays: prog.completedDays, totalDays: prog.totalDays, missRate, refundSol, refundRate });
      setStatus("✅ Challenge settled!");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (!publicKey) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <p className="text-gray-400">Connect your wallet to settle.</p>
        <WalletButton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-purple-400">Settle Challenge</h1>
      <p className="text-gray-400 text-sm mb-6">Only available after your challenge end date.</p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Goal Title</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="Enter your goal title exactly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          onClick={handleSettle}
          disabled={loading || !title}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3 rounded-lg font-semibold"
        >
          {loading ? "Settling..." : "Settle & Claim"}
        </button>

        {status && <p className="text-sm text-center">{status}</p>}
      </div>

      {result && (
        <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Challenge Result</h2>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Completed</span>
            <span>{result.completedDays}/{result.totalDays} days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Miss rate</span>
            <span className={result.missRate < 10 ? "text-green-400" : "text-red-400"}>
              {result.missRate}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Refund</span>
            <span className="text-purple-300 font-semibold">{result.refundSol.toFixed(3)} SOL ({result.refundRate}%)</span>
          </div>
          {result.missRate < 10 && (
            <p className="text-green-400 text-sm text-center mt-1">🎉 Full refund! You crushed it!</p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/WalletButton";
import { getProgram, getGoalPda, getProgressPda } from "@/lib/program";
import { AiCoach } from "@/components/AiCoach";

export default function CheckInPage() {
  const { wallet, publicKey } = useWallet();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const [skipped, setSkipped] = useState(false);

  async function handleCheckIn(didComplete: boolean) {
    if (!publicKey || !wallet || !title) return;

    if (!didComplete) {
      setSkipped(true);
      setStatus("No worries — tomorrow is a new day 💪");
      return;
    }

    setLoading(true);
    setStatus("");
    setSkipped(false);
    try {
      const program = getProgram(wallet.adapter);
      const [goalPda] = getGoalPda(publicKey, title);
      const [progressPda] = getProgressPda(goalPda);

      await program.methods
        .checkIn()
        .accounts({ owner: publicKey, goal: goalPda, progress: progressPda })
        .rpc();

      const prog = await (program.account as any).progress.fetch(progressPda);
      setProgress(prog);
      setStatus("✅ Checked in!");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (!publicKey) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <p className="text-gray-400">Connect your wallet to check in.</p>
        <WalletButton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-purple-400">Daily Check-in</h1>
      <p className="text-gray-400 text-sm mb-6">Did you complete your habit today?</p>

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

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Note (optional)</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
            placeholder="How did it go? Any thoughts..."
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => handleCheckIn(true)}
            disabled={loading || !title}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3 rounded-lg font-semibold text-lg"
          >
            {loading ? "Submitting..." : "✅ Yes, I did it!"}
          </button>
          <button
            onClick={() => handleCheckIn(false)}
            disabled={loading || !title}
            className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 py-3 rounded-lg font-semibold text-lg"
          >
            😔 Not today
          </button>
        </div>

        {status && (
          <p className={`text-sm text-center mt-1 ${skipped ? "text-yellow-400" : ""}`}>
            {status}
          </p>
        )}
      </div>

      {progress && (
        <>
          <div className="mt-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{progress.completedDays}/{progress.totalDays} days</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${(progress.completedDays / progress.totalDays) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">🔥 Streak: {progress.streak} days</p>
          </div>

          <AiCoach
            goalTitle={title}
            streak={progress.streak}
            completedDays={progress.completedDays}
            totalDays={progress.totalDays}
            missedDays={progress.totalDays - progress.completedDays}
          />
        </>
      )}
    </div>
  );
}

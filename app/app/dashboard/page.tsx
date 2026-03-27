"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "@/lib/program";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import Link from "next/link";

export default function DashboardPage() {
  const { wallet, publicKey } = useWallet();
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    if (!publicKey || !wallet) return;
    const program = getProgram(wallet.adapter);
    (program.account as any).goal
      .all([{ memcmp: { offset: 8, bytes: publicKey.toBase58() } }])
      .then(setGoals)
      .catch(() => {});
  }, [publicKey, wallet]);

  const active = goals.filter((g) => g.account.isActive && !g.account.isSettled);
  const past = goals.filter((g) => !g.account.isActive || g.account.isSettled);

  return (
    <div className="pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-5xl mx-auto">
        {/* Hero Summary */}
        <section className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-[#4d6b3a] font-semibold tracking-wider text-xs uppercase mb-2 block">Current Commitment</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#141b2b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>My Habits</h1>
          </div>
          <div className="bg-[#f1f3ff] p-6 rounded-[2rem] flex items-center gap-6 shadow-sm border border-[#debfc1]/10">
            <div className="flex flex-col">
              <span className="text-[#574143] text-sm font-medium">Active Goals</span>
              <span className="text-3xl font-bold text-[#780c28]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{active.length}</span>
            </div>
            <div className="h-12 w-[1px] bg-[#debfc1]/30" />
            <div className="flex flex-col">
              <span className="text-[#574143] text-sm font-medium">Completed</span>
              <span className="text-xl font-bold text-[#486636]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{past.length}</span>
            </div>
          </div>
        </section>

        {/* Active Goals */}
        {active.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            {active.map((g, i) => (
              <div key={g.publicKey.toBase58()}
                className={`${i === 0 ? "md:col-span-8" : "md:col-span-4"} bg-white p-8 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden border border-[#debfc1]/5`}
                style={{ boxShadow: "0 10px 30px rgba(20,27,43,0.03)" }}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-[#c7eaad]/30 p-3 rounded-2xl">
                      <span className="material-symbols-outlined text-[#486636] text-3xl">task_alt</span>
                    </div>
                    <span className="text-xs font-bold text-[#780c28] tracking-widest uppercase">Active</span>
                  </div>
                  <h3 className="font-extrabold text-2xl mb-2 text-[#141b2b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{g.account.title}</h3>
                  <p className="text-[#574143] text-sm mb-6">{g.account.durationDays}-day challenge</p>
                </div>
                <div className="flex gap-3 pt-6 border-t border-[#debfc1]/10">
                  <Link href="/check-in" className="px-6 py-2.5 rounded-full text-sm font-bold text-white active:scale-95 transition-transform"
                    style={{ background: "linear-gradient(135deg, #530017, #780c28)", boxShadow: "0 10px 20px rgba(120,12,40,0.2)" }}>
                    Log Progress
                  </Link>
                  <Link href="/settle" className="px-6 py-2.5 rounded-full text-sm font-bold text-[#780c28] bg-[#e1e8fd] transition-transform active:scale-95">
                    Settle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {active.length === 0 && (
          <div className="text-center py-16 text-[#574143]">
            <p className="text-4xl mb-3">🎯</p>
            <p className="mb-2">No active goals yet.</p>
            <Link href="/create-goal" className="text-[#780c28] underline text-sm">Start your first challenge</Link>
          </div>
        )}

        {/* Past Stakes */}
        {past.length > 0 && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-extrabold text-2xl text-[#141b2b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Past Stakes</h2>
            </div>
            <div className="space-y-4">
              {past.map((g) => (
                <div key={g.publicKey.toBase58()} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-[#debfc1]/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c7eaad]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#486636]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#141b2b]">{g.account.title}</h4>
                      <p className="text-xs text-[#574143]">{g.account.durationDays}-day challenge • Settled</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#574143] bg-[#f1f3ff] px-3 py-1 rounded-full">Done</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="p-10 rounded-[3rem] text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #141b2b, #293040)" }}>
          <div className="relative z-10 max-w-md">
            <h3 className="font-extrabold text-3xl mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Scale Your Growth</h3>
            <p className="text-[#dce2f7] mb-8 text-sm leading-relaxed">Stake SOL on your next habit and hold yourself accountable with real skin in the game.</p>
            <Link href="/create-goal" className="inline-block px-8 py-4 bg-white text-[#141b2b] font-bold rounded-full text-sm active:scale-95 transition-transform shadow-xl">
              New Habit Stake
            </Link>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

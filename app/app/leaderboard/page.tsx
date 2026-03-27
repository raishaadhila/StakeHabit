import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

const contenders = [
  { rank: 4, name: "Elena Rossi", badge: "TOP 5%", days: 42, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP-wxf3Vdre_b0_rndnAYt18KTF_1dDzmx-lyNPY7asVA4X7TwXEnGQBd7kMttvf-caQ2wyuEMNluhmzBKv-e8e5LQRujh-MvS0_uvIbNpPhRlNNkvovpTBLw8gKlGnwh4S4yR2i2vctrsxQZLJeG91UdK4Ttzhn_N1sj7G7dyPj-BWaeHBNJUrqOT5dKuUZBitJ6XNCmf2iP55N1KhbNu3vAJP5t2t5z_0NTgnrtxYKX-PxdAaUglPi9cNKOtwL3DVtG2hTao7yHK" },
  { rank: 5, name: "David Chen", badge: "RISING STAR", days: 39, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXdmuXbc_nbxBtNb_9o3Irr2lMtYGl2Tx59E-UbUprzocRSkmFIdvdgtHjqVWBSPh8fXZxsqSUbk6gF1QPTvoq1sCyE6BCwan5hm6VphBVoE3hUJ8qOSfplpHX3zd7pgSzO3U64WzTZ22IGG0T5-UGXLcTlg_02Tdhb0uCsCcsFvsyK2_8OxyYLxe8ZLWgAz4Xy3Nu7dqOyRtzMr4vUrbJu5Rgyj0B3iQ1G7dg_KV5U2SeaspXKzSN4bypI4wGIarH2d03seglfkyU" },
];

export default function LeaderboardPage() {
  return (
    <div className="pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="mb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-[#486636] font-bold tracking-widest text-xs uppercase">Current Standing</span>
              <h1 className="text-4xl font-extrabold text-[#141b2b] mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Leaderboard</h1>
            </div>
            <div className="text-right">
              <p className="text-[#574143] text-sm font-medium">Season 4</p>
              <p className="text-[#780c28] font-bold">12 Days Left</p>
            </div>
          </div>

          {/* User rank card */}
          <div className="relative overflow-hidden rounded-[2rem] p-8 text-white" style={{ background: "linear-gradient(135deg, #780c28, #530017)" }}>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-[#dce2f7]" />
                  <div className="absolute -bottom-1 -right-1 bg-[#486636] text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-[#530017]">#42</div>
                </div>
                <div>
                  <h2 className="text-xl font-bold">You</h2>
                  <p className="text-white/70 text-sm">Consistency King</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12.5 <span className="text-sm font-medium opacity-80">SOL</span></div>
                <p className="text-white/60 text-xs mt-1">Staked this week</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#486636]/20 rounded-full blur-2xl" />
          </div>
        </section>

        {/* Toggle */}
        <div className="flex bg-[#f1f3ff] p-1 rounded-full mb-8">
          <button className="flex-1 py-3 text-sm font-bold bg-white text-[#780c28] rounded-full shadow-sm">Consistency Streak</button>
          <button className="flex-1 py-3 text-sm font-bold text-[#574143] hover:text-[#141b2b] transition-colors">Total SOL Staked</button>
        </div>

        {/* Podium */}
        <section className="grid grid-cols-3 gap-4 mb-10 items-end">
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full border-4 border-[#dce2f7] overflow-hidden bg-[#e9edff]" />
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-300 rounded-full flex items-center justify-center text-slate-800 text-xs font-bold border-2 border-[#f9f9ff]">2</div>
            </div>
            <span className="text-xs font-bold text-[#141b2b] text-center mb-1">Sarah J.</span>
            <div className="w-full h-24 bg-[#f1f3ff] rounded-t-xl flex flex-col items-center justify-center">
              <span className="text-[#780c28] font-black text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>48</span>
              <span className="text-[10px] text-[#574143] uppercase tracking-tighter">Days</span>
            </div>
          </div>
          {/* Rank 1 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-[#c7eaad] overflow-hidden bg-[#e9edff]" />
              <div className="absolute -top-3 -right-3 w-9 h-9 bg-[#c7eaad] rounded-full flex items-center justify-center border-2 border-[#f9f9ff]">
                <span className="material-symbols-outlined text-base text-[#4d6b3a]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              </div>
            </div>
            <span className="text-sm font-bold text-[#141b2b] text-center mb-1">Marcus T.</span>
            <div className="w-full h-32 bg-[#486636]/10 rounded-t-2xl flex flex-col items-center justify-center border-t-4 border-[#486636]">
              <span className="text-[#486636] font-black text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>72</span>
              <span className="text-[10px] text-[#486636] font-bold uppercase tracking-tighter">Day Streak</span>
            </div>
          </div>
          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full border-4 border-[#dce2f7] overflow-hidden bg-[#e9edff]" />
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-orange-200 rounded-full flex items-center justify-center text-orange-900 text-xs font-bold border-2 border-[#f9f9ff]">3</div>
            </div>
            <span className="text-xs font-bold text-[#141b2b] text-center mb-1">Lee K.</span>
            <div className="w-full h-20 bg-[#f1f3ff] rounded-t-xl flex flex-col items-center justify-center">
              <span className="text-[#780c28] font-black text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>45</span>
              <span className="text-[10px] text-[#574143] uppercase tracking-tighter">Days</span>
            </div>
          </div>
        </section>

        {/* List */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[#574143] uppercase tracking-[0.2em] mb-4">The Contenders</h3>
          {contenders.map((u) => (
            <div key={u.rank} className="bg-white p-4 rounded-2xl flex items-center justify-between hover:bg-[#f1f3ff] transition-all">
              <div className="flex items-center gap-4">
                <span className="text-[#574143] font-bold w-6">{u.rank}</span>
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e9edff]">
                  <img alt={u.name} className="w-full h-full object-cover" src={u.img} />
                </div>
                <div>
                  <p className="font-bold text-[#141b2b]">{u.name}</p>
                  <p className="text-[10px] text-[#486636] font-bold">{u.badge}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-[#780c28]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{u.days}</p>
                <p className="text-[10px] text-[#574143] uppercase">Days</p>
              </div>
            </div>
          ))}

          <div className="py-2 flex items-center justify-center gap-2">
            <div className="h-[1px] flex-1 bg-[#debfc1]/20" />
            <span className="text-[10px] text-[#574143] font-bold uppercase tracking-widest">Your Position</span>
            <div className="h-[1px] flex-1 bg-[#debfc1]/20" />
          </div>

          <div className="bg-[#780c28]/5 border border-[#780c28]/20 p-4 rounded-2xl flex items-center justify-between scale-[1.02] shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-[#780c28] font-black w-6">42</span>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#780c28] bg-[#e9edff]" />
              <div>
                <p className="font-bold text-[#141b2b]">You</p>
                <p className="text-[10px] text-[#780c28] font-bold">KEEP CLIMBING</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-[#780c28]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12</p>
              <p className="text-[10px] text-[#574143] uppercase">Days</p>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

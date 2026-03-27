import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

const menuItems = [
  { icon: "person", label: "Account Settings", badge: null },
  { icon: "history", label: "Stake History", badge: null },
  { icon: "notifications", label: "Notifications", badge: "2" },
  { icon: "diversity_3", label: "Refer a Friend", badge: null },
  { icon: "help", label: "Help & Support", badge: null },
];

export default function ProfilePage() {
  return (
    <div className="pb-32">
      <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-md mx-auto">
          <button className="active:scale-95 transition-transform text-[#780c28]">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-extrabold text-xl tracking-tight text-[#780c28]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Profile</h1>
          <button className="active:scale-95 transition-transform text-[#780c28]">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto space-y-8">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 ring-4 ring-[#f1f3ff] overflow-hidden"
              style={{ background: "linear-gradient(135deg, #780c28, #486636)" }}>
              <div className="w-full h-full rounded-full bg-[#dce2f7]" />
            </div>
            <div className="absolute -bottom-2 right-0 bg-[#c7eaad] text-[#4d6b3a] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ boxShadow: "0 20px 40px rgba(20,27,43,0.06)" }}>
              Consistency King
            </div>
          </div>
          <div>
            <h2 className="font-extrabold text-3xl text-[#141b2b] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Alex Rivera</h2>
            <p className="text-[#574143] text-sm font-medium mt-1">@alex_staker</p>
          </div>
        </section>

        {/* Stake Summary Card */}
        <section className="rounded-[2rem] p-8 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #530017 0%, #780c28 100%)", boxShadow: "0 20px 40px rgba(20,27,43,0.06)" }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70">Total SOL Staked</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tighter" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>12.50</span>
                  <span className="text-xl font-bold opacity-80">SOL</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t border-white/10">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Active Stakes</p>
                <p className="text-lg font-bold">5 Habits</p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Portfolio Risk</p>
                <p className="text-lg font-bold">Low</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-[#f1f3ff] p-5 rounded-[1.5rem] flex flex-col justify-between h-36">
            <span className="material-symbols-outlined text-[#486636] text-3xl">auto_graph</span>
            <div>
              <h4 className="text-3xl font-bold text-[#141b2b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>92<span className="text-sm font-medium">%</span></h4>
              <p className="text-xs font-medium text-[#4d6b3a] uppercase tracking-wide">Success Rate</p>
            </div>
          </div>
          <div className="bg-[#dce2f7] p-5 rounded-[1.5rem] flex flex-col justify-between h-36">
            <span className="material-symbols-outlined text-[#780c28] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <div>
              <h4 className="text-3xl font-bold text-[#141b2b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>48</h4>
              <p className="text-xs font-medium text-[#881b33] uppercase tracking-wide">Longest Streak</p>
            </div>
          </div>
          <div className="col-span-2 bg-[#c7eaad] p-6 rounded-[1.5rem] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#486636]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4d6b3a] uppercase tracking-wider">Total SOL Earned</p>
                <h4 className="text-2xl font-bold text-[#314e20]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>+2.15 SOL</h4>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#4d6b3a]">trending_up</span>
          </div>
        </section>

        {/* Menu */}
        <section className="bg-[#f1f3ff] rounded-[2rem] overflow-hidden p-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button key={item.label} className="w-full flex items-center justify-between p-4 hover:bg-[#e9edff] transition-colors rounded-xl group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#574143] group-hover:text-[#530017] transition-colors">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span className="font-semibold text-[#141b2b]">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-[#530017] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                  )}
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </div>
              </button>
            ))}
            <div className="pt-2">
              <button className="w-full flex items-center gap-4 p-4 text-[#ba1a1a] font-bold hover:bg-[#ffdad6]/20 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

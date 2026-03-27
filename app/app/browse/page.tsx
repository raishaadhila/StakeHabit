import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import Link from "next/link";

const categories = [
  { icon: "fitness_center", label: "Fitness" },
  { icon: "bolt", label: "Focus" },
  { icon: "self_improvement", label: "Zen" },
  { icon: "menu_book", label: "Learn" },
  { icon: "payments", label: "Save" },
  { icon: "health_and_safety", label: "Vital" },
];

const challenges = [
  { title: "Morning Zen", level: "Intermediate", active: 480, sol: "0.05", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgko9d_VSAE3fLlxltCnnLe7HLhfkEQBQFvyKIlhS-yAK2j0H2hzz94h6CLo6-ZoueOTHzsnYmRf2th3iaevE0sMSqFp818x38C3l_6SUrM65besfy51hbYKoI8NE6pvabbEjn4J2MrdJ_6FBSnyUcF95BCnRdQ6XmY_KNNHp1GAcZOYEZYAX0VwWgbwQwZb8dmaCHvJgVkXHbX7vgd--EJ9IwLBeBz0PdhYYgUnOrFieSIhJF_NpcDRrH3fg2CCXDNR67W3uLx5B5" },
  { title: "Deep Focus (4h)", level: "Expert", active: 215, sol: "0.25", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUvIfyXiw5YmdxbJhrnC87HwsaVVnwgzkzAs1I9EEqmWLcZnKvW0D6gZsRU63rugylmj_vR2kRPaRUhGrqDDJcWqwRUGPM0EqcRM0IEXPhIJ6FBRGVPxJIiAlHSKZjPfMCzhsDpGHKMMjjxFkBj_MZwF6_hk2XA6O1kLFd63AtzyQpyRmhGAqw6JcOs-oAGf9kehwyF1w4jxpHwaaaXiaLUibp3yJjHXuJPRO-LsyhEyY8mR4e4WXGNXwMi5CbmCVUM5gR2U7Agwwm" },
];

export default function BrowsePage() {
  return (
    <div className="pb-32">
      <TopBar />
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        {/* Hero */}
        <section className="mb-10">
          <div className="mb-8">
            <h2 className="font-extrabold text-4xl lg:text-5xl text-[#141b2b] mb-3 tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Invest in <br /><span className="text-[#780c28]">Consistency</span>
            </h2>
            <p className="text-[#574143] text-lg max-w-md">Commit to your goals with skin in the game. High stakes, higher rewards.</p>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#8a7172]">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="w-full bg-white h-16 pl-12 pr-6 rounded-2xl font-medium text-[#141b2b] placeholder:text-[#8a7172]/50 focus:outline-none focus:ring-2 focus:ring-[#780c28]/20"
              style={{ boxShadow: "0 10px 30px -10px rgba(120,12,40,0.08)" }}
              placeholder="Search for challenges..." type="text" />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-[#486636]">Categories</h3>
            <button className="text-[#780c28] font-bold text-sm flex items-center gap-1 hover:opacity-80">
              View All <span className="material-symbols-outlined text-[16px]">east</span>
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((c) => (
              <div key={c.label} className="bg-white p-4 rounded-2xl flex flex-col items-center text-center group hover:bg-[#caedb0]/10 transition-all cursor-pointer border border-[#caedb0]/10">
                <div className="w-12 h-12 bg-[#caedb0]/20 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#486636]">{c.icon}</span>
                </div>
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#141b2b]">{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Challenges */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-extrabold text-2xl text-[#141b2b] tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Featured Challenges</h3>
            <div className="h-[2px] flex-grow bg-[#caedb0]/20" />
          </div>
          <div className="flex flex-col gap-8">
            {/* Hero card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white border border-[#caedb0]/20" style={{ boxShadow: "0 10px 30px -10px rgba(120,12,40,0.08)" }}>
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden relative">
                <img alt="10k Steps Daily" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfYRAFrOjxxKgxnZZ0EGTZZGOEjGC-CAGiM4FutniFa-LiLma3tE4_qFeV_lewZhkhYdS2nS4hxvhpnAuwhqVcwYFtI1h1W9kwsqO-yauRXd-w4H33oEt9K7xSbTWVdaZfCek2aI-UJx7_XtfpgHmsrfNHIOQV1G2NYylTwutMWLGsAOTeDEtJGPCEEXGF_vlMi1qFuCVXGJmxhTiVBKFPhhtqI58wFGPDreRr2N4b_2DagsmxEw0opA1JQBEFmXjnjCoHXCk1fbh_" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#780c28] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> Trending Now
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                  <div>
                    <h4 className="font-extrabold text-3xl mb-1 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>10k Steps Daily</h4>
                    <div className="flex items-center gap-3 text-sm font-medium opacity-90">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">groups</span> 1.2k joined</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> 30 days</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">STAKE TO START</span>
                    <span className="font-black text-3xl text-[#caedb0] drop-shadow-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>0.10 SOL</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Link href="/create-goal" className="block w-full bg-[#780c28] hover:bg-[#780c28]/90 text-white font-bold py-5 rounded-2xl text-center text-lg tracking-tight transition-all active:scale-[0.98]"
                  style={{ boxShadow: "0 20px 40px rgba(120,12,40,0.2)" }}>
                  Join &amp; Stake Challenge
                </Link>
              </div>
            </div>

            {/* Bento list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((c) => (
                <div key={c.title} className="bg-white p-5 rounded-3xl flex gap-5 items-center border border-[#caedb0]/10 hover:border-[#780c28]/20 transition-all"
                  style={{ boxShadow: "0 10px 30px -10px rgba(120,12,40,0.08)" }}>
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[#caedb0]/10">
                    <img alt={c.title} className="w-full h-full object-cover" src={c.img} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-lg text-[#141b2b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.title}</h4>
                      <span className="text-[#780c28] font-extrabold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.sol} SOL</span>
                    </div>
                    <p className="text-[11px] font-bold text-[#486636] uppercase tracking-widest mb-4">{c.level} • {c.active} Active</p>
                    <button className="w-full bg-[#caedb0]/20 hover:bg-[#caedb0]/40 text-[#780c28] font-bold text-xs py-3 rounded-xl transition-colors uppercase tracking-widest active:scale-95">
                      Join Challenge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

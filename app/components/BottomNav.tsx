"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/browse", icon: "explore", label: "Browse" },
  { href: "/dashboard", icon: "assignment", label: "My Habits" },
  { href: "/leaderboard", icon: "leaderboard", label: "Leaderboard" },
  { href: "/profile", icon: "person", label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f9f9ff] rounded-t-[2rem] border-t border-[#debfc1]/15"
      style={{ boxShadow: "0 -10px 30px rgba(20,27,43,0.04)" }}>
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all active:scale-90 ${active ? "bg-[#780c28] text-white rounded-full shadow-lg" : "text-slate-500 hover:text-[#780c28]"}`}>
            <span className="material-symbols-outlined mb-1">{t.icon}</span>
            <span className="text-[11px] font-semibold tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

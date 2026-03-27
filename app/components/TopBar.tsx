"use client";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-[#f9f9ff]/80 backdrop-blur-xl z-50"
      style={{ boxShadow: "0 20px 40px rgba(20,27,43,0.06)" }}>
      <span className="text-2xl font-extrabold tracking-tight text-[#780c28]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        StakeHabit
      </span>
      <div className="flex items-center gap-3">
        <button className="material-symbols-outlined text-[#780c28] hover:opacity-80 transition-opacity">notifications</button>
        <WalletMultiButton style={{ background: "#780c28", borderRadius: "9999px", fontSize: "13px", height: "36px" }} />
      </div>
      <div className="bg-[#f1f3ff] h-[1px] w-full absolute bottom-0 left-0" />
    </header>
  );
}

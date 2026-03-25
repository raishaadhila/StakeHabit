import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-8 px-4">
      <div className="flex flex-col gap-3">
        <span className="text-purple-500 text-sm font-semibold tracking-widest uppercase">Built on Solana</span>
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
          Stake your habits.<br />
          <span className="text-purple-400">Win your goals.</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
          Put real SOL on the line. Your AI coach keeps you accountable daily. Hit your goals or lose part of your stake.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link href="/create-goal" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold text-center transition-colors">
          🚀 Start a Challenge
        </Link>
        <Link href="/dashboard" className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold text-center transition-colors">
          My Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full max-w-2xl">
        {[
          { icon: "💰", title: "Stake SOL", desc: "Lock real funds as commitment" },
          { icon: "🤖", title: "AI Coach", desc: "Daily personalized nudges" },
          { icon: "🏆", title: "Win Back", desc: "Full refund if you hit >90%" },
        ].map((f) => (
          <div key={f.title} className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-left">
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="font-semibold text-sm">{f.title}</div>
            <div className="text-gray-400 text-xs mt-1">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

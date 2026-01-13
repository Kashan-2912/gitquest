export default function LeaderboardPage() {
  return (
    <main className="min-h-screen px-6 py-16 flex items-center justify-center">
      <div className="relative overflow-hidden w-full max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900 to-neutral-950 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_35%),_radial-gradient(circle_at_20%_60%,_rgba(59,130,246,0.12),_transparent_35%),_radial-gradient(circle_at_80%_40%,_rgba(236,72,153,0.12),_transparent_30%)]" aria-hidden />
        <div className="relative px-8 py-14 text-center space-y-4">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-white/70">
            Leaderboard
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Coming Soon</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We are forging an epic hall of fame. Stay tuned while we rank the most mythical GitHub creatures.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-white/60">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            <span>Summoning metrics, battle stats, and glory badges are on their way.</span>
          </div>
        </div>
      </div>
    </main>
  );
}

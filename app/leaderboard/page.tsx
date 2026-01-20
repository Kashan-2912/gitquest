import { Suspense } from "react";
import { getLeaderboardCreatures, getTotalCreaturesCount } from "@/server/creatures";
import { HugeiconsIcon } from "@hugeicons/react";
import { Flame, Trophy } from "@hugeicons/core-free-icons";
import LeaderboardTable from "@/components/leaderboard-table";

async function LeaderboardContent() {
  const [creatures, totalCount] = await Promise.all([
    getLeaderboardCreatures(50),
    getTotalCreaturesCount(),
  ]);

  const topCreature = creatures[0];
  const topContributions = topCreature?.contributions ?? 0;

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-amber-500/20 to-transparent rounded-bl-full" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <HugeiconsIcon icon={Trophy} className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Top Contributor</p>
              <p className="text-lg font-bold text-white">{topContributions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-emerald-500/20 to-transparent rounded-bl-full" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <HugeiconsIcon icon={Trophy} className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Total Creatures</p>
              <p className="text-lg font-bold text-white">{totalCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-purple-500/20 to-transparent rounded-bl-full" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <HugeiconsIcon icon={Flame} className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Ranked Today</p>
              <p className="text-lg font-bold text-white">Top 50</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <LeaderboardTable creatures={creatures} />
    </>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/5 p-4 h-20 animate-pulse"
          />
        ))}
      </div>
      {/* Table skeleton */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="h-12 bg-white/5 animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-t border-white/5 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 dark mt-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-neutral-900/80 via-neutral-900 to-neutral-950 shadow-2xl mb-8">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_20%_60%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(236,72,153,0.12),transparent_30%)]"
            aria-hidden
          />
          <div className="relative px-6 sm:px-8 py-10 sm:py-14 text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70">
              <HugeiconsIcon icon={Trophy} className="h-4 w-4 text-amber-400" />
              Hall of Fame
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white">Leaderboard</h1>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              The most legendary GitHub creatures, ranked by their summoner&apos;s contribution power.
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-white/60">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <span>Rankings update in real-time as new creatures are summoned</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent />
        </Suspense>
      </div>
    </main>
  );
}

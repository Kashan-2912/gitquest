import { Suspense } from "react";
import { getLeaderboardCreatures, getTotalCreaturesCount } from "@/server/creatures";
import { HugeiconsIcon } from "@hugeicons/react";
import { Flame, Trophy } from "@hugeicons/core-free-icons";
import LeaderboardTable from "@/components/leaderboard-table";
import Card from "@/components/card";

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
        <Card
          className="mb-8"
          fullWidth
          eyebrow="Hall of Fame"
          eyebrowIcon={<HugeiconsIcon icon={Trophy} className="h-4 w-4 text-amber-300" />}
          title="Leaderboard"
          subtitle="The most legendary GitHub creatures, ranked by their summoner's contribution power."
          items={[
            "Rankings update in real-time as new creatures are summoned",
            "Top 50 creatures highlighted with live contribution stats",
            "Summoners gain perks as their creatures climb the board",
            "Exclusive Hall of Fame badge for season leaders",
          ]}
        />

        {/* Content */}
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent />
        </Suspense>
      </div>
    </main>
  );
}

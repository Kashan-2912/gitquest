"use client";

import Link from "next/link";
import Image from "next/image";
import { SelectCreature } from "@/db/schema";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Crown, Medal, Trophy, Flame, Zap, Star, Sparkles } from "@hugeicons/core-free-icons";

type LeaderboardTableProps = {
  creatures: SelectCreature[];
};

function getPowerLevel(contributions: number): number {
  if (contributions >= 5000) return 10;
  if (contributions >= 3000) return 9;
  if (contributions >= 2000) return 6;
  if (contributions >= 1000) return 4;
  if (contributions >= 500) return 2;
  return 1;
}

function getTierInfo(powerLevel: number): {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
} {
  if (powerLevel >= 10) {
    return {
      name: "Legendary",
      color: "text-purple-300",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/50",
      icon: <HugeiconsIcon icon={Crown} className="h-4 w-4 text-purple-400" />,
    };
  }
  if (powerLevel >= 9) {
    return {
      name: "Mythic",
      color: "text-slate-200",
      bgColor: "bg-slate-500/20",
      borderColor: "border-slate-400/50",
      icon: <HugeiconsIcon icon={Sparkles} className="h-4 w-4 text-slate-300" />,
    };
  }
  if (powerLevel >= 6) {
    return {
      name: "Epic",
      color: "text-red-300",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/50",
      icon: <HugeiconsIcon icon={Flame} className="h-4 w-4 text-red-400" />,
    };
  }
  if (powerLevel >= 4) {
    return {
      name: "Rare",
      color: "text-orange-300",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/50",
      icon: <HugeiconsIcon icon={Zap} className="h-4 w-4 text-orange-400" />,
    };
  }
  if (powerLevel >= 2) {
    return {
      name: "Uncommon",
      color: "text-emerald-300",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/50",
      icon: <HugeiconsIcon icon={Star} className="h-4 w-4 text-emerald-400" />,
    };
  }
  return {
    name: "Common",
    color: "text-slate-400",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    icon: null,
  };
}

function getRankBadge(rank: number) {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-amber-600 shadow-lg shadow-amber-500/30">
        <HugeiconsIcon icon={Trophy} className="h-4 w-4 text-yellow-100" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-slate-300 to-slate-500 shadow-lg shadow-slate-400/30">
        <HugeiconsIcon icon={Medal} className="h-4 w-4 text-slate-100" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-700/30">
        <HugeiconsIcon icon={Medal} className="h-4 w-4 text-amber-100" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
      <span className="text-sm font-semibold text-white/60">{rank}</span>
    </div>
  );
}

function getCreatureName(description: string): string {
  const match = description.match(/Base creature:\s*([^(\n]+)/i);
  return match ? match[1].trim() : "Unknown Creature";
}

function getUsername(githubProfileUrl: string): string {
  return githubProfileUrl.split("/").pop() || "unknown";
}

export default function LeaderboardTable({ creatures }: LeaderboardTableProps) {
  if (!creatures || creatures.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No creatures have been summoned yet.</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Be the first to summon a creature →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {/* Desktop Table Header */}
      <div className="hidden lg:grid grid-cols-[60px_1fr_1fr_120px_100px] gap-4 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Rank
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Summoner
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Creature
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/50 text-center">
          Tier
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/50 text-right">
          Contributions
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-3 border-b border-white/10 bg-white/5">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Leaderboard Rankings
        </p>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/5">
        {creatures.map((creature, index) => {
          const rank = index + 1;
          const username = getUsername(creature.githubProfileUrl);
          const creatureName = getCreatureName(creature.description);
          const powerLevel = getPowerLevel(creature.contributions);
          const tierInfo = getTierInfo(powerLevel);
          const isTopThree = rank <= 3;

          return (
            <div key={creature.id} className={cn("relative", isTopThree && "fire-border-wrapper")}>
              {isTopThree && (
                <>
                  <div className={cn(
                    "absolute inset-0 fire-border-animated pointer-events-none",
                    rank === 1 && "fire-border-top",
                    rank === 2 && "fire-border-sides",
                    rank === 3 && "fire-border-bottom"
                  )} />
                </>
              )}
              <Link
                href={`/${username}`}
                className={cn(
                  "block lg:grid lg:grid-cols-[60px_1fr_1fr_120px_100px] gap-4 px-4 py-4 transition-all duration-200 relative z-10",
                  "hover:bg-white/5 group cursor-pointer"
                )}
              >
              {/* Mobile Layout */}
              <div className="lg:hidden flex items-start gap-3">
                {/* Rank + Avatar */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative">
                    {getRankBadge(rank)}
                    {isTopThree && (
                      <div className="absolute -top-1 -right-1 animate-bounce">
                        <HugeiconsIcon icon={Flame} className="h-4 w-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                      </div>
                    )}
                  </div>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                    <Image
                      src={creature.image}
                      alt={username}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                        @{username}
                      </p>
                      <p className="text-sm text-white/70 truncate">{creatureName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-lg tabular-nums text-white">
                        {creature.contributions.toLocaleString()}
                      </p>
                      <p className="text-xs text-white/40">commits</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
                        tierInfo.bgColor,
                        tierInfo.color,
                        tierInfo.borderColor
                      )}
                    >
                      {tierInfo.icon}
                      {tierInfo.name}
                    </span>
                    <span className="text-xs text-white/40">
                      Power Level {powerLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:contents">
                {/* Rank */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    {getRankBadge(rank)}
                    {isTopThree && (
                      <div className="absolute -top-1 -right-1 animate-bounce">
                        <HugeiconsIcon icon={Flame} className="h-4 w-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Summoner */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                    <Image
                      src={creature.image}
                      alt={username}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                      @{username}
                    </p>
                    <p className="text-xs text-white/40">GitHub Summoner</p>
                  </div>
                </div>

                {/* Creature Name */}
                <div className="min-w-0 flex items-center">
                  <div>
                    <p className="font-semibold text-white/90 truncate">
                      {creatureName}
                    </p>
                    <p className="text-xs text-white/40 truncate">
                      Power Level {powerLevel}
                    </p>
                  </div>
                </div>

                {/* Tier Badge */}
                <div className="flex items-center justify-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                      tierInfo.bgColor,
                      tierInfo.color,
                      tierInfo.borderColor
                    )}
                  >
                    {tierInfo.icon}
                    {tierInfo.name}
                  </span>
                </div>

                {/* Contributions */}
                <div className="text-right flex items-center justify-end">
                  <div>
                    <p className="font-bold text-lg tabular-nums text-white">
                      {creature.contributions.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/40">commits</p>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes fire-flicker {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 3px rgba(251, 146, 60, 0.6));
          }
          25% {
            filter: brightness(1.1) drop-shadow(0 0 5px rgba(251, 146, 60, 0.7));
          }
          50% {
            filter: brightness(1.2) drop-shadow(0 0 6px rgba(239, 68, 68, 0.7));
          }
          75% {
            filter: brightness(1.1) drop-shadow(0 0 5px rgba(251, 146, 60, 0.7));
          }
        }

        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .fire-border-animated {
          animation: fire-flicker 2s ease-in-out infinite;
        }

        .fire-border-top {
          border-top: 2px solid transparent;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
            linear-gradient(
              90deg,
              rgba(251, 146, 60, 0.8) 0%,
              rgba(249, 115, 22, 0.9) 25%,
              rgba(239, 68, 68, 0.9) 50%,
              rgba(249, 115, 22, 0.9) 75%,
              rgba(251, 146, 60, 0.8) 100%
            ) border-box;
          background-size: 200% 100%;
          animation: fire-flicker 2s ease-in-out infinite, border-flow 3s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .fire-border-sides {
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
            linear-gradient(
              90deg,
              rgba(251, 146, 60, 0.8) 0%,
              rgba(249, 115, 22, 0.9) 25%,
              rgba(239, 68, 68, 0.9) 50%,
              rgba(249, 115, 22, 0.9) 75%,
              rgba(251, 146, 60, 0.8) 100%
            ) border-box;
          background-size: 200% 100%;
          animation: fire-flicker 2s ease-in-out infinite, border-flow 3s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .fire-border-bottom {
          border-bottom: 2px solid transparent;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
            linear-gradient(
              90deg,
              rgba(251, 146, 60, 0.8) 0%,
              rgba(249, 115, 22, 0.9) 25%,
              rgba(239, 68, 68, 0.9) 50%,
              rgba(249, 115, 22, 0.9) 75%,
              rgba(251, 146, 60, 0.8) 100%
            ) border-box;
          background-size: 200% 100%;
          animation: fire-flicker 2s ease-in-out infinite, border-flow 3s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .fire-border-wrapper {
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}

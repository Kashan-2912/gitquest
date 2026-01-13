import Link from "next/link";

import DownloadDropdown from "@/components/download-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectCreature } from "@/db/schema";
import { getCreatureTopPercentage } from "@/server/creatures";
import ShareOnXButton from "./share-on-x-button";

type CreatureStatsProps = {
  creature: SelectCreature;
  downloadTargetId?: string;
};

export default async function CreatureStats({
  creature,
  downloadTargetId,
}: CreatureStatsProps) {
  const topPercentage = await getCreatureTopPercentage(creature.id);

  const descriptionText = creature.description;
  const baseCreatureMatch = descriptionText.match(/Base creature:\s*([^\n(]+)(?:\s*\(CR\s*\d+(?:\/\d+)?\))?/i);
  const baseCreatureName = baseCreatureMatch ? baseCreatureMatch[1].trim() : null;

  return (
    <Card className="w-92 bg-linear-to-b from-primary/6 to-background flex flex-col justify-between min-h-[600px]">
      <CardHeader className="border-b">
        <CardTitle className="text-lg sm:text-xl font-bold tracking-tight">
          {baseCreatureName}
        </CardTitle>
        <CardDescription className="text-sm text-foreground/75">
          {creature.description}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary" className="whitespace-nowrap">
            Top {topPercentage}%
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="flex flex-col gap-2">
          <Link
            href={creature.githubProfileUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="sm">
              View on GitHub
            </Button>
          </Link>
          <div className="rounded-none border border-border/70 bg-background/40 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Contributions
            </div>
            <div className="mt-1 text-base font-semibold tabular-nums">
              {creature.contributions}
            </div>
          </div>

          {/* <div className="rounded-none border border-border/70 bg-background/40 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Followers
            </div>
            <div className="mt-1 text-base font-semibold tabular-nums">
              {creature.followers}
            </div>
          </div>

          <div className="rounded-none border border-border/70 bg-background/40 p-3">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Stars
            </div>
            <div className="mt-1 text-base font-semibold tabular-nums">
              {creature.stars}
            </div>
          </div> */}
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <p className="text-sm text-muted-foreground">Share:</p>
        <div className="flex items-center gap-2">
          <ShareOnXButton
            text={`Check out ${baseCreatureName} — my GitHub Creature`}
          />
          {downloadTargetId ? (
            <DownloadDropdown
              targetId={downloadTargetId}
              originalImageUrl={creature.image}
              fileName={baseCreatureName || "github-creature"}
            />
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
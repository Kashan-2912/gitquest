/* eslint-disable react-hooks/purity */
import { Metadata } from "next";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { connection } from "next/server";

import CreatureCard from "@/components/creature-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCreatureByGithubUsername } from "@/server/creatures";

type Params = Promise<{ username: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;

  const creature = await getCreatureByGithubUsername(username);

  const descriptionText = creature?.description;
  const baseCreatureMatch = descriptionText?.match(
    /Base creature:\s*([^\n(]+)(?:\s*\(CR\s*\d+(?:\/\d+)?\))?/i
  );
  const baseCreatureName = baseCreatureMatch
    ? baseCreatureMatch[1].trim()
    : null;

  const ogImage = creature?.image ?? "/github-creature-logo.png";
  const title = baseCreatureName ? baseCreatureName : "GitHub Creature";

  return {
    title,
    description:
      creature?.description ??
      "Generate a creature based on your GitHub profile.",
    openGraph: {
      title,
      description:
        creature?.description ??
        "Generate a creature based on your GitHub profile.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: baseCreatureName
            ? `${baseCreatureName} (GitHub Creature)`
            : "GitHub Creature",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        creature?.description ??
        "Generate a creature based on your GitHub profile.",
      images: [ogImage],
    },
  };
}

async function CreatureCardWrapper({ params }: { params: Params }) {
  const { username } = await params;

  // Touch request-scoped data to allow dynamic randomness
  headers();
  await connection();

  // Per-request cryptographic randomness (range 2..10)
  const rand = () => (crypto.getRandomValues(new Uint32Array(1))[0] % 9) + 2;
  const cardTheme = rand();
  const cardEmblemTheme = rand();

  return (
    <CreatureCard
      username={username}
      stats={true}
      cardTheme={cardTheme}
      cardEmblemTheme={cardEmblemTheme}
    />
  );
}

export default function CreaturePage({ params }: { params: Params }) {
  noStore();
  return (
    <main className="flex p-5 max-w-2xl mt-20 w-full mx-auto flex-col items-center justify-center gap-5 h-[90vh]">
      <Suspense fallback={<Skeleton className="h-96 w-72" />}>
        <CreatureCardWrapper params={params} />
      </Suspense>
    </main>
  );
}

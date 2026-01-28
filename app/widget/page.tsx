import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { connection } from "next/server";
import CreatureCard from "@/components/creature-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCreatureByGithubUsername } from "@/server/creatures";
import { WidgetForm } from "./widget-form";

export const metadata: Metadata = {
  title: "GitHub README Widget - GitQuest",
  description:
    "Add your GitQuest creature to your GitHub profile README with an embeddable widget.",
};

type SearchParams = Promise<{ username?: string }>;

async function CreaturePreview({ username }: { username: string }) {
  const creature = await getCreatureByGithubUsername(username);

  if (!creature) {
    return (
      <div className="text-center p-8 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">
          No creature found for <span className="font-bold">@{username}</span>
        </p>
        <Link href="/summon" className="text-primary hover:underline mt-2 block">
          Summon your creature first →
        </Link>
      </div>
    );
  }

  // Touch request-scoped data to allow dynamic randomness
  headers();
  await connection();

  const rand = () => (crypto.getRandomValues(new Uint32Array(1))[0] % 9) + 2;
  const cardTheme = rand();
  const cardEmblemTheme = rand();

  const baseUrl = "https://gitquest.is-a.software";
  const widgetImageUrl = `${baseUrl}/api/widget/${username}`;
  const profileUrl = `${baseUrl}/${username}`;
  const markdownCode = `[![My GitQuest Creature](${widgetImageUrl})](${profileUrl})`;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Creature Card Preview */}
      <CreatureCard
        username={username}
        stats={true}
        cardTheme={cardTheme}
        cardEmblemTheme={cardEmblemTheme}
      />

      {/* Markdown Code for GitHub README */}
      <div className="w-full max-w-xl space-y-3">
        <h3 className="font-semibold text-lg">📋 Copy this to your GitHub README:</h3>
        <div className="relative">
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm border">
            <code>{markdownCode}</code>
          </pre>
        </div>
        <p className="text-sm text-muted-foreground">
          This will show your creature image and link to your GitQuest profile when clicked.
        </p>
      </div>
    </div>
  );
}

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { username } = await searchParams;

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">🐉 GitHub README Widget</h1>
          <p className="text-muted-foreground text-lg">
            Showcase your GitQuest creature on your GitHub profile
          </p>
        </div>

        {/* Username Input Form */}
        <div className="flex justify-center mb-10">
          <Suspense fallback={<Skeleton className="h-10 w-80" />}>
            <WidgetForm initialUsername={username} />
          </Suspense>
        </div>

        {/* Creature Preview */}
        {username && (
          <Suspense fallback={<Skeleton className="h-96 w-72 mx-auto" />}>
            <CreaturePreview username={username} />
          </Suspense>
        )}

        {/* Instructions */}
        <div className="mt-12 space-y-6 max-w-2xl mx-auto">
          <section>
            <h2 className="text-xl font-semibold mb-3">📝 How to Add to Your GitHub Profile</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                First,{" "}
                <Link href="/summon" className="text-primary hover:underline">
                  summon your creature
                </Link>
              </li>
              <li>Create a repository with the same name as your GitHub username</li>
              <li>
                Add or edit the <code className="bg-muted px-1.5 py-0.5 rounded text-sm">README.md</code> file
              </li>
              <li>Paste the markdown code above</li>
              <li>Commit and push — your creature will appear on your profile!</li>
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}

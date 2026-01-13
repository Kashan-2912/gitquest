import { GithubForm } from "@/components/forms/github-form";
import LatestCreatures from "@/components/LatestCreatures";
import { Skeleton } from "@/components/ui/skeleton";
import { getTenLatestCreatures } from "@/server/creatures";
import { Suspense } from "react";

async function CreaturesWrapper() {
  const creatures = await getTenLatestCreatures();
  return <LatestCreatures creatures={creatures} />;
}

export default function Page() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center min-h-screen py-10">
      <h1 className="text-3xl font-bold">
        Summon the Creature Behind Your Code
      </h1>

      <GithubForm />

      <Suspense
        fallback={
          <div className="flex flex-col gap-5 px-5">
            <h2 className="text-xl font-semibold">Latest Creatures</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-20" />
              ))}
            </div>
          </div>
        }
      >
        <CreaturesWrapper />
      </Suspense>
    </main>
  );
}

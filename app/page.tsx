import { GithubForm } from "@/components/forms/github-form";
import LatestCreatures from "@/components/LatestCreatures";
import { Skeleton } from "@/components/ui/skeleton";
import { getSixLatestCreatures } from "@/server/creatures";
import { Suspense } from "react";

export default async function Page() {
  const creatures = await getSixLatestCreatures();

  return (
    <main className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Summon the Creature Behind Your Code</h1>
      
      <GithubForm />
      
      <Suspense fallback={<Skeleton className="w-full h-10 flex-1" />}>
        <LatestCreatures creatures={creatures} />
      </Suspense>
    </main>
  );
}

import CreaturesShowcase from "@/components/creatures-showcase";
import { GithubForm } from "@/components/forms/github-form";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="px-6 flex flex-col gap-5 items-center justify-center min-h-screen mt-10 py-10">
      <h1 className="text-3xl font-bold">
        Summon the Creature Behind Your Code
      </h1>

      <Suspense>
        <GithubForm />
      </Suspense>

      <Suspense fallback={<div className="text-muted-foreground">Loading creatures...</div>}>
        <CreaturesShowcase />
      </Suspense>
    </main>
  );
}

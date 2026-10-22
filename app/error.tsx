"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        GitQuest hit a problem loading this page. Please try again, and if it
        keeps happening, come back in a few minutes.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border px-4 py-2"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}

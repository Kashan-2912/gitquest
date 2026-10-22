import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold">Creature not found</h1>
      <p className="max-w-md text-muted-foreground">
        This page does not exist yet. Summon a creature first, or head back
        home and try another GitHub username.
      </p>
      <Link href="/" className="rounded-md border px-4 py-2">
        Go home
      </Link>
    </main>
  );
}

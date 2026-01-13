import CreatureCard from "@/components/creature-card";
import { getThreeLatestCreatures } from "@/server/creatures";
import Link from "next/link";

export default async function Page() {
  const creatures = await getThreeLatestCreatures();

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creatures.map((creature) => (
            <Link href={`/creature/${creature.id}`} key={creature.id}>
              <div className="transform transition-transform hover:scale-105">
                <CreatureCard creature={creature} />
              </div>
            </Link>
          ))}
        </div>

        {creatures.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No creatures yet. Be the first to summon one!</p>
          </div>
        )}
      </div>
    </main>
  );
}

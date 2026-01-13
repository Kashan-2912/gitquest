import { SelectCreature } from "@/db/schema";
import { Button } from "./ui/button";
import Link from "next/link";

type LatestCreaturesProps = {
  creatures: SelectCreature[];
};

const LatestCreatures = ({ creatures }: LatestCreaturesProps) => {
  if (!creatures || creatures.length === 0) {
    return (
      <div className="flex flex-col gap-5 px-5 w-full max-w-5xl">
        <h2 className="text-xl font-semibold">Latest Creatures</h2>
        <p className="text-muted-foreground">
          No creatures summoned yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-5 w-full max-w-3xl">
      <h2 className="text-xl font-semibold">Latest Creatures</h2>
      <div className="flex flex-wrap w-full gap-y-2 gap-x-[1.25%]">
        {creatures.map((creature: SelectCreature) => (
          <Button
            key={creature.id}
            variant="default"
            nativeButton={false}
            className="w-[19%] cursor-pointer justify-center truncate"
            render={
              <Link href={`/creature/${creature.id}`}>
                {creature.githubProfileUrl.split("/").pop()}
              </Link>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCreatures;

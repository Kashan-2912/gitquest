import CreatureCard from "@/components/creature-card";
import { getCreature } from "@/server/creatures";

type Params = Promise<{ creatureId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { creatureId } = await params;
  const creature = await getCreature(creatureId);

  if (!creature) {
    return <div>Creature not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <CreatureCard creature={creature} />
    </div>
  );
};

export default page;

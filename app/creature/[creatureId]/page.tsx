import { getCreature } from "@/server/creatures";
import Image from "next/image";

type Params = Promise<{ creatureId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { creatureId } = await params;
  const creature = await getCreature(creatureId);

  if (!creature) {
    return <div>Creature not found</div>;
  }

  return (
    <div className="flex flex-col  items-center justify-center pt-20">
      <h1>Description: {creature?.description}</h1>
      <Image
        src={creature!.image}
        alt={creature!.description}
        width={500}
        height={500}
      />
    </div>
  );
};

export default page;

import { getCreature } from "@/server/creatures";
import Image from "next/image";

type Params = Promise<{ creatureId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { creatureId } = await params;
  const creature = await getCreature(creatureId);

  return (
    <>
      <div>Creature ID: {creatureId}</div>
      <h1>Description: {creature?.description}</h1>
      <Image
        src={creature!.image}
        alt={creature!.description}
        width={100}
        height={100}
      />
    </>
  );
};

export default page;

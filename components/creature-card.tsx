import { SelectCreature } from "@/db/schema";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const CreatureCard = ({ creature }: { creature: SelectCreature }) => {
  return (
    <Card className="flex max-w-2xl w-full mx-auto border flex-col items-center justify-center mb-20">
      <CardHeader>
        <CardTitle>{creature.githubProfileUrl.split("/").pop()}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-5 mx-auto">
        <Image
        className="w-full"
          src={creature.image}
          alt={creature.description}
          width={500}
          height={500}
        />

        <p>{creature.description}</p>
      </CardContent>
    </Card>
  );
};

export default CreatureCard;

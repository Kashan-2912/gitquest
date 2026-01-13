import { SelectCreature } from "@/db/schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const CreatureCard = ({ creature }: { creature: SelectCreature }) => {
  // Parse the description to extract base creature name and description
  const descriptionText = creature.description;
  const baseCreatureMatch = descriptionText.match(/Base creature:\s*([^\n(]+)(?:\s*\(CR\s*\d+(?:\/\d+)?\))?/i);
  const baseCreatureName = baseCreatureMatch ? baseCreatureMatch[1].trim() : null;
  
  // Remove the base creature line from description
  const remainingDescription = baseCreatureName 
    ? descriptionText.replace(/Base creature:.*?\n\n?/i, '').trim()
    : descriptionText;

  return (
    <Card className="flex max-w-2xl w-full mx-auto border flex-col items-center justify-center mb-20">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl text-center">{creature.githubProfileUrl.split("/").pop()?.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-5 mx-auto">
        <Image
          className="w-full rounded-lg"
          loading="eager"
          src={creature.image}
          alt={creature.description}
          width={500}
          height={500}
        />

        <div className="w-full space-y-3 text-left">
          {baseCreatureName && (
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">
                Base Creature
              </h3>
              <p className="text-xl font-semibold text-foreground">
                {baseCreatureName}
              </p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-bold text-primary mb-1">
              Description
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {remainingDescription}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatureCard;

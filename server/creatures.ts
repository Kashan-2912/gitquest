import { db } from "@/db/drizzle";
import { creatures, InsertCreature } from "@/db/schema";
import { count, desc, gt } from "drizzle-orm";

export async function saveCreature(creature: InsertCreature) {
  try {
    const [newCreature] = await db
      .insert(creatures)
      .values(creature)
      .returning();
    return newCreature;
  } catch (error) {
    console.error("Error in saveCreature:", error);
    throw error;
  }
}

export async function getCreature(creatureId: string) {
  try {
    const creature = await db.query.creatures.findFirst({
      where: (creatures, { eq }) => eq(creatures.id, creatureId),
    });

    return creature;
  } catch (error) {
    console.error("Error in getCreature:", error);
    throw error;
  }
}

export async function getTenLatestCreatures() {
  try {
    const creatures = await db.query.creatures.findMany({
      orderBy: (creatures, { desc }) => desc(creatures.createdAt),
      limit: 10,
    });
    return creatures;
  } catch (error) {
    console.error("Error in getSixLatestCreatures:", error);
    throw error;
  }
}

export async function getCreatureTopPercentage(id: string) {
  try {
    const creature = await db.query.creatures.findFirst({
      where: (creatures, { eq }) => eq(creatures.id, id),
    });

    if (!creature) {
      throw new Error("Creature not found");
    }

    const [{ count: totalCreaturesRaw }] = await db
      .select({ count: count() })
      .from(creatures);

    const totalCreatures = Number(totalCreaturesRaw ?? 0);
    if (totalCreatures === 0) return 0;

    const [{ count: betterCreaturesRaw }] = await db
      .select({ count: count() })
      .from(creatures)
      .where(gt(creatures.contributions, creature.contributions));

    const betterCreatures = Number(betterCreaturesRaw ?? 0);
    const rank = betterCreatures + 1;

    return Math.round((rank / totalCreatures) * 100);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get creature top percentage");
  }
}

export async function getCreatureByGithubUsername(githubUsername: string) {
  const githubUrl = `https://github.com/${githubUsername}`;
  console.log(githubUrl);
  try {
    const creature = await db.query.creatures.findFirst({
      where: (creatures, { eq }) => eq(creatures.githubProfileUrl, githubUrl),
    });
    // console.log(creature)
    return creature;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get creature");
  }
}
import { db } from "@/db/drizzle";
import { creatures, InsertCreature } from "@/db/schema";
import { count, gt, sql } from "drizzle-orm";

export async function saveCreature(creature: InsertCreature) {
  try {
    // One creature per GitHub profile: re-summoning updates the existing
    // row instead of adding a duplicate to the leaderboard.
    const existing = await db.query.creatures.findFirst({
      where: (creatures, { eq }) =>
        eq(creatures.githubProfileUrl, creature.githubProfileUrl),
    });
    if (existing) {
      const [updated] = await db
        .update(creatures)
        .set({ ...creature, updateAt: new Date() })
        .where(sql`${creatures.id} = ${existing.id}`)
        .returning();
      return updated;
    }
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

export async function getTenLatestCreatures() {
  try {
    const creatures = await db.query.creatures.findMany({
      orderBy: (creatures, { desc }) => desc(creatures.createdAt),
      limit: 10,
    });
    return creatures;
  } catch (error) {
    console.error("Error in getTenLatestCreatures:", error);
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
      // Case-insensitive: GitHub usernames are case-insensitive, so a
      // profile saved as one case must be found under any other case.
      where: () =>
        sql`lower(${creatures.githubProfileUrl}) = lower(${githubUrl})`,
    });
    // console.log(creature)
    return creature;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get creature");
  }
}

export async function getLeaderboardCreatures(limit: number = 50) {
  try {
    const leaderboard = await db.query.creatures.findMany({
      orderBy: (creatures, { desc }) => desc(creatures.contributions),
      limit,
    });
    return leaderboard;
  } catch (error) {
    console.error("Error in getLeaderboardCreatures:", error);
    throw error;
  }
}

export async function getTotalCreaturesCount() {
  try {
    const [{ count: totalCount }] = await db
      .select({ count: count() })
      .from(creatures);
    return Number(totalCount ?? 0);
  } catch (error) {
    console.error("Error in getTotalCreaturesCount:", error);
    throw error;
  }
}
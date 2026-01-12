"use server";

import { db } from "@/db/drizzle";
import { creatures } from "@/db/schema";
import { generateText } from "ai";
import { put } from "@vercel/blob";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API!,
});

export async function fetchGithubStats(username: string) {
  // const username = githubProfileUrl.split("/").pop();
  const response = await fetch(
    `https://api.github.com/search/commits?q=author:${username}`
  );
  const data = await response.json();
  console.log(data.total_count);
  return data;
}

export async function generateCreatureImage(
  githubProfileUrl: string,

  contributions: number
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: `
      Github user: ${githubProfileUrl}
      Contributions: ${contributions}

      Generate a fantasy creature based on a GitHub user's contributions. Use the following rules:

        Contributions determine base tier / strength:

        Instead of using generic examples, select an appropriate creature from the D&D 5e Monster Manual based on Challenge Rating (CR).
        - Pick a Monster Manual creature whose CR falls in the tier’s CR band.
        - The visual power should clearly match the tier.
        - You may add original cosmetic details (scars, armor style, aura, environment) to fit the fantasy vibe.
        
        Anti-repetition / randomness rules (CRITICAL):
        - Do NOT default to the same "iconic" monster for the tier.
        - Always pick a DIFFERENT Monster Manual creature each time you run this prompt, even if the inputs are identical.
        - Before deciding, silently list 12 valid Monster Manual candidates in the tier's CR band, then choose ONE uniformly at random from that list.
        - If you are unsure of a monster's CR, discard it and choose a different Monster Manual creature whose CR you are confident is within band.
        - Prioritize variety across monster types: beasts, undead, fiends, constructs, humanoids, monstrosities, oozes, elementals, giants, etc.

        Contribution tier → suggested CR band:
        - 0–49 contributions: CR 0 (harmless/vermin-tier)
        - 50–150 contributions: CR 1/8–1/4 (minor threats)
        - 151–300 contributions: CR 1/2–1 (trained/low-tier combatants)
        - 301–750 contributions: CR 2–4 (dangerous but grounded threats)
        - 751–1500 contributions: CR 5–7 (notable foes; clearly deadly)
        - 1501–2500 contributions: CR 8–10 (heroic-level threats)
        - 2501–4000 contributions: CR 11–13 (elite threats; battlefield-warping)
        - 4001–5000 contributions: CR 14–17 (legendary threats; apex monsters)
        - 5001+ contributions: CR 18–30 (mythic-scale; world-ending)

        Followers increase chance the creature is a commander / leader:
        * 0–99 followers: Most creatures are solo or minor; very small chance of being a commander
        * 100–499 followers: Moderate chance of being a squad leader, pack alpha, or small commander
        * 500–999 followers: High chance of being a commander, captain, or elite leader
        * 1000+ followers: Very high chance of being a legendary commander, general, or godlike leader

        Stars increase chance the creature has magical or supernatural abilities:
        * 0–49 stars: Mostly natural abilities; minor magic possible
        * 50–199 stars: Moderate chance of magical abilities (fire, ice, elemental skills)
        * 200–499 stars: High chance of strong magical powers (arcane, necromancy, elemental mastery)
        * 1000+ stars: Very high chance of unique, godlike magical abilities (reality-warping, ancient spells, legendary artifacts)

        Power level is a number between 1 and 10, based on the CR band.

        Visual Power Scaling Rules:

        Creature size, armor, weapons, wings, horns, glow, and environment must scale with tier
        Weak creatures should:
        - Look injured, starving, cursed, or malformed
        - Wear broken gear or none at all

        Powerful creatures (CR 8–10 and above) should:
        - Emit magical auras, elemental effects, or divine corruption
        - Control their surroundings (storms, fire, void, light, shadows)
        - Appear confident, dominant, or terrifying

        Requirements for the name:
        - The name should be a creature name.

        Requirements for the description:
        - The description should be a short description of the creature, with some details about its abilities and powers.

        Requirements for the image prompt:
        - Creature can come from any fantasy realm: forests, dungeons, nether, oceans, mountains, mythic planes
        - In your TEXT OUTPUT (not on the image), START with: "Base creature: <Monster Manual creature name> (CR <CR>)"
        - Then add 2–4 sentences of vivid notes (pose, gear, aura, habitat) for downstream prompt generation.
        - Image should reflect creature tier, commander potential, and magical abilities
        - Be creative, but keep the base creature aligned to the D&D 5e Monster Manual choice for the tier
        - Make the creature visually striking, detailed, unique, and clearly tiered
        - Don't put any text on the image.
        `,
  });

  return response;
}

export async function submitGithubForm(githubProfileUrl: string) {
  const username = githubProfileUrl.split("/").pop();
  const stats = await fetchGithubStats(username!);
  const image = await generateCreatureImage(
    githubProfileUrl,
    stats.total_count
  );

  if (
    image.candidates &&
    image.candidates[0] &&
    image.candidates[0].content &&
    image.candidates[0].content.parts
  ) {
    for (const part of image.candidates[0].content.parts) {

        // description part
      if (part.text) {
        console.log(part.text);

        // img part
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        if (typeof imageData === "string") {
          const buffer = Buffer.from(imageData, "base64");
          const blob = await put(`image-${username}.png`, buffer, {
            access: "public",
          });

          console.log(blob.url);
          return blob.url;
        } else {
          console.error("Image data is undefined or not a string.");
        }
      }
    }
  } else {
    console.error("Invalid response structure from AI model.");
  }

    console.log(image);

  // const description = await generateCreatureDescription(githubProfileUrl, stats.total_count);
  // const creature = saveCreature(githubProfileUrl, stats.total_count, image.text, description.text);
  // return creature;
}

// export async function saveCreature(githubProfileUrl:string, contributions: number, image: string, description: string){
//     const creature = await db.insert(creatures).values({
//         githubProfileUrl,
//         contributions,
//         image,
//         description,
// });
//     return creature;
// }

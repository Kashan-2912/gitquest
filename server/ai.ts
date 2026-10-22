"use server";

import { put } from "@vercel/blob";
import { GoogleGenAI } from "@google/genai";
import { redirect } from "next/navigation";
import { saveCreature } from "./creatures";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API!,
});

const USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;

function parseGithubUsername(githubProfileUrl: string) {
  const cleaned = githubProfileUrl.trim().replace(/\/+$/, "");
  const username = cleaned.split("/").pop() ?? "";
  if (!USERNAME_PATTERN.test(username)) {
    throw new Error(
      "Invalid GitHub profile URL. Use https://github.com/<username>.",
    );
  }
  return username;
}

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  // Optional but recommended in production: unauthenticated GitHub API calls
  // are limited to 60/hour per IP, and hosting platforms share IPs, so the
  // limit is often already used up by strangers. Any token (no scopes needed
  // for public data) raises the limit to 5,000/hour.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchGithubStats(username: string) {
  const response = await fetch(
    `https://api.github.com/search/commits?q=author:${username}`,
    { headers: githubHeaders() },
  );
  if (!response.ok) {
    throw new Error(
      response.status === 422 || response.status === 404
        ? `GitHub user "${username}" was not found.`
        : `GitHub stats request failed with status ${response.status}.`,
    );
  }
  const data = await response.json();
  if (typeof data.total_count !== "number") {
    throw new Error(`GitHub user "${username}" was not found.`);
  }
  return data;
}

export async function fetchGithubProfile(username: string) {
  // Followers and total stars feed the creature prompt rules below.
  // Any failure here falls back to 0 so a summon never breaks on it.
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: githubHeaders(),
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
        { headers: githubHeaders() },
      ),
    ]);
    if (!userRes.ok || !reposRes.ok) return { followers: 0, stars: 0 };
    const user = await userRes.json();
    const repos = await reposRes.json();
    const stars = Array.isArray(repos)
      ? repos.reduce(
          (sum, repo) => sum + (repo.stargazers_count ?? 0),
          0 as number,
        )
      : 0;
    return { followers: user.followers ?? 0, stars };
  } catch {
    return { followers: 0, stars: 0 };
  }
}

export async function generateCreatureImage(
  githubProfileUrl: string,
  contributions: number,
  followers: number = 0,
  stars: number = 0,
) {
  const response = await ai.models
    .generateContent({
      model: "gemini-2.5-flash-image",
      contents: `
      Github user: ${githubProfileUrl}
      Contributions: ${contributions}
      Followers: ${followers}
      Total stars across their own repos: ${stars}

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
    })
    .catch((error: unknown) => {
      const status = (error as { status?: number })?.status;
      if (status === 429) {
        throw new Error(
          "Gemini image quota exceeded (429): the API key's project has no image-generation quota left. Enable billing on the Google Cloud project or wait for the quota window to reset.",
        );
      }
      throw error;
    });

  return response;
}

export async function submitGithubForm(githubProfileUrl: string) {
  const username = parseGithubUsername(githubProfileUrl);
  const canonicalUrl = `https://github.com/${username}`;

  let savedUsername = username;
  try {
    const stats = await fetchGithubStats(username);
    const contributions = stats.total_count as number;
    const { followers, stars } = await fetchGithubProfile(username);
    const image = await generateCreatureImage(
      canonicalUrl,
      contributions,
      followers,
      stars,
    );

    const description =
      image.text ?? "A fantasy creature summoned by GitQuest.";

    const parts = image.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("The AI returned an invalid response. Please try again.");
    }

    const imagePart = parts.find((part) => part.inlineData?.data);
    if (!imagePart || typeof imagePart.inlineData?.data !== "string") {
      throw new Error("The AI did not return an image. Please try again.");
    }

    const buffer = Buffer.from(imagePart.inlineData.data, "base64");
    const blob = await put(`img-${username}.png`, buffer, {
      access: "public",
    });

    const creature = await saveCreature({
      githubProfileUrl: canonicalUrl,
      contributions,
      description,
      image: blob.url,
    });
    savedUsername = creature.githubProfileUrl.split("/").pop() ?? username;
  } catch (error) {
    console.error("Error in submitGithubForm:", error);
    throw error;
  }

  // Outside the try/catch so a successful summon is not logged as an error.
  redirect(`/${savedUsername}`);
}

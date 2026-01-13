/* eslint-disable react-hooks/purity */

import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { connection } from "next/server";
import CreatureCard from "./creature-card";

export default async function CreaturesShowcase() {
  // Mark dynamic so it isn't cached
  noStore();
  // Touch request data to satisfy Next's dynamic requirement
  headers();
  await connection();

  // Unbiased cryptographic random values per request (range 2..10)
  const rand = () => (crypto.getRandomValues(new Uint32Array(1))[0] % 9) + 2;

  const webdevTheme = rand();
  const webdevEmblem = rand();

  const shadcnTheme = rand();
  const shadcnEmblem = rand();

  const frankyTheme = rand();
  const frankyEmblem = rand();

  return (
    <div className="flex flex-wrap gap-2">
      <div className="hidden lg:block">
        <CreatureCard username={"webdevcody"} cardTheme={webdevTheme} cardEmblemTheme={webdevEmblem} />
      </div>
      <CreatureCard username={"shadcn"} cardTheme={shadcnTheme} cardEmblemTheme={shadcnEmblem} />
      <div className="hidden xl:block">
        <CreatureCard username={"franky47"} cardTheme={frankyTheme} cardEmblemTheme={frankyEmblem} />
      </div>
    </div>
  );
}
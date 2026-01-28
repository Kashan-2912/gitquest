import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github } from "@hugeicons/core-free-icons";

export async function StarsCount() {
  "use cache";

  const data = await fetch(
    "https://api.github.com/repos/Kashan-2912/gitquest",
    { next: { revalidate: 86400 } }
  );
  const json = await data.json();
  const stars = json.stargazers_count;

  return (
    <span className="w-12 text-muted-foreground text-xs tabular-nums">
      {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
    </span>
  );
}

const Header = () => {
  return (
    <header className="absolute top-0 p-4 w-full flex items-center justify-between z-50">
      <Link
        href="/"
        className="group relative inline-flex items-center justify-center"
      >
        <div className="relative overflow-hidden rounded-full">
          <Image
            src="/github-creature-logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="block transition duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(59,130,246,0.4)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 translate-x-[-90%] bg-[linear-gradient(120deg,transparent_18%,rgba(255,255,255,0.7)_45%,transparent_75%)] opacity-0 transition duration-600 group-hover:translate-x-[90%] group-hover:opacity-100"
          />
        </div>
      </Link>

      <nav className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Kashan-2912/gitquest"
          >
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-2 px-6 cursor-pointer text-foreground hover:text-primary hover:bg-transparent"
            >
              <HugeiconsIcon icon={Github} />
              <StarsCount />
            </Button>
          </Link>
        </div>
        <Link
          href="/summon"
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          Summon
        </Link>
        <Link
          href="/leaderboard"
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          Leaderboard
        </Link>
        <Link
          href="/widget"
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          Widget
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;

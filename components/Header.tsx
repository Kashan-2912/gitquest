import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="absolute top-0 p-4 w-full flex items-center justify-between z-50">
      <Link href="/">
        <Image
          src="/github-creature-logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/summon" className="text-lg font-medium hover:text-primary transition-colors">
          Summon
        </Link>
        <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
          Leaderboard
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;

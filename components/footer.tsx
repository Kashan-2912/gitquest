import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden sm:block fixed bottom-4 left-4 rounded-md bg-background p-2">
      Made with ❤️🤯 by{" "}
      <Link
        className="underline"
        href="https://www.linkedin.com/in/muhammad-kashan-ashraf/"
        rel="noopener noreferrer"
        target="_blank"
      >
        itzKashan
      </Link>
    </footer>
  );
}
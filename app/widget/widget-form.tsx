"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WidgetForm({ initialUsername }: { initialUsername?: string }) {
  const [username, setUsername] = useState(initialUsername || "");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/widget?username=${username.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          @
        </span>
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button type="submit" disabled={!username.trim()}>
        Show Creature
      </Button>
    </form>
  );
}

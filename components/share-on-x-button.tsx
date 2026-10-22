"use client";

import { NewTwitterFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";

import { Button } from "@/components/ui/button";

type ShareOnXButtonProps = {
  text: string;
  className?: string;
};

export default function ShareOnXButton({
  text,
  className,
}: ShareOnXButtonProps) {
  const onClick = React.useCallback(() => {
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.href)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  }, [text]);

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={onClick}
    >
      <HugeiconsIcon icon={NewTwitterFreeIcons} />
    </Button>
  );
}
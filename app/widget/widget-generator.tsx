"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WidgetGenerator() {
  const searchParams = useSearchParams();
  const initialUsername = searchParams.get("username") || "";
  
  const [username, setUsername] = useState(initialUsername);
  const [showWidget, setShowWidget] = useState(!!initialUsername);

  const baseUrl = typeof window !== "undefined" 
    ? window.location.origin 
    : "https://gitquest.is-a.software";

  const widgetUrl = `${baseUrl}/api/widget/${username}`;
  const profileUrl = `${baseUrl}/${username}`;

  const markdownCode = `[![GitQuest Creature](${widgetUrl})](${profileUrl})`;
  const htmlCode = `<a href="${profileUrl}"><img src="${widgetUrl}" alt="GitQuest Creature" /></a>`;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setShowWidget(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Username Input */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Widget</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                github.com/
              </span>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setShowWidget(false);
                }}
                className="pl-28"
              />
            </div>
            <Button type="submit" disabled={!username.trim()}>
              Generate Widget
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Widget Preview */}
      {showWidget && username && (
        <Card>
          <CardHeader>
            <CardTitle>Widget Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Live Preview */}
            <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={widgetUrl}
                alt={`GitQuest widget for ${username}`}
                className="max-w-full"
              />
            </div>

            {/* Markdown Code */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Markdown (Recommended)</h3>
                <CopyButton text={markdownCode} label="Copy Markdown" />
              </div>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                <code>{markdownCode}</code>
              </pre>
            </div>

            {/* HTML Code */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">HTML</h3>
                <CopyButton text={htmlCode} label="Copy HTML" />
              </div>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                <code>{htmlCode}</code>
              </pre>
            </div>

            {/* Direct Link */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Direct Image URL</h3>
                <CopyButton text={widgetUrl} label="Copy URL" />
              </div>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                <code>{widgetUrl}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

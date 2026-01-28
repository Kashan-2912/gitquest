import { NextRequest, NextResponse } from "next/server";
import { getCreatureByGithubUsername } from "@/server/creatures";

type Params = { params: Promise<{ username: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { username } = await params;
    const creature = await getCreatureByGithubUsername(username);

    if (!creature || !creature.image) {
      // Return a placeholder/not found image
      const notFoundSvg = `
        <svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e"/>
              <stop offset="100%" style="stop-color:#16213e"/>
            </linearGradient>
          </defs>
          <rect width="400" height="500" rx="16" fill="url(#bg)"/>
          <text x="200" y="230" font-family="system-ui, sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle">
            🐉
          </text>
          <text x="200" y="260" font-family="system-ui, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle">
            No creature found for
          </text>
          <text x="200" y="285" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">
            @${username.replace(/[<>&"']/g, "")}
          </text>
          <text x="200" y="320" font-family="system-ui, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">
            Visit gitquest.vercel.app to summon yours!
          </text>
        </svg>
      `;

      return new NextResponse(notFoundSvg.trim(), {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      });
    }

    // Fetch the actual creature image and serve it directly
    const imageResponse = await fetch(creature.image);
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get("content-type") || "image/png";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Widget error:", error);

    const errorSvg = `
      <svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" rx="16" fill="#1a1a2e"/>
        <text x="200" y="250" font-family="system-ui, sans-serif" font-size="14" fill="#ef4444" text-anchor="middle">
          Error loading creature
        </text>
      </svg>
    `;

    return new NextResponse(errorSvg.trim(), {
      status: 500,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache",
      },
    });
  }
}

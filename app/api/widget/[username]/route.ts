import { NextRequest, NextResponse } from "next/server";
import { getCreatureByGithubUsername } from "@/server/creatures";

type Params = { params: Promise<{ username: string }> };

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

function getPowerLevel(contributions: number): number {
  if (contributions >= 5001) return 10;
  if (contributions >= 4001) return 9;
  if (contributions >= 2501) return 8;
  if (contributions >= 1501) return 7;
  if (contributions >= 751) return 6;
  if (contributions >= 301) return 5;
  if (contributions >= 151) return 4;
  if (contributions >= 50) return 3;
  if (contributions >= 1) return 2;
  return 1;
}

function getTierName(powerLevel: number): string {
  const tiers: Record<number, string> = {
    10: "Mythic",
    9: "Legendary",
    8: "Epic",
    7: "Heroic",
    6: "Dangerous",
    5: "Formidable",
    4: "Trained",
    3: "Minor",
    2: "Harmless",
    1: "Unknown",
  };
  return tiers[powerLevel] || "Unknown";
}

function getTierColor(powerLevel: number): string {
  const colors: Record<number, string> = {
    10: "#a855f7", // purple
    9: "#6b7280", // gray (silver)
    8: "#f59e0b", // amber/gold
    7: "#3b82f6", // blue
    6: "#ef4444", // red
    5: "#f97316", // orange
    4: "#22c55e", // green
    3: "#14b8a6", // teal
    2: "#64748b", // slate
    1: "#9ca3af", // gray
  };
  return colors[powerLevel] || "#9ca3af";
}

function extractCreatureName(description: string): string {
  const baseCreatureMatch = description.match(
    /Base creature:\s*([^\n(]+)(?:\s*\(CR\s*\d+(?:\/\d+)?\))?/i
  );
  return baseCreatureMatch ? baseCreatureMatch[1].trim() : "Unknown Creature";
}

function extractCR(description: string): string {
  const crMatch = description.match(/CR\s*(\d+(?:\/\d+)?)/i);
  return crMatch ? crMatch[1] : "?";
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { username } = await params;
    const creature = await getCreatureByGithubUsername(username);

    if (!creature) {
      // Return a "not found" widget
      const notFoundSvg = `
        <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e"/>
              <stop offset="100%" style="stop-color:#16213e"/>
            </linearGradient>
          </defs>
          <rect width="400" height="120" rx="12" fill="url(#bg)"/>
          <text x="200" y="55" font-family="system-ui, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle">
            No creature found for @${escapeXml(username)}
          </text>
          <text x="200" y="80" font-family="system-ui, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">
            Visit https://gitquest.is-a.software/ to summon yours!
          </text>
        </svg>
      `;

      return new NextResponse(notFoundSvg.trim(), {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    const powerLevel = getPowerLevel(creature.contributions);
    const tierName = getTierName(powerLevel);
    const tierColor = getTierColor(powerLevel);
    const creatureName = extractCreatureName(creature.description);
    const cr = extractCR(creature.description);

    // Create the SVG widget
    const svg = `
      <svg width="400" height="150" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e"/>
            <stop offset="100%" style="stop-color:#16213e"/>
          </linearGradient>
          <linearGradient id="tierGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${tierColor};stop-opacity:0"/>
            <stop offset="50%" style="stop-color:${tierColor};stop-opacity:0.3"/>
            <stop offset="100%" style="stop-color:${tierColor};stop-opacity:0"/>
          </linearGradient>
          <clipPath id="imageClip">
            <circle cx="65" cy="75" r="45"/>
          </clipPath>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="150" rx="12" fill="url(#bg)"/>
        
        <!-- Tier glow line -->
        <rect x="0" y="0" width="400" height="4" rx="2" fill="url(#tierGlow)"/>
        
        <!-- Border -->
        <rect width="400" height="150" rx="12" fill="none" stroke="${tierColor}" stroke-width="1" stroke-opacity="0.5"/>
        
        <!-- Creature Image Circle -->
        <circle cx="65" cy="75" r="47" fill="none" stroke="${tierColor}" stroke-width="2" filter="url(#glow)"/>
        <image 
          x="20" y="30" 
          width="90" height="90" 
          xlink:href="${escapeXml(creature.image)}" 
          clip-path="url(#imageClip)"
          preserveAspectRatio="xMidYMid slice"
        />
        
        <!-- Username -->
        <text x="130" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#9ca3af">
          @${escapeXml(username)}
        </text>
        
        <!-- Creature Name -->
        <text x="130" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="bold" fill="#ffffff">
          ${escapeXml(truncateText(creatureName, 25))}
        </text>
        
        <!-- Tier Badge -->
        <rect x="130" y="75" width="70" height="22" rx="4" fill="${tierColor}" fill-opacity="0.2"/>
        <text x="165" y="91" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="${tierColor}" text-anchor="middle">
          ${tierName}
        </text>
        
        <!-- CR Badge -->
        <rect x="208" y="75" width="45" height="22" rx="4" fill="#374151"/>
        <text x="230" y="91" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">
          CR ${escapeXml(cr)}
        </text>
        
        <!-- Stats -->
        <text x="130" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#6b7280">
          <tspan fill="#9ca3af">${creature.contributions.toLocaleString()}</tspan> contributions
        </text>
        
        <!-- Power Level Bar -->
        <rect x="280" y="108" width="100" height="8" rx="4" fill="#374151"/>
        <rect x="280" y="108" width="${powerLevel * 10}" height="8" rx="4" fill="${tierColor}"/>
        <text x="330" y="103" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="#6b7280" text-anchor="middle">
          Power ${powerLevel}/10
        </text>
        
        <!-- GitQuest branding -->
        <text x="385" y="140" font-family="system-ui, -apple-system, sans-serif" font-size="9" fill="#4b5563" text-anchor="end">
          🐉 GitQuest
        </text>
      </svg>
    `;

    return new NextResponse(svg.trim(), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Widget generation error:", error);
    
    const errorSvg = `
      <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="120" rx="12" fill="#1a1a2e"/>
        <text x="200" y="60" font-family="system-ui, sans-serif" font-size="14" fill="#ef4444" text-anchor="middle">
          Error loading widget
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

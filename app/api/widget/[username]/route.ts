import { NextRequest, NextResponse } from "next/server";
import { getCreatureByGithubUsername } from "@/server/creatures";

type Params = { params: Promise<{ username: string }> };

function escapeXml(text: string): string {
  return text.replace(/[<>&"']/g, (c) => {
    const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' };
    return entities[c] || c;
  });
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

function getTierInfo(powerLevel: number): { name: string; color: string; glowColor: string } {
  const tiers: Record<number, { name: string; color: string; glowColor: string }> = {
    10: { name: "Mythic", color: "#a855f7", glowColor: "#c084fc" },
    9: { name: "Legendary", color: "#fbbf24", glowColor: "#fcd34d" },
    8: { name: "Epic", color: "#f59e0b", glowColor: "#fbbf24" },
    7: { name: "Heroic", color: "#3b82f6", glowColor: "#60a5fa" },
    6: { name: "Dangerous", color: "#ef4444", glowColor: "#f87171" },
    5: { name: "Formidable", color: "#f97316", glowColor: "#fb923c" },
    4: { name: "Trained", color: "#22c55e", glowColor: "#4ade80" },
    3: { name: "Minor", color: "#14b8a6", glowColor: "#2dd4bf" },
    2: { name: "Harmless", color: "#64748b", glowColor: "#94a3b8" },
    1: { name: "Unknown", color: "#6b7280", glowColor: "#9ca3af" },
  };
  return tiers[powerLevel] || tiers[1];
}

function extractCreatureName(description: string): string {
  const match = description.match(/Base creature:\s*([^\n(]+)(?:\s*\(CR\s*\d+(?:\/\d+)?\))?/i);
  return match ? match[1].trim() : "Unknown Creature";
}

function extractCR(description: string): string {
  const match = description.match(/CR\s*(\d+(?:\/\d+)?)/i);
  return match ? match[1] : "?";
}

async function fetchImageAsBase64(imageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/png';
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return null;
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { username } = await params;
    const creature = await getCreatureByGithubUsername(username);

    if (!creature || !creature.image) {
      const notFoundSvg = `
        <svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e"/>
              <stop offset="100%" style="stop-color:#16213e"/>
            </linearGradient>
          </defs>
          <rect width="400" height="500" rx="16" fill="url(#bg)"/>
          <text x="200" y="230" font-family="system-ui, sans-serif" font-size="24" fill="#9ca3af" text-anchor="middle">🐉</text>
          <text x="200" y="270" font-family="system-ui, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle">No creature found for</text>
          <text x="200" y="300" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">@${escapeXml(username)}</text>
          <text x="200" y="340" font-family="system-ui, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Visit gitquest.is-a.software to summon!</text>
        </svg>
      `;
      return new NextResponse(notFoundSvg.trim(), {
        headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=300" },
      });
    }

    const powerLevel = getPowerLevel(creature.contributions);
    const tier = getTierInfo(powerLevel);
    const creatureName = extractCreatureName(creature.description);
    const cr = extractCR(creature.description);
    
    // Fetch image and convert to base64 (GitHub blocks external images in SVGs)
    const imageBase64 = await fetchImageAsBase64(creature.image);

    // Animated SVG with glowing effects and embedded image
    const animatedSvg = `
<svg width="400" height="560" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f1a"/>
      <stop offset="50%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#0f0f1a"/>
    </linearGradient>
    
    <!-- Animated glow gradient -->
    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${tier.color}">
        <animate attributeName="stop-color" values="${tier.color};${tier.glowColor};${tier.color}" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:${tier.glowColor}">
        <animate attributeName="stop-color" values="${tier.glowColor};${tier.color};${tier.glowColor}" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:${tier.color}">
        <animate attributeName="stop-color" values="${tier.color};${tier.glowColor};${tier.color}" dur="3s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    
    <!-- Shimmer effect -->
    <linearGradient id="shimmer" x1="-100%" y1="0%" x2="200%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0)"/>
      <stop offset="50%" style="stop-color:rgba(255,255,255,0.15)"/>
      <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
      <animate attributeName="x1" values="-100%;100%" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="0%;200%" dur="3s" repeatCount="indefinite"/>
    </linearGradient>
    
    <!-- Glow filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Soft glow for text -->
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Pulse filter for border -->
    <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur">
        <animate attributeName="stdDeviation" values="3;6;3" dur="2s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Image clip -->
    <clipPath id="imageClip">
      <rect x="20" y="60" width="360" height="320" rx="12"/>
    </clipPath>
  </defs>
  
  <!-- Outer glow border (animated) -->
  <rect x="2" y="2" width="396" height="556" rx="18" fill="none" stroke="url(#glowGradient)" stroke-width="3" filter="url(#pulse)">
    <animate attributeName="stroke-opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/>
  </rect>
  
  <!-- Card background -->
  <rect x="6" y="6" width="388" height="548" rx="14" fill="url(#cardBg)"/>
  
  <!-- Inner border -->
  <rect x="6" y="6" width="388" height="548" rx="14" fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.3"/>
  
  <!-- Username badge with glow -->
  <g filter="url(#glow)">
    <rect x="130" y="20" width="140" height="30" rx="15" fill="${tier.color}" fill-opacity="0.9"/>
    <text x="200" y="41" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#000" text-anchor="middle">@${escapeXml(username)}</text>
  </g>
  
  <!-- Creature image (embedded as base64) -->
  ${imageBase64 ? `<image x="20" y="60" width="360" height="320" href="${imageBase64}" clip-path="url(#imageClip)" preserveAspectRatio="xMidYMid slice"/>` : ''}
  
  <!-- Shimmer overlay on image -->
  <rect x="20" y="60" width="360" height="320" rx="12" fill="url(#shimmer)" opacity="0.6"/>
  
  <!-- Image border glow -->
  <rect x="20" y="60" width="360" height="320" rx="12" fill="none" stroke="${tier.color}" stroke-width="2" filter="url(#glow)">
    <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </rect>
  
  <!-- Bottom info section background -->
  <rect x="20" y="390" width="360" height="150" rx="12" fill="${tier.color}" fill-opacity="0.1"/>
  
  <!-- Creature name (dimmed, no strong glow) -->
  <text x="200" y="425" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="bold" fill="#e5e5e5" fill-opacity="0.9" text-anchor="middle" filter="url(#softGlow)">${escapeXml(creatureName.length > 22 ? creatureName.substring(0, 22) + '...' : creatureName)}</text>
  
  <!-- Tier and CR badges -->
  <g>
    <!-- Tier badge -->
    <rect x="100" y="440" width="90" height="28" rx="6" fill="${tier.color}" fill-opacity="0.25"/>
    <rect x="100" y="440" width="90" height="28" rx="6" fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.6"/>
    <text x="145" y="459" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="${tier.color}" fill-opacity="0.9" text-anchor="middle">${tier.name}</text>
    
    <!-- CR badge -->
    <rect x="210" y="440" width="90" height="28" rx="6" fill="#374151" fill-opacity="0.8"/>
    <text x="255" y="459" font-family="system-ui, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle">CR ${escapeXml(cr)}</text>
  </g>
  
  <!-- Power bar -->
  <g>
    <text x="200" y="490" font-family="system-ui, sans-serif" font-size="11" fill="#6b7280" text-anchor="middle">Power Level</text>
    <rect x="100" y="498" width="200" height="10" rx="5" fill="#374151"/>
    <rect x="100" y="498" width="${powerLevel * 20}" height="10" rx="5" fill="url(#glowGradient)">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
    </rect>
    <text x="200" y="525" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="${tier.color}" fill-opacity="0.85" text-anchor="middle">${powerLevel}/10</text>
  </g>
  
  <!-- GitQuest branding -->
  <text x="200" y="548" font-family="system-ui, sans-serif" font-size="10" fill="#4b5563" text-anchor="middle">🐉 GitQuest</text>
  
  <!-- Floating particles effect -->
  <circle cx="40" cy="100" r="2" fill="${tier.glowColor}" opacity="0.5">
    <animate attributeName="cy" values="100;70;100" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.5;0.15;0.5" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="360" cy="140" r="1.5" fill="${tier.glowColor}" opacity="0.4">
    <animate attributeName="cy" values="140;100;140" dur="3.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="370" cy="280" r="2" fill="${tier.glowColor}" opacity="0.35">
    <animate attributeName="cy" values="280;240;280" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.35;0.1;0.35" dur="5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="30" cy="320" r="1.5" fill="${tier.glowColor}" opacity="0.4">
    <animate attributeName="cy" values="320;290;320" dur="4.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4.5s" repeatCount="indefinite"/>
  </circle>
</svg>`;

    return new NextResponse(animatedSvg.trim(), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Widget error:", error);
    const errorSvg = `
      <svg width="400" height="500" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" rx="16" fill="#1a1a2e"/>
        <text x="200" y="250" font-family="system-ui" font-size="14" fill="#ef4444" text-anchor="middle">Error loading creature</text>
      </svg>
    `;
    return new NextResponse(errorSvg.trim(), {
      status: 500,
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": "no-cache" },
    });
  }
}

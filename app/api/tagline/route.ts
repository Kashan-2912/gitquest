import { NextResponse } from "next/server";

export async function GET() {
  const letters = "SUMMON".split("");
  
  // Create SVG paths for each letter with individual glow animations
  const letterElements = letters.map((letter, i) => {
    const x = 150 + (i * 70);
    const delay = i * 0.6; // Stagger the glow effect
    
    return `
    <!-- Letter ${letter} -->
    <g>
      <!-- Outer glow layer -->
      <text x="${x}" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#hugeGlow)">
        ${letter}
        <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="3.6s" begin="${delay}s" repeatCount="indefinite"/>
      </text>
      
      <!-- Bright highlight -->
      <text x="${x}" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
        ${letter}
        <animate attributeName="opacity" values="0;0;0.8;0.8;0;0" dur="3.6s" begin="${delay}s" repeatCount="indefinite"/>
      </text>
      
      <!-- Base letter (always visible, dim) -->
      <text x="${x}" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#2d1650" text-anchor="middle" stroke="#1a0933" stroke-width="1">
        ${letter}
      </text>
    </g>`;
  }).join('');

  const svg = `
<svg width="650" height="120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="hugeGlow" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur"/>
      <feFlood flood-color="#a855f7" flood-opacity="0.9"/>
      <feComposite in2="blur" operator="in" result="glowColor"/>
      <feMerge>
        <feMergeNode in="glowColor"/>
        <feMergeNode in="glowColor"/>
        <feMergeNode in="glowColor"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect width="650" height="120" fill="#0a0a0a"/>
  
  ${letterElements}
  
  <!-- Subtitle -->
  <text x="325" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#6b7280" text-anchor="middle">
    🔥 the creature behind your code 🔥
  </text>
</svg>`;

  return new NextResponse(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}



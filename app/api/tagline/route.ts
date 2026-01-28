import { NextResponse } from "next/server";

export async function GET() {
  const svg = `
<svg width="650" height="120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#a855f7">
        <animate attributeName="stop-color" values="#a855f7;#8b5cf6;#7c3aed;#8b5cf6;#a855f7" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:#7c3aed">
        <animate attributeName="stop-color" values="#7c3aed;#6d28d9;#5b21b6;#6d28d9;#7c3aed" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#6d28d9">
        <animate attributeName="stop-color" values="#6d28d9;#5b21b6;#4c1d95;#5b21b6;#6d28d9" dur="3s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    
    <filter id="massiveGlow" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur">
        <animate attributeName="stdDeviation" values="0;20;40;20;0" dur="4s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feFlood flood-color="#a855f7" flood-opacity="0.8"/>
      <feComposite in2="blur" operator="in" result="glowColor"/>
      <feMerge>
        <feMergeNode in="glowColor"/>
        <feMergeNode in="glowColor"/>
        <feMergeNode in="glowColor"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="shadow">
      <feDropShadow dx="0" dy="0" stdDeviation="15" flood-color="#8b5cf6" flood-opacity="0.8">
        <animate attributeName="stdDeviation" values="15;30;15" dur="4s" repeatCount="indefinite"/>
      </feDropShadow>
    </filter>
  </defs>
  
  <rect width="650" height="120" fill="transparent"/>
  
  <!-- Background glow pulse -->
  <rect width="650" height="120" fill="url(#textGrad)" opacity="0">
    <animate attributeName="opacity" values="0;0.1;0.2;0.1;0" dur="4s" repeatCount="indefinite"/>
  </rect>
  
  <!-- Main text with hover effect -->
  <text x="325" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="url(#textGrad)" text-anchor="middle" filter="url(#massiveGlow)">
    SUMMON
    <animateTransform attributeName="transform" type="scale" values="1;1.05;1.1;1.05;1" dur="4s" repeatCount="indefinite" additive="sum"/>
  </text>
  
  <!-- Subtitle -->
  <text x="325" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#8b5cf6" text-anchor="middle" opacity="0.7">
    🔥 the creature behind your code 🔥
    <animate attributeName="opacity" values="0.5;0.7;0.9;0.7;0.5" dur="4s" repeatCount="indefinite"/>
  </text>
  
  <!-- Animated particles -->
  <circle cx="100" cy="40" r="3" fill="#a855f7" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="40;20;40" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="550" cy="40" r="3" fill="#7c3aed" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="4s" begin="0.5s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="40;20;40" dur="4s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="200" cy="100" r="2" fill="#8b5cf6" opacity="0">
    <animate attributeName="opacity" values="0;0.5;0" dur="4s" begin="1s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="100;80;100" dur="4s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <circle cx="450" cy="100" r="2" fill="#6d28d9" opacity="0">
    <animate attributeName="opacity" values="0;0.5;0" dur="4s" begin="1.5s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="100;80;100" dur="4s" begin="1.5s" repeatCount="indefinite"/>
  </circle>
</svg>`;

  return new NextResponse(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}


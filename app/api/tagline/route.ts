import { NextResponse } from "next/server";

export async function GET() {
  const text = "🔥 Summon the creature behind your code 🔥";
  const chars = text.split("");
  
  // Create individual letter animations with staggered decrypt effect
  const letterElements = chars.map((char, i) => {
    const x = 20 + (i * 14.5);
    const delay = i * 0.05;
    
    return `
    <text x="${x}" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="url(#fireGrad)" filter="url(#glow)">
      ${char === ' ' ? '\u00A0' : char}
      <animate attributeName="opacity" values="0;0;1;1" dur="3s" begin="${delay}s" fill="freeze"/>
      <animateTransform attributeName="transform" type="scale" values="0.5;0.5;1.2;1" dur="3s" begin="${delay}s" additive="sum" fill="freeze"/>
    </text>
    <text x="${x}" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#888" opacity="0.3">
      ?
      <animate attributeName="opacity" values="0.5;0.5;0;0" dur="3s" begin="${delay}s" fill="freeze"/>
    </text>`;
  }).join('');

  const svg = `
<svg width="650" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FFD700">
        <animate attributeName="stop-color" values="#FFD700;#FFA500;#FF4500;#FFA500;#FFD700" dur="2s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:#FF6347">
        <animate attributeName="stop-color" values="#FF6347;#FF4500;#FF6347;#FF4500;#FF6347" dur="2s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#8B0000">
        <animate attributeName="stop-color" values="#8B0000;#FF0000;#8B0000;#FF0000;#8B0000" dur="2s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    
    <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feFlood flood-color="#FF6347" flood-opacity="0.5"/>
      <feComposite in2="coloredBlur" operator="in" result="glow1"/>
      <feMerge>
        <feMergeNode in="glow1"/>
        <feMergeNode in="glow1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
      <animate attributeName="stdDeviation" values="2;4;2" dur="1.5s" repeatCount="indefinite"/>
    </filter>
    
    <filter id="bigGlow">
      <feGaussianBlur stdDeviation="8" result="blur">
        <animate attributeName="stdDeviation" values="6;10;6" dur="2s" repeatCount="indefinite"/>
      </feGaussianBlur>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect width="650" height="100" fill="transparent"/>
  
  <!-- Background glow -->
  <ellipse cx="325" cy="60" rx="320" ry="30" fill="url(#fireGrad)" opacity="0.15" filter="url(#bigGlow)"/>
  
  <!-- Animated text with decrypt effect -->
  <g>
    ${letterElements}
  </g>
  
  <!-- Repeat animation every 5 seconds -->
  <animate attributeName="opacity" values="1;1;1;1" dur="5s" repeatCount="indefinite"/>
</svg>`;

  return new NextResponse(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

import { NextResponse } from "next/server";

export async function GET() {
  const svg = `
<svg width="650" height="120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Softer, more diffused glow filter for letters -->
    <filter id="strongGlow" x="-400%" y="-400%" width="900%" height="900%">
      <!-- Multiple blur layers for softer fade -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur3"/>
      
      <!-- Outer glow - very soft -->
      <feFlood flood-color="#a855f7" flood-opacity="0.4"/>
      <feComposite in2="blur1" operator="in" result="glow1"/>
      
      <!-- Middle glow -->
      <feFlood flood-color="#c084fc" flood-opacity="0.6"/>
      <feComposite in2="blur2" operator="in" result="glow2"/>
      
      <!-- Inner glow - brightest -->
      <feFlood flood-color="#e9d5ff" flood-opacity="0.9"/>
      <feComposite in2="blur3" operator="in" result="glow3"/>
      
      <feMerge>
        <feMergeNode in="glow1"/>
        <feMergeNode in="glow1"/>
        <feMergeNode in="glow2"/>
        <feMergeNode in="glow2"/>
        <feMergeNode in="glow3"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Fire glow filter -->
    <filter id="fireGlow" x="-200%" y="-300%" width="500%" height="600%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2"/>
      <feFlood flood-color="#ff6b00" flood-opacity="0.8"/>
      <feComposite in2="blur1" operator="in" result="glow1"/>
      <feFlood flood-color="#ffaa00" flood-opacity="0.6"/>
      <feComposite in2="blur2" operator="in" result="glow2"/>
      <feMerge>
        <feMergeNode in="glow1"/>
        <feMergeNode in="glow2"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Flame shapes -->
    <g id="flame">
      <path d="M 0,-8 C -1,-6 -2,-4 -1.5,-2 C -1,0 0,1 0,3 C 0,1 1,0 1.5,-2 C 2,-4 1,-6 0,-8 Z" fill="#ff6b00" opacity="0.9">
        <animate attributeName="d" 
          values="M 0,-8 C -1,-6 -2,-4 -1.5,-2 C -1,0 0,1 0,3 C 0,1 1,0 1.5,-2 C 2,-4 1,-6 0,-8 Z;
                  M 0,-9 C -1.5,-7 -1.5,-5 -1,-3 C -0.5,-1 0,0 0,2 C 0,0 0.5,-1 1,-3 C 1.5,-5 1.5,-7 0,-9 Z;
                  M 0,-7.5 C -0.8,-5.5 -2.5,-4 -1.8,-2 C -1,0 0,0.5 0,2.5 C 0,0.5 1,0 1.8,-2 C 2.5,-4 0.8,-5.5 0,-7.5 Z;
                  M 0,-8 C -1,-6 -2,-4 -1.5,-2 C -1,0 0,1 0,3 C 0,1 1,0 1.5,-2 C 2,-4 1,-6 0,-8 Z"
          dur="0.3s" repeatCount="indefinite"/>
      </path>
      <path d="M 0,-6 C -0.7,-4.5 -1.2,-3 -0.8,-1.5 C -0.4,0 0,0.5 0,1.5 C 0,0.5 0.4,0 0.8,-1.5 C 1.2,-3 0.7,-4.5 0,-6 Z" fill="#ffaa00" opacity="0.8">
        <animate attributeName="d" 
          values="M 0,-6 C -0.7,-4.5 -1.2,-3 -0.8,-1.5 C -0.4,0 0,0.5 0,1.5 C 0,0.5 0.4,0 0.8,-1.5 C 1.2,-3 0.7,-4.5 0,-6 Z;
                  M 0,-6.5 C -0.9,-5 -0.9,-3.5 -0.5,-2 C -0.2,0 0,0 0,1 C 0,0 0.2,0 0.5,-2 C 0.9,-3.5 0.9,-5 0,-6.5 Z;
                  M 0,-5.5 C -0.5,-4 -1.5,-3 -1,-1.5 C -0.5,0 0,0.3 0,1.3 C 0,0.3 0.5,0 1,-1.5 C 1.5,-3 0.5,-4 0,-5.5 Z;
                  M 0,-6 C -0.7,-4.5 -1.2,-3 -0.8,-1.5 C -0.4,0 0,0.5 0,1.5 C 0,0.5 0.4,0 0.8,-1.5 C 1.2,-3 0.7,-4.5 0,-6 Z"
          dur="0.25s" repeatCount="indefinite"/>
      </path>
      <ellipse cx="0" cy="0" rx="1" ry="1.5" fill="#ffdd00" opacity="0.9">
        <animate attributeName="ry" values="1.5;1.8;1.3;1.5" dur="0.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;1;0.8;0.9" dur="0.2s" repeatCount="indefinite"/>
      </ellipse>
    </g>
    
    <!-- Fire gradient -->
    <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffdd00;stop-opacity:1">
        <animate attributeName="stop-color" values="#ffdd00;#ffaa00;#ffdd00" dur="0.5s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:#ff6b00;stop-opacity:1">
        <animate attributeName="stop-color" values="#ff6b00;#ff8800;#ff6b00" dur="0.4s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#ff4400;stop-opacity:1">
        <animate attributeName="stop-color" values="#ff4400;#ff6600;#ff4400" dur="0.6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
  </defs>
  
  <!-- Letter S -->
  <g>
    <text x="150" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#strongGlow)">
      S
      <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="4.2s" begin="0s" repeatCount="indefinite"/>
    </text>
    <text x="150" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
      S
      <animate attributeName="opacity" values="0;0;0.7;0.7;0;0" dur="4.2s" begin="0s" repeatCount="indefinite"/>
    </text>
    <text x="150" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#1e1b4b" text-anchor="middle" stroke="#0f0a2e" stroke-width="1">S</text>
  </g>
  
  <!-- Letter U -->
  <g>
    <text x="220" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#strongGlow)">
      U
      <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="4.2s" begin="0.7s" repeatCount="indefinite"/>
    </text>
    <text x="220" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
      U
      <animate attributeName="opacity" values="0;0;0.7;0.7;0;0" dur="4.2s" begin="0.7s" repeatCount="indefinite"/>
    </text>
    <text x="220" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#1e1b4b" text-anchor="middle" stroke="#0f0a2e" stroke-width="1">U</text>
  </g>
  
  <!-- Letter M -->
  <g>
    <text x="290" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#strongGlow)">
      M
      <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="4.2s" begin="1.4s" repeatCount="indefinite"/>
    </text>
    <text x="290" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
      M
      <animate attributeName="opacity" values="0;0;0.7;0.7;0;0" dur="4.2s" begin="1.4s" repeatCount="indefinite"/>
    </text>
    <text x="290" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#1e1b4b" text-anchor="middle" stroke="#0f0a2e" stroke-width="1">M</text>
  </g>
  
  <!-- Letter M -->
  <g>
    <text x="360" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#strongGlow)">
      M
      <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="4.2s" begin="2.1s" repeatCount="indefinite"/>
    </text>
    <text x="360" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
      M
      <animate attributeName="opacity" values="0;0;0.7;0.7;0;0" dur="4.2s" begin="2.1s" repeatCount="indefinite"/>
    </text>
    <text x="360" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#1e1b4b" text-anchor="middle" stroke="#0f0a2e" stroke-width="1">M</text>
  </g>
  
  <!-- Letter O -->
  <g>
    <text x="430" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#strongGlow)">
      O
      <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="4.2s" begin="2.8s" repeatCount="indefinite"/>
    </text>
    <text x="430" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
      O
      <animate attributeName="opacity" values="0;0;0.7;0.7;0;0" dur="4.2s" begin="2.8s" repeatCount="indefinite"/>
    </text>
    <text x="430" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#1e1b4b" text-anchor="middle" stroke="#0f0a2e" stroke-width="1">O</text>
  </g>
  
  <!-- Letter N -->
  <g>
    <text x="500" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#a855f7" text-anchor="middle" opacity="0" filter="url(#strongGlow)">
      N
      <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" dur="4.2s" begin="3.5s" repeatCount="indefinite"/>
    </text>
    <text x="500" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" opacity="0">
      N
      <animate attributeName="opacity" values="0;0;0.7;0.7;0;0" dur="4.2s" begin="3.5s" repeatCount="indefinite"/>
    </text>
    <text x="500" y="70" font-family="Arial, sans-serif" font-size="80" font-weight="900" fill="#1e1b4b" text-anchor="middle" stroke="#0f0a2e" stroke-width="1">N</text>
  </g>
  
  <!-- Subtitle with fire effect - LARGER TEXT -->
  <g>
    <!-- Glowing base -->
    <text x="325" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#ff6b00" text-anchor="middle" filter="url(#fireGlow)" opacity="0.6">
      the creature behind your code
    </text>
    
    <!-- Main text -->
    <text x="325" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="url(#fireGradient)" text-anchor="middle">
      the creature behind your code
    </text>
    
    <!-- Flame decorations -->
    <use href="#flame" x="50" y="106">
      <animateTransform attributeName="transform" type="translate" values="0,0; -0.5,-1; 0.5,-0.5; 0,0" dur="0.3s" repeatCount="indefinite"/>
    </use>
    
    <use href="#flame" x="600" y="106">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0.5,-1; -0.5,-0.5; 0,0" dur="0.35s" repeatCount="indefinite"/>
    </use>
    
    <!-- Small flames dancing above letters -->
    <use href="#flame" x="110" y="101" transform="scale(0.6)">
      <animateTransform attributeName="transform" type="translate" values="0,0; -0.3,-1.2; 0.3,-0.8; 0,0" dur="0.28s" additive="sum" repeatCount="indefinite"/>
    </use>
    
    <use href="#flame" x="200" y="101" transform="scale(0.5)">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0.4,-1; -0.4,-0.6; 0,0" dur="0.32s" additive="sum" repeatCount="indefinite"/>
    </use>
    
    <use href="#flame" x="280" y="101" transform="scale(0.55)">
      <animateTransform attributeName="transform" type="translate" values="0,0; -0.2,-1.3; 0.2,-0.7; 0,0" dur="0.26s" additive="sum" repeatCount="indefinite"/>
    </use>
    
    <use href="#flame" x="370" y="101" transform="scale(0.6)">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0.3,-1.1; -0.3,-0.9; 0,0" dur="0.29s" additive="sum" repeatCount="indefinite"/>
    </use>
    
    <use href="#flame" x="450" y="101" transform="scale(0.5)">
      <animateTransform attributeName="transform" type="translate" values="0,0; -0.4,-1; 0.4,-0.5; 0,0" dur="0.31s" additive="sum" repeatCount="indefinite"/>
    </use>
    
    <use href="#flame" x="540" y="101" transform="scale(0.55)">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0.2,-1.2; -0.2,-0.8; 0,0" dur="0.27s" additive="sum" repeatCount="indefinite"/>
    </use>
  </g>
</svg>`;

  return new NextResponse(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
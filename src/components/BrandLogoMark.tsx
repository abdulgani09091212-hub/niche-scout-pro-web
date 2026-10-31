import React from "react";

interface BrandLogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Canonical 2026 Niche Scout Pro Emblem — Anchor A: Solar Compass Loupe
 * Tactile #EA580C G2-approximated squircle, pure white precision loupe + 4-point Compass Star,
 * and #10B981 Emerald Net-Profit Signal Node. Collision-free (zero static <defs> IDs).
 */
export function BrandLogoMark({ size = 32, className = "" }: BrandLogoMarkProps) {
  return (
    <svg
      data-brand-mark="solar-compass-loupe"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 shadow-xs rounded-[8px] ${className}`}
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="#EA580C" />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        stroke="#FFFFFF"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
      <circle
        cx="14"
        cy="14"
        r="7"
        fill="#090C15"
        fillOpacity="0.18"
        stroke="#FFFFFF"
        strokeWidth="2.8"
      />
      <line
        x1="19.2"
        y1="19.2"
        x2="25"
        y2="25"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M14 9.5 L15.3 12.7 L18.5 14 L15.3 15.3 L14 18.5 L12.7 15.3 L9.5 14 L12.7 12.7 Z"
        fill="#FFFFFF"
      />
      <circle
        cx="23.8"
        cy="8.2"
        r="2.6"
        fill="#10B981"
        stroke="#FFFFFF"
        strokeWidth="1.1"
      />
    </svg>
  );
}

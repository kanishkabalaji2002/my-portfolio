"use client";

import type { CSSProperties } from "react";

const labelStyle: CSSProperties = {
  fontFamily: "'General Sans', sans-serif",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#71717a",
  marginTop: 14,
};

const sublabelStyle: CSSProperties = {
  fontFamily: "'General Sans', sans-serif",
  fontSize: 12,
  fontWeight: 500,
  color: "#a1a1aa",
  marginTop: 6,
  maxWidth: 260,
  textAlign: "center",
  lineHeight: 1.45,
};

function GridOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.22,
        backgroundImage: `
          linear-gradient(to right, #a1a1aa 1px, transparent 1px),
          linear-gradient(to bottom, #a1a1aa 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
        pointerEvents: "none",
      }}
    />
  );
}

/** Fills an absolutely positioned inset frame (parent must be position: relative). */
export function SpotlightImagePlaceholder({
  title = "Image placeholder",
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(155deg, #f4f4f5 0%, #e7e7ea 42%, #dcdce0 100%)",
        borderRadius: "inherit",
      }}
    >
      <GridOverlay />
      <svg width={56} height={56} viewBox="0 0 24 24" fill="none" aria-hidden style={{ opacity: 0.45 }}>
        <path
          d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
          stroke="#52525b"
          strokeWidth={1.5}
        />
        <circle cx={9} cy={9} r={2} fill="#52525b" />
        <path
          d="m4 16 4.5-4.5a1 1 0 0 1 1.34-.08L16 18"
          stroke="#52525b"
          strokeWidth={1.25}
          strokeLinecap="round"
        />
      </svg>
      <span style={labelStyle}>{title}</span>
      {subtitle ? <span style={sublabelStyle}>{subtitle}</span> : null}
    </div>
  );
}

/** Fills an absolutely positioned inset frame (parent must be position: relative). */
export function SpotlightVideoPlaceholder({
  title = "Video placeholder",
  subtitle,
  compact,
}: {
  title?: string;
  subtitle?: string;
  /** Smaller footprint for corner / secondary previews */
  compact?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: compact
          ? "linear-gradient(145deg, #27272a 0%, #18181b 100%)"
          : "linear-gradient(155deg, #3f3f46 0%, #27272a 48%, #18181b 100%)",
        borderRadius: "inherit",
      }}
    >
      {!compact ? <GridOverlay /> : null}
      <div
        style={{
          width: compact ? 44 : 64,
          height: compact ? 44 : 64,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={compact ? 18 : 24}
          height={compact ? 18 : 24}
          viewBox="0 0 24 24"
          fill="rgba(255,255,255,0.92)"
          aria-hidden
          style={{ marginLeft: compact ? 3 : 4 }}
        >
          <path d="M8 5v14l11-7L8 5Z" />
        </svg>
      </div>
      <span
        style={{
          ...labelStyle,
          color: compact ? "#d4d4d8" : "#a1a1aa",
          marginTop: compact ? 8 : 14,
          fontSize: compact ? 9 : 11,
        }}
      >
        {title}
      </span>
      {subtitle && !compact ? (
        <span style={{ ...sublabelStyle, color: "#71717a" }}>{subtitle}</span>
      ) : null}
    </div>
  );
}

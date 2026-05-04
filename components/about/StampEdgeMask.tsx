import type { ReactNode } from "react";

/**
 * SVG mask defs: semicircular perforations on all four sides (postage-stamp silhouette).
 * Referenced from CSS as mask-image: url(#about-hero-stamp-mask).
 */
export function StampEdgeMask() {
  const r = 0.015;
  const step = 0.03;
  const circles: ReactNode[] = [];

  for (let x = step * 0.5; x <= 1 - step * 0.5; x += step) {
    circles.push(<circle key={`t${x}`} cx={x} cy={0} r={r} fill="black" />);
    circles.push(<circle key={`b${x}`} cx={x} cy={1} r={r} fill="black" />);
  }
  for (let y = step * 0.5; y <= 1 - step * 0.5; y += step) {
    circles.push(<circle key={`l${y}`} cx={0} cy={y} r={r} fill="black" />);
    circles.push(<circle key={`r${y}`} cx={1} cy={y} r={r} fill="black" />);
  }

  return (
    <svg
      width={0}
      height={0}
      className="pointer-events-none absolute overflow-hidden"
      style={{ position: "fixed" }}
      aria-hidden
    >
      <defs>
        <mask
          id="about-hero-stamp-mask"
          maskUnits="objectBoundingBox"
          maskContentUnits="objectBoundingBox"
        >
          <rect width={1} height={1} fill="white" />
          {circles}
        </mask>
      </defs>
    </svg>
  );
}

"use client";

import { lensProjectCount, type WorkLens } from "@/lib/portfolioLens";

const LENS_OPTIONS: { id: WorkLens; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "research", label: "Research" },
  { id: "shipped", label: "Shipped" },
  { id: "ai-builds", label: "AI builds" },
];

type WorkLensChatProps = {
  workLens: WorkLens;
  onWorkLensChange: (lens: WorkLens) => void;
};

/** Pill filter row only — top left above project cards. */
export default function WorkLensChat({ workLens, onWorkLensChange }: WorkLensChatProps) {
  return (
    <div
      className="mb-3 flex w-full flex-wrap justify-start gap-2 md:mb-4"
      role="group"
      aria-label="Filter work by focus"
      style={{
        fontFamily: "'General Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {LENS_OPTIONS.map(({ id, label }) => {
        const active = workLens === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onWorkLensChange(id)}
            aria-pressed={active}
            className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-[transform,box-shadow,background-color,color,border-color] duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 active:scale-[0.97] ${
              active
                ? "border border-black bg-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                : "border border-neutral-200/90 bg-white text-neutral-700 shadow-sm hover:border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            {label} ({lensProjectCount(id)})
          </button>
        );
      })}
    </div>
  );
}

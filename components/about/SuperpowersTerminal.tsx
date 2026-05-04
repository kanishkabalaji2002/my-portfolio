"use client";

import { SuperpowersDotGrid } from "@/components/about/SuperpowersDotGrid";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

const FIRST_LINE = "> scanning kanishka.exe...";

const CHECK_LINES = [
  "[✓] Turning vague briefs into sharp products",
  "[✓] Finding the best food spot in any city",
  "[✓] Making users feel like the product just gets them",
  "[✓] Running 50+ user interviews without losing her mind",
  "[✓] Shipping at 10M+ scale and still sweating the details",
  "[✓] Convincing engineers that yes, 2px does matter",
  "[✓] Turning a conversation into a design insight",
  "[✓] Coding just enough to be dangerous",
] as const;

const FINAL_LINE = "> superpowers loaded. let's build something.";

const MS_SCAN = 25;
const GAP_SCAN = 300;

/** Light-terminal palette */
const GREEN = "#15803d";
const TEXT = "#1f2937";

function prefixLenCheck(line: string): number {
  if (line.startsWith("[✓]")) return "[✓]".length;
  return 0;
}

function renderLineSegments(
  fullText: string,
  visibleLen: number,
  variant: "prompt" | "check",
) {
  const slice = fullText.slice(0, visibleLen);
  const nodes: ReactNode[] = [];

  if (variant === "prompt") {
    if (slice.length === 0) return nodes;
    if (slice[0] === ">") {
      nodes.push(
        <span key="p0" style={{ color: GREEN }}>
          {">"}
        </span>,
      );
      if (slice.length > 1) {
        nodes.push(
          <span key="rest" style={{ color: TEXT }}>
            {slice.slice(1)}
          </span>,
        );
      }
    } else {
      nodes.push(
        <span key="all" style={{ color: TEXT }}>
          {slice}
        </span>,
      );
    }
    return nodes;
  }

  const pl = prefixLenCheck(fullText);
  const greenPart = Math.min(slice.length, pl);
  if (greenPart > 0) {
    nodes.push(
      <span key="chk" style={{ color: GREEN }}>
        {slice.slice(0, greenPart)}
      </span>,
    );
  }
  if (slice.length > greenPart) {
    nodes.push(
      <span key="tail" style={{ color: TEXT }}>
        {slice.slice(greenPart)}
      </span>,
    );
  }
  return nodes;
}

type ScanTyping =
  | { variant: "prompt"; fullText: string; progress: number }
  | { variant: "check"; fullText: string; progress: number }
  | { variant: "final"; fullText: string; progress: number };

export function SuperpowersTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const runIdRef = useRef(0);

  const [scanLines, setScanLines] = useState<string[]>([]);
  const [typingScan, setTypingScan] = useState<ScanTyping | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scrollBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setReducedMotion(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    setScanLines([FIRST_LINE, ...CHECK_LINES, FINAL_LINE]);
    setTypingScan(null);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasStartedRef.current) return;
        hasStartedRef.current = true;
        const id = ++runIdRef.current;

        const sleep = (ms: number) =>
          new Promise<void>((resolve) => {
            window.setTimeout(resolve, ms);
          });

        const scanSequence = [FIRST_LINE, ...CHECK_LINES, FINAL_LINE];

        void (async () => {
          const cancelled = () => id !== runIdRef.current;

          for (let si = 0; si < scanSequence.length; si++) {
            const line = scanSequence[si];
            const variant =
              si === 0
                ? ("prompt" as const)
                : si === scanSequence.length - 1
                  ? ("final" as const)
                  : ("check" as const);

            for (let len = 0; len <= line.length; len++) {
              if (cancelled()) return;
              setTypingScan({
                variant,
                fullText: line,
                progress: len,
              });
              requestAnimationFrame(scrollBottom);
              if (len < line.length) await sleep(MS_SCAN);
            }

            setScanLines((prev) => [...prev, line]);
            setTypingScan(null);

            if (si < scanSequence.length - 1) {
              await sleep(GAP_SCAN);
              if (cancelled()) return;
            }
          }
        })();
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(section);
    return () => io.disconnect();
  }, [reducedMotion, scrollBottom]);

  useLayoutEffect(() => {
    scrollBottom();
  }, [scanLines, typingScan, scrollBottom]);

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
    };
  }, []);

  const showScanCursor =
    typingScan !== null && typingScan.progress < typingScan.fullText.length;

  const renderScanCompleted = (line: string, key: string) => {
    const isPrompt = line.startsWith(">");
    const isCheck = line.startsWith("[✓]");
    return (
      <div key={key} className="whitespace-pre-wrap break-words leading-relaxed">
        {isPrompt ? (
          <>
            <span style={{ color: GREEN }}>{">"}</span>
            <span style={{ color: TEXT }}>{line.slice(1)}</span>
          </>
        ) : isCheck ? (
          <>
            <span style={{ color: GREEN }}>{line.slice(0, "[✓]".length)}</span>
            <span style={{ color: TEXT }}>{line.slice("[✓]".length)}</span>
          </>
        ) : (
          line
        )}
      </div>
    );
  };

  const renderTypingScan = () => {
    if (!typingScan) return null;
    const v =
      typingScan.variant === "prompt" || typingScan.variant === "final"
        ? ("prompt" as const)
        : ("check" as const);
    const segments = renderLineSegments(
      typingScan.fullText,
      typingScan.progress,
      v,
    );
    return (
      <div className="whitespace-pre-wrap break-words leading-relaxed">
        {segments}
        {showScanCursor ? (
          <span className="animate-blink ml-px inline-block w-[0.55em] align-baseline" style={{ color: GREEN }}>
            ▋
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-4 py-[100px] md:px-6"
      aria-labelledby="superpowers-terminal-heading"
    >
      <SuperpowersDotGrid sectionRef={sectionRef} />

      <div className="relative z-10">
        <p
          id="superpowers-terminal-heading"
          className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400"
        >
          SUPERPOWERS
        </p>

        <div
          className={`relative z-10 mx-auto max-w-[680px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${jetbrainsMono.className}`}
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-[#f4f4f5] px-4 py-2.5 font-sans">
            <span className="h-3 w-3 shrink-0 rounded-full bg-[#ff5f57]" aria-hidden />
            <span className="h-3 w-3 shrink-0 rounded-full bg-[#febc2e]" aria-hidden />
            <span className="h-3 w-3 shrink-0 rounded-full bg-[#28c840]" aria-hidden />
            <span className="ml-2 truncate text-[11px] text-gray-500 md:text-xs">
              kanishka@portfolio: ~
            </span>
          </div>

          <div className="relative">
            <div
              ref={scrollRef}
              className="max-h-[min(70vh,480px)] overflow-y-auto overscroll-y-contain px-4 py-4 text-[12px] md:text-[14px]"
              style={{ color: TEXT }}
              aria-live="polite"
              aria-relevant="additions"
            >
              <div className="flex flex-col gap-1">
                {scanLines.map((line, i) => renderScanCompleted(line, `scan-${i}`))}
                {typingScan ? renderTypingScan() : null}
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-[1] opacity-[0.45]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

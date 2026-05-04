"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const CASE_STUDY_SRC = "/signalux-case-study.html?embed=1";

const NAV = [
  { id: "intro", label: "Introduction" },
  { id: "setup", label: "Why & insight" },
  { id: "product", label: "Product" },
  { id: "craft", label: "Scope & craft" },
  { id: "outcomes", label: "Reflection & next steps" },
] as const;

export default function SignaluxPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeId, setActiveId] = useState<string>("intro");

  /** Scroll the case study document inside the iframe (not the outer window). */
  const scrollToId = useCallback((id: string) => {
    const doc = iframeRef.current?.contentDocument;
    const el = doc?.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /** Match Telefónica-style scroll spy: active section follows iframe scroll. */
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let detach: (() => void) | undefined;

    const bind = () => {
      detach?.();
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc) return;

      const sections = Array.from(doc.querySelectorAll<HTMLElement>("main section[id]"));
      if (sections.length === 0) return;

      const scrollOffset = () => (win.innerWidth <= 960 ? 72 : 24);

      const syncActive = () => {
        const y = win.scrollY + scrollOffset();
        let id = sections[0]!.id;
        for (const sec of sections) {
          const docTop = sec.getBoundingClientRect().top + win.scrollY;
          if (docTop <= y + 2) id = sec.id;
        }
        setActiveId((prev) => (prev === id ? prev : id));
      };

      win.addEventListener("scroll", syncActive, { passive: true });
      win.addEventListener("resize", syncActive);
      syncActive();

      detach = () => {
        win.removeEventListener("scroll", syncActive);
        win.removeEventListener("resize", syncActive);
      };
    };

    iframe.addEventListener("load", bind);
    if (iframe.contentDocument?.readyState === "complete") bind();

    return () => {
      iframe.removeEventListener("load", bind);
      detach?.();
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col bg-[#fafafa] md:flex-row"
        style={{ fontFamily: "'General Sans', system-ui, sans-serif" }}
      >
      <aside className="flex max-h-[38vh] w-full shrink-0 flex-col bg-white md:max-h-none md:h-full md:w-[260px] md:shrink-0">
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 justify-start px-3 py-3 md:px-5 md:pt-6 md:pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-900"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#000000] underline underline-offset-4 transition-colors hover:text-[#000000]"
          >
            Live demo
          </a>
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-row flex-wrap content-start justify-start gap-x-3 gap-y-1 overflow-y-auto px-3 pb-3 text-left md:flex-col md:items-stretch md:justify-center md:gap-0 md:px-5 md:pb-6"
          aria-label="Case study sections"
        >
          {NAV.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollToId(id)}
                className={`border-none bg-transparent py-1.5 text-left text-sm transition-colors md:w-full md:py-2 md:text-[15px] ${
                  active
                    ? "font-semibold text-neutral-900"
                    : "font-normal text-neutral-400 hover:text-neutral-800"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-h-0 min-w-0 flex-1 bg-[#fafafa]">
        <iframe
          ref={iframeRef}
          src={CASE_STUDY_SRC}
          className="block h-full w-full border-0 bg-[#fafafa]"
          aria-label="Subtle case study: Surfacing what users don’t say"
        />
      </div>
    </div>
    </>
  );
}

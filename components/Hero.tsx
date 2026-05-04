"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        v.pause();
      } else {
        v.play().catch(() => {});
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = heroMediaRef.current;
    if (!el) return;

    const update = () => {
      const bottom = el.getBoundingClientRect().bottom;
      setHeroVisible(bottom > 4);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="flex flex-col overflow-x-clip bg-white pb-0">
      <div
        ref={heroMediaRef}
        className="relative isolate aspect-video w-full min-h-[min(32svh,280px)] max-h-[calc(100svh-3.5rem)] overflow-hidden bg-neutral-200 sm:min-h-[min(38svh,360px)] sm:max-h-[calc(100svh-4rem)] md:max-h-[calc(100svh-4.25rem)]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)] [backface-visibility:hidden]"
          width={1280}
          height={720}
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Introductory video"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-2 px-3 pb-5 pt-6 sm:gap-2.5 sm:px-4 sm:pb-6 sm:pt-8 md:pb-7">
          <p
            className={`pointer-events-none text-center text-[10px] font-medium tracking-[0.14em] text-white/80 transition-opacity duration-500 ease-out sm:text-[11px] ${heroVisible ? "opacity-100" : "opacity-0"}`}
            style={{ fontFamily: "'General Sans', sans-serif" }}
            aria-hidden="true"
          >
            Scroll to explore{" "}
            <span className="inline-block translate-y-px animate-scroll-hint-arrow">↓</span>
          </p>
          <div className="flex w-full flex-wrap justify-center gap-2 sm:gap-3">
            <div className="pointer-events-none flex max-w-[min(100%,22rem)] flex-wrap justify-center gap-2 sm:max-w-none sm:gap-3">
              <span className="inline-flex cursor-default select-none items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[11px] font-normal leading-tight text-white/95 sm:px-4 sm:py-2 sm:text-sm">
                MHCID @ UW Seattle
              </span>
              <span className="inline-flex cursor-default select-none items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[11px] font-normal leading-tight text-white/95 sm:px-4 sm:py-2 sm:text-sm">
                Looking for Full-Time Roles
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-4 pb-10 pt-10 sm:px-6 md:px-8 md:pb-12 md:pt-12 lg:px-12 lg:pb-14 lg:pt-14">
        {/* Match Projects.tsx horizontal shell so quote lines up with Work lens pills + project cards */}
        <div className="mx-auto w-full max-w-7xl px-0 sm:px-4 md:px-8 lg:px-12">
          <p
            className="m-0 mb-3 w-full max-w-xl text-left text-[17px] font-normal leading-relaxed tracking-[-0.01em] text-[#4b5563] [text-wrap:pretty] sm:mb-4 sm:max-w-2xl sm:text-[18px] lg:max-w-3xl"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            Studying Human-Computer Interaction at{" "}
            <img
              src="/uwlogo.jpeg"
              alt=""
              width={96}
              height={26}
              className="inline-block h-[24px] w-auto shrink-0 align-middle rounded-[3px] sm:h-[26px]"
              aria-hidden
            />{" "}
            UW Seattle. Previously designed at{" "}
            <img
              src="/bornlogo.png"
              alt=""
              width={96}
              height={26}
              className="inline-block h-[24px] w-auto shrink-0 align-middle rounded-[3px] sm:h-[26px]"
              aria-hidden
            />{" "}
            BORN, Tech Mahindra and{" "}
            <img
              src="/hfilogo.jpeg"
              alt=""
              width={96}
              height={26}
              className="inline-block h-[24px] w-auto shrink-0 align-middle rounded-[3px] sm:h-[26px]"
              aria-hidden
            />{" "}
            Human Factors International, shipping products from research to release.
          </p>
          <blockquote className="m-0 w-full max-w-xl border-0 p-0 text-left [direction:ltr] sm:max-w-2xl lg:max-w-3xl">
            <p
              className="w-full text-left text-[clamp(1.05rem,3.8vw,1.7rem)] leading-snug tracking-[-0.01em] text-[#374151] [text-wrap:pretty] hyphens-none md:leading-[1.5] lg:leading-[1.55]"
              style={{ fontFamily: "'General Sans', sans-serif", textAlign: "left" }}
            >
              I design for one person until it works for everyone.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

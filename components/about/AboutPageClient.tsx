"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AboutMeStoriesGrid } from "@/components/about/AboutMeStoriesGrid";
import { StampEdgeMask } from "@/components/about/StampEdgeMask";
import { SuperpowersTerminal } from "@/components/about/SuperpowersTerminal";
import Footer, { ContactSection } from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PORTRAITS = [
  { src: "/about/portrait-1.png", alt: "Kanishka" },
  { src: "/about/portrait-2.png", alt: "" },
  { src: "/about/portrait-3.png", alt: "" },
  { src: "/about/portrait-4.png", alt: "" },
] as const;

export default function AboutPageClient() {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const u = () => setReducedMotion(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setPortraitIndex((i) => (i + 1) % PORTRAITS.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      <StampEdgeMask />
      <Navbar />

      <main>
        {/* Hero */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-6 md:gap-16 md:px-12 md:pb-24 md:pt-32 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              Product Designer · MHCI+D @ UW
            </p>
            <h1
              className="mb-7 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-gray-900"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              designer. researcher.
              <br />
              slightly obsessed with food.
            </h1>
            <p className="max-w-xl text-lg leading-[1.72] text-gray-600">
              I will plan an entire trip around food. I&apos;m perpetually looking for the next
              destination, preferably one that involves some form of mild danger. Certified adrenaline
              junkie. I ran a mental health podcast for two years and genuinely believe conversation is
              a design tool.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px]">
              <div
                className={
                  reducedMotion
                    ? ""
                    : "motion-safe:animate-[float_6s_ease-in-out_infinite]"
                }
              >
                <div
                  className={`about-postcard-shell ${
                    reducedMotion ? "" : "rotate-[-0.9deg] sm:rotate-[-0.7deg]"
                  }`}
                >
                  <div className="about-postcard-frame">
                    <div className="about-postcard-photo relative aspect-[3/4] w-full">
                    {PORTRAITS.map((p, j) => (
                      <Image
                        key={p.src}
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className={`absolute inset-0 object-cover transition-opacity duration-[850ms] ${
                          j === portraitIndex ? "z-[1] opacity-100" : "z-0 opacity-0"
                        }`}
                        priority={j === 0}
                      />
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="cs"
          className="scroll-mt-24 bg-white py-16 md:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12">
            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Things that make me, me
            </p>
            <h2
              className="mx-auto mb-10 max-w-3xl text-center text-[clamp(1.75rem,4vw,2.65rem)] font-semibold leading-tight tracking-[-0.02em] text-gray-900"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              A few pieces of who I am.
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-[1.7] text-gray-500">
              I think the best design instincts come from living curiously. These are some of the things that shaped mine.
            </p>
            <AboutMeStoriesGrid />
          </div>
        </section>

        <SuperpowersTerminal />

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const WORDS = ["research-driven", "terrified of monkeys", "detail-driven", "someone who had 7 cavities", "the proud owner of 50+ Barbies", "adaptive", "someone who changed schools 10 times in 9 years", "always up way too late", "a horror movie enthusiast"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    const current = WORDS[wordIndex];
    if (!isDeleting && charIndex < current.length) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(charIndex + 1); }, 75);
      return () => clearTimeout(t);
    }
    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(charIndex - 1); }, 40);
      return () => clearTimeout(t);
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((wordIndex + 1) % WORDS.length);
    }
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section className="flex flex-col justify-center pt-16 bg-white overflow-hidden" style={{ minHeight: "80vh" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Left column */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-normal tracking-[0.15em] uppercase text-gray-400 mb-4 whitespace-nowrap" style={{ fontFamily: "'General Sans', sans-serif" }}>
              Product Designer
            </p>

            <h1 className="mb-2" style={{ fontFamily: "'General Sans', sans-serif", fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#111827" }}>
              I am
            </h1>

            <p className="mb-4 min-h-[2.75rem]" style={{ fontFamily: "'General Sans', sans-serif", fontSize: "2.6rem", fontWeight: 400, lineHeight: 1.15, color: "#111827" }}>
              <span style={{ fontStyle: "normal", fontWeight: 600, color: "#2d6a4f" }}>{displayed}</span>
              <span className="inline-block w-0.5 h-4 bg-[#5f9e7f] ml-0.5 align-middle animate-blink" />
            </p>


            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-xs font-semibold">
                <span className="animate-ping-dot text-[#5f9e7f] text-[10px] leading-none">●</span>
                Currently @ Copart
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-xs font-semibold">
                MHCID @ UW Seattle
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 text-xs font-semibold">
                Looking for Full-Time Roles
              </span>
            </div>
          </div>

          {/* Right column: intro text */}
          <div className="flex-shrink-0 w-full md:w-[36%]" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 0" }}>
            <p style={{ fontSize: "1.15rem", lineHeight: 1.75, color: "#374151", fontFamily: "'General Sans', sans-serif", maxWidth: "420px" }}>
              Product designer who leads with research to make complex systems usable and build products people actually understand, across telecom, banking, and community-driven platforms, with a curiosity for what’s next. I love building with AI & playing with code to bring my ideas to life.</p><p style={{ marginTop: "1rem" }}>Currently in Seattle, WA graduating <strong style={{ color: "#111827", fontWeight: 600 }}>August 2026</strong>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

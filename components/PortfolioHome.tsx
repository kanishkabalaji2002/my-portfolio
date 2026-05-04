"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import type { WorkLens } from "@/lib/portfolioLens";
import { parseWorkLensParam } from "@/lib/portfolioLens";
import { clearScoutReturnLens, readScoutReturnLens } from "@/lib/scoutReturnLens";

/**
 * `?lens=` is the primary source, but we also persist the lens in sessionStorage when the user
 * opens Scout. Browser Back can replay a stale history entry (wrong `?lens=`) while Next.js
 * state is out of sync — the stored lens corrects the tab until the URL is fixed.
 */
function ProjectsLensBridge() {
  const router = useRouter();
  const searchParams = useSearchParams();
  /** Session storage must not run until mounted — server vs first client paint must match for hydration. */
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const urlLens = parseWorkLensParam(searchParams.get("lens"));
  const storedLens = hydrated ? readScoutReturnLens() : null;

  const mismatch = storedLens != null && urlLens !== storedLens;
  const workLens: WorkLens = mismatch ? storedLens! : (urlLens ?? storedLens ?? "product");

  const handleWorkLensChange = useCallback(
    (lens: WorkLens) => {
      router.replace(`/?lens=${encodeURIComponent(lens)}`, { scroll: false });
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [router]
  );

  useEffect(() => {
    if (storedLens == null) return;
    if (urlLens === storedLens) {
      clearScoutReturnLens();
    }
  }, [urlLens, storedLens]);

  useEffect(() => {
    if (!mismatch || !storedLens) return;
    router.replace(`/?lens=${encodeURIComponent(storedLens)}`, { scroll: false });
  }, [mismatch, storedLens, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const lens = parseWorkLensParam(searchParams.get("lens"));
    const scrollToWork = lens !== null || window.location.hash === "#work";
    if (!scrollToWork) return;
    const t = window.setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [searchParams]);

  return <Projects workLens={workLens} onWorkLensChange={handleWorkLensChange} />;
}

/** Pills still update the URL before `useSearchParams` hydrates (no noop handler). */
function ProjectsLensFallback() {
  const router = useRouter();
  const handleWorkLensChange = useCallback(
    (lens: WorkLens) => {
      router.replace(`/?lens=${encodeURIComponent(lens)}`, { scroll: false });
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [router]
  );
  return <Projects workLens="product" onWorkLensChange={handleWorkLensChange} />;
}

export default function PortfolioHome() {
  return (
    <>
      <Hero />
      <div className="px-4 pb-10 pt-6 sm:px-6 md:px-8 md:pb-14 md:pt-8 lg:px-12">
        <Suspense fallback={<ProjectsLensFallback />}>
          <ProjectsLensBridge />
        </Suspense>
      </div>
    </>
  );
}

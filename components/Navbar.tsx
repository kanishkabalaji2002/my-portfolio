"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { ResumeDropdown } from "@/components/ResumeDropdown";
import type { WorkLens } from "@/lib/portfolioLens";
import { parseWorkLensParam } from "@/lib/portfolioLens";
import { readScoutReturnLens } from "@/lib/scoutReturnLens";

/** Match `public/play.html`: `/about` and `/about/` both count as About. */
function normalizePath(pathname: string | null): string {
  if (!pathname) return "";
  let p = pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

type NavbarChromeProps = {
  homeHref: string;
  workHref: string;
};

function NavbarChrome({ homeHref, workHref }: NavbarChromeProps) {
  const path = normalizePath(usePathname());
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);

  const isWork = path === "/";
  const isPlay = path === "/play";
  const isAbout = path === "/about";

  const tabBaseClass =
    "inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-normal transition-colors sm:text-sm";
  const activeTabClass = "bg-[#f3f4f6] text-gray-900";
  const inactiveTabClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-900";

  const routeTabClass = (routeActive: boolean) =>
    `${tabBaseClass} ${resumeMenuOpen ? inactiveTabClass : routeActive ? activeTabClass : inactiveTabClass}`;

  const routeAriaCurrent = (routeActive: boolean) =>
    !resumeMenuOpen && routeActive ? ("page" as const) : undefined;

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 overflow-visible bg-white/95 backdrop-blur-sm"
      style={{ fontFamily: "'General Sans', sans-serif" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 overflow-visible px-4 py-3 sm:px-6 sm:py-4 md:px-12">
        <Link
          href={homeHref}
          className="min-w-0 shrink text-base font-semibold tracking-[-0.025em] text-gray-900 transition-colors hover:text-black"
        >
          Kanishka Balaji
        </Link>

        <div className="ml-auto flex min-w-0 flex-nowrap items-center justify-end gap-1 overflow-visible sm:gap-2">
          <Link href={workHref} className={routeTabClass(isWork)} aria-current={routeAriaCurrent(isWork)}>
            Work
          </Link>
          <Link
            href="/play"
            className={`${routeTabClass(isPlay)} whitespace-nowrap`}
            aria-current={routeAriaCurrent(isPlay)}
          >
            Writing
          </Link>
          <Link href="/about" className={routeTabClass(isAbout)} aria-current={routeAriaCurrent(isAbout)}>
            About
          </Link>

          <ResumeDropdown onOpenChange={setResumeMenuOpen} />
        </div>
      </div>
    </nav>
  );
}

/** Reads `/scout?lens=` + sessionStorage after mount so SSR matches first client paint (hydration-safe). */
function NavbarLensBridge() {
  const searchParams = useSearchParams();
  const path = normalizePath(usePathname());
  const [storedLens, setStoredLens] = useState<WorkLens | null>(null);

  useEffect(() => {
    if (path !== "/scout") {
      setStoredLens(null);
      return;
    }
    setStoredLens(readScoutReturnLens());
  }, [path]);

  const urlLens = path === "/scout" ? parseWorkLensParam(searchParams.get("lens")) : null;
  const returnLens = path === "/scout" ? storedLens ?? urlLens : null;
  const homeHref = returnLens ? `/?lens=${returnLens}` : "/";
  const workHref = returnLens ? `/?lens=${returnLens}#work` : "/#work";
  return <NavbarChrome homeHref={homeHref} workHref={workHref} />;
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarChrome homeHref="/" workHref="/#work" />}>
      <NavbarLensBridge />
    </Suspense>
  );
}

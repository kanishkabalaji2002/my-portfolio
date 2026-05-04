"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { RESUME_PDF_URL } from "@/lib/resumeUrl";

function normalizePath(pathname: string | null): string {
  if (!pathname) return "";
  let p = pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

type ResumeDropdownProps = {
  /** Lets the parent nav dim other tabs while this menu is open. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Resume control: click toggles; hover (desktop) opens/closes via wrapper;
 * mousedown outside closes. Styled to match Navbar pill tabs.
 */
export function ResumeDropdown({ onOpenChange }: ResumeDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const path = normalizePath(usePathname());
  const isResume = path === "/resume";

  const tabBaseClass =
    "inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-normal transition-colors sm:text-sm";
  const activeTabClass = "bg-[#f3f4f6] text-gray-900";
  const inactiveTabClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-900";
  const resumeTabActive = isResume || open;

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={`${tabBaseClass} gap-1 ${resumeTabActive ? activeTabClass : inactiveTabClass}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-current={isResume && !open ? "page" : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        Resume{" "}
        <span className="inline-block opacity-70" aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <div className="absolute top-full right-0 z-[60] min-w-[160px] pt-1">
          <div
            id={menuId}
            role="menu"
            aria-label="Resume options"
            className="rounded-lg border border-gray-200 bg-white p-1 shadow-md"
          >
            <Link
              href="/resume"
              role="menuitem"
              className="block whitespace-nowrap px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 sm:text-sm"
              onClick={() => setOpen(false)}
            >
              View Online
            </Link>
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="block whitespace-nowrap px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Download
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm" style={{ fontFamily: "'General Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* Left: name */}
        <Link
          href="/"
          className="text-gray-900 font-semibold text-base tracking-tight hover:text-[#5f9e7f] transition-colors"
        >
          Kanishka Balaji
        </Link>

        {/* Right: nav links */}
        <div className="flex items-center gap-8 ml-auto">
          <Link
            href="#work"
            className="text-gray-500 text-sm font-normal hover:text-gray-900 transition-colors"
          >
            Work
          </Link>
          <a
            href="/play.html"
            className="text-gray-500 text-sm font-normal hover:text-gray-900 transition-colors"
          >
            Play
          </a>
          <a
            href="/about.html"
            className="text-gray-500 text-sm font-normal hover:text-gray-900 transition-colors"
          >
            About
          </a>
          <a
            href="https://drive.google.com/file/d/1-g4M442BWt-ZzfnInqxdvlk_4p8A6sRB/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-sm font-normal hover:text-gray-900 transition-colors"
          >
            Resume
          </a>
        </div>


      </div>
    </nav>
  );
}

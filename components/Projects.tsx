"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { publicBlobVideo } from "@/lib/publicBlobVideos";
import type { WorkLens } from "@/lib/portfolioLens";
import { projectsForLens } from "@/lib/portfolioLens";
import WorkLensChat from "@/components/WorkLensChat";
import { setScoutReturnLens } from "@/lib/scoutReturnLens";
import ScoutCardVideo from "@/components/ScoutCardVideo";
import {
  SpotlightImagePlaceholder,
  SpotlightVideoPlaceholder,
} from "@/components/ProjectMediaPlaceholder";

interface Stat {
  value: string;
  label: string;
}

interface Project {
  id: number;
  shortTitle: string;
  description: string;
  leftBg: string;
  leftTextDark?: boolean;
  rightBg: string;
  rightFill?: boolean;   // true = image/video fills right panel edge-to-edge with overlay
  placeholder?: boolean; // true = render Apple-style placeholder on right panel
  image?: string;
  video?: string;
  /** Original/heavy asset as fallback `<source>` after optimized `video` (e.g. Cloudinary `.mov` after `f_mp4`). */
  videoFallback?: string;
  /** When no asset yet: show styled placeholder in media column (spotlight or padded layouts). */
  mediaPlaceholder?: "image" | "video";
  link: string;
  newTab?: boolean;
  comingSoon?: boolean;
  // optional detailed fields
  role?: string;
  stats?: Stat[];
  tags?: string[];
  duration?: string;
  team?: string;
}

interface OtherProjectCard {
  id: string;
  title: string;
  tag: string;
  href: string;
  newTab?: boolean;
  video?: string;
}

/** Spotlight right-column media: one shared shape (Scout-style shell + inset frame). */
const SPOTLIGHT_MEDIA_MIN_H = 500;
const SPOTLIGHT_MEDIA_R_OUTER = 24;
const SPOTLIGHT_MEDIA_R_INNER = 16;
const SPOTLIGHT_MEDIA_INSET = 12;

/** Matte aligned to telefonica-project-lockup.png center field (electric blue, not the lighter frame) */
const TELEFONICA_LOCKUP_BG = "#0066FF";

/** SafeYelli spotlight — local files (same as case study hero); avoids blocked/offline Blob CDN. */
const SAFEYELLI_SPOTLIGHT_MP4 = "/safeyelli2.mp4";
const SAFEYELLI_SPOTLIGHT_MOV = "/safeyelli2.mov";

function spotlightMediaOuterShell(bg = "#fafafa", extra?: CSSProperties): CSSProperties {
  return {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: SPOTLIGHT_MEDIA_MIN_H,
    boxSizing: "border-box",
    background: bg,
    borderTopRightRadius: SPOTLIGHT_MEDIA_R_OUTER,
    borderBottomRightRadius: SPOTLIGHT_MEDIA_R_OUTER,
    overflow: "hidden",
    ...extra,
  };
}

function spotlightMediaInsetFrame(innerBg: string, extra?: CSSProperties): CSSProperties {
  return {
    position: "absolute",
    top: SPOTLIGHT_MEDIA_INSET,
    left: SPOTLIGHT_MEDIA_INSET,
    right: SPOTLIGHT_MEDIA_INSET,
    bottom: SPOTLIGHT_MEDIA_INSET,
    borderRadius: SPOTLIGHT_MEDIA_R_INNER,
    overflow: "hidden",
    border: "1px solid rgb(229 231 235)",
    background: innerBg,
    boxSizing: "border-box",
    ...extra,
  };
}

const projects: Project[] = [
  {
    id: 1,
    shortTitle: "SafeYelli",
    description:
      "Led end-to-end design for map-first safety reporting; live scale includes 25K+ safety reports from the community.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#ffffff",
    image: "/safeyelli3.png",
    video: SAFEYELLI_SPOTLIGHT_MP4,
    videoFallback: SAFEYELLI_SPOTLIGHT_MOV,
    link: "/safeyelli",
    role: "Product Designer & Service Designer",
    stats: [{ value: "~15K", label: "Active Users" }],
    tags: ["Data Analysis", "Service Design", "User Research"],
  },
  {
    id: 3,
    shortTitle: "Notelify",
    description:
      "Led UX research, iterative design, and AI integration for a note-taking tool built around how students actually study. Co-designed with a collaborator across 3 rounds of testing with 5 participants.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#f5f4f0",
    link: "/notelify",
    role: "UX Researcher & Product Designer",
    stats: [{ value: "20+", label: "students integrated it into their daily study workflow" }],
    tags: ["User Research", "User Testing", "Figma", "Claude AI"],
  },
  {
    id: 9,
    shortTitle: "Scout",
    description:
      "Owned design and build end to end: interaction model, in-tab analysis flow, prompt engineering, and shipping to the Chrome Web Store. Iterated with real browsing sessions before release.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#0f172a",
    link: "/scout",
    role: "Product Designer & Developer",
    stats: [{ value: "2 days", label: "idea to working extension build" }],
    tags: ["Chrome Extension", "Gemini AI", "Competitive UX", "Chrome Web Store"],
  },
  {
    id: 5,
    shortTitle: "Adding Google Pay to payment methods",
    description:
      "I designed for adoption of a new payment method in a system where users resist change.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#ffffff",
    link: "/telefonica",
    role: "Junior UX Designer",
    stats: [{ value: "383M+", label: "customers in market" }],
    tags: ["Google Pay", "Payment UX", "Design systems", "Figma"],
  },
  {
    id: 7,
    shortTitle: "Namma Metro",
    description:
      "Led mixed methods research into why Bengaluru commuters default to token queues despite digital alternatives, uncovering where booking breaks down under real conditions.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#0f172a",
    video: publicBlobVideo("grok-video-50cd8fed-84da-49ba-bf3b-a26b7327a753_l9mtys.mp4"),
    link: "/namma-metro-case-study_21.html",
    role: "UX Researcher",
    stats: [{ value: "6+ lakh", label: "daily riders (context)" }],
    tags: ["Usability testing", "Journey mapping", "Transit", "Mixed methods"],
  },
  {
    id: 8,
    shortTitle: "SafeYelli Research",
    description:
      "Contributed to a mixed methods research program exploring how trust, safety perception, and first-use friction shape community reporting behavior across Bengaluru neighborhoods.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#e8ebe4",
    image: "/safeyelli-research-hero-bottu-map.png",
    link: "/safeyelli-research",
    role: "UX Researcher",
    stats: [{ value: "25K+", label: "Safety Reports" }],
    tags: ["Field research", "Mixed methods", "Trust & safety", "Community UX"],
  },
  {
    id: 6,
    shortTitle: "Subtle: Surfacing What Users Don't Say",
    description:
      "Designing and building a multimodal research tool solo, exploring how face, pointer, speech, and session data can surface friction that users never verbalize.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#0c0c0e",
    video: publicBlobVideo("subtle_hmdhjr.mov"),
    link: "/signalux",
    role: "Product Designer & Builder",
    stats: [{ value: "Solo build", label: "Concept stage, interaction model in progress." }],
    tags: ["Next.js", "User testing", "Behavioral signals", "Speech-to-text"],
  },
];

const otherProjects: OtherProjectCard[] = [
  {
    id: "crave",
    title: "Crave",
    tag: "Product Design · FigBuild 2025",
    href: "https://devpost.com/software/crave-nx2e7r",
    newTab: true,
    video:
      "https://www.youtube.com/embed/tBODXzcn_2s?autoplay=1&mute=1&loop=1&playlist=tBODXzcn_2s&playsinline=1&controls=0&modestbranding=1&rel=0",
  },
  {
    id: "mini-golf",
    title: "Mini golf course",
    tag: "Experience · Mixed media",
    href: publicBlobVideo("ocean_explorers-2-2_v3fnis.mp4"),
    newTab: true,
    video: publicBlobVideo("ocean_explorers-2-2_v3fnis.mp4"),
  },
];

type ProjectsProps = {
  workLens?: WorkLens;
  onWorkLensChange: (lens: WorkLens) => void;
};

export default function Projects({ workLens = "product", onWorkLensChange }: ProjectsProps) {
  const visibleProjects = useMemo(() => projectsForLens(projects, workLens), [workLens]);

  return (
    <section id="work" className="pb-24" style={{ overflow: "hidden", background: "#ffffff", paddingTop: 0 }}>
      {/* Same horizontal shell as Hero so filters + cards line up with headline column */}
      <div className="mx-auto w-full max-w-7xl px-0 sm:px-4 md:px-8 lg:px-12">
        <div className="w-full max-w-[1200px]">
          <WorkLensChat workLens={workLens} onWorkLensChange={onWorkLensChange} />

          {/* Cards stacked vertically */}
          <div className="flex flex-col gap-10 md:gap-12" style={{ width: "100%", overflow: "visible" }}>
          {visibleProjects.map((project) => {
            const dark = project.leftTextDark;
            const isNotelify = project.id === 3;
            const isSafeYelliCard = project.id === 1;
            const isTelefonica = project.id === 5;
            const isSignalUX = project.id === 6;
            const isNammaMetro = project.id === 7;
            const isSafeYelliResearch = project.id === 8;
            const isScout = project.id === 9;
            const spotlightVideoSrc = project.video;
            const isSpotlightCard =
              isNotelify ||
              isSafeYelliCard ||
              isTelefonica ||
              isSignalUX ||
              isNammaMetro ||
              isSafeYelliResearch ||
              isScout;
            const textPrimary   = dark ? "text-gray-950"     : "text-white";
            const textSecondary = dark ? "text-gray-800"     : "text-white/70";
            const textMuted     = dark ? "text-gray-600"     : "text-white/40";
            const borderColor   = dark ? "border-gray-900/40" : "border-white/30";
            const divideColor   = dark ? "divide-gray-900/20" : "divide-white/20";
            const ctaClass      = dark
              ? "bg-gray-950 text-white hover:bg-gray-800"
              : `border ${borderColor} text-white hover:bg-white/10`;
            const spotlightInnerStyle =
              isSpotlightCard
                ? {
                    display: "grid" as const,
                    gridTemplateColumns: "minmax(0, 35%) minmax(0, 65%)",
                    flex: 1,
                    overflow: "hidden",
                    borderRadius: 24,
                    alignItems: "stretch" as const,
                    minWidth: 0,
                  }
                : {
                    display: "flex" as const,
                    flexDirection: "row" as const,
                    flex: 1,
                    overflow: "hidden",
                    borderRadius: 24,
                  };
            const cardContent = (
              <article
                className={`project-card-shell transition-all duration-300 ease-in-out ${project.comingSoon ? "" : "hover:scale-[1.01] hover:shadow-[0_12px_48px_rgba(0,0,0,0.14)]"}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 24,
                  overflow: "visible",
                  boxShadow: isSpotlightCard
                    ? "0 -8px 24px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.08)"
                    : "0 -8px 32px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.08)",
                  minHeight: 500,
                  width: "100%",
                  boxSizing: "border-box",
                  cursor: project.comingSoon ? "default" : "pointer",
                  position: "relative",
                }}
              >
                {/* Coming Soon badge */}
                {project.comingSoon && (
                  <div style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    background: "#1a1a2e",
                    color: "#fff",
                    fontFamily: "'General Sans', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "6px 14px",
                    borderRadius: 999,
                  }}>
                    Coming Soon
                  </div>
                )}

                {/* Inner content wrapper: spotlight uses grid so media min-width cannot overlap copy. */}
                <div style={spotlightInnerStyle} className={isSpotlightCard ? "spotlight-card-inner" : undefined}>
                {/* Left column */}
                <div
                  className={`project-card-copy-col flex flex-col gap-2 p-4 sm:p-6`}
                  style={{
                    ...(isSpotlightCard
                      ? {
                          minWidth: 0,
                          overflow: "hidden",
                          ...(isSpotlightCard ? { position: "relative", zIndex: 2 } : {}),
                        }
                      : { flex: "0 0 38%", maxWidth: "38%", overflow: "visible" }),
                    background: isSpotlightCard ? "#ffffff" : project.leftBg,
                  }}
                >
                  {/* Role pill / status row */}
                  {isSpotlightCard ? (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="tracking-widest uppercase" style={{ fontSize: "0.69rem", fontWeight: 600, color: "rgba(17,24,39,0.5)", fontFamily: "'General Sans', sans-serif" }}>
                          {isScout
                            ? "Chrome extension · Live on Chrome Web Store"
                            : isTelefonica
                              ? "Client UX & Product Design"
                              : isNammaMetro
                                ? "UX Research & Mobility"
                                : isSafeYelliResearch
                                  ? "UX Research program"
                                  : isSignalUX
                                    ? "Work in progress"
                                    : isNotelify
                                      ? "UX Research & Product Design"
                                      : "Product Design & Service Design"}
                        </span>
                      </div>
                    </div>
                  ) : project.role ? (
                    <span className={`self-start font-semibold px-3 py-1 rounded-full border ${borderColor} ${textSecondary}`} style={{ fontSize: "1rem", fontFamily: "'General Sans', sans-serif" }}>
                      {project.role}
                    </span>
                  ) : null}

                  {/* Title / headline */}
                  {isSpotlightCard ? (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          fontFamily: "'General Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(1.6rem, 2.85vw, 2.2rem)",
                          color: "#111827",
                          lineHeight: 1.18,
                          marginBottom: "1rem",
                          letterSpacing: "-0.02em",
                          maxWidth: "min(28rem, 100%)",
                        }}
                      >
                        {project.shortTitle}
                      </div>
                      {isSafeYelliCard ? (
                        <p
                          className="mb-4 text-base font-normal leading-relaxed text-gray-600"
                          style={{ fontFamily: "'General Sans', sans-serif" }}
                        >
                          Led end-to-end design for map-first safety reporting; live scale includes{" "}
                          <span className="font-semibold text-gray-900">25K+ safety reports</span>
                          {" from the community."}
                        </p>
                      ) : isScout ? (
                        <p
                          className="mb-4 text-base font-normal leading-relaxed text-gray-600"
                          style={{ fontFamily: "'General Sans', sans-serif" }}
                        >
                          Owned design and build end to end: interaction model, in-tab analysis flow,
                          and shipping to the{" "}
                          <span className="font-semibold text-gray-900">Chrome Web Store</span>
                          . Iterated with real browsing sessions before release.
                        </p>
                      ) : (
                        <p
                          className="mb-4 text-base font-normal leading-relaxed text-gray-600"
                          style={{ fontFamily: "'General Sans', sans-serif" }}
                        >
                          {project.description}
                        </p>
                      )}
                      <div
                        className={`mt-1 ${
                          (project.stats?.length ?? 0) >= 3
                            ? "grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-8"
                            : "flex flex-col gap-4"
                        }`}
                      >
                        {project.stats?.map((stat) => (
                          <div key={stat.label} className="min-w-0">
                            <p className={`font-semibold leading-none ${textPrimary}`} style={{ fontFamily: "'General Sans', sans-serif", fontSize: "1.8rem" }}>{stat.value}</p>
                            <p className={`mt-0.5 ${textSecondary}`} style={{ fontFamily: "'General Sans', sans-serif", fontSize: "0.85rem", fontWeight: 400, lineHeight: 1.45 }}>{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <h3
                      className={`leading-tight ${textPrimary}`}
                      style={{ fontSize: "2.8rem", fontFamily: "'General Sans', sans-serif", fontWeight: 600 }}
                    >
                      {project.shortTitle}
                    </h3>
                  )}

                  {/* FROM THE CASE STUDY label */}
                  {!isSpotlightCard && (
                    <p className={`font-semibold tracking-[0.18em] uppercase ${textMuted}`} style={{ fontSize: "0.85rem", fontFamily: "'General Sans', sans-serif" }}>
                      From the case study
                    </p>
                  )}

                  {/* Description */}
                  {!isSpotlightCard && (
                    <p className={`leading-relaxed ${textSecondary}`} style={{ fontSize: "1.05rem" }}>
                      {project.description}
                    </p>
                  )}

                  {/* Stats */}
                  {project.stats && !isSpotlightCard && (
                    <div className={`flex divide-x ${divideColor} mt-1`}>
                      {project.stats.map((stat) => (
                        <div key={stat.label} className="flex-1 pr-4 first:pl-0 pl-4">
                          <p className={`font-semibold leading-none ${textPrimary}`} style={{ fontFamily: "'General Sans', sans-serif", fontSize: "1.8rem" }}>{stat.value}</p>
                          <p className={`mt-0.5 ${textSecondary}`} style={{ fontFamily: "'General Sans', sans-serif", fontSize: "1rem" }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Duration & team */}
                  {(project.duration || project.team) && (
                    <div className={`flex gap-4 text-[10px] ${textMuted}`} style={{ fontFamily: "'General Sans', sans-serif" }}>
                      {project.duration && <span>⏱ {project.duration}</span>}
                      {project.team     && <span>👥 {project.team}</span>}
                    </div>
                  )}

                  {/* Skill tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-semibold px-2.5 py-1 rounded-full border ${borderColor} ${textSecondary}`} style={{ fontSize: "1rem", fontFamily: "'General Sans', sans-serif" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA: pushed to bottom (spotlight case-study cards are link-only; no button) */}
                  {!project.comingSoon && !isSpotlightCard && (
                    <div className="mt-auto pt-2">
                      <span
                        className={`self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold tracking-wide transition-colors ${ctaClass}`}
                        style={{
                          fontSize: "1.1rem",
                          fontFamily: "'General Sans', sans-serif",
                        }}
                      >
                        Explore →
                      </span>
                    </div>
                  )}
                </div>

                {/* Right column */}
                {project.placeholder ? (
                  // Apple-style placeholder
                  <div
                    className="project-card-media-col flex flex-1 items-center justify-center"
                    style={{ background: project.rightBg, padding: 10 }}
                  >
                    <div style={{
                      borderRadius: 24,
                      background: "linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 60%, #141416 100%)",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 24px 64px rgba(0,0,0,0.6)",
                      width: "100%",
                      maxWidth: 420,
                      aspectRatio: "4/3",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}>
                      <div style={{ fontSize: 48, lineHeight: 1 }}>✦</div>
                      <p style={{
                        fontFamily: "'General Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.6rem",
                        color: "#f5f5f7",
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}>
                        Notelify
                      </p>
                      <p style={{
                        fontFamily: "'General Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: 0,
                      }}>
                        Case study coming soon
                      </p>
                    </div>
                  </div>
                ) : (isSafeYelliCard && project.video) ||
                  isNotelify ||
                  isTelefonica ||
                  isSignalUX ||
                  isNammaMetro ||
                  isSafeYelliResearch ||
                  isScout ? (
                  <div
                    className="project-card-media-col"
                    style={{
                      minWidth: 0,
                      minHeight: 500,
                      height: "100%",
                      alignSelf: "stretch",
                      position: "relative",
                      zIndex: 0,
                      overflow: "hidden",
                      background: project.rightBg,
                    }}
                  >
                    {isSafeYelliResearch && project.image ? (
                      <div style={spotlightMediaOuterShell()}>
                        <div style={spotlightMediaInsetFrame("#e8ebe4")}>
                          <div style={{ position: "absolute", inset: 0 }}>
                            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <Image
                              src={project.image}
                              alt="Outdoor SafeYelli Bottu Map workshop in Bengaluru — participants around a printed neighbourhood map, from the research case study hero."
                              fill
                              sizes="(max-width: 900px) 90vw, 55vw"
                              style={{
                                objectFit: "cover",
                                objectPosition: "center 42%",
                              }}
                            />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : isScout ? (
                      <div style={spotlightMediaOuterShell()}>
                        <div style={spotlightMediaInsetFrame("#0c0c0c")}>
                          <ScoutCardVideo />
                        </div>
                      </div>
                    ) : isNammaMetro && project.video ? (
                      <div style={spotlightMediaOuterShell()}>
                        <div style={spotlightMediaInsetFrame("#0f172a")}>
                          <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            aria-label="Namma Metro research case study preview video"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center center",
                              display: "block",
                              outline: "none",
                              border: "none",
                            }}
                          >
                            <source src={project.video} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    ) : isTelefonica ? (
                      <div style={spotlightMediaOuterShell()}>
                        <div
                          style={{
                            ...spotlightMediaInsetFrame(TELEFONICA_LOCKUP_BG),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "clamp(16px, 3vw, 32px)",
                          }}
                        >
                          <Image
                            src="/telefonica-project-lockup.png"
                            alt="Google Pay × Telefónica — payment methods case study"
                            width={1600}
                            height={1200}
                            sizes="(max-width: 900px) 90vw, 55vw"
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: "min(400px, 68vh)",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    ) : project.mediaPlaceholder === "video" ? (
                      <div style={spotlightMediaOuterShell("#eef0f4")}>
                        <div
                          style={{
                            ...spotlightMediaInsetFrame("#18181b"),
                            position: "relative",
                          }}
                        >
                          <SpotlightVideoPlaceholder
                            title="Video placeholder"
                            subtitle="Point `video` at an mp4/mov when you have a cut."
                          />
                        </div>
                      </div>
                    ) : project.mediaPlaceholder === "image" ? (
                      <div style={spotlightMediaOuterShell("#eef0f4")}>
                        <div
                          style={{
                            ...spotlightMediaInsetFrame("#fafafa"),
                            position: "relative",
                          }}
                        >
                          <SpotlightImagePlaceholder />
                        </div>
                      </div>
                    ) : isSafeYelliCard && spotlightVideoSrc ? (
                      <div style={spotlightMediaOuterShell("#fafafa")}>
                        <div style={spotlightMediaInsetFrame("#fafafa")}>
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            aria-label={`${project.shortTitle} product video`}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center center",
                              display: "block",
                              outline: "none",
                              border: "none",
                            }}
                          >
                            <source src={spotlightVideoSrc} type="video/mp4" />
                            {project.videoFallback ? (
                              <source src={project.videoFallback} type="video/quicktime" />
                            ) : null}
                          </video>
                        </div>
                      </div>
                    ) : isSignalUX && spotlightVideoSrc ? (
                      <div
                        style={spotlightMediaOuterShell("#fafafa")}
                      >
                        <div
                          style={spotlightMediaInsetFrame("#0c0c0c")}
                        >
                          <video
                            src={spotlightVideoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            aria-label={`${project.shortTitle} product video`}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              objectPosition: "center center",
                              display: "block",
                              outline: "none",
                              border: "none",
                            }}
                          >
                            <source
                              src={spotlightVideoSrc}
                              type={
                                spotlightVideoSrc.endsWith(".mov")
                                  ? "video/quicktime"
                                  : "video/mp4"
                              }
                            />
                          </video>
                        </div>
                      </div>
                    ) : (
                      <div style={spotlightMediaOuterShell()}>
                        <div
                          style={{
                            ...spotlightMediaInsetFrame("#f5f4f0"),
                            padding: 0,
                          }}
                        >
                          <iframe
                            src="/notelify-walkthrough4.html"
                            title="Notelify product demo"
                            style={{
                              position: "absolute",
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              minHeight: "100%",
                              border: "none",
                              outline: "none",
                              display: "block",
                              backgroundColor: "#f5f4f0",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : project.rightFill ? (
                  <div className="project-card-media-col" style={{ flex: "0 0 60%", flexShrink: 0, position: "relative", overflow: "hidden", minHeight: 500 }}>
                    {project.video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={project.image!}
                        alt={project.shortTitle}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.20)" }} />
                  </div>
                ) : (
                  // Padded floating media
                  <div
                    className="project-card-media-col flex flex-1 items-center justify-center"
                    style={{ background: project.rightBg, padding: 10 }}
                  >
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        style={{ borderRadius: SPOTLIGHT_MEDIA_R_INNER, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", maxHeight: 520, width: "auto", display: "block" }}
                      />
                    ) : project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image!}
                        alt={project.shortTitle}
                        style={{ borderRadius: SPOTLIGHT_MEDIA_R_INNER, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", maxHeight: 520, width: "auto", display: "block" }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "relative",
                          width: "min(100%, 520px)",
                          aspectRatio: "16 / 10",
                          borderRadius: SPOTLIGHT_MEDIA_R_INNER,
                          overflow: "hidden",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        }}
                      >
                        <SpotlightImagePlaceholder
                          title="Media placeholder"
                          subtitle={
                            project.mediaPlaceholder === "video"
                              ? "Add a `video` URL to this project."
                              : "Add `image` or `video` to this project."
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
                </div>{/* /Inner content wrapper */}
              </article>
            );

            const cardElement = project.comingSoon ? (
              <div key={project.id} style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                {cardContent}
              </div>
            ) : (
              <Link
                key={project.id}
                href={
                  isScout ? `${project.link}?lens=${encodeURIComponent(workLens)}` : project.link
                }
                prefetch={isScout ? false : undefined}
                onClick={
                  isScout
                    ? () => {
                        setScoutReturnLens(workLens);
                      }
                    : undefined
                }
                {...(project.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${isSpotlightCard ? "block cursor-pointer " : ""}rounded-3xl outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                style={{ textDecoration: "none", display: "block", maxWidth: 1200, margin: "0 auto", width: "100%" }}
                aria-label={
                  isSafeYelliCard
                    ? "Open SafeYelli case study"
                    : isNotelify
                      ? "Open Notelify case study"
                      : isTelefonica
                        ? "Open case study: Adding Google Pay to payment methods"
                        : isSignalUX
                          ? "Open Subtle project"
                          : isNammaMetro
                            ? "Open Namma Metro case study"
                            : isSafeYelliResearch
                              ? "Open SafeYelli Research case study"
                              : isScout
                                ? "Open Scout case study"
                                : undefined
                }
              >
                {cardContent}
              </Link>
            );

            return cardElement;
          })}
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <section aria-label="Other projects" className="mt-8 md:mt-10">
              <p
                className="mb-4 md:mb-5 tracking-[0.14em] uppercase text-gray-500"
                style={{ fontSize: "0.74rem", fontWeight: 600 }}
              >
                Other projects
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                {otherProjects.map((other) => (
                  <Link
                    key={other.id}
                    href={other.href}
                    {...(other.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out hover:scale-[1.01]"
                    style={{ textDecoration: "none" }}
                    aria-label={`Open ${other.title} project`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b1020]">
                      {other.id === "crave" && other.video ? (
                        <iframe
                          src={other.video}
                          title="Crave pitch video preview"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          loading="lazy"
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      ) : other.video ? (
                        <video
                          src={other.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="absolute inset-0 h-full w-full object-cover"
                          aria-label={`${other.title} project preview video`}
                        >
                          <source src={other.video} type={other.video.endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
                        </video>
                      ) : null}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500" style={{ fontFamily: "'General Sans', sans-serif" }}>{other.tag}</p>
                      <h4
                        className="mt-2 text-xl font-semibold text-gray-900"
                        style={{ fontFamily: "'General Sans', sans-serif", letterSpacing: "-0.01em" }}
                      >
                        {other.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

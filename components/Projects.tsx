import Image from "next/image";
import Link from "next/link";
import FitContainVideo from "@/components/FitContainVideo";

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
  /** H.264/MP4 URL (e.g. Cloudinary `f_mp4`) so Chrome/Android can play; use with a local `/…mov` in `video`. */
  videoWebMp4?: string;
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

const projects: Project[] = [
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
    id: 1,
    shortTitle: "SafeYelli",
    description:
      "Led end-to-end design for map-first safety reporting; live scale includes 25K+ community reports, 150K+ safer routes planned, and strong daily active use.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#ffffff",
    image: "/safeyelli3.png",
    video: "/safeyelli-2.mov",
    videoWebMp4:
      "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4/v1775549034/safeyelli-2_cg6fhq.mov",
    link: "/safeyelli",
    role: "UX Researcher & Service Designer",
    stats: [{ value: "50K+", label: "Active Users" }],
    tags: ["Data Analysis", "Community", "User Research"],
  },
  {
    id: 3,
    shortTitle: "Notelify",
    description:
      "An AI-powered note-taking app designed to help students write, refine, and study their notes more effectively, with intelligence woven throughout the entire workflow.",
    leftBg: "#ffffff",
    leftTextDark: true,
    rightBg: "#f5f4f0",
    link: "/notelify",
    role: "UX Researcher & Product Designer",
    stats: [{ value: "20+", label: "students integrated it into their daily study workflow" }],
    tags: ["AI Design", "User Testing", "Iterative Design"],
  },
  {
    id: 2,
    shortTitle: "Grab A Seat!",
    description:
      "Designed a culturally inclusive board game that facilitates difficult conversations about mental health across diverse communities. Led user research with 30+ participants to create culturally sensitive prompts informed by qualitative coding.",
    leftBg: "#1B2D6B",
    leftTextDark: false,
    rightBg: "#1B2D6B",
    image: "/grabaseatcover1.JPG",
    link: "#",
    comingSoon: true,
    role: "UX Researcher & Game Designer",
    stats: [
      { value: "30+", label: "Participants"  },
      { value: "3",   label: "Months"        },
      { value: "4",   label: "Team Members"  },
    ],
    tags: ["Game Design", "User Research", "Cultural Inclusivity"],
  },
];

export default function Projects() {
  return (
    <section id="work" className="pb-24" style={{ overflow: "hidden", background: "#ffffff", paddingTop: 0 }}>
      <div className="px-6">


        {/* Cards stacked vertically */}
        <div className="flex flex-col gap-6" style={{ width: "100%", overflow: "visible" }}>
          {projects.map((project) => {
            const dark = project.leftTextDark;
            const isNotelify = project.id === 3;
            const isSafeYelliCard = project.id === 1;
            const isTelefonica = project.id === 5;
            const isSpotlightCard = isNotelify || isSafeYelliCard || isTelefonica;
            const textPrimary   = dark ? "text-gray-950"     : "text-white";
            const textSecondary = dark ? "text-gray-800"     : "text-white/70";
            const textMuted     = dark ? "text-gray-600"     : "text-white/40";
            const borderColor   = dark ? "border-gray-900/40" : "border-white/30";
            const divideColor   = dark ? "divide-gray-900/20" : "divide-white/20";
            const ctaClass      = dark
              ? "bg-gray-950 text-white hover:bg-gray-800"
              : `border ${borderColor} text-white hover:bg-white/10`;
            const cardContent = (
              <article
                className={`transition-all duration-300 ease-in-out ${project.comingSoon ? "" : "hover:scale-[1.01] hover:shadow-[0_12px_48px_rgba(0,0,0,0.14)]"}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 24,
                  overflow: "visible",
                  boxShadow: "0 -8px 32px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.08)",
                  minHeight: 500,
                  width: "100%",
                  boxSizing: "border-box",
                  cursor: project.comingSoon ? "default" : "pointer",
                  position: "relative",
                  ...(isSpotlightCard && { boxShadow: "0 -8px 24px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.08)" }),
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
                <div
                  style={
                    isSpotlightCard
                      ? {
                          display: "grid",
                          gridTemplateColumns: "minmax(0, 35%) minmax(0, 65%)",
                          flex: 1,
                          overflow: "hidden",
                          borderRadius: 24,
                          alignItems: "stretch",
                        }
                      : {
                          display: "flex",
                          flexDirection: "row",
                          flex: 1,
                          overflow: "hidden",
                          borderRadius: 24,
                        }
                  }
                >
                {/* Left column */}
                <div
                  className="flex flex-col gap-2 p-6"
                  style={{
                    ...(isSpotlightCard
                      ? {
                          minWidth: 0,
                          overflow: "hidden",
                          ...((isSafeYelliCard || isNotelify || isTelefonica) ? { position: "relative", zIndex: 2 } : {}),
                        }
                      : { flex: "0 0 38%", maxWidth: "38%", overflow: "visible" }),
                    background: isSafeYelliCard || isNotelify || isTelefonica ? "#ffffff" : project.leftBg,
                  }}
                >
                  {/* Role pill / status row */}
                  {isSafeYelliCard || isNotelify || isTelefonica ? (
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#16a34a", fontSize: "0.6rem" }}>●</span>
                      <span className="tracking-widest uppercase" style={{ fontSize: "0.69rem", fontWeight: 600, color: "rgba(17,24,39,0.5)" }}>
                        {isTelefonica
                          ? "Client UX & Product Design"
                          : isNotelify
                            ? "UX Research & Product Design"
                            : "UX Research & Service Design"}
                      </span>
                    </div>
                  ) : project.id === 2 ? (
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#4ade80", fontSize: "0.6rem" }}>●</span>
                      <span className="text-white/50 tracking-widest uppercase" style={{ fontSize: "0.69rem", fontWeight: 600 }}>
                        UX Research &amp; Game Design
                      </span>
                    </div>
                  ) : project.role ? (
                    <span className={`self-start font-semibold px-3 py-1 rounded-full border ${borderColor} ${textSecondary}`} style={{ fontSize: "1rem" }}>
                      {project.role}
                    </span>
                  ) : null}

                  {/* Title / headline */}
                  {isSafeYelliCard || isNotelify || isTelefonica ? (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          fontFamily: "'General Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: isTelefonica ? "clamp(1.6rem, 2.85vw, 2.2rem)" : "3.5rem",
                          color: "#111827",
                          lineHeight: isTelefonica ? 1.18 : 1,
                          marginBottom: "1rem",
                          letterSpacing: "-0.02em",
                          maxWidth: isTelefonica ? "min(20rem, 100%)" : undefined,
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
                          <span className="font-semibold text-gray-900">25K+ community reports</span>
                          {", "}
                          <span className="font-semibold text-gray-900">150K+ safer routes</span>
                          {" planned, and strong daily active use."}
                        </p>
                      ) : (
                        <p
                          className="mb-4 text-base font-normal leading-relaxed text-gray-600"
                          style={{ fontFamily: "'General Sans', sans-serif" }}
                        >
                          {project.description}
                        </p>
                      )}
                      <div className="mt-1">
                        {project.stats?.map((stat) => (
                          <div key={stat.label}>
                            <p className={`font-semibold leading-none ${textPrimary}`} style={{ fontFamily: "'General Sans', sans-serif", fontSize: "1.8rem" }}>{stat.value}</p>
                            <p className={`mt-0.5 ${textSecondary}`} style={{ fontFamily: "'General Sans', sans-serif", fontSize: "0.85rem", fontWeight: 400, lineHeight: 1.45 }}>{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : project.id === 2 ? (
                    <div style={{ lineHeight: 1 }}>
                      <div style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 600, fontSize: "3.2rem", textTransform: "uppercase", color: "#ffffff", lineHeight: 1 }}>
                        No one was talking.
                      </div>
                      <div style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 600, fontSize: "3.2rem", textTransform: "uppercase", color: "#7B9FE0", lineHeight: 1 }}>
                        So we built the table.
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
                  {!isSpotlightCard && project.id !== 2 && (
                    <p className={`font-semibold tracking-[0.18em] uppercase ${textMuted}`} style={{ fontSize: "0.85rem" }}>
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
                          <p className={`font-semibold leading-none ${textPrimary}`} style={{ fontSize: "1.8rem" }}>{stat.value}</p>
                          <p className={`mt-0.5 ${textSecondary}`} style={{ fontSize: "1rem" }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Duration & team */}
                  {(project.duration || project.team) && (
                    <div className={`flex gap-4 text-[10px] ${textMuted}`}>
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
                          className={`font-semibold px-2.5 py-1 rounded-full border ${borderColor} ${textSecondary}`} style={{ fontSize: "1rem" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA: pushed to bottom (spotlight case-study cards are link-only; no button) */}
                  {!project.comingSoon && !isSafeYelliCard && !isNotelify && !isTelefonica && (
                    <div className="mt-auto pt-2">
                      <span
                        className={`self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold tracking-wide transition-colors ${ctaClass}`}
                        style={{
                          fontSize: "1.1rem",
                          ...(isSpotlightCard && { background: "#c94a2a", color: "#fff", borderColor: "#c94a2a" }),
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
                    className="flex-1 flex items-center justify-center"
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
                ) : (isSafeYelliCard && project.video) || isNotelify || isTelefonica ? (
                  <div
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
                    {isTelefonica ? (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          minHeight: 500,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#2d60ff",
                          borderTopRightRadius: 24,
                          borderBottomRightRadius: 24,
                          overflow: "hidden",
                          padding: "clamp(20px, 4vw, 40px)",
                          boxSizing: "border-box",
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
                            maxHeight: "min(440px, 72vh)",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    ) : isSafeYelliCard && project.video ? (
                      <FitContainVideo
                        src={project.video}
                        webMp4Src={project.videoWebMp4}
                        panelBg={project.rightBg}
                        poster={project.image}
                        objectFit="contain"
                      />
                    ) : (
                      <iframe
                        src="/notelify-walkthrough4.html"
                        title="Notelify product demo"
                        style={{
                          width: "100%",
                          height: "100%",
                          minHeight: 500,
                          border: "none",
                          outline: "none",
                          display: "block",
                          backgroundColor: "#f5f4f0",
                        }}
                      />
                    )}
                  </div>
                ) : project.rightFill ? (
                  <div style={{ flex: "0 0 60%", flexShrink: 0, position: "relative", overflow: "hidden", minHeight: 500 }}>
                    {project.video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      >
                        <source src={project.video} type="video/quicktime" />
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
                    className="flex-1 flex items-center justify-center"
                    style={{ background: project.rightBg, padding: 10 }}
                  >
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", maxHeight: 520, width: "auto", display: "block" }}
                      />
                    ) : project.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image!}
                        alt={project.shortTitle}
                        style={{ borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.22)", maxHeight: 520, width: "auto", display: "block" }}
                      />
                    ) : null}
                  </div>
                )}
                </div>{/* /Inner content wrapper */}
              </article>
            );

            return project.comingSoon ? (
              <div key={project.id} style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                {cardContent}
              </div>
            ) : (
              <Link
                key={project.id}
                href={project.link}
                {...(project.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={isSafeYelliCard || isNotelify || isTelefonica ? "block cursor-pointer" : undefined}
                style={{ textDecoration: "none", display: "block", maxWidth: 1200, margin: "0 auto", width: "100%" }}
                aria-label={
                  isSafeYelliCard
                    ? "Open SafeYelli case study"
                    : isNotelify
                      ? "Open Notelify case study"
                      : isTelefonica
                        ? "Open case study: Adding Google Pay to payment methods"
                        : undefined
                }
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

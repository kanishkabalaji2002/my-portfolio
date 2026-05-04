"use client";

import { publicBlobVideo } from "@/lib/publicBlobVideos";

/** Public Blob: MP4 variant + QuickTime fallback for Scout spotlight. */
const SCOUT_CARD_VIDEO_MP4 = publicBlobVideo("Screen_Recording_2026-04-16_at_1.31.34_PM_sep6pv");
const SCOUT_CARD_VIDEO_MOV = publicBlobVideo("Screen_Recording_2026-04-16_at_1.31.34_PM_sep6pv.mov");

/** Fills the parent (position: relative, min-height set in Projects). No inset padding or inner “frame”. */
export default function ScoutCardVideo() {
  return (
    <video
      className="scout-card-video"
      tabIndex={-1}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Screen recording: Scout extension on a web page"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        minHeight: "100%",
        /* Uniform zoom only (no scaleX): keeps aspect ratio; parent overflow clips baked-in mattes */
        transform: "translate(-50%, -50%) scale(1.34)",
        transformOrigin: "center center",
        objectFit: "cover",
        objectPosition: "center 62%",
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <source src={SCOUT_CARD_VIDEO_MP4} type="video/mp4" />
      <source src={SCOUT_CARD_VIDEO_MOV} type="video/quicktime" />
    </video>
  );
}

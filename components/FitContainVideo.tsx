"use client";

type FitContainVideoProps = {
  src: string;
  /** MP4/H.264 (e.g. Cloudinary `f_mp4`); listed first so Chrome/production work even if `src` .mov is missing or unsupported. */
  webMp4Src?: string;
  panelBg?: string;
  poster?: string;
  objectFit?: "cover" | "contain";
};

/** Insert Cloudinary `f_mp4` so Chrome/Firefox/Android can play; keep original .mov as second source for Safari. */
function cloudinaryMp4Variant(movOrUrl: string): string | null {
  try {
    const u = new URL(movOrUrl);
    if (!u.hostname.includes("cloudinary.com")) return null;
    if (u.pathname.includes("/upload/f_mp4/")) return null;
    const path = u.pathname.replace("/upload/", "/upload/f_mp4/");
    u.pathname = path;
    return u.toString();
  } catch {
    return null;
  }
}

/**
 * Project-card video: default `contain` shows the full frame (letterboxed).
 * Use `cover` only when you accept edge cropping to fill the cell.
 */
export default function FitContainVideo({
  src,
  webMp4Src,
  panelBg = "#ffffff",
  poster,
  objectFit = "contain",
}: FitContainVideoProps) {
  const cover = objectFit === "cover";
  const mp4Src = webMp4Src ?? cloudinaryMp4Variant(src);

  const r = 16;
  const videoRadius = {
    borderTopLeftRadius: r,
    borderBottomLeftRadius: r,
    borderTopRightRadius: r,
    borderBottomRightRadius: r,
  } as const;

  return (
    <div
      className="safeyelli-card-video-panel"
      style={{
        minWidth: 0,
        width: "100%",
        height: "100%",
        minHeight: 500,
        position: "relative",
        overflow: "hidden",
        background: panelBg,
        boxSizing: "border-box",
        display: cover ? "block" : "flex",
        alignItems: cover ? undefined : "center",
        justifyContent: cover ? undefined : "center",
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <video
        key={mp4Src ? `${mp4Src}|${src}` : src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={
          cover
            ? {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                outline: "none",
                ...videoRadius,
              }
            : {
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                outline: "none",
                ...videoRadius,
              }
        }
      >
        {mp4Src ? (
          <>
            <source src={mp4Src} type="video/mp4" />
            <source src={src} type="video/quicktime" />
          </>
        ) : (
          <source src={src} />
        )}
      </video>
    </div>
  );
}

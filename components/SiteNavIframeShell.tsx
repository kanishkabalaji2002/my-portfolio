import Navbar from "@/components/Navbar";

type SiteNavIframeShellProps = {
  title: string;
  src: string;
  /** Wrapper background (Tailwind classes), e.g. bg-[#fafafa] */
  shellClassName?: string;
  /** Extra classes on iframe */
  iframeClassName?: string;
  /** Optional accessible name (in addition to title) */
  "aria-label"?: string;
};

/**
 * Site navbar + full remaining viewport height for embedded HTML case studies and Play.
 */
export function SiteNavIframeShell({
  title,
  src,
  shellClassName,
  iframeClassName,
  "aria-label": ariaLabel,
}: SiteNavIframeShellProps) {
  return (
    <>
      <Navbar />
      <div
        className={`mt-14 h-[calc(100dvh-3.5rem)] w-full overflow-hidden ${shellClassName ?? "bg-white"}`}
      >
        <iframe
          title={title}
          src={src}
          aria-label={ariaLabel}
          className={`block h-full w-full border-0 ${iframeClassName ?? ""}`}
        />
      </div>
    </>
  );
}

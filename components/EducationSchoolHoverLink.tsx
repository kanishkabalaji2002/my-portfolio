type EducationSchoolHoverLinkProps = {
  school: string;
  logoSrc?: string;
  previewImageSrc?: string;
  website?: string;
  /** Applied to the school name link (and plain fallback text). */
  nameClassName?: string;
};

const defaultNameClassName =
  "font-normal text-gray-900 underline-offset-2 transition-colors hover:text-gray-700 hover:underline";

export function EducationSchoolHoverLink({
  school,
  logoSrc,
  previewImageSrc,
  website,
  nameClassName = defaultNameClassName,
}: EducationSchoolHoverLinkProps) {
  if (!logoSrc || !website || !previewImageSrc) {
    return <span className={nameClassName}>{school}</span>;
  }

  return (
    <div className="relative inline-flex w-fit max-w-full items-center gap-2 group">
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray-200"
        aria-label={`Visit ${school} website`}
      >
        <img src={logoSrc} alt={`${school} logo`} className="h-full w-full object-cover" />
      </a>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={`min-w-0 ${nameClassName}`}
      >
        {school}
      </a>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-none absolute -top-2 left-0 z-20 w-56 max-w-[min(14rem,calc(100vw-2rem))] -translate-y-full overflow-hidden rounded-xl border border-gray-200 bg-white opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        <img src={previewImageSrc} alt={`${school} campus preview`} className="block h-28 w-full object-cover" />
        <p className="px-3 py-2.5 text-sm font-normal leading-relaxed text-gray-700">Visit {school}</p>
      </a>
    </div>
  );
}

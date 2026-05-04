"use client";

import Image from "next/image";
import { ME_BOOK_ENTRIES, type MeBookEntry } from "@/lib/aboutMeBookData";

/** Title + body on the image, hidden until hover (or always on small screens / reduced motion). */
function TextOnImage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-12 transition-[opacity,transform] duration-300 ease-out max-md:translate-y-0 max-md:opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
    >
      {children}
    </div>
  );
}

function EntryBody({ entry }: { entry: MeBookEntry }) {
  if (entry.kind === "video") {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
        <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover">
          <source
            src={entry.src}
            type={
              entry.src.toLowerCase().endsWith(".mov")
                ? "video/quicktime"
                : "video/mp4"
            }
          />
        </video>
        <TextOnImage>
          <h3 className="text-[17px] font-semibold leading-snug text-white">{entry.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-white/85">{entry.body}</p>
        </TextOnImage>
      </div>
    );
  }
  if (entry.kind === "imageCard") {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={entry.image} alt="" fill className="object-cover" sizes="400px" />
        <TextOnImage>
          <h3 className="text-[17px] font-semibold leading-snug text-white">{entry.title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-white/85">{entry.body}</p>
        </TextOnImage>
      </div>
    );
  }
  if (entry.kind === "food") {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={entry.image} alt="" fill className="object-cover" sizes="400px" />
        <TextOnImage>
          <p className="text-[15px] font-semibold text-white">{entry.line1}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/85">{entry.line2}</p>
        </TextOnImage>
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image src={entry.image} alt="" fill className="object-cover" sizes="400px" />
      <TextOnImage>
        <p className="text-[15px] font-semibold text-white">{entry.line1}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-white/85">{entry.line2}</p>
      </TextOnImage>
    </div>
  );
}

export function AboutMeStoriesGrid() {
  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ME_BOOK_ENTRIES.map((entry) => (
        <div
          key={entry.id}
          tabIndex={0}
          className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm outline-none ring-gray-900/10 transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <EntryBody entry={entry} />
        </div>
      ))}
    </div>
  );
}

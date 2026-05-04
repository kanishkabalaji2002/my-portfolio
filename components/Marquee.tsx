const ITEMS = [
  "UX Research",
  "Interaction Design",
  "Qualitative Coding",
  "Behavioral Research",
  "Usability Testing",
  "Systems Thinking",
  "Service Design",
  "Prototyping",
  "Product Design",
  "User Interviews",
  "Wireframing",
  "Information Architecture",
];

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="w-full overflow-hidden bg-white py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 px-4"
          >
            {item}
            <span className="text-[#000000] text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

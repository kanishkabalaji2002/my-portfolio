import type { Metadata } from "next";
import type { ReactNode } from "react";

import { EducationSchoolHoverLink } from "@/components/EducationSchoolHoverLink";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Resume — Kanishka Balaji",
  description:
    "Product designer — experience, education, and skills. Seattle, WA · MHCI+D @ UW.",
};

const WORK = [
  {
    role: "Product Designer",
    company: "Copart (Masters Capstone)",
    date: "Jan 2026 – Present",
    bullets: [
      "Owned end-to-end redesign of a multi-step vehicle-selling experience, improving task efficiency by 25% and user satisfaction by 20%.",
      "Synthesized insights from 20+ users to identify friction in onboarding and pricing decisions, reducing drop-offs across key steps.",
      "Built and tested low- to high-fidelity prototypes, enabling faster iteration and reducing decision-making time for stakeholders.",
      "Leveraged AI-assisted workflows to speed up research synthesis and ideation cycles, improving iteration velocity.",
    ],
  },
  {
    role: "Junior UX Designer",
    company: "BORN, TechMahindra (Project: Telefónica)",
    date: "Jan 2025 – Sept 2025",
    bullets: [
      "Designed and shipped improvements to service and payment workflows used by 10M+ users, increasing task completion rates by 25%.",
      "Identified usability gaps through testing and analytics, reducing friction in high-frequency transactions.",
      "Improved transaction experience design, contributing to higher completion rates and reduced user errors in payment journeys.",
      "Partnered with product and engineering to deliver scalable, production-ready solutions.",
      "Applied AI tools to accelerate research synthesis and generate design variations.",
    ],
  },
  {
    role: "UX Design Intern",
    company: "Human Factors International",
    date: "May 2023 – July 2023",
    bullets: [
      "Identified 15+ critical usability issues, improving task success rates by 18% through targeted redesigns.",
      "Re-architected navigation and information hierarchy, reducing user confusion by 30%.",
      "Delivered structured design recommendations and flows that improved handoff clarity and implementation speed.",
    ],
  },
  {
    role: "Product Design Team Lead",
    company: "SafeYelli",
    date: "Jan 2021 – Jan 2023",
    bullets: [
      "Redesigned reporting workflows, increasing successful submissions by 35%.",
      "Improved user engagement by 40% through research-driven design and iterative enhancements.",
      "Increased report accuracy by 28% by simplifying input flows and reducing cognitive load.",
      "Conducted research with 50+ users, translating insights into continuous product improvements.",
      "Led a team of 4 designers, improving design quality and iteration speed across the platform.",
    ],
  },
] as const;

const EDUCATION = [
  {
    school: "University of Washington, Seattle",
    date: "Sep 2025 – Aug 2026",
    degree: "Masters in Human Computer Interaction and Design",
    logoSrc: "/uwlogo.jpeg",
    previewImageSrc: "/uwlogo.jpeg",
    website: "https://mhcid.washington.edu",
  },
  {
    school: "Srishti Manipal Institute of Art, Design and Technology",
    date: "Oct 2020 – Oct 2024",
    degree: "Bachelors of Design in Human Centered Design",
    logoSrc: "/srishtilogo.jpeg",
    previewImageSrc: "/srishtilogo.jpeg",
    website: "https://srishtimanipalinstitute.in",
  },
] as const;

const resumeSchoolLinkClassName =
  "font-semibold text-inherit underline-offset-2 transition-colors hover:text-gray-800 hover:underline";

const SKILL_GROUPS = [
  {
    label: "Product Design",
    items:
      "Interaction Design, Visual Design, Design Systems, End-to-End UX",
  },
  {
    label: "UX Research",
    items:
      "Mixed Methods, User Interviews, Usability Testing, A/B Testing, Heuristic Evaluation, Journey Mapping",
  },
  {
    label: "Technical",
    items:
      "HTML, JavaScript, Google Analytics, Generative AI Integration, Prompt Engineering",
  },
  {
    label: "Tools",
    items: "Figma, Adobe XD, Miro, Framer, p5.js, Typeform, Photoshop, Java, Python",
  },
  {
    label: "AI in Design",
    items: "AI-Assisted Ideation, Research Synthesis, Prototyping",
  },
] as const;

const CERTIFICATIONS = [
  "Udemy: How to Design for Accessibility (WCAG 2.2)",
  "Google: Foundations of Project Management",
  "Yale University: Introduction to Psychology",
  "Udemy: Masters Digital Product Design — UX Research and UI Design",
] as const;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">{children}</p>
  );
}

/** Parent grid + subgrid rows so every date uses the same column track (flush with the section label). */
const RESUME_WORK_LIST =
  "grid list-none grid-cols-[9rem_minmax(0,1fr)] gap-x-4 gap-y-10 p-0 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-x-8";
const RESUME_EDU_LIST =
  "grid list-none grid-cols-[9rem_minmax(0,1fr)] gap-x-4 gap-y-8 p-0 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-x-8";
const RESUME_SUBGRID_ROW =
  "col-span-full grid grid-cols-subgrid items-start gap-x-4 sm:gap-x-8";
const RESUME_DATE_CELL =
  "text-left text-sm leading-snug text-gray-400 tabular-nums sm:text-[15px]";

const KEY_INSIGHT_TOKEN =
  /(\+?\d+(?:[.,]\d+)?(?:\s?[KM])?\+?%?|improving task efficiency by 25%|increasing task completion rates by 25%|reducing user confusion by 30%|Leveraged AI-assisted|reduced user errors|Applied AI tools|improved handoff clarity and implementation speed|Improved user engagement by 40%|Led a team of 4|\b(?:reduced|identified|led|owned|designed and shipped|leveraged)\b)/gi;
const KEY_INSIGHT_MATCH =
  /^(\+?\d+(?:[.,]\d+)?(?:\s?[KM])?\+?%?|improving task efficiency by 25%|increasing task completion rates by 25%|reducing user confusion by 30%|Leveraged AI-assisted|reduced user errors|Applied AI tools|improved handoff clarity and implementation speed|Improved user engagement by 40%|Led a team of 4|\b(?:reduced|identified|led|owned|designed and shipped|leveraged)\b)$/i;

function renderInsightText(text: string) {
  const parts = text.split(KEY_INSIGHT_TOKEN);
  return parts.map((part, index) => {
    if (!part) return null;
    const shouldEmphasize = KEY_INSIGHT_MATCH.test(part);
    return shouldEmphasize ? (
      <strong key={`${part}-${index}`} className="font-semibold text-gray-900">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

export default function ResumePage() {
  return (
    <div className="min-h-dvh bg-white font-sans text-gray-900 antialiased">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 pt-24 pb-20 sm:px-6 md:px-8 md:pt-28">
        <header className="mb-16 space-y-4">
          <h1 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-gray-900">
            Kanishka Balaji Baskar
          </h1>
          <p className="text-base text-gray-600">Product Designer · Seattle, WA</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-1">
            <a className="text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-gray-900" href="mailto:kanishkabalaji2002@gmail.com">
              kanishkabalaji2002@gmail.com
            </a>
            <a className="text-gray-600 transition-colors hover:text-gray-900" href="tel:+12175205940">
              +1 (217) 520-5940
            </a>
            <a
              className="text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-gray-900"
              href="https://linkedin.com/in/kanishkabalaji"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/kanishkabalaji
            </a>
          </div>
        </header>

        <section className="mb-16">
          <SectionLabel>About</SectionLabel>
          <p className="text-[15px] leading-[1.75] text-gray-700 sm:text-base">
            Product Designer with experience designing end-to-end experiences for products at{" "}
            <strong className="font-semibold text-gray-900">10M+ scale</strong>, driving measurable improvements in task
            efficiency (<strong className="font-semibold text-gray-900">+25%</strong>), engagement (<strong className="font-semibold text-gray-900">+40%</strong>), and task success (<strong className="font-semibold text-gray-900">+18–25%</strong>). Combines strong visual and interaction
            design craft with a making mindset, using rapid prototyping and AI-augmented workflows to explore ideas,
            validate decisions, and ship impactful solutions.
          </p>
        </section>

        <section className="mb-16">
          <SectionLabel>Work Experience</SectionLabel>
          <ul className={RESUME_WORK_LIST}>
            {WORK.map((job) => (
              <li key={`${job.role}-${job.company}`} className={RESUME_SUBGRID_ROW}>
                <p className={RESUME_DATE_CELL}>{job.date}</p>
                <div className="min-w-0">
                  <h2 className="mb-2 text-[1rem] !font-semibold leading-snug tracking-[-0.015em] text-gray-900 sm:text-[1.05rem]">
                    <span>{job.role} at </span>
                    <span>{job.company}</span>
                  </h2>
                  <ul className="list-outside list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-700 marker:text-gray-300 sm:text-base">
                    {job.bullets.map((b) => (
                      <li key={b}>{renderInsightText(b)}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <SectionLabel>Education</SectionLabel>
          <ul className={RESUME_EDU_LIST}>
            {EDUCATION.map((edu) => (
              <li key={edu.school} className={RESUME_SUBGRID_ROW}>
                <p className={RESUME_DATE_CELL}>{edu.date}</p>
                <div className="min-w-0">
                  <h2 className="text-[1rem] font-semibold leading-snug tracking-[-0.015em] text-gray-900 sm:text-[1.05rem]">
                    <EducationSchoolHoverLink
                      school={edu.school}
                      logoSrc={edu.logoSrc}
                      previewImageSrc={edu.previewImageSrc}
                      website={edu.website}
                      nameClassName={resumeSchoolLinkClassName}
                    />
                  </h2>
                  <p className="mt-1 text-[15px] text-gray-700 sm:text-base">{edu.degree}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <SectionLabel>Skills</SectionLabel>
          <ul className="space-y-5 text-[15px] leading-relaxed text-gray-700 sm:text-base">
            {SKILL_GROUPS.map((g) => (
              <li key={g.label}>
                <span className="font-semibold text-gray-900">{g.label}: </span>
                {g.items}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionLabel>Certifications</SectionLabel>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gray-700 marker:text-gray-300 sm:text-base">
            {CERTIFICATIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

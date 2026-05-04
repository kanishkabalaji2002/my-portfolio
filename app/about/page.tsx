import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About — Kanishka Balaji",
  description:
    "Product designer and MHCI+D student — stories, work, and contact.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

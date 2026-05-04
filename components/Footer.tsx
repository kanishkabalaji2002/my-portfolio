"use client";

import React from "react";
import Image from "next/image";
import { pickRandomJoke } from "@/lib/jokes";
export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © 2026 Kanishka Balaji. Designed, coded, and built with care.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/kanishkabalaji"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-gray-900 text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://medium.com/@kanishkabalaji2002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-gray-900 text-sm"
          >
            Medium
          </a>
          <a
            href="mailto:kanishkabalaji2002@gmail.com"
            className="text-gray-400 transition-colors hover:text-gray-900 text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export function ContactSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[680px] px-0">
        <h2 style={{ fontFamily: "'General Sans', sans-serif", fontSize: "clamp(22px, 5vw, 42px)", fontWeight: 600, color: "#111827", letterSpacing: "-0.03em", marginBottom: "clamp(24px, 6vw, 40px)" }}>Let&apos;s talk design. Or food. Preferably both.</h2>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "clamp(20px, 5vw, 32px)" }}>
          <ChatAnimation />
        </div>
        <div style={{ marginTop: "32px" }}>
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <span style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#9ca3af" }}>Mail</span>
            <a href="mailto:kanishkabalaji2002@gmail.com" className="break-all text-right sm:text-left" style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#111827", textDecoration: "none" }}>kanishkabalaji2002@gmail.com</a>
          </div>
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <span style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#9ca3af" }}>Socials</span>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <a href="https://linkedin.com/in/kanishkabalaji" target="_blank" rel="noopener" style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#111827", fontWeight: 600, textDecoration: "underline" }}>LinkedIn</a>
              <span style={{ color: "#9ca3af" }}>·</span>
              <a href="https://medium.com/@kanishkabalaji2002" target="_blank" rel="noopener" style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#111827", fontWeight: 600, textDecoration: "underline" }}>Medium</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounceTyping { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </section>
  );
}

function Avatar() {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <Image
        src="/photo.png"
        alt="Kanishka Balaji"
        width={72}
        height={72}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
      />
    </div>
  );
}

function ChatAnimation() {
  const [step, setStep] = React.useState(0);
  const [closingLine, setClosingLine] = React.useState("");

  React.useEffect(() => {
    setClosingLine(pickRandomJoke());
  }, []);

  React.useEffect(() => {
    const timings = [800, 2000, 3800, 5600];
    const timers = timings.map((t, i) => setTimeout(() => setStep(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ minHeight: "160px" }}>
      {/* Typing indicator : always shows first, hides after step 1 */}
      {step === 0 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", animation: "fadeSlideUp 0.4s ease" }}>
          <Avatar />
          <div style={{ background: "#f3f4f6", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center" }}>
            {["0s","0.2s","0.4s"].map((d, i) => (
              <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#9ca3af", display: "inline-block", animation: `bounceTyping 1.2s infinite ${d}` }} />
            ))}
          </div>
        </div>
      )}

      {/* Message 1 */}
      {step >= 1 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px", animation: "fadeSlideUp 0.4s ease" }}>
          <Avatar />
          <div style={{ background: "#f3f4f6", borderRadius: "18px 18px 18px 4px", padding: "10px 16px" }}>
            <p style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#111827", margin: 0 }}>Want to work together? Just want to chat?</p>
          </div>
        </div>
      )}

      {/* Typing before message 2 */}
      {step === 1 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", animation: "fadeSlideUp 0.4s ease" }}>
          <Avatar />
          <div style={{ background: "#f3f4f6", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center" }}>
            {["0s","0.2s","0.4s"].map((d, i) => (
              <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#9ca3af", display: "inline-block", animation: `bounceTyping 1.2s infinite ${d}` }} />
            ))}
          </div>
        </div>
      )}

      {/* Message 2 - email */}
      {step >= 2 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px", animation: "fadeSlideUp 0.4s ease" }}>
          <Avatar />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "#f3f4f6", borderRadius: "18px 18px 18px 4px", padding: "10px 16px" }}>
              <p style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#111827", margin: 0 }}>
                Email me at:{" "}
                <a href="mailto:kanishkabalaji2002@gmail.com" style={{ color: "#111827", fontWeight: 600, textDecoration: "underline" }}>
                  kanishkabalaji2002@gmail.com
                </a>
              </p>
            </div>
            <a href="mailto:kanishkabalaji2002@gmail.com" aria-label="Send email to Kanishka" title="Send email" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      )}

      {/* Typing before message 3 */}
      {step === 2 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", animation: "fadeSlideUp 0.4s ease" }}>
          <Avatar />
          <div style={{ background: "#f3f4f6", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center" }}>
            {["0s","0.2s","0.4s"].map((d, i) => (
              <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#9ca3af", display: "inline-block", animation: `bounceTyping 1.2s infinite ${d}` }} />
            ))}
          </div>
        </div>
      )}

      {/* Message 3 - funny */}
      {step >= 3 && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", animation: "fadeSlideUp 0.4s ease" }}>
          <Avatar />
          <div style={{ background: "#f3f4f6", borderRadius: "18px 18px 18px 4px", padding: "10px 16px" }}>
            <p style={{ fontFamily: "'General Sans', sans-serif", fontSize: "14px", color: "#111827", margin: 0 }}>{closingLine || "\u00a0"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

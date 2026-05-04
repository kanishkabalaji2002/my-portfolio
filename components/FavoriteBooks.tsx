"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const books = [
  {
    id: "b1",
    spine: "Grid Systems",
    spineColor: "#c94a2a",
    spineText: "#fff",
    coverBg: "#c94a2a",
    coverText: "#fff",
    title: "Grid Systems\nin Graphic Design",
    sub: "Rastersysteme",
    author: "Josef Müller-Brockmann",
  },
  {
    id: "b2",
    spine: "Kinfolk Entrepreneur",
    spineColor: "#e8e4dc",
    spineText: "#333",
    coverBg: "#f0ece4",
    coverText: "#1a1a1a",
    title: "THE\nKINFOLK\nENTREPRENEUR",
    sub: "Ideas for Meaningful Work",
    author: "Nathan Williams",
  },
  {
    id: "b3",
    spine: "Genius Behind Apple",
    spineColor: "#2a2a2a",
    spineText: "#fff",
    coverBg: "#1c1c1c",
    coverText: "#fff",
    title: "Genius\nBehind Apple",
    sub: "",
    author: "Jony Ive",
  },
  {
    id: "b4",
    spine: "App Icon Book",
    spineColor: "#b0b0a8",
    spineText: "#333",
    coverBg: "#a8a8a0",
    coverText: "#1a1a1a",
    title: "App Icon Book",
    sub: "Vol. 1",
    author: "",
  },
  {
    id: "b5",
    spine: "Principles of UX",
    spineColor: "#1a1a1a",
    spineText: "#fff",
    coverBg: "#111",
    coverText: "#fff",
    title: "Principles\nof UX",
    sub: "",
    author: "Don Norman",
  },
  {
    id: "b6",
    spine: "How To",
    spineColor: "#d4d0c8",
    spineText: "#333",
    coverBg: "#ccc8c0",
    coverText: "#1a1a1a",
    title: "How To",
    sub: "",
    author: "Michael Bierut",
  },
]

export function FavoriteBooks() {
  const [active, setActive] = useState<string | null>(null)
  const [visible, setVisible] = useState<string[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          books.forEach((b, i) => {
            setTimeout(() => {
              setVisible(prev => [...prev, b.id])
            }, i * 120)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function toggle(id: string) {
    setActive(prev => (prev === id ? null : id))
  }

  return (
    <section
      ref={sectionRef}
      style={{ background: "#0a0a0a", padding: "4rem 0 5rem", overflow: "hidden" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginBottom: "3.5rem" }}>
        <div style={{ width: 60, height: 1, background: "#555" }} />
        <span style={{ fontFamily: "Georgia, serif", fontSize: 14, letterSpacing: "0.22em", color: "#fff" }}>
          FAVORITE BOOKS
        </span>
        <div style={{ width: 60, height: 1, background: "#555" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6, padding: "0 2rem", minHeight: 360 }}>
          {books.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 40 }}
              animate={visible.includes(book.id) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => toggle(book.id)}
              style={{ position: "relative", flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "flex-end" }}
            >
              <div style={{
                width: 56,
                height: 300,
                background: book.spineColor,
                borderRadius: active === book.id ? "3px 0 0 3px" : "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset -4px 0 8px rgba(0,0,0,0.4), 2px 4px 16px rgba(0,0,0,0.5)",
                flexShrink: 0,
              }}>
                <span style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontFamily: "Georgia, serif",
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: book.spineText,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                  padding: "0 6px",
                }}>
                  {book.spine}
                </span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: active === book.id ? 240 : 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  height: 300,
                  overflow: "hidden",
                  borderRadius: "0 4px 4px 0",
                  boxShadow: active === book.id ? "4px 4px 24px rgba(0,0,0,0.6)" : "none",
                  background: book.coverBg,
                  flexShrink: 0,
                }}
              >
                <div style={{
                  width: 240,
                  height: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  position: "relative",
                }}>
                  <p style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 18,
                    color: book.coverText,
                    textAlign: "center",
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                    marginBottom: 8,
                  }}>
                    {book.title}
                  </p>
                  {book.sub && (
                    <p style={{ fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.12em", color: book.coverText, opacity: 0.6, textTransform: "uppercase" }}>
                      {book.sub}
                    </p>
                  )}
                  {book.author && (
                    <p style={{ position: "absolute", bottom: "1rem", fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.15em", color: book.coverText, opacity: 0.5, textTransform: "uppercase" }}>
                      {book.author}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div style={{
          width: "100%",
          maxWidth: 800,
          height: 8,
          background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
          borderRadius: 2,
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        }} />
      </div>
    </section>
  )
}

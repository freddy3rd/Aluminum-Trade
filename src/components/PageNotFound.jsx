import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {Link, NavLink} from "react-router-dom"
// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineVariant = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

// ── Decorative large "404" SVG text ───────────────────────────────────────────
function GhostNumber() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <motion.span
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="leading-none tracking-tighter"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          fontSize: "clamp(18rem, 38vw, 40rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(168,152,128,0.13)",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        404
      </motion.span>
    </div>
  );
}

// ── Floating corner brackets ──────────────────────────────────────────────────
function CornerBracket({ position }) {
  const styles = {
    "top-left":     { top: "2rem",  left: "2rem",  transform: "none" },
    "top-right":    { top: "2rem",  right: "2rem", transform: "rotate(90deg)" },
    "bottom-left":  { bottom: "2rem", left: "2rem",  transform: "rotate(-90deg)" },
    "bottom-right": { bottom: "2rem", right: "2rem", transform: "rotate(180deg)" },
  };

  return (
    <motion.svg
      width="28" height="28" viewBox="0 0 32 32" fill="none"
      className="absolute"
      style={{ ...styles[position], opacity: 0.35 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <path d="M0 12 L0 0 L12 0" stroke="#a89880" strokeWidth="1.2" strokeLinecap="round" />
    </motion.svg>
  );
}

// ── Animated dot grid ─────────────────────────────────────────────────────────
function DotGrid() {
  const dots = Array.from({ length: 35 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute right-0 top-0 w-64 h-64 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #a89880 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse at top right, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 30%, transparent 75%)",
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-64 h-64 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #a89880 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse at bottom left, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at bottom left, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

// ── Suggested links ───────────────────────────────────────────────────────────
const suggestions = [
  { id: "01", label: "Collection",  sub: "Browse all aluminium pieces",  href: "/collections" },
  { id: "02", label: "Studio",      sub: "Visit our atelier",            href: "/studio"     },
  { id: "03", label: "Contact",     sub: "Get in touch with our team",   href: "/contact"    },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function PageNotFound() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Prevent body scroll bleed from other pages
  useEffect(() => {
    document.title = "404 — Page Not Found · AlumCraft";
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-[#F5EFE6] overflow-hidden flex flex-col"
    >
      {/* Background ghost number */}
      <GhostNumber />

      {/* Dot grids */}
      <DotGrid />

      {/* Corner brackets */}
      {["top-left","top-right","bottom-left","bottom-right"].map(p => (
        <CornerBracket key={p} position={p} />
      ))}

      {/* Top edge rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-16 py-32 max-w-7xl mx-auto w-full">

        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-[#a89880]/50" />
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#9c8870]"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Error 404
          </span>
          <div className="h-px w-8 bg-[#a89880]/50" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center leading-none mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            color: "#1a1714",
          }}
        >
          This Page
          <br />
          <em style={{ color: "#7a6a58" }}>Wasn't Fabricated</em>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center text-[#6b5e52] text-sm leading-relaxed max-w-sm mb-12"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          The page you're looking for has been moved, removed, or never existed.
          Like a poorly measured frame — something doesn't fit here.
        </motion.p>

        {/* Animated rule */}
        <motion.div
          variants={lineVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full max-w-xs h-px mb-14 origin-left"
          style={{ background: "linear-gradient(to right, transparent, #a89880aa, transparent)" }}
        />

        {/* ── Primary CTA ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <a
            href="/"
            className="group relative flex items-center gap-4 text-[10px] tracking-[0.28em] uppercase text-[#1a1714] border border-[#a89880]/60 px-10 py-4 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg
              className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="relative z-10">Return to Homepage</span>
            <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </a>
        </motion.div>

        {/* ── Suggestions grid ── */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full max-w-2xl"
        >
          <p
            className="text-center text-[9px] tracking-[0.3em] uppercase text-[#b8a898] mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Or explore
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#c8bfb4]/30">
            {suggestions.map((s, i) => (
              <Link
                key={s.id}
                to={s.href}
                custom={i + 5}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group bg-[#F5EFE6] px-7 py-6 flex flex-col gap-2 hover:bg-[#ede6db] transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-[9px] tracking-[0.25em] text-[#b8a898]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {s.id}
                  </span>
                  <motion.svg
                    width="11" height="11" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                    className="text-[#b8a898] group-hover:text-[#5c4f43]"
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </motion.svg>
                </div>

                <h3
                  className="text-[#1a1714] text-xl leading-tight group-hover:text-[#5c4f43] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                >
                  {s.label}
                </h3>
                <p
                  className="text-[#9c8870] text-[11px] leading-snug"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  {s.sub}
                </p>

                {/* Bottom accent line — grows on hover */}
                <div className="mt-auto pt-4 border-t border-[#c8bfb4]/50">
                  <motion.div
                    className="h-px bg-[#5c4f43] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Footer strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative border-t border-[#c8bfb4]/40 px-8 md:px-16 py-6 flex items-center justify-between"
      >
        <span
          className="text-[9px] tracking-[0.25em] uppercase text-[#b8a898]"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          © 2025 AlumCraft
        </span>
        <span
          className="text-[9px] tracking-[0.2em] uppercase text-[#c8bfb4]"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          Quezon City, Metro Manila
        </span>
      </motion.div>

      {/* Bottom edge rule */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />
    </div>
  );
}
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Free Consultation",
    line: "Tell us your vision. We listen, advise, and plan at no cost.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 34c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M28 10c1.5.8 3 2.5 3 4s-.5 2.5-2 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M28 26c3 1 6 3.5 6 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "On-Site Measurement",
    line: "Our technician visits and measures every opening to the millimeter.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="6" y="18" width="28" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 18V14M14 18V16M18 18V14M22 18V16M26 18V14M30 18V16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M6 22H4M36 22H34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M20 10v4M17 11.5l3-1.5 3 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 30v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="1.5 2" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Fabrication",
    line: "Custom profiles cut, powder-coated, and glass-fitted in our workshop.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <rect x="8" y="8" width="11" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="21" y="8" width="11" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 28h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 32h16" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="19.5" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
        <path d="M14 12h3M14 15h3M24 12h3M24 15h3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Professional Installation",
    line: "Certified installers fit your system clean, level, and sealed.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
        <path d="M10 34V16l10-8 10 8v18" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="16" y="24" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M20 27v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 34h28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M26 10l4 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="29" cy="13" r="2.5" stroke="currentColor" strokeWidth="1" />
        <path d="M28 13l1 1 2-2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.13, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const lineVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 } },
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-[#fafafa] overflow-hidden py-28 px-6 md:px-16"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span
              className="alum-badge text-white/35 mb-5 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Process
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                lineHeight: 0.95,
                color: "#fafafa",
              }}
            >
              How It{" "}
              <em style={{ color: "rgba(255,255,255,0.4)" }}>Works</em>
            </h2>
          </div>

          <p
            className="text-white/35 text-sm leading-relaxed max-w-xs md:text-right"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            From the first conversation to the final fit — a seamless
            four-step process designed around you.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Connecting line — desktop */}
          <div className="hidden md:block absolute top-[40%] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px overflow-hidden">
            {/* Base track */}
            <div className="absolute inset-0 bg-white/[0.08]" />
            {/* Animated fill */}
            <motion.div
              className="absolute inset-y-0 left-0 right-0"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.15), rgba(255,255,255,0.4))",
              }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 divide-y md:divide-y-0 divide-white/[0.06]">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                custom={i}
                variants={fadeUpVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative flex md:flex-col items-start md:items-center gap-6 md:gap-0 px-0 md:px-6 py-10 md:py-0 md:text-center cursor-default"
              >
                {/* Mobile connector line */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute left-[27px] top-[88px] bottom-0 w-px bg-white/[0.08]" />
                )}

                {/* Icon bubble */}
                <div className="relative flex-shrink-0">
                  {/* Outer ring — pulses on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/10"
                    whileHover={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ margin: "-10px" }}
                  />

                  <motion.div
                    className="relative w-14 h-14 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/[0.08] transition-all duration-400"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {step.icon}

                    {/* Step number — top-right of bubble */}
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0a] border border-white/15 flex items-center justify-center text-[8px] tracking-wider text-white/40"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>
                </div>

                {/* Text — desktop below icon, mobile beside */}
                <div className="md:mt-7 flex flex-col gap-2 md:items-center">
                  <h3
                    className="text-white/90 group-hover:text-white transition-colors duration-300 leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.15rem",
                      fontWeight: 400,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-white/35 group-hover:text-white/55 text-xs leading-relaxed transition-colors duration-300 md:max-w-[160px]"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {step.line}
                  </p>
                </div>

                {/* Desktop: vertical accent line on hover */}
                <motion.div
                  className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/20 origin-top"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: 28 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-10 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6   "
        >
          <p
            className="text-white/30 text-xs tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Typical project timeline — 3 to 5 weeks from consultation to installation.
          </p>

          <button
            className="group relative px-10 py-4 border border-white/20 text-[11px] tracking-widest uppercase overflow-hidden hover:text-black transition-colors duration-500 flex-shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif"}}
          >
            <span className="relative z-10 flex items-center gap-4">
              Book Free Consultation
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-2"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
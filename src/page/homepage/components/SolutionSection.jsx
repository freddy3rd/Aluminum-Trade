import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  {
    id: "01",
    headline: "Heavy-Duty Aluminum Frames",
    description:
      "Aircraft-grade alloy profiles that resist bending, warping, and impact — built to outlast any climate.",
  },
  {
    id: "02",
    headline: "Smooth Sliding System",
    description:
      "Precision-engineered rollers and tracks deliver zero-resistance glide with near-silent operation.",
  },
  {
    id: "03",
    headline: "Weather-Sealed Technology",
    description:
      "Multi-point compression seals lock out wind, rain, and dust — maintaining interior comfort year-round.",
  },
  {
    id: "04",
    headline: "Custom-Built to Fit Any Space",
    description:
      "Every opening is different. Our systems are fabricated to exact measurements, never compromise.",
  },
  {
    id: "05",
    headline: "Long-Lasting Powder-Coated Finish",
    description:
      "Electrostatically bonded coating resists fading, chipping, and corrosion for decades of pristine finish.",
  },
];

// Reusing the same animation vocabulary from the scroll canvas section
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

// Checkmark SVG — minimal, 1.2px stroke
const CheckIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 flex-shrink-0 mt-0.5"
  >
    <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <path
      d="M6 10.5L8.5 13L14 7.5"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function WhyAluminum() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-[#fafafa] overflow-hidden"
    >
      {/* Top separator — mirrors hero bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 min-h-[680px]">

        {/* ── LEFT: Image panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden min-h-[420px] md:min-h-0"
        >
          {/* Placeholder image — replace src with your actual asset */}
          <img
            src="./src/assets/aluminum-door.jpg"
            alt="Modern aluminum sliding door installation"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
            onError={(e) => {
              // Fallback gradient if image is missing
              e.target.style.display = "none";
            }}
          />

          {/* Fallback gradient bg if no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a]" />

          {/* Decorative grid lines */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

          {/* Floating badge — same style as hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-8 left-8 border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-3"
          >
            <span
              className="alum-badge text-white/50"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Architectural Series — 2025
            </span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Benefits panel ── */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 md:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.span
              variants={fadeUpVariants}
              className="alum-badge text-white/40 mb-6 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The Aluminum Advantage
            </motion.span>

            {/* Headline — word-by-word reveal matching scroll canvas phrases */}
            <h2
              className="alum-headline text-5xl md:text-6xl leading-[0.95] mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
              }}
            >
              {["Why", "Choose"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={wordVariants}
                className="inline-block italic text-white/50"
              >
                Aluminum?
              </motion.span>
            </h2>

            {/* Divider — draws in from left */}
            <motion.div
              variants={lineVariants}
              className="h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent mb-10 mt-8"
            />

            {/* Benefits list */}
            <div className="flex flex-col gap-0 divide-y divide-white/[0.07]">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.id}
                  variants={fadeUpVariants}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="group flex items-start gap-4 py-5 cursor-default"
                >
                  {/* Check */}
                  <div className="mt-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckIcon />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span
                        className="text-[9px] tracking-[0.25em] text-white/25 group-hover:text-white/40 transition-colors duration-300"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {benefit.id}
                      </span>
                      <h3
                        className="text-white/90 group-hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 400 }}
                      >
                        {benefit.headline}
                      </h3>
                    </div>
                    <p
                      className="text-white/35 group-hover:text-white/55 text-sm leading-relaxed transition-colors duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    >
                      {benefit.description}
                    </p>
                  </div>

                  {/* Arrow — slides in on hover */}
                  <svg
                    className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 flex-shrink-0 mt-1 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* CTA — same pattern as hero button */}
            <motion.div variants={fadeUpVariants} className="mt-10">
              <button className="group relative px-10 py-4 border border-white/20 text-[11px] tracking-widest uppercase overflow-hidden hover:text-black transition-colors duration-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  Request a Quote
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    id: "01",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Wood grain / rot icon */}
        <rect x="8" y="10" width="32" height="28" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 18 Q16 15 24 18 Q32 21 40 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 26 Q16 23 24 26 Q32 29 40 26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 10 L14 38" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" strokeLinecap="round" />
        <path d="M34 10 L34 38" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" strokeLinecap="round" />
        {/* Decay dots */}
        <circle cx="20" cy="22" r="2.5" fill="currentColor" opacity="0.25" />
        <circle cx="28" cy="30" r="1.8" fill="currentColor" opacity="0.2" />
        <circle cx="17" cy="32" r="1.5" fill="currentColor" opacity="0.18" />
      </svg>
    ),
    headline: "Wooden Doors That Rot",
    description:
      "Moisture and time turn timber frames brittle, warped, and structurally unsound — requiring costly replacement every few years.",
  },
  {
    id: "02",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Steel frame with rust/corrosion */}
        <rect x="10" y="8" width="6" height="32" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="32" y="8" width="6" height="32" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="10" y="8" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        {/* Rust patches */}
        <path d="M12 20 Q15 18 13 23 Q16 21 14 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M34 15 Q37 13 35 18 Q38 16 36 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="13" cy="28" r="1.2" fill="currentColor" opacity="0.3" />
        <circle cx="35" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="34" cy="32" r="1" fill="currentColor" opacity="0.25" />
      </svg>
    ),
    headline: "Rusting Steel Frames",
    description:
      "Steel corrodes when exposed to humidity and rain, staining walls and compromising the structural integrity of your openings.",
  },
  {
    id: "03",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Sliding door derailed */}
        <rect x="6" y="12" width="18" height="26" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <rect x="26" y="12" width="16" height="26" rx="1" stroke="currentColor" strokeWidth="1.2" />
        {/* Track */}
        <path d="M4 38 L44 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 12 L44 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Derailed wheel */}
        <circle cx="15" cy="41" r="3" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="33" cy="41" r="3" stroke="currentColor" strokeWidth="1.2" />
        {/* Off-track indicator */}
        <path d="M15 38 L15 44" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <path d="M38 42 L42 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M42 42 L38 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    headline: "Sliding Doors That Derail",
    description:
      "Warped tracks and worn rollers cause sliding panels to jump their guides, leaving doors stuck, gaping, or impossible to lock.",
  },
  {
    id: "04",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Window with rain/leak */}
        <rect x="8" y="10" width="32" height="26" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 22 L40 22" stroke="currentColor" strokeWidth="1" />
        <path d="M24 10 L24 36" stroke="currentColor" strokeWidth="1" />
        {/* Rain drops outside */}
        <path d="M12 4 L10 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M20 2 L18 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <path d="M30 3 L28 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M38 5 L36 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        {/* Indoor leak / water trail */}
        <path d="M8 26 Q6 30 8 36 Q8 40 10 42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="10" cy="44" r="2" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    headline: "Windows That Leak in Rain",
    description:
      "Failed seals and poor profiles let water seep inside during heavy storms, causing mold, wall damage, and soaring repair bills.",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ProblemsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
        className="panel ccommon-problem relative bg-[#F5EFE6] overflow-hidden py-28 px-6 md:px-16"
        data-bg="rgba(208, 184, 168, 0.6)"
        data-text="#1A1A1A"
    >


      {/* Top edge rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="alum-badge text-[#9c8870] mb-5 block">
            Why Homeowners Switch
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="alum-headline text-[#1a1714] text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Common Problems
              <br />
              <em className="text-[#7a6a58]">Homeowners Face</em>
            </h2>

            <p
              className="alum-sub text-[#6b5e52] text-base leading-relaxed max-w-sm md:text-right"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Traditional materials fail under the pressures of time,
              weather, and daily use. Aluminum is engineered to outlast them all.
            </p>
          </div>

          {/* Decorative rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px bg-gradient-to-r from-[#a89880]/60 via-[#a89880]/20 to-transparent origin-left"
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#c8bfb4]/30">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.id}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUpVariants}
              className="group relative bg-[#F5EFE6] p-8 md:p-10 flex flex-col gap-7 hover:bg-[#ede6db] transition-colors duration-500 cursor-default"
            >
              {/* Number */}
              <span
                className="absolute top-8 right-8 text-[10px] tracking-[0.25em] text-[#b8a898]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {problem.id}
              </span>

              {/* Icon */}
              <div className="text-[#5c4f43] group-hover:text-[#2a1f17] transition-colors duration-500 w-10 h-10">
                {problem.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3">
                <h3
                  className="text-[#1a1714] text-xl leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: "1.25rem" }}
                >
                  {problem.headline}
                </h3>
                <p
                  className="text-[#7a6a58] text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  {problem.description}
                </p>
              </div>

              {/* Bottom accent — grows on hover */}
              <div className="mt-auto pt-6 border-t border-[#c8bfb4]/50">
                <motion.div
                  className="h-px bg-[#5c4f43] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#c8bfb4]/50 pt-12"
        >
          <p
            className="alum-sub text-[#6b5e52] text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Aluminium eliminates every one of these failure points — permanently.
          </p>
          <button
            className="group relative flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#1a1714] border border-[#a89880]/60 px-8 py-3 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="relative z-10">See Our Solutions</span>
            <svg
              className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsSection;
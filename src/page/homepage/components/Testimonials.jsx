import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: "01",
    name: "Maria Santos",
    location: "Quezon City",
    rating: 5,
    review:
      "The installation was flawless — clean, precise, and done in a single day. Our sliding door now glides like it's on air. Couldn't ask for better quality at this price point.",
    project: "3-Panel Sliding Door",
    initials: "MS",
  },
  {
    id: "02",
    name: "Jerome dela Cruz",
    location: "Mandaluyong",
    rating: 5,
    review:
      "Very professional team. They measured everything perfectly and the aluminum frames look incredibly modern. The tempered glass panels make our living room feel twice as large.",
    project: "Floor-to-Ceiling Window",
    initials: "JD",
  },
  {
    id: "03",
    name: "Carla Reyes",
    location: "Las Piñas",
    rating: 5,
    review:
      "Affordable without cutting corners. We had three sliding doors replaced and the difference is night and day. The heavy-duty rollers are so smooth — my kids love it.",
    project: "2-Panel Sliding Door",
    initials: "CR",
  },
  {
    id: "04",
    name: "Rodel Bautista",
    location: "Parañaque",
    rating: 5,
    review:
      "From free consultation to installation, the whole process was smooth. They finished ahead of schedule and cleaned up everything. Highly recommend for any aluminum work.",
    project: "Custom Casement Windows",
    initials: "RB",
  },
  {
    id: "05",
    name: "Anna Villanueva",
    location: "Makati",
    rating: 5,
    review:
      "We were worried about the budget but they gave us the best value. The powder-coat finish is still perfect two years later — no rust, no fading. Absolutely worth it.",
    project: "Aluminum Door System",
    initials: "AV",
  },
];

const AUTOSLIDE_INTERVAL = 4000;

const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.128L8 10.5l-3.708 2.08L5 8.452 2 5.528l4.146-.772z" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 opacity-20">
    <path
      d="M4 20c0-5.523 3.582-10.064 8-12l1.5 2.5C10.5 12 9 14.5 9 17v1h5v8H4v-6zm15 0c0-5.523 3.582-10.064 8-12l1.5 2.5C25.5 12 24 14.5 24 17v1h5v8H19v-6z"
      fill="currentColor"
    />
  </svg>
);

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const wordVariants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const lineVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
};

// Slide direction variants
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48, filter: "blur(4px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48, filter: "blur(4px)", transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }),
};

export default function Testimonials() {
  const sectionRef   = useRef(null);
  const isInView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive]   = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef     = useRef(null);

  const goTo = (index, dir) => {
    setDirection(dir);
    setActive(index);
  };

  const next = () => {
    const n = (active + 1) % testimonials.length;
    goTo(n, 1);
  };

  const prev = () => {
    const n = (active - 1 + testimonials.length) % testimonials.length;
    goTo(n, -1);
  };

  // // Auto-slide
  // useEffect(() => {
  //   timerRef.current = setInterval(next, AUTOSLIDE_INTERVAL);
  //   return () => clearInterval(timerRef.current);
  // }, [active]);

  // // Pause on hover
  // const pause  = () => clearInterval(timerRef.current);
  // const resume = () => { timerRef.current = setInterval(next, AUTOSLIDE_INTERVAL); };

  // Visible cards: prev, active, next
  const getCard = (offset) =>
    testimonials[(active + offset + testimonials.length) % testimonials.length];

  const prev1 = getCard(-1);
  const curr  = testimonials[active];
  const next1 = getCard(1);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5EFE6] overflow-hidden py-28 px-6 md:px-16"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      {/* Subtle radial warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(168,152,128,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.span
              variants={fadeUpVariants}
              custom={0}
              className="alum-badge text-[#9c8870] mb-5 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Client Stories
            </motion.span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                lineHeight: 0.95,
                color: "#1a1714",
              }}
            >
              {["What", "Homeowners"].map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-4">
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span variants={wordVariants} className="inline-block italic" style={{ color: "#7a6a58" }}>
                Are Saying
              </motion.span>
            </h2>
            <motion.div
              variants={lineVariants}
              className="mt-7 h-px max-w-xs"
              style={{ background: "linear-gradient(to right, #a89880aa, #a8988033, transparent)" }}
            />
          </div>

          {/* Star summary */}
          <motion.div
            variants={fadeUpVariants}
            custom={2}
            className="flex flex-col items-start md:items-end gap-2"
          >
            <div className="flex gap-1 text-[#9c8870]">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </div>
            <p
              className="text-[#1a1714] text-3xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              5.0
            </p>
            <p
              className="text-[#9c8870] text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: "0.08em" }}
            >
              Based on 120+ verified reviews
            </p>
          </motion.div>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          variants={fadeUpVariants}
          custom={3}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // onMouseEnter={pause}
          // onMouseLeave={resume}
        >
          {/* Three-card view — desktop */}
          <div className="hidden md:grid grid-cols-3 gap-5 items-stretch min-h-[320px]">
            {/* Prev ghost card */}
            <div
              className="relative rounded-none border border-[#c8bfb4]/50 bg-[#ede7de]/60 p-8 flex flex-col gap-5 cursor-pointer opacity-50 hover:opacity-70 transition-opacity duration-300 select-none"
              onClick={prev}
            >
              <div className="flex items-start justify-between">
                <QuoteIcon />
                <div className="flex gap-0.5 text-[#9c8870]">
                  {Array.from({ length: prev1.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
              </div>
              <p
                className="text-[#6b5e52] text-sm leading-relaxed flex-1 line-clamp-4"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {prev1.review}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#c8bfb4]/40">
                <div
                  className="w-9 h-9 rounded-full bg-[#c8bfb4]/50 flex items-center justify-center text-[10px] tracking-wider text-[#7a6a58]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {prev1.initials}
                </div>
                <div>
                  <p className="text-[#1a1714] text-sm" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>{prev1.name}</p>
                  <p className="text-[#9c8870] text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>{prev1.location}</p>
                </div>
              </div>
            </div>

            {/* Active card */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="border border-[#a89880]/50 bg-[#1a1714] text-[#fafafa] p-8 flex flex-col gap-5 h-full"
                >
                  <div className="flex items-start justify-between">
                    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 opacity-20">
                      <path d="M4 20c0-5.523 3.582-10.064 8-12l1.5 2.5C10.5 12 9 14.5 9 17v1h5v8H4v-6zm15 0c0-5.523 3.582-10.064 8-12l1.5 2.5C25.5 12 24 14.5 24 17v1h5v8H19v-6z" fill="white" />
                    </svg>
                    <div className="flex gap-0.5 text-[#a89880]">
                      {Array.from({ length: curr.rating }).map((_, i) => <StarIcon key={i} />)}
                    </div>
                  </div>

                  <p
                    className="text-white/75 text-base leading-relaxed flex-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {curr.review}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                    <div
                      className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] flex items-center justify-center text-[10px] tracking-wider text-white/50"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {curr.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 text-sm whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>{curr.name}</p>
                      <p className="text-white/35 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>{curr.location}</p>
                    </div>
                    <span
                      className="alum-badge text-white/20 text-right"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {curr.project}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next ghost card */}
            <div
              className="relative border border-[#c8bfb4]/50 bg-[#ede7de]/60 p-8 flex flex-col gap-5 cursor-pointer opacity-50 hover:opacity-70 transition-opacity duration-300 select-none"
              onClick={next}
            >
              <div className="flex items-start justify-between">
                <QuoteIcon />
                <div className="flex gap-0.5 text-[#9c8870]">
                  {Array.from({ length: next1.rating }).map((_, i) => <StarIcon key={i} />)}
                </div>
              </div>
              <p
                className="text-[#6b5e52] text-sm leading-relaxed flex-1 line-clamp-4"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {next1.review}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#c8bfb4]/40">
                <div
                  className="w-9 h-9 rounded-full bg-[#c8bfb4]/50 flex items-center justify-center text-[10px] tracking-wider text-[#7a6a58]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {next1.initials}
                </div>
                <div>
                  <p className="text-[#1a1714] text-sm" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>{next1.name}</p>
                  <p className="text-[#9c8870] text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>{next1.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: single active card */}
          <div className="md:hidden relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="border border-[#a89880]/50 bg-[#1a1714] text-[#fafafa] p-8 flex flex-col gap-5"
              >
                <div className="flex items-start justify-between">
                  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 opacity-20">
                    <path d="M4 20c0-5.523 3.582-10.064 8-12l1.5 2.5C10.5 12 9 14.5 9 17v1h5v8H4v-6zm15 0c0-5.523 3.582-10.064 8-12l1.5 2.5C25.5 12 24 14.5 24 17v1h5v8H19v-6z" fill="white" />
                  </svg>
                  <div className="flex gap-0.5 text-[#a89880]">
                    {Array.from({ length: curr.rating }).map((_, i) => <StarIcon key={i} />)}
                  </div>
                </div>
                <p className="text-white/75 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                  {curr.review}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                  <div className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] flex items-center justify-center text-[10px] text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {curr.initials}
                  </div>
                  <div>
                    <p className="text-white/90 text-sm" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>{curr.name}</p>
                    <p className="text-white/35 text-[10px]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>{curr.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls ── */}
          <div className="mt-10 flex items-center justify-between">

            {/* Pip indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  className="progress-pip h-1 rounded-full transition-all duration-300 bg-[#c8bfb4]"
                  style={{ width: i === active ? 28 : 8, opacity: i === active ? 1 : 0.4 }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="group w-10 h-10 border border-[#c8bfb4]/60 flex items-center justify-center hover:border-[#5c4f43] hover:bg-[#1a1714] transition-all duration-300"
                aria-label="Previous"
              >
                <svg className="w-4 h-4 text-[#5c4f43] group-hover:text-white transition-colors duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H5M5 12l7-7M5 12l7 7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="group w-10 h-10 border border-[#c8bfb4]/60 flex items-center justify-center hover:border-[#5c4f43] hover:bg-[#1a1714] transition-all duration-300"
                aria-label="Next"
              >
                <svg className="w-4 h-4 text-[#5c4f43] group-hover:text-white transition-colors duration-300"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M14 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom footnote ── */}
        <motion.div
          variants={fadeUpVariants}
          custom={5}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 pt-8 border-t border-[#c8bfb4]/40 flex items-center justify-between"
        >
          <p
            className="text-[#9c8870] text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: "0.08em" }}
          >
            All reviews from verified clients across Metro Manila.
          </p>
          
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />
    </section>
  );
}
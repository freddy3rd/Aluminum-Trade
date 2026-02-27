import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Frame config — same pattern as your scroll canvas ──────────────────────
const TOTAL_FRAMES = 450;
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `./src/assets/video/frames/ezgif-frame-${num}.jpg`;
});

// Each benefit maps to a frame range where it becomes visible
const benefits = [
  {
    id: "01",
    headline: "Heavy-Duty Aluminum Frames",
    description:
      "Aircraft-grade alloy profiles that resist bending, warping, and impact — built to outlast any climate.",
    frameStart: 20,
    frameEnd: 110,
  },
  {
    id: "02",
    headline: "Smooth Sliding System",
    description:
      "Precision-engineered rollers and tracks deliver zero-resistance glide with near-silent operation.",
    frameStart: 100,
    frameEnd: 200,
  },
  {
    id: "03",
    headline: "Weather-Sealed Technology",
    description:
      "Multi-point compression seals lock out wind, rain, and dust — maintaining interior comfort year-round.",
    frameStart: 190,
    frameEnd: 290,
  },
  {
    id: "04",
    headline: "Custom-Built to Fit Any Space",
    description:
      "Every opening is different. Our systems are fabricated to exact measurements, never compromise.",
    frameStart: 280,
    frameEnd: 370,
  },
  {
    id: "05",
    headline: "Long-Lasting Powder-Coated Finish",
    description:
      "Electrostatically bonded coating resists fading, chipping, and corrosion for decades of pristine finish.",
    frameStart: 360,
    frameEnd: 449,
  },
];

// ── Animation variants — same vocabulary as your scroll canvas ───────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const wordVariants = {
  hidden:  { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -16, filter: "blur(4px)", transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
};

const lineVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.25 } },
};

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5">
    <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <path d="M6 10.5L8.5 13L14 7.5" stroke="white" strokeWidth="1.3"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WhyAluminum() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const imagesRef    = useRef([]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady]               = useState(false);
  const [frameIndex, setFrameIndex]     = useState(0);

  const scrollPct = Math.round((frameIndex / (TOTAL_FRAMES - 1)) * 100);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    const drawFrame = (index) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;
      if (canvas.width !== img.naturalWidth) {
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    const setupScrollTrigger = () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars._id === "whyAluminum")
        .forEach((t) => t.kill());

      ScrollTrigger.create({
        vars: { _id: "whyAluminum" },
        trigger: container,
        start: "top top",
        end: "+=4000",
        scrub: 0.05,
        pin: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
          requestAnimationFrame(() => drawFrame(idx));
          setFrameIndex(idx);
        },
      });
    };

    let loadedCount = 0;
    imagesRef.current = [];

    FRAME_PATHS.forEach((src, i) => {
      const img = new Image();
      img.src   = src;
      const onDone = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (i === 0) drawFrame(0);
        if (loadedCount === TOTAL_FRAMES) {
          setReady(true);
          setTimeout(setupScrollTrigger, 100);
        }
      };
      img.onload  = onDone;
      img.onerror = onDone;
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars._id === "whyAluminum")
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0a] text-[#fafafa] overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      {/* ── Loading overlay ── */}
      {!ready && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#0a0a0a]">
          <span className="alum-badge text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Loading — {loadProgress}%
          </span>
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Two-column layout ── */}
      <div className="absolute inset-0 grid md:grid-cols-2">

        {/* LEFT — canvas scrubber */}
        <div className="relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease-in-out" }}
          />

          {/* Fallback bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a]" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Depth gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-transparent pointer-events-none" />

          {/* Progress badge */}
          <div className="absolute bottom-8 left-8 z-10 border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-3 flex items-center gap-4">
            <span className="alum-badge text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Architectural Series — 2025
            </span>
            <div className="w-16 h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-white/50 transition-all duration-75"
                style={{ width: `${scrollPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — frame-gated benefits */}
        <div className="relative flex flex-col justify-center px-10 md:px-14 py-16 overflow-hidden">

          {/* Static header */}
          <AnimatePresence>
            {ready && (
              <motion.div
                key="header"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <motion.span
                  variants={fadeUpVariants}
                  className="alum-badge text-white/35 mb-5 block"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  The Aluminum Advantage
                </motion.span>

                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
                    lineHeight: 0.95,
                  }}
                >
                  {["Why", "Choose"].map((word, i) => (
                    <motion.span key={i} variants={wordVariants} className="inline-block mr-4">
                      {word}
                    </motion.span>
                  ))}
                  <br />
                  <motion.span variants={wordVariants} className="inline-block italic text-white/45">
                    Aluminum?
                  </motion.span>
                </h2>

                <motion.div
                  variants={lineVariants}
                  className="h-px bg-gradient-to-r from-white/35 via-white/10 to-transparent mt-6 mb-1"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Benefits list */}
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {benefits.map((benefit) => {
              const active  = frameIndex >= benefit.frameStart && frameIndex <= benefit.frameEnd;
              const pending = frameIndex < benefit.frameStart;

              return (
                <div key={benefit.id} className="relative" style={{ minHeight: 68 }}>
                  <AnimatePresence mode="wait">

                    {/* Active benefit */}
                    {active && (
                      <motion.div
                        key="active"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="group flex items-start gap-4 py-4 cursor-default"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <motion.div variants={fadeUpVariants} className="mt-[3px] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          <CheckIcon />
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-0.5">
                            <motion.span
                              variants={fadeUpVariants}
                              className="text-[9px] tracking-[0.25em] text-white/25"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              {benefit.id}
                            </motion.span>
                            <motion.h3
                              variants={wordVariants}
                              className="text-white/90 group-hover:text-white transition-colors duration-300"
                              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", fontWeight: 400 }}
                            >
                              {benefit.headline}
                            </motion.h3>
                          </div>
                          <motion.p
                            variants={fadeUpVariants}
                            className="text-white/35 group-hover:text-white/55 text-sm leading-relaxed transition-colors duration-300"
                            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                          >
                            {benefit.description}
                          </motion.p>
                        </div>

                        <motion.svg
                          variants={fadeUpVariants}
                          className="w-3 h-3 text-white/0 group-hover:text-white/40 flex-shrink-0 mt-1 transition-colors duration-300"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </motion.div>
                    )}

                    {/* Pending placeholder */}
                    {pending && (
                      <motion.div
                        key="pending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 py-4"
                      >
                        <div className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0" />
                        <div className="h-px flex-1 bg-white/[0.05]" />
                        <span
                          className="text-[9px] tracking-[0.2em] text-white/15"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {benefit.id}
                        </span>
                      </motion.div>
                    )}

                    {/* Completed — benefit passed, show dimmed check */}
                    {!active && !pending && (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 py-4"
                      >
                        <div className="opacity-20"><CheckIcon /></div>
                        <span
                          className="text-white/20 text-sm"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                        >
                          {benefit.headline}
                        </span>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA — unlocks at final benefit */}
          <AnimatePresence>
            {frameIndex >= benefits[benefits.length - 1].frameStart && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <button
                  className="group relative px-10 py-4 border border-white/20 text-[11px] tracking-widest uppercase overflow-hidden hover:text-black transition-colors duration-500"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="relative z-10 flex items-center gap-4">
                    Request a Quote
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-2"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll hint */}
          <AnimatePresence>
            {frameIndex < 20 && ready && (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="absolute bottom-8 left-10 md:left-14 flex flex-col gap-2"
              >
                <span className="alum-badge text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Scroll to explore
                </span>
                <div style={{
                  width: 1, height: 28,
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                  animation: "pulse 1.8s ease-in-out infinite",
                }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </div>
  );
}
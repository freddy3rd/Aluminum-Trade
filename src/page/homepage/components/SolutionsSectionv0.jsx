import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { AnimatePresence, motion, useInView } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)



const PHRASES = [
  { 
    id: '01',
    start: 20, 
    end: 80, 
    headline: 'Precision Crafted', 
    description: 'Our products are meticulously designed with exacting standards to ensure flawless performance and aesthetic excellence.'
  },
  { 
    id: '02',
    start: 110, 
    end: 170, 
    headline: 'Seamless Motion', 
    description: 'Experience smooth, effortless operation with components that slide and move silently, enhancing comfort and convenience.'
  },
  { 
    id: '03',
    start: 200, 
    end: 260, 
    headline: 'Thermal Mastery', 
    description: 'Advanced thermal engineering keeps interiors comfortable, energy-efficient, and protected from harsh weather conditions.'
  },
  { 
    id: '04',
    start: 290, 
    end: 350, 
    headline: 'Enduring Strength', 
    description: 'Constructed from premium-grade aluminum to withstand daily wear, extreme weather, and the test of time without compromise.'
  },
  { 
    id: '05',
    start: 380, 
    end: 480, 
    headline: 'Open to Possibility', 
    description: 'Design without limits: expansive openings and thoughtful layouts create bright, airy spaces that inspire creativity.'
  },
];

const TOTAL_FRAMES = 450
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  return `/frames/ezgif-frame-${num}.jpg`
})



const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

// Each word of the headline slides up from below
const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -16, filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}

// Badge + sub fade + slide
const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

// Divider line draws in from left
const lineVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.25 } },
}

function getActivePhrase(progress) {
  return PHRASES.findIndex(
    ({ range }) => progress >= range[0] && progress <= range[1],
  );
}

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
export default function SolutionSection() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const fadeTimer = useRef(null)
  const lastIndexRef = useRef(0)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')

    // Helper: Draw a specific frame to canvas
    const drawFrame = (index) => {
      const img = imagesRef.current[index]
      if (!img || !img.complete) return

      // Sync canvas dimensions to its CSS size or image natural size
      // This prevents "stretched" or "blank" states
      if (canvas.width !== img.naturalWidth) {
        // canvas.width = img.naturalWidth
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }

    const setupScrollTrigger = () => {
      // Clear existing triggers if any (useful for HMR)
      ScrollTrigger.getAll().forEach(t => t.kill())

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=3000',
        scrub: 0.3,
        pin: true,
      onUpdate: (self) => {
        const totalFrames = TOTAL_FRAMES - 1;
        const frameIndex = Math.round(self.progress * totalFrames);
        
        setCurrentFrame(frameIndex);
        requestAnimationFrame(() => drawFrame(frameIndex));

        // Find active phrase based on current frame
        const activePhraseIndex = PHRASES.findIndex(
          (p) => frameIndex >= p.start && frameIndex <= p.end
        );

        if (activePhraseIndex !== -1) {
          setActiveIndex(activePhraseIndex);
        }

        // Handle Intro Badge visibility
        setIsIntroVisible(frameIndex < 35);
      }
      })
    }

    const preloadAll = () => {
      let loadedCount = 0
      imagesRef.current = []

      FRAME_PATHS.forEach((src, i) => {
        const img = new Image()
        img.src = src
        
        const handleLoad = () => {
          imagesRef.current[i] = img
          loadedCount++
          
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))

          // Immediately draw the first frame as soon as it's ready
          if (i === 0) drawFrame(0)

          if (loadedCount === TOTAL_FRAMES) {
            setReady(true)
            // Small delay ensures the 'ready' state transition finishes 
            // before the scroll interactions begin
            setTimeout(setupScrollTrigger, 100)
          }
        }

        img.onload = handleLoad
        img.onerror = handleLoad // Avoid getting stuck on a broken path
      })
    }

    preloadAll()

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      clearTimeout(fadeTimer.current)
    }
  }, [])

  const phrase = PHRASES[activeIndex]

  return (
    <>
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
        {/* ── BACKGROUND: Canvas Animation (Absolute) ── */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 canvas-container">
            <canvas
              ref={canvasRef}
              style={{
                opacity: ready ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
              }}
            />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-8 left-8 border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-3 hidden md:visible"
          >
            <span
              className="alum-badge text-white/50 "
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Architectural Series — 2025
            </span>
          </motion.div>
        </div>

        {/* ── FOREGROUND: Benefits List (Fixed Height) ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent from-50% to-[#0a0a0a]" />
        <div className="absolute inset-0 z-10 ml-auto w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            // className="max-w-md"
          >
            {/* Badge */}
            <motion.span
              variants={fadeUpVariants}
              className="alum-badge text-white/40 mb-6 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The Aluminum Advantage
            </motion.span>

            {/* Headline */}
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

            {/* Divider */}
            <motion.div
              variants={lineVariants}
              className="h-px bg-gradient-to-r from-white/40 via-white/15 to-transparent mb-10 mt-8"
            />

            {/* Benefits List — Fixed Height Container */}
            <div className="relative md:h-125 h-full max-w-lg">
              {/* Gradient fade from right to left */}
              {/* <div className="absolute inset-0 right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" /> */}
              
              <div className="flex flex-col gap-0 divide-y divide-white/[0.07]">
                <AnimatePresence>
                  {PHRASES.map((phrase, index) => (
                    currentFrame >= phrase.start && (
                      <motion.div
                        key={phrase.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        whileHover={{ x: 6 }}
                        className="group flex items-start gap-4 py-5 cursor-default flex-shrink-0"
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
                            {phrase.id}
                          </span>
                          <h3
                            className="text-white/90 group-hover:text-white transition-colors duration-300 text-base font-light tracking-wide"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 400 }}
                          >
                            {phrase.headline}
                          </h3>
                        </div>
                        <p
                          className="text-white/35 group-hover:text-white/55 text-sm leading-relaxed transition-colors duration-300"
                          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                        >
                          {phrase.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 flex-shrink-0 mt-1 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              </div>
            </div>

            {/* CTA Button */}

          </motion.div>
        </div>
      </div>
    </>
  )
}
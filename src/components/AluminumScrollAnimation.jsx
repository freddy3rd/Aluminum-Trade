import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)



const PHRASES = [
  { 
    start: 20, 
    end: 80, 
    headline: 'Precision Crafted', 
    sub: 'Every detail engineered for perfection.' 
  },
  { 
    start: 110, 
    end: 170, 
    headline: 'Seamless Motion', 
    sub: 'Glide with zero resistance, zero noise.' 
  },
  { 
    start: 200, 
    end: 260, 
    headline: 'Thermal Mastery', 
    sub: 'Superior insulation. Built for every climate.' 
  },
  { 
    start: 290, 
    end: 350, 
    headline: 'Enduring Strength', 
    sub: 'Aircraft-grade aluminum. Decades of durability.' 
  },
  { 
    start: 380, 
    end: 480, 
    headline: 'Open to Possibility', 
    sub: 'Where architecture meets light.' 
  },
];
const TOTAL_FRAMES = 450
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  return `./src/assets/video/frames/ezgif-frame-${num}.jpg`
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

export default function AluminumScrollAnimation() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const fadeTimer = useRef(null)
  const lastIndexRef = useRef(0)

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
        end: '+=4000', // Increased distance for smoother scrubbing
        scrub: 0.05,    // Lower value = more responsive to scroll
        pin: true,
      onUpdate: (self) => {
        const totalFrames = TOTAL_FRAMES - 1;
        const frameIndex = Math.round(self.progress * totalFrames);
        
        requestAnimationFrame(() => drawFrame(frameIndex));

        // Find if current frame is within any phrase range
        const activePhraseIndex = PHRASES.findIndex(
          (p) => frameIndex >= p.start && frameIndex <= p.end
        );

        if (activePhraseIndex !== -1) {
          setActiveIndex(activePhraseIndex);
          
          // Add a 10-frame "safe zone" at the start and end of the range
          // to trigger the Framer Motion exit before we actually leave the range
          const p = PHRASES[activePhraseIndex];
          const isInsideSafeRange = frameIndex > p.start + 5 && frameIndex < p.end - 5;
          
          setPhraseVisible(isInsideSafeRange);
        } else {
          // If we are between ranges, hide the phrase
          setPhraseVisible(false);
        }

        // Handle your Intro Badge visibility (0 to 30 frames)
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
        <div className="absolute inset-0 canvas-container">
          <canvas
            ref={canvasRef}
            style={{
              opacity: ready ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,.45) 0%,rgba(0,0,0,.05) 40%,rgba(0,0,0,.55) 100%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-xs text-center">
        <AnimatePresence>
          {isIntroVisible && (
            <motion.div
              key="intro-badge"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              // Using exit to ensure it slides up/fades out when isIntroVisible is false
            >
              <motion.span 
                variants={fadeUpVariants}
                className="alum-badge block md:text-2xl text-white/60 tracking-[0.4em] uppercase"
              >
                Architectural Series
              </motion.span>
              
              <motion.div
                variants={lineVariants}
                style={{
                  width: "100%", 
                  height: 1,
                  background: 'rgba(255,255,255,0.35)',
                  margin: '16px 0',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        {/* <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        
        className="h-full content-center absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <span className="alum-badge text-center  md:text-2xl text-white/60">Architectural Series</span>
          <motion.div
            variants={lineVariants}
            style={{
              width:"100%" , height: 1,
              background: 'rgba(255,255,255,0.35)',
              margin: '16px 0',
            }}
          />
        </motion.div> */}

        {/* ── Framer Motion Phrase Block ── */}
        <div className="absolute z-10 bottom-24 left-12 md:left-20 max-w-md pointer-events-none">
  <AnimatePresence mode="wait">
    {phraseVisible && (
      <motion.div
        key={activeIndex} // Changing key triggers the exit/entry
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <motion.p variants={fadeUpVariants} className="text-white/50 text-xs mb-2">
           {String(activeIndex + 1).padStart(2, '0')} — SERIES
        </motion.p>
        
        <h1 className="text-white text-5xl font-serif leading-tight">
          {PHRASES[activeIndex].headline.split(' ').map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div variants={lineVariants} className="w-12 h-px bg-white/30 my-6" />

        <motion.p variants={fadeUpVariants} className="text-white/70 text-lg font-light">
          {PHRASES[activeIndex].sub}
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
</div>


        {/* ── Vertical progress pips ── */}
       

        {/* ── Scroll hint ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: activeIndex === 0 ? 1 : 0, transition: 'opacity 0.5s ease' }}
        >
          <span className="alum-badge" style={{ color: 'rgba(255,255,255,.4)' }}>Scroll to explore</span>
          <div style={{
            width: 1, height: 32,
            background: 'linear-gradient(to bottom,rgba(255,255,255,.5),transparent)',
            animation: 'pulse 1.8s ease-in-out infinite',
          }} />
        </div>
        {/* ... (rest of your JSX for loading, phrases, and pips remains the same) ... */}
      </div>
    </>
  )
}
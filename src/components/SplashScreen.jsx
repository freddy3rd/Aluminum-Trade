// components/ui/SplashScreen.jsx

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SplashScreen
 * 
 * Props:
 * @param {string}   videoSrc    — optional video to preload before completing
 * @param {number}   minDuration — minimum ms to show splash (default: 2200)
 * @param {string}   title       — large serif wordmark (default: "Threshold")
 * @param {string}   subtitle    — small uppercase label above title (default: "Architectural Systems")
 * @param {Function} onComplete  — called after exit animation finishes
 */
const SplashScreen = ({
  videoSrc,
  minDuration = 2200,
  title = "ALUMCRAFT",
  subtitle = "Architectural Systems",
  onComplete,
}) => {
  const [progress, setProgress]     = useState(0);
  const [videoReady, setVideoReady] = useState(!videoSrc); // skip wait if no video
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [exiting, setExiting]       = useState(false);
  const videoRef = useRef(null);

  // Minimum display time
  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), minDuration);
    return () => clearTimeout(t);
  }, [minDuration]);

  // Animate progress bar (holds at 88% until video ready)
  useEffect(() => {
    let raf;
    let start = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      const capped = videoReady ? eased : Math.min(eased, 0.88);
      setProgress(Math.round(capped * 100));
      if (capped < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [videoReady]);

  // Video preload
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoReady(true);
    if (video.readyState >= 3) {
      setVideoReady(true);
    } else {
      video.addEventListener('canplaythrough', onCanPlay);
    }
    return () => video.removeEventListener('canplaythrough', onCanPlay);
  }, [videoSrc]);

  // Trigger exit when both conditions met
  useEffect(() => {
    if (videoReady && minTimeDone && !exiting) {
      const t = setTimeout(() => setExiting(true), 400);
      return () => clearTimeout(t);
    }
  }, [videoReady, minTimeDone, exiting]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          {/* Hidden video preloader */}
          {videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              className="absolute opacity-0 pointer-events-none w-px h-px"
            />
          )}

          {/* Noise grain */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuOScgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknLz48L3N2Zz4=")`,
            }}
          />

          {/* Top rule */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-white/10"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.35em" }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[9px] uppercase text-white/40"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {subtitle}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-5xl md:text-6xl tracking-tight leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                {title}
              </motion.h1>

              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "160px" }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center gap-3 w-48"
            >
              <div className="relative w-full h-px bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white/60"
                  style={{ width: `${progress}%` }}
                />
                <motion.div
                  className="absolute top-0 h-full w-8"
                  style={{
                    left: `${progress}%`,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    transform: "translateX(-50%)",
                  }}
                />
              </div>

              <div className="flex items-center justify-between w-full">
                <span
                  className="text-[8px] tracking-[0.25em] uppercase text-white/25"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {videoReady ? "Ready" : "Loading"}
                </span>
                <span
                  className="text-[8px] tracking-[0.1em] text-white/40 tabular-nums"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Corner brackets */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 ${cls} border-white/15`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
            />
          ))}

          {/* Bottom rule */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Curtain exit panels */}
          <AnimatePresence>
            {exiting && (
              <>
                <motion.div
                  key="curtain-left"
                  className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0a0a] origin-left z-10"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                  key="curtain-right"
                  className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a] origin-right z-10"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
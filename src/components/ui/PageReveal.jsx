
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PageReveal = ({ children }) => {
  const [overlayDone, setOverlayDone] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Content fades in only after overlay exits */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={overlayDone ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* Overlay that sweeps away */}
      <AnimatePresence>
        {!overlayDone && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-10 bg-black"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.3,
            }}
            onAnimationComplete={() => setOverlayDone(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageReveal;
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Collection data ───────────────────────────────────────────────────────────
// Replace src values with your actual imports, e.g.:
// import img1 from "/collection/collection_1.jpg";
const allItems = [
  // Cabinets
  { id: "C01", category: "Cabinet", label: "Sink Base Cabinet",     sub: "Stainless + Aluminum",  src: "/collection/collection_1.jpg" },
  { id: "C02", category: "Cabinet", label: "Hanging Cabinet",       sub: "Powder-coat Finish",    src: "/collection/collection_2.jpg" },
  { id: "C03", category: "Cabinet", label: "Kitchen Upper Cabinet", sub: "Anodised Champagne",    src: "/collection/collection_3.jpg" },
  { id: "C04", category: "Cabinet", label: "Base Cabinet",          sub: "Matt Black Profile",    src: "/collection/collection_4.jpg" },
  { id: "C05", category: "Cabinet",  label: "Hanging Cabinet",      sub: "Powder-coat Finish",    src: "/collection/collection_9.jpg" },
  // Doors
  { id: "D01", category: "Door",    label: "Sliding Door",          sub: "2-Panel System",        src: "/collection/collection_5.jpg" },
  { id: "D02", category: "Door",    label: "Swing Door",            sub: "Heavy-duty Hinge",      src: "/collection/collection_6.jpg" },
  { id: "D03", category: "Door",    label: "Bi-fold Door",          sub: "Custom Width",          src: "/collection/collection_7.jpg" },
  // Windows
  { id: "W01", category: "Window",  label: "Casement Window",       sub: "Double-glaze Ready",    src: "/collection/collection_8.jpg" },
  { id: "W03", category: "Window",  label: "Awning Window",         sub: "Weather-seal System",   src: "/collection/collection_10.jpg" },
  // Others
  { id: "O01", category: "Others",  label: "Glass Partition",       sub: "Office Grade",          src: "/collection/collection_11.jpg" },
  { id: "O02", category: "Others",  label: "Louver Panel",          sub: "Ventilation Series",    src: "/collection/collection_12.jpg" },
  { id: "O01", category: "Others",  label: "Glass Partition",       sub: "Office Grade",          src: "/collection/collection_13.jpg" },
  { id: "O02", category: "Others",  label: "Louver Panel",          sub: "Ventilation Series",    src: "/collection/collection_14.jpg" },
  { id: "O01", category: "Others",  label: "Glass Partition",       sub: "Office Grade",          src: "/collection/collection_15.jpg" },
  { id: "O02", category: "Others",  label: "Louver Panel",          sub: "Ventilation Series",    src: "/collection/collection_16.jpg" },
  { id: "O02", category: "Others",  label: "Louver Panel",          sub: "Ventilation Series",    src: "/collection/collection_17.jpg" },
  { id: "O02", category: "Others",  label: "Louver Panel",          sub: "Ventilation Series",    src: "/collection/collection_18.jpg" },
  { id: "O02", category: "Others",  label: "Louver Panel",          sub: "Ventilation Series",    src: "/collection/collection_19.jpg" },
];

const FILTERS = ["All", "Cabinet", "Door", "Window", "Others"];

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

// ── ImageLightbox ─────────────────────────────────────────────────────────────
function ImageLightbox({ items, activeIndex, onClose, onNavigate }) {
  const current = items[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  const handleKey = useCallback((e) => {
    if (e.key === "Escape")     onClose();
    if (e.key === "ArrowLeft"  && hasPrev) onNavigate(activeIndex - 1);
    if (e.key === "ArrowRight" && hasNext) onNavigate(activeIndex + 1);
  }, [activeIndex, hasPrev, hasNext, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(18,15,12,0.96)" }}
      onClick={onClose}
    >
      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "160px 160px" }}
      />

      {/* Close */}
      <motion.button
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 group"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>Close</span>
        <div className="w-9 h-9 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-300">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </motion.button>

      {/* Counter + dots */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="absolute top-6 left-6 z-10 flex items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
              style={{ width: i === activeIndex ? "20px" : "6px", height: "2px", background: i === activeIndex ? "rgba(168,152,128,0.9)" : "rgba(255,255,255,0.18)", borderRadius: "1px", transition: "all 0.3s ease" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Category badge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#fff]/70 border border-[#fff]/20 px-3 py-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {current.category}
        </span>
      </motion.div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1,    filter: "blur(0px)" }}
          exit={{    opacity: 0, scale: 1.03, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{ maxWidth: "88vw", maxHeight: "82vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current.src} alt={current.label}
            className="object-contain shadow-2xl"
            style={{ maxWidth: "88vw", maxHeight: "82vh" }}
          />
          {/* Label bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-4"
            style={{ background: "linear-gradient(to top, rgba(18,15,12,0.75), transparent)" }}
          >
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#fff] mb-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                {current.id} · {current.sub}
              </p>
              <p className="text-white/80 text-xl leading-wider tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>
                {current.label}
              </p>
            </div>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-[#a89880]/40">
              <path d="M32 0 L32 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M32 0 L20 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev */}
      {hasPrev && (
        <motion.button initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-white/15 flex items-center justify-center group hover:border-white/40 transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
            className="text-white/40 group-hover:text-white/80 transition-colors duration-300" style={{ transform: "scaleX(-1)" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Next */}
      {hasNext && (
        <motion.button initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-white/15 flex items-center justify-center group hover:border-white/40 transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
            className="text-white/40 group-hover:text-white/80 transition-colors duration-300">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Keyboard hints */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        {[["←","Prev"],["→","Next"],["Esc","Close"]].map(([k, h]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className="text-[10px] tracking-[0.15em] text-white/20 border border-white/10 px-1.5 py-0.5 "
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{k}</span>
            <span className="text-[8px] tracking-[0.15em] uppercase text-white/15"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>{h}</span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── CollectionCard ────────────────────────────────────────────────────────────
// function CollectionCard({ item, index, onOpen }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       layout
//       variants={fadeUp}
//       custom={index}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       className="relative overflow-hidden bg-[#1a1714] group cursor-pointer"
//       style={{ aspectRatio: "3/4" }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => onOpen(index)}
//     >
//       {/* Image */}
//       <motion.img
//         src={item.src} alt={item.label}
//         className="absolute inset-0 w-full h-full object-cover"
//         animate={{ scale: hovered ? 1.07 : 1 }}
//         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         style={{ willChange: "transform" }}
//       />

//       {/* Vignette */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

//       {/* Top row */}
//       <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
//         <span className="text-[9px] tracking-[0.25em] text-white/30"
//           style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.id}</span>
//         <motion.span
//           animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
//           transition={{ duration: 0.3 }}
//           className="text-[8px] tracking-[0.2em] uppercase text-[#a89880]/80 border border-[#a89880]/30 px-2 py-0.5"
//           style={{ fontFamily: "'DM Sans', sans-serif" }}
//         >
//           {item.category}
//         </motion.span>
//       </div>

//       {/* Bottom info */}
//       <div className="absolute bottom-0 left-0 right-0 p-5
//         bg-gradient-to-t from-black/70 via-black/40 to-transparent">

//         <motion.div
//           animate={{ y: hovered ? 0 : 4 }}
//           transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//         >
//           <p
//             className="text-[10px] tracking-[0.2em] uppercase text-white/80 mb-1"
//             style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
//           >
//             {item.sub}
//           </p>

//           <p
//             className="text-white text-xl leading-snug"
//             style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
//           >
//             {item.label}
//           </p>
//         </motion.div>

//         <motion.div
//           animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
//           transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
//           className="mt-3 flex items-center gap-2"
//         >
//           <div className="h-px w-4 bg-[#a89880]/70" />
//           <span
//             className="text-[9px] tracking-[0.22em] uppercase text-[#d6c7a8]"
//             style={{ fontFamily: "'DM Sans', sans-serif" }}
//           >
//             View Full Size
//           </span>
//         </motion.div>
//       </div>

//       {/* Expand icon top-right on hover */}
//       <motion.div
//         animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
//         transition={{ duration: 0.25 }}
//         className="absolute top-4 right-4 w-8 h-8 border border-white/25 flex items-center justify-center bg-black/20 backdrop-blur-sm"
//         style={{ pointerEvents: "none" }}
//       >
//         <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
//             d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
//         </svg>
//       </motion.div>

//       {/* Border shimmer */}
//       <motion.div
//         className="absolute inset-0 border pointer-events-none"
//         animate={{ borderColor: hovered ? "rgba(168,152,128,0.2)" : "rgba(168,152,128,0)" }}
//         transition={{ duration: 0.3 }}
//       />
//     </motion.div>
//   );
// }
function CollectionCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      layout
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative overflow-hidden bg-[#1a1714] group cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
    >
      {/* Skeleton */}
      <AnimatePresence>
        {!imgLoaded && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            {/* Base */}
            <div className="absolute inset-0 bg-[#1a1714]" />
            {/* Shimmer sweep */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(168,152,128,0.07) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "skeletonShimmer 1.6s infinite linear",
              }}
            />
            {/* Subtle warm grain texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(168,152,128,0.03) 2px,
                  rgba(168,152,128,0.03) 4px
                )`,
              }}
            />
            {/* Bottom label placeholder */}
            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
              <div className="h-2 w-16 rounded-sm bg-white/5" />
              <div className="h-4 w-32 rounded-sm bg-white/8" />
            </div>
            {/* Top id placeholder */}
            <div className="absolute top-4 left-4 h-2 w-8 rounded-sm bg-white/5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      <motion.img
        src={item.src}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
        onLoad={() => setImgLoaded(true)}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span className="text-[9px] tracking-[0.25em] text-white/30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.id}</span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
          transition={{ duration: 0.3 }}
          className="text-[8px] tracking-[0.2em] uppercase text-[#a89880]/80 border border-[#a89880]/30 px-2 py-0.5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.category}
        </motion.span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5
        bg-gradient-to-t from-black/70 via-black/40 to-transparent">
        <motion.div
          animate={{ y: hovered ? 0 : 4 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-white/80 mb-1"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
          >
            {item.sub}
          </p>
          <p
            className="text-white text-xl leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            {item.label}
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
          className="mt-3 flex items-center gap-2"
        >
          <div className="h-px w-4 bg-[#a89880]/70" />
          <span
            className="text-[9px] tracking-[0.22em] uppercase text-[#d6c7a8]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            View Full Size
          </span>
        </motion.div>
      </div>

      {/* Expand icon */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.25 }}
        className="absolute top-4 right-4 w-8 h-8 border border-white/25 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        style={{ pointerEvents: "none" }}
      >
        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
        </svg>
      </motion.div>

      {/* Border shimmer */}
      <motion.div
        className="absolute inset-0 border pointer-events-none"
        animate={{ borderColor: hovered ? "rgba(168,152,128,0.2)" : "rgba(168,152,128,0)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CollectionSection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeFilter === "All"
    ? allItems
    : allItems.filter((item) => item.category === activeFilter);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "All" ? allItems.length : allItems.filter(i => i.category === f).length;
    return acc;
  }, {});

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5EFE6] overflow-hidden py-28 px-6 md:px-16"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="block text-[10px] tracking-[0.3em] uppercase text-[#9c8870] mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Browse by Category
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-[#1a1714] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
              Full <em className="text-[#7a6a58]">Collection</em>
            </h2>

            {/* ── Filter tabs ── */}
            <div className="flex flex-wrap gap-px bg-[#c8bfb4]/30">
              {FILTERS.map((f) => {
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="relative flex items-center gap-2 px-6 py-3 overflow-hidden transition-colors duration-400"
                    style={{
                      background: active ? "#1a1714" : "#F5EFE6",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span className="relative z-10 text-[10px] tracking-[0.22em] uppercase transition-colors duration-300"
                      style={{ color: active ? "#F5EFE6" : "#6b5e52" }}>
                      {f}
                    </span>
                    <span className="relative z-10 text-[9px] transition-colors duration-300"
                      style={{
                        color: active ? "#a89880" : "#b8a898",
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontStyle: "italic",
                      }}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px bg-gradient-to-r from-[#a89880]/60 via-[#a89880]/20 to-transparent origin-left"
          />
        </motion.div>

        {/* ── Active filter label ── */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="h-px w-6 bg-[#a89880]/60" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#9c8870]"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            {activeFilter === "All" ? "All Collections" : activeFilter}
          </span>
          <span className="text-[#b8a898] text-sm italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            — {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </span>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {filtered.map((item, i) => (
              <CollectionCard
                key={item.id}
                item={item}
                index={i}
                onOpen={(idx) => setLightboxIndex(idx)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#c8bfb4]/50 pt-10"
        >
          <p className="text-[#6b5e52] text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            All pieces are custom-fabricated to your specifications.
          </p>
          <button
            className="group relative flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#1a1714] border border-[#a89880]/60 px-8 py-3 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="relative z-10">Request a Quote</span>
            <svg className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            items={filtered}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
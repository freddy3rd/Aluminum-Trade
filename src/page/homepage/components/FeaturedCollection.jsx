import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import image_1 from "/collection/collection_5.jpg";
import image_2 from "/collection/collection_7.jpg";
import image_3 from "/collection/collection_8.jpg";
import image_4 from "/collection/collection_1.jpg";
import { useMediaQuery } from "react-responsive";

const galleryImages = [
  {
    id: "01",
    src: image_1,
    alt: "Modern white aluminum sliding door with a minimalist slim-profile frame",
    label: "Aluminum Door",
    span: "row-span-2",
  },
  {
    id: "02",
    src: image_2,
    alt: "Modern under-sink base cabinet with a seamless handleless design and matte white finish.",
    label: "Sink Base Cabinet",
    span: "",
  },
  {
    id: "03",
    src: image_3,
    alt: "Luxury living room opening to garden via sliding door",
    label: "Custom Size",
    span: "",
  },
  {
    id: "04",
    src: image_4,
    alt: "Modern handleless hanging cabinet with a sleek white finish, mounted above a kitchen backsplash.",
    label: "Hanging Cabinet",
    span: "col-span-2",
  },
];

const features = [
  { 
    id: "01", 
    text: "Waterproof aluminum core" 
  },
  { 
    id: "02", 
    text: "Soft-close hinge technology" 
  },
  { 
    id: "03", 
    text: "Custom size fabrication" 
  },
  { 
    id: "04", 
    text: "Anti-rust powder coating" 
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const wordVariants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const lineVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
    <circle cx="10" cy="10" r="9" stroke="#a89880" strokeWidth="1" />
    <path d="M6 10.5L8.5 13L14 7.5" stroke="#5c4f43" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── ImageLightbox ─────────────────────────────────────────────────────────────
function ImageLightbox({ images, activeIndex, onClose, onNavigate }) {
  const current = images[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < images.length - 1;

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && hasPrev) onNavigate(activeIndex - 1);
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
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(18, 15, 12, 0.96)" }}
      onClick={onClose}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 group"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
          Close
        </span>
        <div className="w-9 h-9 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors duration-300">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-white/50 group-hover:text-white/80 transition-colors duration-300" />
          </svg>
        </div>
      </motion.button>

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="absolute top-6 left-6 z-10 flex items-center gap-3"
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-white/30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? "20px" : "6px",
                height: "2px",
                background: i === activeIndex ? "rgba(168,152,128,0.9)" : "rgba(255,255,255,0.2)",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1,    filter: "blur(0px)" }}
          exit={{    opacity: 0, scale: 1.03, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
          style={{ maxWidth: "88vw", maxHeight: "82vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="object-contain shadow-2xl"
            style={{ maxWidth: "88vw", maxHeight: "82vh" }}
          />

          {/* Bottom label bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-4"
            style={{ background: "linear-gradient(to top, rgba(18,15,12,0.7), transparent)" }}
          >
            <div>
              <p
                className="text-[9px] tracking-[0.28em] uppercase text-[#a89880] mb-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {current.id} · Collection
              </p>
              <p
                className="text-white/80 text-lg leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                {current.label}
              </p>
            </div>
            {/* Corner bracket */}
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-[#a89880]/40">
              <path d="M32 0 L32 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M32 0 L20 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next buttons */}
      {hasPrev && (
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-white/15 flex items-center justify-center group hover:border-white/40 transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/80 transition-colors duration-300 -scale-x-100">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}
      {hasNext && (
        <motion.button
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-white/15 flex items-center justify-center group hover:border-white/40 transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/80 transition-colors duration-300">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* Keyboard hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        {[["←", "Prev"], ["→", "Next"], ["Esc", "Close"]].map(([key, hint]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span
              className="text-[8px] tracking-[0.15em] text-white/20 border border-white/10 px-1.5 py-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {key}
            </span>
            <span
              className="text-[8px] tracking-[0.15em] uppercase text-white/15"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {hint}
            </span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── GalleryCard ──────────────────────────────────────────────────────────────
// function GalleryCard({ image, index, onOpen }) {
//   const [hovered, setHovered] = useState(false);
//   const isMobile = useMediaQuery({ maxWidth: 767 });
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
//   const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
//   const isDesktop = useMediaQuery({ minWidth: 1440 });

//   return (
//     <motion.div
//       variants={fadeUpVariants}
//       custom={index}
//       className={`relative overflow-hidden bg-[#1a1714] group cursor-pointer ${isDesktop ||  isLaptop? image.span : ""}`}
//       // style={{ minHeight: image.span === "row-span-2" ? 480 : 220 }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => onOpen(index)}
//     >
//       {/* Image with zoom */}
//       <motion.img
//         src={image.src}
//         alt={image.alt}
//         className="absolute inset-0 w-full h-full object-cover"
//         animate={{ scale: hovered ? 1.07 : 1 }}
//         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         style={{ willChange: "transform" }}
//       />

//       {/* Dark vignette */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

//       {/* Corner number */}
//       <span
//         className="absolute top-4 left-4 text-[9px] tracking-[0.25em] text-white/30"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}
//       >
//         {image.id}
//       </span>

//       {/* Label — slides up on hover */}
//       <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
//         <motion.span
//           animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.6 }}
//           transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//           className="alum-badge text-white/70"
//           style={{ fontFamily: "'DM Sans', sans-serif" }}
//         >
//           {image.label}
//         </motion.span>

//         {/* Expand icon */}
//         <motion.div
//           animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
//           transition={{ duration: 0.3 }}
//           className="w-8 h-8 border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-sm"
//         >
//           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
//               d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
//           </svg>
//         </motion.div>
//       </div>

//       {/* Hover border shimmer */}
//       <motion.div
//         className="absolute inset-0 border border-white/0 pointer-events-none"
//         animate={{ borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0)" }}
//         transition={{ duration: 0.3 }}
//       />
//     </motion.div>
//   );
// }
function GalleryCard({ image, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <motion.div
      variants={fadeUpVariants}
      custom={index}
      className={`relative overflow-hidden bg-[#1a1714] group cursor-pointer ${isDesktop || isLaptop ? image.span : ""}`}
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
            <div className="absolute inset-0 bg-[#1a1714]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "skeletonShimmer 1.8s infinite linear",
              }}
            />
            {/* Corner id placeholder */}
            <div className="absolute top-4 left-4 h-2 w-6 rounded-sm bg-white/8" />
            {/* Bottom label placeholder */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <div className="h-3 w-24 rounded-sm bg-white/8" />
              <div className="w-8 h-8 border border-white/10 bg-white/5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image with zoom */}
      <motion.img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
        onLoad={() => setImgLoaded(true)}
      />

      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Corner number */}
      <span
        className="absolute top-4 left-4 text-[9px] tracking-[0.25em] text-white/30"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {image.id}
      </span>

      {/* Label — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <motion.span
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="alum-badge text-white/70"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {image.label}
        </motion.span>

        {/* Expand icon */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-sm"
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </motion.div>
      </div>

      {/* Hover border shimmer */}
      <motion.div
        className="absolute inset-0 border border-white/0 pointer-events-none"
        animate={{ borderColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FeaturedCollections() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState(null);



  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5EFE6] overflow-hidden py-28 px-6 md:px-16"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 grid md:grid-cols-2 gap-10 items-end"
        >
          {/* Left: title */}
          <div>
            <motion.span
              variants={fadeUpVariants}
              className="alum-badge text-[#9c8870] mb-5 block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Product Showcase
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
              {["Premium", "Aluminum"].map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-4">
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={wordVariants}
                className="inline-block italic"
                style={{ color: "#7a6a58" }}
              >
                Collections
              </motion.span>
            </h2>

            <motion.div
              variants={lineVariants}
              className="mt-7 h-px max-w-sm"
              style={{ background: "linear-gradient(to right, #a89880aa, #a8988033, transparent)" }}
            />
          </div>

          {/* Right: copy + features */}
          <motion.div variants={containerVariants} className="flex flex-col gap-6">
            <motion.p
              variants={fadeUpVariants}
              className="alum-sub text-[#6b5e52] text-base leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Engineered for effortless functionality—our Aluminum Collection features precision-engineered joinery, 
              moisture-resistant powder coatings, and slim-profile frames that define your space without overwhelming it. 
              Built for modern architecture and high-traffic environments, it is designed to last decades.
            </motion.p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {features.map((f) => (
                <motion.div
                  key={f.id}
                  variants={fadeUpVariants}
                  className="flex items-center gap-2.5 group cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <CheckIcon />
                  <span
                    className="text-[#5c4f43] text-sm group-hover:text-[#1a1714] transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {f.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUpVariants} className="mt-2">
              <button
                className="group relative flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#1a1714] border border-[#a89880]/60 px-8 py-3 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="relative z-10">Request Quote</span>
                <svg
                  className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Gallery grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[220px]"
        >
          {galleryImages.map((image, i) => (
            <GalleryCard
              key={image.id}
              image={image}
              index={i}
              onOpen={setLightboxIndex}
            />
          ))}
        </motion.div>

        {/* ── Bottom footnote ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-between border-t border-[#c8bfb4]/40 pt-8"
        >
          <p
            className="text-[#9c8870] text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: "0.08em" }}
          >
            All installations are custom-fabricated and professionally fitted.
          </p>
          <span
            className="alum-badge text-[#b8a898]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Est. lead time — 3 to 5 weeks
          </span>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={galleryImages}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
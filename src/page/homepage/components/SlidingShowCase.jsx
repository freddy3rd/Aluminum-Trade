import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import image_1 from "@/assets/images/aluminum/image_1.jpg";
import image_2 from "@/assets/images/aluminum/image_2.webp";
import image_3 from "@/assets/images/aluminum/image_3.webp";
import image_4 from "@/assets/images/aluminum/image_4.jpg";

// ── Unsplash modern architecture / glass door images ─────────────────────────
// Replace with your own assets. These are placeholder URLs.
const galleryImages = [
  {
    id: "01",
    src:image_1,
    alt: "Modern home with floor-to-ceiling aluminum sliding doors",
    label: "2-Panel System",
    span: "row-span-2", // tall card
  },
  {
    id: "02",
    src:image_2,
    alt: "Minimalist interior with sliding glass panels",
    label: "3-Panel System",
    span: "",
  },
  {
    id: "03",
    src:image_3,
    alt: "Luxury living room opening to garden via sliding door",
    label: "Custom Size",
    span: "",
  },
  {
    id: "04",
    src:image_4,
    alt: "Contemporary home exterior with large sliding door",
    label: "Heavy-Duty Rollers",
    span: "col-span-2", // wide card
  },
];

const features = [
  { id: "01", text: "2-Panel sliding system" },
  { id: "02", text: "3-Panel sliding system" },
  { id: "03", text: "Custom size fabrication" },
  { id: "04", text: "Heavy-duty precision rollers" },
];

// ── Variants — same vocabulary as the rest of the app ───────────────────────
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

// ── CheckIcon ────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
    <circle cx="10" cy="10" r="9" stroke="#a89880" strokeWidth="1" />
    <path d="M6 10.5L8.5 13L14 7.5" stroke="#5c4f43" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── GalleryCard ──────────────────────────────────────────────────────────────
function GalleryCard({ image, index, isInView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUpVariants}
      custom={index}
      className={`relative overflow-hidden bg-[#1a1714] group cursor-pointer ${image.span}`}
      style={{ minHeight: image.span === "row-span-2" ? 480 : 220 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with zoom */}
      <motion.img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform" }}
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
export default function SlidingDoorShowcase() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

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
                Sliding Doors
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
              Engineered for effortless movement — our sliding doors feature
              precision heavy-duty rollers, 12mm tempered safety glass, and
              slim aluminum profiles that frame your view without interrupting it.
              Built for modern architecture, designed to last decades.
            </motion.p>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {features.map((f, i) => (
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

            {/* CTA */}
            <motion.div variants={fadeUpVariants} className="mt-2">
              <button
                className="group relative px-10 py-4 border border-[#a89880]/60 text-[11px] tracking-widest uppercase overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1714" }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  Request Sliding Door Quote
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-2"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
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
              isInView={isInView}
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
    </section>
  );
}
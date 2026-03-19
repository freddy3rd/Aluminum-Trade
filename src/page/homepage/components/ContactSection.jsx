import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import image_2 from "@/assets/images/aluminum/image_2.webp"
// ── Variants ─────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const wordVariants = {
  hidden:  { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5,  ease: [0.16, 1, 0.3, 1] } },
};

const lineVariants = {
  hidden:  { scaleX: 0, originX: "50%" },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.533 5.854L.057 23.428a.75.75 0 00.916.914l5.674-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.922 0-3.736-.5-5.31-1.376l-.38-.217-3.938 1.014 1.04-3.835-.236-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.149 0 11.499c0 3.606 1.794 6.819 4.608 8.921V24l4.208-2.311A13.31 13.31 0 0012 21.999c6.627 0 12-5.149 12-11.5S18.627 0 12 0zm1.193 15.494l-3.056-3.26-5.965 3.26 6.563-6.972 3.13 3.26 5.892-3.26-6.564 6.972z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function ClosingCTA() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] text-[#fafafa] overflow-hidden"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
    >

      {/* ── Background: blurred house image layer ── */}
      <div className="absolute inset-0">
        <img
        //   src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=60"
          src={image_2}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ filter: "blur(2px) brightness(0.22) saturate(0.6)", transform: "scale(1.05)" }}
        />
      </div>

      {/* ── Aluminum mesh texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)",
        }}
      />

      {/* ── Radial glow behind headline ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Gradient vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80 pointer-events-none" />

      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-16 py-28 flex flex-col items-center text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.span
            variants={fadeUpVariants}
            className="alum-badge text-white/35 mb-8 block"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Limited Slots Available
          </motion.span>

          {/* Headline */}
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            {["Ready", "to", "Upgrade"].map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              variants={wordVariants}
              className="inline-block italic"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Your Home?
            </motion.span>
          </h2>

          {/* Divider */}
          <motion.div
            variants={lineVariants}
            className="h-px w-24 my-8"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)",
            }}
          />

          {/* Subtext */}
          <motion.p
            variants={fadeUpVariants}
            className="text-white/50 text-lg leading-relaxed mb-12 max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Book your{" "}
            <span className="text-white/80">Free Measurement</span>
            {" "}today and let our team transform every opening in your home.
          </motion.p>

          {/* ── Primary CTA button with pulse ── */}
          <motion.div variants={fadeUpVariants} className="relative mb-10">
            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-none border border-white/20 pointer-events-none"
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ margin: "-6px" }}
            />
            <motion.div
              className="absolute inset-0 border border-white/10 pointer-events-none"
              animate={{ scale: [1, 1.22, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              style={{ margin: "-12px" }}
            />

            <button
              onClick={() => (window.location.href = "/contact")}
              className="group relative px-14 py-5 bg-white text-[#0a0a0a] text-[11px] tracking-[0.25em] uppercase overflow-hidden hover:text-white transition-colors duration-500"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              <span className="relative z-10 flex items-center gap-4">
                Get Free Quote Now
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-2"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-[#1a1714] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </motion.div>

          {/* ── Contact row ── */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8"
          >
            {/* Phone */}
            <a
              href="tel:+639919423577"
              className="group flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-white/10 group-hover:border-white/25 flex items-center justify-center transition-colors duration-300">
                <PhoneIcon />
              </div>
              <span
                className="text-sm tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                +63 991 942 3577
              </span>
            </a>

            {/* Divider dot */}
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/15" />

            {/* WhatsApp */}
            <a
              href="https://wa.me/639XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white/40 hover:text-[#25D366] transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-white/10 group-hover:border-[#25D366]/40 flex items-center justify-center transition-colors duration-300">
                <WhatsAppIcon />
              </div>
              <span
                className="text-sm tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                WhatsApp Us
              </span>
            </a>

            {/* Divider dot */}
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/15" />

            {/* Messenger */}
            <a
              href="https://www.facebook.com/jonard.barrete"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-white/40 hover:text-[#0084FF] transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-white/10 group-hover:border-[#0084FF]/40 flex items-center justify-center transition-colors duration-300">
                <MessengerIcon />
              </div>
              <span
                className="text-sm tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Message Us
              </span>
            </a>
          </motion.div>

          {/* Fine print */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-10 text-white/20 text-[10px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Free consultation · No commitment · Metro Manila & nearby areas
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
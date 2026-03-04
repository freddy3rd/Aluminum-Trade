import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Contact data ──────────────────────────────────────────────────────────────
const contactDetails = [
  {
    id: "01",
    label: "Visit Us",
    value: "53 AFP Road, Quezon City",
    sub: "1127 Metro Manila, Philippines",
    href: "https://maps.google.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "02",
    label: "Call Us",
    value: "+63 2 8123 4567",
    sub: "Mon–Sat, 8:00am – 6:00pm",
    href: "tel:+6328123 4567",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
  {
    id: "03",
    label: "Email Us",
    value: "studio@alumcraft.ph",
    sub: "Response within 24 hours",
    href: "mailto:studio@alumcraft.ph",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "Facebook",
    handle: "@alumcraft.ph",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: "@alumcraft.studio",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    handle: "@alumcraft",
    href: "https://tiktok.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: "Shopee",
    handle: "alumcraft.shop",
    href: "https://shopee.ph",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a4 4 0 014 4H8a4 4 0 014-4zm7 5H5l1.5 12.5a1 1 0 001 .5h9a1 1 0 001-.5L19 7zm-7 3a1 1 0 011 1v4a1 1 0 01-2 0v-4a1 1 0 011-1z" />
      </svg>
    ),
  },
];

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineVariant = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

// ── Marquee headline strip ────────────────────────────────────────────────────
const marqueeWords = ["Crafted to Last", "Built for Beauty", "Engineered for Life", "Custom to You", "Aluminium Perfected"];

function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden py-5 border-y border-[#c8bfb4]/40 my-16" style={{ background: "#ede6db" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-0 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-[#9c8870] px-10"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              {word}
            </span>
            <span className="text-[#c8bfb4] text-[8px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formState.name && formState.phone) setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5EFE6] overflow-hidden py-28 px-6 md:px-16"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Marketing headline block ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="block text-[10px] tracking-[0.3em] uppercase text-[#9c8870] mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            Get in Touch
          </span>

          {/* Large editorial headline */}
          <div className="relative">
            <h2
              className="text-[#1a1714] leading-[0.88]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
              }}
            >
              Let's Build
              <br />
              <em className="text-[#7a6a58]">Something</em>
              <span className="relative inline-block">
                Lasting
                {/* Underline accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-px origin-left"
                  style={{ background: "linear-gradient(to right, #a89880, transparent)" }}
                />
              </span>
            </h2>

            {/* Floating badge — top right of headline */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="absolute top-0 right-0 hidden md:flex flex-col items-end gap-1"
            >
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#b8a898] border border-[#c8bfb4]/60 px-3 py-1.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Est. 2025
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#b8a898]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Quezon City, PH
              </span>
            </motion.div>
          </div>

          {/* Sub-copy */}
          <motion.p
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mt-8 text-[#6b5e52] text-base leading-relaxed max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            From a single cabinet to a full-home installation — our team is ready
            to bring your vision to life with precision-fabricated aluminium built to outlast.
          </motion.p>

          <motion.div
            variants={lineVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-10 h-px origin-left"
            style={{ background: "linear-gradient(to right, #a89880aa, #a8988033, transparent)" }}
          />
        </motion.div>

        {/* ── Marquee ── */}
        <MarqueeStrip />

        {/* ── Main grid: contact details + form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-px bg-[#c8bfb4]/30">

          {/* Left — contact details + socials */}
          <div className="bg-[#F5EFE6] flex flex-col divide-y divide-[#c8bfb4]/50">

            {/* Contact cards */}
            {contactDetails.map((c, i) => (
              <motion.a
                key={c.id}
                href={c.href}
                target={c.label === "Visit Us" ? "_blank" : undefined}
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                className="group flex items-start gap-6 px-8 py-7 hover:bg-[#ede6db] transition-colors duration-500"
              >
                {/* Number */}
                <span className="text-[10px] tracking-[0.25em] text-[#b8a898] pt-1 shrink-0"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.id}</span>

                {/* Icon */}
                <div className="text-[#9c8870] group-hover:text-[#5c4f43] transition-colors duration-300 mt-0.5 shrink-0">
                  {c.icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#9c8870] mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{c.label}</p>
                  <p className="text-[#1a1714] text-lg leading-tight group-hover:text-[#5c4f43] transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>{c.value}</p>
                  <p className="text-[#9c8870] text-xs mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{c.sub}</p>
                </div>

                {/* Arrow */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                  className="text-[#b8a898] group-hover:text-[#5c4f43] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 mt-1 shrink-0">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </motion.a>
            ))}

            {/* Social media block */}
            <motion.div
              custom={4}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="px-8 py-7"
            >
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#9c8870] mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                Follow Our Work
              </p>

              <div className="grid grid-cols-2 gap-px bg-[#c8bfb4]/30">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(s.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className="group flex items-start gap-3 bg-[#F5EFE6] px-5 py-4 hover:bg-[#ede6db] transition-colors duration-400"
                  >
                    <div className="text-[#9c8870] group-hover:text-[#5c4f43] transition-colors duration-300 mt-0.5 shrink-0">
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-[#1a1714] text-sm leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}>{s.label}</p>
                      <p className="text-[#9c8870] text-[9px] mt-0.5 group-hover:text-[#5c4f43] transition-colors duration-300"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{s.handle}</p>
                    </div>

                    {/* Animated arrow */}
                    <motion.svg
                      width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="ml-auto mt-1 text-[#b8a898] group-hover:text-[#5c4f43]"
                      animate={{ x: hoveredSocial === s.label ? 2 : 0, y: hoveredSocial === s.label ? -2 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </motion.svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — enquiry form */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="bg-[#F5EFE6] px-8 md:px-12 py-10 flex flex-col justify-between"
          >
            <div>
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#9c8870] mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                Quick Enquiry
              </p>
              <h3 className="text-[#1a1714] text-3xl md:text-4xl leading-tight mb-8"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>
                Tell us about
                <br />
                <em className="text-[#7a6a58]">your project</em>
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 flex-1"
                >
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.25em] uppercase text-[#9c8870]"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>Full Name</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      placeholder="Your name"
                      className="bg-transparent border-b border-[#c8bfb4]/60 focus:border-[#5c4f43] outline-none py-3 text-[#1a1714] text-sm placeholder-[#b8a898] transition-colors duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.25em] uppercase text-[#9c8870]"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>Phone / Viber</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                      placeholder="+63 9XX XXX XXXX"
                      className="bg-transparent border-b border-[#c8bfb4]/60 focus:border-[#5c4f43] outline-none py-3 text-[#1a1714] text-sm placeholder-[#b8a898] transition-colors duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    />
                  </div>

                  {/* Interest */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] tracking-[0.25em] uppercase text-[#9c8870]"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>I'm interested in</label>
                    <div className="flex flex-wrap gap-2">
                      {["Cabinet", "Door", "Window", "Others"].map((tag) => {
                        const active = formState.message.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              const tags = formState.message
                                ? formState.message.split(", ").filter(Boolean)
                                : [];
                              const next = active
                                ? tags.filter(t => t !== tag)
                                : [...tags, tag];
                              setFormState(s => ({ ...s, message: next.join(", ") }));
                            }}
                            className="text-[9px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              background: active ? "#1a1714" : "transparent",
                              borderColor: active ? "#1a1714" : "rgba(168,152,128,0.4)",
                              color: active ? "#F5EFE6" : "#6b5e52",
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-[9px] tracking-[0.25em] uppercase text-[#9c8870]"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>Message <span className="text-[#b8a898] normal-case tracking-normal">(optional)</span></label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                      placeholder="Tell us about your space, measurements, or ideas..."
                      className="bg-transparent border-b border-[#c8bfb4]/60 focus:border-[#5c4f43] outline-none py-3 text-[#1a1714] text-sm placeholder-[#b8a898] transition-colors duration-300 resize-none"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="group relative mt-4 flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#1a1714] border border-[#a89880]/60 px-8 py-4 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500 self-start"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="relative z-10">Send Enquiry</span>
                    <svg className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5 flex-1 justify-center"
                >
                  {/* Animated checkmark */}
                  <div className="w-14 h-14 border border-[#a89880]/40 flex items-center justify-center">
                    <motion.svg
                      width="22" height="22" viewBox="0 0 24 24" fill="none"
                      stroke="#5c4f43" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.path d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      />
                    </motion.svg>
                  </div>
                  <div>
                    <h4 className="text-[#1a1714] text-2xl leading-tight mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>
                      Message Received
                    </h4>
                    <p className="text-[#7a6a58] text-sm leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
                      Thank you, <em>{formState.name}</em>. Our team will reach out within 24 hours to discuss your project.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", phone: "", message: "" }); }}
                    className="text-[9px] tracking-[0.25em] uppercase text-[#9c8870] hover:text-[#5c4f43] transition-colors duration-300 self-start"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ← Send another enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          custom={5}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#c8bfb4]/50 pt-10"
        >
          <p className="text-[#9c8870] text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: "0.08em" }}>
            © 2025 AlumCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a key={link} href="#"
                className="text-[9px] tracking-[0.2em] uppercase text-[#b8a898] hover:text-[#5c4f43] transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />
    </section>
  );
}
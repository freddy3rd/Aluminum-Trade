import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "10+", label: "Years Forging Excellence" },
  { value: "1.5k", label: "Projects Delivered Within Metro Manila" },
  { value: "99%", label: "Client Satisfaction Rate" },
];

const pillars = [
  {
    id: "01",
    title: "Precision Engineering",
    body: "Every profile is cut, mitered, and welded to tolerances measured in fractions of a millimetre. We don't approximate — we engineer.",
  },
  {
    id: "02",
    title: "Bespoke Finishes",
    body: "From anodised matt black to powder-coated champagne, each finish is applied in-house under strict quality control to last decades.",
  },
  {
    id: "03",
    title: "Site-to-Studio Process",
    body: "Our surveyors measure every opening on-site. Fabrication begins only when dimensions are confirmed — zero guesswork, zero gaps.",
  },
];

const contacts = [
  {
    label: "Phone",
    value: "+63 2 8123 4567",
    href: "tel:+6328123 4567",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "studio@alumcraft.ph",
    href: "mailto:studio@alumcraft.ph",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Hours",
    value: "Mon–Sat, 8am–6pm",
    href: null,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MAP_HREF =
  "https://www.google.com/maps/place/J.B.+UPHOLSTERY+SHOP/@14.6817439,121.0712189,3a,75y,256.09h,87.56t/data=!3m7!1e1!3m5!1sZQ0a392GruZ98HSOQElPJg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.442923226712523%26panoid%3DZQ0a392GruZ98HSOQElPJg%26yaw%3D256.08905789080296!7i16384!8i8192!4m16!1m9!3m8!1s0x3397b0ace602a773:0x71020c73b77cc7c3!2s49+Air+Force+Rd,+Quezon+City,+Metro+Manila!3b1!8m2!3d14.6817523!4d121.0714892!10e5!16s%2Fg%2F11h5npyrt4!3m5!1s0x3397b0ace6d7d64b:0x88a10cffc718218e!8m2!3d14.6816118!4d121.0711632!16s%2Fg%2F11y50zrcss?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D";

const StudioSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activePillar, setActivePillar] = useState(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      className="panel relative bg-[#F5EFE6] overflow-hidden py-28 px-6 md:px-16"
      data-bg="rgba(208, 184, 168, 0.6)"
      data-text="#1A1A1A"
    >
      {/* Top edge rule */}
      <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#a89880]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span
            className="block text-[10px] tracking-[0.3em] uppercase text-[#9c8870] mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            Our Atelier
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-[#1a1714] text-5xl md:text-6xl lg:text-7xl leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              The Studio
              <br />
              <em className="text-[#7a6a58]">Behind the Work</em>
            </h2>
            <p
              className="text-[#6b5e52] text-sm leading-relaxed max-w-xs md:text-right"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              A single facility. Every process — design, fabrication,
              finishing — under one roof, under our control.
            </p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px bg-gradient-to-r from-[#a89880]/60 via-[#a89880]/20 to-transparent origin-left"
          />
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-px bg-[#c8bfb4]/30">

          {/* Left — parallax image */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="relative overflow-hidden bg-[#F5EFE6] aspect-[4/5] lg:aspect-auto lg:min-h-[620px]"
            ref={imageRef}
          >
            <motion.div
              className="absolute inset-[-8%] w-[116%] h-[116%]"
              style={{ y: imageY }}
            >
              <img
                src="/studio/studio_1.jpg"
                alt="Aluminium fabrication studio"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Warm vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5EFE6]/80 via-[#F5EFE6]/20 to-transparent" /><div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6]/20 to-transparent" />

            {/* ── Enhanced location card ── */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              
              <a  href={MAP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="border border-[#a89880]/40 bg-[#F5EFE6]/80 backdrop-blur-sm p-6 hover:bg-[#F5EFE6]/95 transition-colors duration-400">
                  {/* Pin icon + badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c8870] shrink-0 mt-0.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span
                        className="text-[9px] tracking-[0.28em] uppercase text-[#9c8870]"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                      >
                        Est. 2025 · Studio Location
                      </span>
                    </div>
                    {/* External link arrow */}
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="text-[#b8a898] group-hover:text-[#5c4f43] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>

                  {/* Address */}
                  <p
                    className="text-[#1a1714] text-xl leading-snug mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                  >
                    53 AFP Road
                    <br />
                    <em className="text-[#7a6a58]">Quezon City, 1127 Metro Manila</em>
                  </p>

                      {/* Decorative divider */}
                      <div className="h-px bg-[#c8bfb4]/60 mb-3" />

                      {/* Direction hint */}
                      <div className="flex items-center gap-2">
                    <motion.div
                      className="h-px bg-[#a89880] origin-left"
                      style={{ width: "20px" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    />
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase text-[#9c8870] group-hover:text-[#5c4f43] transition-colors duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                    >
                      Open in Google Maps
                    </span>

                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right — stats + pillars */}
          <div className="bg-[#F5EFE6] flex flex-col">

            {/* Stats row */}
            <motion.div
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="grid grid-cols-3 divide-x divide-[#c8bfb4]/50"
            >
              {stats.map((s, i) => (
                <div key={i} className="px-8 py-10 flex flex-col gap-1">
                  <span
                    className="text-[#1a1714] text-3xl md:text-4xl leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[#7a6a58] text-[11px] leading-snug"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <div className="h-px bg-[#c8bfb4]/50" />

            {/* Pillars accordion */}
            <div className="flex flex-col divide-y divide-[#c8bfb4]/50 flex-1">
              {pillars.map((p, i) => {
                const open = activePillar === p.id;
                return (
                  <motion.div
                    key={p.id}
                    custom={i + 2}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                  >
                    <button
                      onClick={() => setActivePillar(open ? null : p.id)}
                      className="w-full flex items-start gap-6 px-8 py-7 text-left group hover:bg-[#ede6db] transition-colors duration-500"
                    >
                      <span
                        className="text-[10px] tracking-[0.25em] text-[#b8a898] pt-0.5 shrink-0"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {p.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <h3
                            className="text-[#1a1714] text-lg leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                          >
                            {p.title}
                          </h3>
                          <svg
                            width="14" height="14" viewBox="0 0 14 14" fill="none"
                            className="shrink-0 text-[#b8a898] group-hover:text-[#5c4f43] transition-colors duration-300"
                            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.35s ease" }}
                          >
                            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p
                            className="text-[#7a6a58] text-sm leading-relaxed mt-3"
                            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                          >
                            {p.body}
                          </p>
                        </motion.div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Contact + CTA row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 border-t border-[#c8bfb4]/50 pt-12"
        >
          {/* Contact pills row */}
          <div className="flex flex-wrap gap-px bg-[#c8bfb4]/30 mb-10">
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                className="flex-1 min-w-[160px] bg-[#F5EFE6] px-8 py-6 group hover:bg-[#ede6db] transition-colors duration-400"
              >
                {c.href ? (
                  <a href={c.href} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#9c8870]">
                      {c.icon}
                      <span
                        className="text-[9px] tracking-[0.25em] uppercase"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                      >
                        {c.label}
                      </span>
                    </div>
                    <span
                      className="text-[#1a1714] text-sm group-hover:text-[#5c4f43] transition-colors duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: "1rem" }}
                    >
                      {c.value}
                    </span>
                  </a>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#9c8870]">
                      {c.icon}
                      <span
                        className="text-[9px] tracking-[0.25em] uppercase"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                      >
                        {c.label}
                      </span>
                    </div>
                    <span
                      className="text-[#1a1714] text-sm"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: "1rem" }}
                    >
                      {c.value}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom meta + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p
              className="text-[#6b5e52] text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Tours available by appointment — see the craft firsthand.
            </p>
            <button
              className="group relative flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#1a1714] border border-[#a89880]/60 px-8 py-3 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="relative z-10">Book a Studio Visit</span>
              <svg
                className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioSection;
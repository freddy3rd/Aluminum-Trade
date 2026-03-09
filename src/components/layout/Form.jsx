import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Token constants ───────────────────────────────────────────────────────────
const C = {
  bg:          "#F5EFE6",
  bgDeep:      "#ede6db",
  text:        "#1a1714",
  muted:       "#7a6a58",
  light:       "#9c8870",
  faint:       "#b8a898",
  border:      "rgba(168,152,128,0.35)",
  borderHover: "#5c4f43",
  fill:        "#2a1f17",
  trigger:     "#1a1714",
};

const display = "'Cormorant Garamond', Georgia, serif";
const body    = "'DM Sans', sans-serif";

// ── Contact items ─────────────────────────────────────────────────────────────
const contacts = [
  {
    id: "01",
    label: "Visit",
    value: "53 AFP Road, QC",
    href: "https://maps.google.com",
    target: "_blank",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    id: "02",
    label: "Call",
    value: "+63 2 8123 4567",
    href: "tel:+6328123 4567",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
  },
  {
    id: "03",
    label: "Email",
    value: "studio@alumcraft.ph",
    href: "mailto:studio@alumcraft.ph",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: "04",
    label: "Viber",
    value: "+63 9XX XXX XXXX",
    href: "viber://chat?number=%2B639XXXXXXXXX",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

// ── Form state ────────────────────────────────────────────────────────────────
const empty = { name: "", phone: "", interest: "" };
const interests = ["Cabinet", "Door", "Window", "Others"];

// ── Floating Contact Panel ────────────────────────────────────────────────────
export function FloatingContact() {
  const [open, setOpen]           = useState(false);
  const [tab, setTab]             = useState("info"); // "info" | "form"
  const [form, setForm]           = useState(empty);
  const [sent, setSent]           = useState(false);
  const [pulse, setPulse]         = useState(true);

  // Stop pulse after first open
  useEffect(() => {
    if (open) setPulse(false);
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleInterest = (v) =>
    setForm((f) => ({ ...f, interest: f.interest === v ? "" : v }));
  const submit = () => {
    if (form.name && form.phone) setSent(true);
  };
  const reset = () => { setForm(empty); setSent(false); setTab("info"); };

  // ── Panel animation ──
  const panelVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.95,
      transformOrigin: "bottom right",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: 16,
      scale: 0.96,
      transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
    },
  };

  const fadeUp = {
    hidden:  { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.05 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(26,23,20,0.25)",
              backdropFilter: "blur(2px)",
              zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Floating panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              bottom: "6rem",
              right: "1.5rem",
              width: "min(92vw, 360px)",
              background: C.bg,
              border: `1px solid ${C.border}`,
              boxShadow: "0 32px 80px rgba(26,23,20,0.18), 0 4px 16px rgba(26,23,20,0.08)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: C.fill,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontFamily: body, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: C.faint, marginBottom: 4 }}>
                  AlumCraft Studio
                </p>
                <p style={{ fontFamily: display, fontSize: 22, fontWeight: 300, color: C.bg, lineHeight: 1 }}>
                  Get in Touch
                </p>
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 32, height: 32,
                  border: `1px solid rgba(245,239,230,0.15)`,
                  background: "transparent",
                  color: C.faint,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,239,230,0.1)"; e.currentTarget.style.color = C.bg; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.faint; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Tab switcher */}
            <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
              {["info", "form"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: "11px 0",
                    fontFamily: body,
                    fontSize: 9,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    background: tab === t ? C.bg : C.bgDeep,
                    color: tab === t ? C.text : C.light,
                    border: "none",
                    borderBottom: tab === t ? `1.5px solid ${C.fill}` : "1.5px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {t === "info" ? "Contact Info" : "Quick Enquiry"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ padding: "20px 22px 24px", minHeight: 260 }}>
              <AnimatePresence mode="wait">

                {/* ── Info tab ── */}
                {tab === "info" && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {contacts.map((c, i) => (
                        <motion.a
                          key={c.id}
                          href={c.href}
                          target={c.target}
                          rel="noopener noreferrer"
                          custom={i}
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            padding: "13px 0",
                            borderBottom: i < contacts.length - 1 ? `1px solid ${C.border}` : "none",
                            textDecoration: "none",
                            color: C.text,
                            transition: "color 0.25s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = C.borderHover)}
                          onMouseLeave={e => (e.currentTarget.style.color = C.text)}
                        >
                          <div style={{ color: C.light, flexShrink: 0, transition: "color 0.25s" }}>
                            {c.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontFamily: body, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.light, marginBottom: 2 }}>
                              {c.label}
                            </p>
                            <p style={{ fontFamily: display, fontSize: 16, fontWeight: 300, lineHeight: 1.2 }}>
                              {c.value}
                            </p>
                          </div>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: C.faint, flexShrink: 0 }}>
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                            <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </motion.a>
                      ))}
                    </div>

                    {/* Hours note */}
                    <motion.p
                      custom={4}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      style={{
                        marginTop: 16,
                        fontFamily: body, fontSize: 10,
                        color: C.faint, letterSpacing: "0.06em",
                        textAlign: "center",
                      }}
                    >
                      Mon–Sat · 8:00am – 6:00pm
                    </motion.p>
                  </motion.div>
                )}

                {/* ── Form tab ── */}
                {tab === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AnimatePresence mode="wait">
                      {!sent ? (
                        <motion.div key="fields" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                          {/* Name */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontFamily: body, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.light }}>
                              Full Name
                            </label>
                            <input
                              type="text" value={form.name} onChange={set("name")}
                              placeholder="Your name"
                              style={{
                                background: "transparent", outline: "none",
                                borderBottom: `1px solid ${C.border}`,
                                padding: "8px 0",
                                fontFamily: body, fontSize: 13, fontWeight: 300,
                                color: C.text,
                                transition: "border-color 0.25s",
                              }}
                              onFocus={e => (e.target.style.borderBottomColor = C.borderHover)}
                              onBlur={e => (e.target.style.borderBottomColor = C.border)}
                            />
                          </div>

                          {/* Phone */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label style={{ fontFamily: body, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.light }}>
                              Phone / Viber
                            </label>
                            <input
                              type="tel" value={form.phone} onChange={set("phone")}
                              placeholder="+63 9XX XXX XXXX"
                              style={{
                                background: "transparent", outline: "none",
                                borderBottom: `1px solid ${C.border}`,
                                padding: "8px 0",
                                fontFamily: body, fontSize: 13, fontWeight: 300,
                                color: C.text,
                                transition: "border-color 0.25s",
                              }}
                              onFocus={e => (e.target.style.borderBottomColor = C.borderHover)}
                              onBlur={e => (e.target.style.borderBottomColor = C.border)}
                            />
                          </div>

                          {/* Interest chips */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={{ fontFamily: body, fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: C.light }}>
                              I need
                            </label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {interests.map((v) => {
                                const active = form.interest === v;
                                return (
                                  <button key={v} type="button" onClick={() => toggleInterest(v)}
                                    style={{
                                      fontFamily: body, fontSize: 9, letterSpacing: "0.2em",
                                      textTransform: "uppercase",
                                      padding: "6px 12px",
                                      border: `1px solid ${active ? C.text : C.border}`,
                                      background: active ? C.text : "transparent",
                                      color: active ? C.bg : C.muted,
                                      cursor: "pointer",
                                      transition: "all 0.25s",
                                    }}
                                  >
                                    {v}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Submit */}
                          <button
                            onClick={submit}
                            className="group"
                            style={{
                              marginTop: 4,
                              position: "relative",
                              overflow: "hidden",
                              display: "flex", alignItems: "center", gap: 10,
                              alignSelf: "flex-start",
                              padding: "11px 22px",
                              border: `1px solid ${C.border}`,
                              background: "transparent",
                              fontFamily: body, fontSize: 9,
                              letterSpacing: "0.25em", textTransform: "uppercase",
                              color: C.text, cursor: "pointer",
                              transition: "color 0.4s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = C.bg; e.currentTarget.querySelector(".fill-bg").style.transform = "translateX(0)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = C.text; e.currentTarget.querySelector(".fill-bg").style.transform = "translateX(-101%)"; }}
                          >
                            <span style={{ position: "relative", zIndex: 1 }}>Send Enquiry</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                              style={{ position: "relative", zIndex: 1 }}>
                              <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                            <span
                              className="fill-bg"
                              style={{
                                position: "absolute", inset: 0,
                                background: C.fill,
                                transform: "translateX(-101%)",
                                transition: "transform 0.45s cubic-bezier(0.76,0,0.24,1)",
                              }}
                            />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 }}
                        >
                          <div style={{
                            width: 48, height: 48,
                            border: `1px solid ${C.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                              stroke={C.borderHover} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                              <motion.path d="M5 13l4 4L19 7"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }} />
                            </motion.svg>
                          </div>
                          <div>
                            <p style={{ fontFamily: display, fontSize: 22, fontWeight: 300, color: C.text, marginBottom: 6 }}>
                              Message Received
                            </p>
                            <p style={{ fontFamily: body, fontSize: 12, fontWeight: 300, color: C.muted, lineHeight: 1.6 }}>
                              Thank you, <em>{form.name}</em>. We'll reach out within 24 hours.
                            </p>
                          </div>
                          <button onClick={reset}
                            style={{
                              fontFamily: body, fontSize: 9, letterSpacing: "0.22em",
                              textTransform: "uppercase", color: C.light,
                              background: "none", border: "none", cursor: "pointer",
                              textAlign: "left", padding: 0, transition: "color 0.25s",
                            }}
                            onMouseEnter={e => (e.target.style.color = C.borderHover)}
                            onMouseLeave={e => (e.target.style.color = C.light)}
                          >
                            ← Send another
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 22px",
          background: open ? C.bgDeep : C.fill,
          border: `1px solid ${open ? C.border : "transparent"}`,
          color: open ? C.text : C.bg,
          cursor: "pointer",
          transition: "background 0.35s, color 0.35s, border-color 0.35s",
          boxShadow: open ? "none" : "0 8px 32px rgba(26,23,20,0.28)",
        }}
      >
        {/* Pulse ring — shown until first open */}
        {pulse && (
          <motion.span
            style={{
              position: "absolute", inset: -4,
              border: `1px solid ${C.fill}`,
              pointerEvents: "none",
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <path d="M18 6L6 18M6 6l12 12"/>
            </motion.svg>
          ) : (
            <motion.svg key="chat" width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}>
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>

        <span style={{ fontFamily: body, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          {open ? "Close" : "Contact Us"}
        </span>
      </motion.button>
    </>
  );
}

// ── Demo wrapper ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0ebe2 0%, #e8dfd4 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: display,
    }}>
      <div style={{ textAlign: "center", color: C.text }}>
        <p style={{ fontFamily: body, fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.light, marginBottom: 16 }}>
          AlumCraft Studio
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: 0.95, margin: 0 }}>
          Precision Aluminium<br />
          <em style={{ color: C.muted }}>Built to Last</em>
        </h1>
        <p style={{ fontFamily: body, fontSize: 12, fontWeight: 300, color: C.light, marginTop: 20, letterSpacing: "0.06em" }}>
          Click the button below ↘
        </p>
      </div>

      <FloatingContact />
    </div>
  );
}
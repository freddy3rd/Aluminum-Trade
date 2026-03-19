import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

/* ───────────────── NAV ITEMS ───────────────── */
const navItems = [
  { label: "Collection", to: "/collections" },
  { label: "Studio", to: "/studio" },
  // { label: "Contact", to: "/contact" },
];

/* ───────────────── LOGO ───────────────── */
function LogoMark() {
  return (
    <NavLink to="/" className="group flex flex-col select-none">
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.22em",
        }}
        className="uppercase text-[1.1rem] text-[#1a1714]"
      >
        Alum<em>Craft</em><sup className="text-[10px]">PH</sup>
      </span>

      <span
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="text-[7px] tracking-[0.45em] uppercase text-[#9c8870]"
      >
        Fabrication Studio
      </span>

      <motion.div
        className="h-px bg-[#a89880] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
      />
    </NavLink>
  );
}

/* ───────────────── HEADER ───────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-40 px-4"
    >
      {/* Floating Card */}
      <div
        className="
          max-w-6xl mx-auto
          flex items-center justify-between
          rounded-2xl
          border border-black/5
          bg-white/90 backdrop-blur-xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          transition-all duration-500
          py-4 px-8 md:px-12
        "
      >
        {/* Logo */}
        <LogoMark />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.li
              key={item.to}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.4 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative group flex flex-col gap-1 text-[10px]
                   tracking-[0.28em] uppercase transition-colors
                   ${
                     isActive
                       ? "text-[#1a1714]"
                       : "text-[#5c4f43]/70 hover:text-[#1a1714]"
                   }`
                }
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.label}

                {/* Active underline */}
                <motion.span
                  className="h-px bg-[#a89880] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: location.pathname === item.to ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </NavLink>
              
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <NavLink
                to="/contact"
                className="group relative flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#1a1714] border border-[#a89880]/60 px-8 py-3 overflow-hidden hover:text-[#F5EFE6] transition-colors duration-500 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="relative z-10">ENQUIRE</span>
                
                <div className="absolute inset-0 bg-[#2a1f17] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </NavLink>
          </motion.li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px]"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-6 bg-[#1a1714]"
              animate={{
                rotate:
                  i === 0 ? (mobileOpen ? 45 : 0)
                  : i === 2 ? (mobileOpen ? -45 : 0)
                  : 0,
                y:
                  i === 0 ? (mobileOpen ? 7 : 0)
                  : i === 2 ? (mobileOpen ? -7 : 0)
                  : 0,
                opacity: i === 1 ? (mobileOpen ? 0 : 1) : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-4 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-black/5 shadow-lg">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block px-6 py-4 text-sm uppercase tracking-[0.25em] text-[#5c4f43]"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
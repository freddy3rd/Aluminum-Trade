import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['Collection', 'Studio', 'Craft', 'Contact'];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 md:px-12 ${
        isScrolled
          ? 'py-4 bg-black/20 backdrop-blur-lg border-b border-white/5'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="relative group overflow-hidden">
          <div className="text-2xl font-normal tracking-[0.1em] uppercase mix-blend-difference cursor-pointer">
            Aluminum Trade
          </div>
          <motion.div
            className="h-[1px] w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12 items-center">
          {navItems.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="text-[10px] tracking-[0.3em] uppercase relative group text-white/70 hover:text-white transition-colors"
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <button className="ml-4 px-6 py-2 border border-white/20 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500">
              Enquire
            </button>
          </motion.li>
        </ul>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden flex flex-col gap-1.5 cursor-pointer group z-[101]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`w-6 h-[1px] bg-white transition-all ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-4 h-[1px] bg-white transition-all ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[1px] bg-white transition-all ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`md:hidden flex flex-col gap-6 mt-4 overflow-hidden backdrop-blur-lg px-6 py-4 rounded-b-lg 
              ${isScrolled ? 'bg-black/30 border border-white/10' : 'bg-black border border-white/5'}
              `}
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-white uppercase tracking-[0.2em] text-sm hover:text-white/70 transition-colors"
                >
                  {item}
                </a>
              </motion.li>
            ))}
            <motion.li>
              <button className="w-full mt-2 px-6 py-2 border border-white/20 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                Enquire
              </button>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
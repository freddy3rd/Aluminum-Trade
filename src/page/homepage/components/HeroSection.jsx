

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import slinding_panel from '@/assets/video/Sliding_panel_animation.mp4'
import slinding_panel_reverse from '@/assets/video/Sliding_panel_animation_reversed.mp4'
import SmoothForwardBackwardVideo from '../../../components/ui/PingPongVid';


const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax Scroll Logic
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, 250]);
  const scrollVelocity = useSpring(yRange, { stiffness: 400, damping: 90 });




  return (
    <div className="hero-section relative min-h-screen bg-[#0a0a0a] text-[#fafafa] font-sans overflow-hidden selection:bg-white selection:text-black">
        <div className='absolute inset-0 h-screen overflow-hidden'>
            {/* <PingPongVideo src={slinding_panel} /> */}
            <SmoothForwardBackwardVideo forwardSrc={slinding_panel} backwardSrc={slinding_panel_reverse} />

        </div> 
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 3, y: mousePos.y - 3 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-white/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x - (isHovering ? 30 : 15),
          y: mousePos.y - (isHovering ? 30 : 15),
          width: isHovering ? 60 : 30,
          height: isHovering ? 60 : 30,
          backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      />

      {/* Navigation */}
    

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <motion.div
          style={{ y: scrollVelocity }}
          className="absolute inset-0 w-full h-full bg-[url('/mnt/kimi/upload/ezgif-frame-160.jpg')] bg-cover bg-center brightness-[0.4] contrast-[1.1]"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/70 to-black/80 z-10" />
        <div className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuOScgbnVtT2N0YXZlcz0nNCcgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknLz48L3N2Zz4=')]" />

        {/* Content */}
        <div className="relative z-30 w-full max-w-7xl px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-xs tracking-[0.3em] uppercase text-gray-400 font-light mb-6"
            >
              Architectural Systems
            </motion.span>
            
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8">
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="block">Threshold</motion.span>
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="block italic text-gray-400">Between</motion.span>
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="block">Worlds</motion.span>
            </h1>

            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: '100%' }} 
              transition={{ delay: 0.8, duration: 1.5 }}
              className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent max-w-md mb-8 " 
            />

            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
              className="text-gray-300 text-lg font-light leading-relaxed max-w-md mb-10 "
            >
              Where minimalist design meets structural integrity. Our door systems redefine the boundary between interior and exterior space.
            </motion.p>
            <div className='flex flex-col md:flex-row gap-2 flex-wrap'>
             
              <button
                className="group relative flex items-center gap-4 text-[12px] font-medium tracking-[0.25em] uppercase text-[#F5EFE6] hover:text-black border border-[#a89880]/60 px-8 py-3 overflow-hidden transition-colors duration-500 "
              >
                <span className="relative z-10">Explore Collections</span>
                <svg
                  className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </button>

              <button
                className="group relative flex items-center gap-4 text-[12px] tracking-[0.25em] bg-white text-black uppercase border border-[#a89880]/60 px-8 py-3 overflow-hidden transition-colors duration-500"
              >
                <span className="relative z-10 font-medium">Request Quotations</span>
                <svg
                  className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {/* <div className="absolute inset-0 w-full h-full bg-[#F5EFE6]/60" /> */}
              </button>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="hidden md:grid grid-cols-2 gap-8">
            {[
              { label: 'Material', value: 'Aerospace Aluminum' },
              { label: 'Finish', value: 'Matte Black Anodized' },
              { label: 'Glazing', value: 'Triple Pane Low-E' },
              { label: 'Hardware', value: 'Concealed Hinges' }
            ].map((spec, i) => (
              <motion.div 
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-l border-white/20 pl-4 "
              >
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">{spec.label}</div>
                <div className="text-lg font-light">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Scroll</span>
          <motion.div 
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-white to-transparent origin-top"
          />
        </div>
      </section>

      {/* Floating Badges */}
      {/* <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="hidden lg:block absolute top-[20%] right-[10%] px-6 py-3 border border-white/20 bg-white/5 backdrop-blur-md text-[10px] tracking-[0.2em] uppercase z-30"
      >
        Precision Engineering
      </motion.div> */}

    </div>
  );
};

export default Hero;
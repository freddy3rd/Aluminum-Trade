import React, { useState } from "react";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/layout/Header";
import Homepage from "./page/homepage";
import StudioSection from "./page/studio/StudioSection";
import CollectionSection from "./page/collections/AluminumCollections";
import ContactSection from "./page/contact/Contact";
import PageNotFound from "./components/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";

import slinding_panel from "@/assets/video/Sliding_panel_animation.mp4";
import SplashScreen from "./components/SplashScreen";
import { FloatingContact } from "./components/layout/Form";


const AppRoutes = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <HashRouter>
      <SplashScreen
        videoSrc={slinding_panel}
        title="ALUMCRAFT"
        subtitle="Architectural Systems"
        minDuration={2200}
        onComplete={() => setSplashDone(true)}
      />
      <AnimatePresence mode="wait">
        {splashDone && (
          <>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route
                  path="/"
                  element={
                    
                      <Homepage />
   
                  }
                />
              <Route path="/studio" element={<StudioSection />} />
              <Route path="/collections" element={<CollectionSection />} />
              <Route path="/contact" element={<ContactSection />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
        )}
        <FloatingContact />
      </AnimatePresence>
    </HashRouter>
  );
};

export default AppRoutes;
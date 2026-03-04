import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Header from "./components/layout/Header";
import Homepage from "./page/homepage";
import StudioSection from "./page/studio/StudioSection";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import CollectionSection from "./page/collections/AluminumCollections";
import ContactSection from "./page/contact/Contact";
import PageNotFound from "./components/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";

const AppRoutes = () => {
  const [showSplash, setShowSplash] = useState(true);

return (
    <BrowserRouter>
      <ThemeProvider>

        {/* Scroll reset on navigation */}
        <ScrollToTop />

        {/* Floating Header */}
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/studio" element={<StudioSection />} />
          <Route path="/collections" element={<CollectionSection />} />
          <Route path="/contact" element={<ContactSection />} />

          {/* 404 fallback */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
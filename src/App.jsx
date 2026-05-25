import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "lenis";
import { Navbar, Hero } from "./components/Header";
import CampaignResults from "./components/CampaignResults";
import Offer from "./components/Offer";
import Advantage from "./components/Advantage";
// import Features from "./components/Features"; // hidden
import Protocol from "./components/Protocol";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import CookieBanner from "./components/CookieBanner";

gsap.registerPlugin(ScrollTrigger);

export const lenisRef = { current: null };

const Home = () => (
  <>
    <Hero />
    <CampaignResults />
    <Advantage />
    <Offer />
    <Testimonials />
    <FAQ />
  </>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <Router basename="/">
      <div className="min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-background overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imprint" element={<Impressum />} />
            <Route path="/privacy-policy" element={<Datenschutz />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;

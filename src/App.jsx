import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "lenis";
import { Navbar, Hero } from "./components/Header";
import CampaignResults from "./components/CampaignResults";
import Problem from "./components/Problem";
import System from "./components/System";
import Process from "./components/Process";
import Deliverables from "./components/Deliverables";
import Comparison from "./components/Comparison";
import Timeline from "./components/Timeline";
import Offer from "./components/Offer";
import ROICalculator from "./components/ROICalculator";
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

const Home = () => (
  <>
    <Hero />
    <CampaignResults />
    <Problem />
    <System />
    <Offer />
    <Process />
    <ROICalculator />
    <Testimonials />
    <FAQ />
  </>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <Router basename="/">
      <div className="min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-white overflow-x-hidden">
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

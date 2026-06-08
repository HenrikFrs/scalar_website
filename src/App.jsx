import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Navbar, Hero } from "./components/Header";
import CampaignResults from "./components/CampaignResults";
import Problem from "./components/Problem";
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
    <Process />
    <Comparison />
    <ROICalculator />
    <Testimonials />
    <FAQ />
  </>
);

function App() {

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

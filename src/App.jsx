import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "lenis";
import { Navbar, Hero } from "./components/Header";
import CampaignResults from "./components/CampaignResults";
import LiveReplies from "./components/LiveReplies";
import Problem from "./components/Problem";
import System from "./components/System";
import Process from "./components/Process";
import Comparison from "./components/Comparison";
import Timeline from "./components/Timeline";
import ROICalculator from "./components/ROICalculator";
import Offer from "./components/Offer";
import Advantage from "./components/Advantage";
// import Features from "./components/Features"; // hidden
import Protocol from "./components/Protocol";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import LinkedIn from "./pages/LinkedIn";
import CookieBanner from "./components/CookieBanner";
import { SENDING_DAYS } from "./lib/infra";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Monthly sending volume and fee per attended call, set in the ROI
  // calculator and also shown in the offer
  const [messagesSent, setMessagesSent] = useState(10000 * SENDING_DAYS);
  const [feePerCall, setFeePerCall] = useState(250);

  return (
    <>
      <Hero />
      <CampaignResults />
      <Problem />
      <System />
      <Process />
      <ROICalculator
        messagesSent={messagesSent}
        setMessagesSent={setMessagesSent}
        feePerCall={feePerCall}
        setFeePerCall={setFeePerCall}
      />
      <Offer messagesSent={messagesSent} feePerCall={feePerCall} />
      <LiveReplies />
      <Testimonials />
      <FAQ />
    </>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <Router basename="/">
      <Layout />
    </Router>
  );
}

// The LinkedIn page (German, light mode) brings its own navbar and footer
const Layout = () => {
  const { pathname } = useLocation();
  const isLinkedIn = pathname.startsWith("/linkedin");

  return (
    // overflow-x-clip, not hidden: hidden would break the sticky sections
    <div className="min-h-screen bg-background bg-noise text-body relative isolate overflow-x-clip">
      {!isLinkedIn && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/linkedin" element={<LinkedIn />} />
          <Route path="/imprint" element={<Impressum />} />
          <Route path="/privacy-policy" element={<Datenschutz />} />
        </Routes>
      </main>
      {!isLinkedIn && <Footer />}
      <CookieBanner lang={isLinkedIn ? "de" : "en"} />
    </div>
  );
};

export default App;

import React, { useEffect, useRef } from "react";
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
import Features from "./components/Features";
import Protocol from "./components/Protocol";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

gsap.registerPlugin(ScrollTrigger);

const Home = () => (
  <>
    <Hero />
    <Features />
    <Protocol />
    <Testimonials />
    <FAQ />
  </>
);

function App() {
  const lenisRef = useRef(null);

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

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      setTimeout(() => ScrollTrigger.refresh(), 50);
    }, [pathname]);
    return null;
  };

  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-background overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

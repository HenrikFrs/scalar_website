import React, { useState, useEffect } from "react";


const EU_TIMEZONES = new Set([
  "Europe/Vienna",
  "Europe/Brussels",
  "Europe/Sofia",
  "Europe/Zagreb",
  "Asia/Nicosia",
  "Europe/Prague",
  "Europe/Copenhagen",
  "Europe/Tallinn",
  "Europe/Helsinki",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Athens",
  "Europe/Budapest",
  "Europe/Dublin",
  "Europe/Rome",
  "Europe/Riga",
  "Europe/Vilnius",
  "Europe/Luxembourg",
  "Europe/Malta",
  "Europe/Amsterdam",
  "Europe/Warsaw",
  "Atlantic/Azores",
  "Europe/Lisbon",
  "Europe/Bucharest",
  "Europe/Bratislava",
  "Europe/Ljubljana",
  "Europe/Madrid",
  "Europe/Stockholm",
]);

function isEUUser() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return EU_TIMEZONES.has(tz);
  } catch {
    return false;
  }
}

const STORAGE_KEY = "scalar_cookie_consent";
const GTM_ID = "GTM-KD6QRBL4";

function loadGTM() {
  if (window.__gtmLoaded) return;
  window.__gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Non-EU users: load GTM immediately, no banner
    if (!isEUUser()) {
      loadGTM();
      return;
    }
    // EU users: check prior consent
    const prior = localStorage.getItem(STORAGE_KEY);
    if (prior === "accepted") {
      loadGTM();
      return;
    }
    if (prior === "declined") return;
    // No prior choice: show banner
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    loadGTM();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] w-[calc(100%-2rem)] max-w-2xl"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="bg-surface border border-borderLight rounded-2xl px-6 py-5 shadow-2xl flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-sm font-sans leading-relaxed">
            We use cookies and similar tracking technologies to analyze traffic
            and improve your experience. By clicking{" "}
            <span className="text-accent font-medium">Accept</span>, you consent
            to our use of cookies.{" "}
            <a
              href="/privacy-policy"
              className="underline underline-offset-2 text-muted hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-muted text-sm font-sans hover:text-foreground transition-colors px-3 py-1.5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-white text-black text-sm font-sans font-medium px-4 py-2.5 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

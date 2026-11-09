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
      <div className="bg-surface/95 backdrop-blur-md border border-borderLight px-6 py-5 shadow-2xl flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="type-small text-body">
            We use cookies and similar tracking technologies to analyze traffic
            and improve your experience. By clicking{" "}
            <span className="text-green">Accept</span>, you consent
            to our use of cookies.{" "}
            <a
              href="/privacy-policy"
              className="underline underline-offset-4 text-body hover:text-brand transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="btn-label text-body hover:text-foreground transition-colors px-3 py-1.5"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn btn-primary h-[41px] px-5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

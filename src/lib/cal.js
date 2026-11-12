export const CAL_URL =
  "https://cal.com/henrik-freisleben-3prokl/outbound-system";
export const CAL_LINK = "henrik-freisleben-3prokl/outbound-system";
export const CAL_NAMESPACE = "outbound-system";
export const CAL_SECTION_ID = "book";

export const openCal = () => window.open(CAL_URL, "_blank");

// Cal.com's official embed loader snippet: it queues calls until
// embed.js has loaded
const loadCal = () => {
  (function (C, A, L) {
    const p = (a, ar) => a.q.push(ar);
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  return window.Cal;
};

// Booker colours match the site's dark palette so it reads as part of
// the page, not a pasted-in widget
const darkVars = {
  "cal-brand": "#ffffff",
  "cal-brand-emphasis": "#cccccc",
  "cal-brand-text": "#000000",
  "cal-bg": "#100e11",
  "cal-bg-emphasis": "#242126",
  "cal-bg-subtle": "#18161a",
  "cal-bg-muted": "#18161a",
  "cal-border": "#242126",
  "cal-border-subtle": "#242126",
  "cal-border-muted": "#1c1a1e",
  "cal-border-emphasis": "#383838",
  "cal-border-booker-width": "0px",
  "cal-text-emphasis": "#ffffff",
  "cal-text": "#d4d4d4",
  "cal-text-subtle": "#9b9b9b",
  "cal-text-muted": "#838383",
};

export const mountCalInline = (selector) => {
  const Cal = loadCal();
  Cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
  Cal.ns[CAL_NAMESPACE]("inline", {
    elementOrSelector: selector,
    config: { layout: "month_view", theme: "dark" },
    calLink: CAL_LINK,
  });
  Cal.ns[CAL_NAMESPACE]("ui", {
    theme: "dark",
    hideEventTypeDetails: false,
    layout: "month_view",
    cssVarsPerTheme: { dark: darkVars, light: darkVars },
  });
};

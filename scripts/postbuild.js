// GitHub Pages only serves files that exist, so a visit to /linkedin would
// get 404.html (a 404 status Google won't index) before the redirect back to
// the app. Writing a real dist/linkedin/index.html serves the page directly,
// with German, light-mode metadata in the HTML itself.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");

const replaceOnce = (source, from, to) => {
  if (!source.includes(from)) {
    throw new Error(`postbuild: "${from}" not found in dist/index.html`);
  }
  return source.replace(from, to);
};

let page = replaceOnce(
  html,
  '<html lang="en" data-theme="dark">',
  '<html lang="de" data-theme="light">',
);
page = replaceOnce(
  page,
  '<meta name="theme-color" content="#100e11" />',
  '<meta name="theme-color" content="#ffffff" />',
);
page = replaceOnce(
  page,
  "<title>Scalar</title>",
  `<title>Scalar | LinkedIn-Outreach für B2B im DACH-Raum</title>
    <meta name="description" content="Neue Kundengespräche über LinkedIn, ohne Retainer: Wir übernehmen Zielgruppe, Nachrichten und Antworten. Abgerechnet wird pro wahrgenommenem Termin." />`,
);

mkdirSync("dist/linkedin", { recursive: true });
writeFileSync("dist/linkedin/index.html", page);
console.log("postbuild: wrote dist/linkedin/index.html");

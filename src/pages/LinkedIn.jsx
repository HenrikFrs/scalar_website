import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Info, Minus, Plus } from "lucide-react";
import { Navbar, MagneticButton } from "../components/Header";
import { CalEmbed, FooterLink } from "../components/Footer";
import HeroGrid from "../components/HeroGrid";
import { Section, SectionBorder, SectionHeader } from "../components/ui";
import { CAL_SECTION_ID, CAL_URL } from "../lib/cal";
import { SystemSteps } from "../components/System";
import LinkedInROI, {
  fmtInt,
  fmtMoney,
  useLinkedInModel,
} from "../components/LinkedInROI";
import {
  MessagingVisual,
  ProfileVisual,
  ReplyVisual,
  TargetingVisual,
} from "../components/SystemVisuals";

gsap.registerPlugin(ScrollTrigger);

// LinkedIn outreach for the DACH region: a separate, German offer in light
// mode. It isn't in the main navigation; the main footer links here.

const TITLE = "Scalar | LinkedIn-Outreach für B2B im DACH-Raum";

const navLinks = [
  { label: "System", href: "/linkedin#system" },
  { label: "Ablauf", href: "/linkedin#ablauf" },
  { label: "ROI", href: "/linkedin#roi" },
  { label: "Angebot", href: "/linkedin#angebot" },
  { label: "FAQ", href: "/linkedin#faq" },
];

// Scrolls to the booking calendar at the bottom of the page
const scrollToBooking = () => {
  const target = document.getElementById(CAL_SECTION_ID);
  if (!target) return;
  if (window.lenis) window.lenis.scrollTo(target, { offset: -80 });
  else target.scrollIntoView({ behavior: "smooth" });
};

// Fades a section's [data-reveal] children up once it scrolls into view
const useReveal = (ref) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
};

const Hero = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 24,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="pt-[66px] md:pt-[73px]">
      <div className="shell">
        <div className="frame relative overflow-hidden min-h-[calc(100svh-66px)] md:min-h-[calc(100svh-73px)] flex">
          <HeroGrid />
          <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-[var(--ci)] py-20">
            <span className="hero-element pill-tag mb-6">
              Für Sales-Teams im DACH-Raum
            </span>
            <h1 className="type-h1 text-[40px] md:text-[56px] lg:text-[72px] leading-none text-heading">
              <span className="hero-element block text-balance">
                Erfolgsbasierte Termin-Engine für B2B-Neukundengewinnung.
              </span>
              <span className="hero-element block text-balance text-muted"></span>
            </h1>

            <p className="hero-element mt-6 type-lead text-body max-w-xl">
              100% Done-For-You. Wir finden die Entscheider, starten die
              Gespräche, fassen nach und buchen warme Leads in deinen Kalender.
              Dein Sales-Team hält nur die Meetings.
            </p>

            <MagneticButton
              variant="primary"
              className="hero-element mt-8"
              onClick={scrollToBooking}
            >
              Strategiegespräch buchen
            </MagneticButton>
          </div>
        </div>
      </div>
      <SectionBorder />
    </section>
  );
};

// The client's side of the work: three steps, then we run everything
const onboarding = [
  {
    day: "Tag 1",
    title: "Onboarding-Formular ausfüllen",
    description:
      "Zehn Minuten. Du sagst uns, an wen du verkaufst, was du verkaufst und welche Bestandskunden wir ausschließen sollen.",
  },
  {
    day: "Tag 5–7",
    title: "Im Onboarding-Call freigeben",
    description:
      "Wir bringen alles fertig mit: optimierte Profile, geprüfte Zielliste und die ersten Nachrichten. Du liest, gibst Feedback und gibst frei.",
  },
  {
    day: "Tag 7",
    title: "Live gehen",
    description:
      "Nach der Freigabe starten die Kampagnen an Tag 7. Ab dann landen Termine in deinem Kalender.",
  },
];

const Onboarding = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Section id="ablauf" ref={ref}>
      <SectionHeader
        eyebrow="Ablauf"
        title="Du machst nichts."
        accent="Wortwörtlich."
        description="Du füllst ein Formular aus und gibst die Kampagnen frei. Den Rest übernehmen wir."
      />
      <div className="frame-body">
        <div data-reveal className="box-grid">
          {onboarding.map((step) => (
            <div key={step.day} className="p-6 md:p-8 flex flex-col gap-2">
              <span className="type-stat text-foreground mb-6">
                {step.day}
              </span>
              <p className="type-title-lg text-heading">{step.title}</p>
              <p className="type-body text-body">{step.description}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-6 type-body text-muted text-center">
          Kein Retainer. Danach kommst du nur noch zu den Terminen.
        </p>
      </div>
    </Section>
  );
};

// The system, built like the main site's cold email section: alternating
// rows with a diagram, each opening a pop-up with the details
const systemSteps = [
  {
    category: "Profile",
    label: "Profile, die Gespräche auslösen",
    illustration: "profile",
    checklist: [
      "Headline und Info-Bereich auf deinen Idealkunden ausgerichtet",
      "In Sekunden klar, wem du hilfst und warum sich ein Gespräch lohnt",
      "Referenzen und Ergebnisse, die Vertrauen schaffen",
    ],
  },
  {
    category: "Zielgruppe",
    label: "Die richtigen Entscheider zum richtigen Zeitpunkt",
    illustration: "targeting",
    checklist: [
      "Listen aus aktuellen Signalen: offene Stellen, Neubesetzungen, Finanzierungsrunden, Expansion",
      "Jeder Kontakt gegen dein Idealkundenprofil geprüft",
      "Bestandskunden und Ausschlüsse von der Liste genommen",
    ],
  },
  {
    category: "Message-Market-Fit",
    label: "Mehrwert ab der ersten Nachricht",
    illustration: "messaging",
    checklist: [
      "Dein Angebot so positioniert, dass es sofort Mehrwert bietet",
      "Mehrere Varianten laufen parallel, die beste bekommt das Volumen",
      "Zielgruppe und Ansprache werden jede Woche nachgeschärft",
    ],
  },
  {
    category: "Speed-to-Lead",
    label: "Antwort in Minuten, nicht in Tagen",
    illustration: "reply",
    checklist: [
      "Wir antworten innerhalb von 5 Minuten",
      "Jede Nachricht von einem echten Menschen geschrieben",
      "Nachfassen bis zu einem klaren Nein oder einem Termin im Kalender",
    ],
  },
];

const systemVisuals = {
  profile: () => (
    <ProfileVisual
      parts={["Headline", "Info", "Referenzen"]}
      visits="Profilbesuche"
      label="LinkedIn-Profile, deren Headline, Info-Bereich und Referenzen auf den Idealkunden ausgerichtet sind"
    />
  ),
  targeting: () => (
    <TargetingVisual
      legend={{ fit: "Passt", out: "Passt nicht", dnc: "Ausgeschlossen" }}
      label="Jeder Entscheider im Markt wird gegen das Idealkundenprofil geprüft"
    />
  ),
  messaging: () => (
    <MessagingVisual label="Nachrichtenvarianten im Vergleich nach Antwortrate; die beste wird ausgebaut" />
  ),
  reply: () => (
    <ReplyVisual
      names={["Antwort", "Rückmeldung", "Termin"]}
      time="5 min"
      label="Eine Antwort bekommt innerhalb von 5 Minuten eine Rückmeldung und wird zu einem gebuchten Termin"
    />
  ),
};

// Pop-up copy, keyed by illustration like the main site's details
const systemDetails = {
  profile: {
    why: [
      "Bevor ein Entscheider auf eine Vernetzungsanfrage oder Nachricht reagiert, schaut er sich fast immer zuerst das Profil des Absenders an. In wenigen Sekunden entscheidet er, ob sich ein Gespräch lohnt.",
      "Die meisten Profile sind wie ein Lebenslauf geschrieben: Stationen, Titel, Zuständigkeiten. Daraus geht nicht hervor, wem du hilfst und welches Ergebnis du lieferst. Wer das nicht sofort erkennt, nimmt die Anfrage nicht an.",
    ],
    what: [
      "Headlines, die sagen, wem du hilfst und wobei, statt nur einen Titel zu nennen",
      "Info-Bereiche, die aus Sicht deines Idealkunden geschrieben sind, mit seinem Problem und deinem Ergebnis",
      "Referenzen, Kundenstimmen und Ergebnisse an den Stellen, an denen Besucher sie sehen",
      "Alles abgestimmt auf die Nachrichten, damit Profile und Ansprache dieselbe Geschichte erzählen",
    ],
  },
  targeting: {
    why: [
      "Die beste Nachricht bringt nichts, wenn sie bei Menschen ankommt, die dein Angebot nicht brauchen. Und auf LinkedIn sind die Kontakte begrenzt: Jede Vernetzungsanfrage an die falsche Person fehlt bei der richtigen.",
      "Die meisten Kampagnen verlassen sich allein auf die Filter von LinkedIn. Positionen, Branchen und Unternehmensgrößen sind dort aber selbst angegeben und oft ungenau. Am Ende steht eine große Liste voller Kontakte, die nicht passen.",
      "Und selbst ein passender Kontakt ist nicht immer gerade offen für ein Gespräch. Eine statische Liste weiß nicht, was sich in einem Unternehmen gerade verändert. Wer im richtigen Moment schreibt, etwa wenn ein Team wächst oder neues Budget da ist, bekommt deutlich eher eine Antwort.",
    ],
    what: [
      "Listen aus Signalen, die heute zutreffen: eine offene Stelle, eine Neubesetzung, eine Finanzierungsrunde, eine Expansion. Veraltete, statische Listen kommen zuletzt",
      "Die Entscheider in deinem Markt identifiziert, über Branche, Position und Unternehmensgröße",
      "Jeder Kontakt gegen dein Idealkundenprofil geprüft, bevor er angeschrieben wird",
      "Bestandskunden, Wettbewerber und alle, die du ausschließen willst, von der Liste genommen",
      "Die Liste nach Zielgruppen aufgeteilt, damit jede Gruppe eine Ansprache bekommt, die zu ihr passt",
    ],
    summary:
      "So erreichst du deinen ganzen Markt, und niemand bekommt eine Nachricht, die nicht zu ihm passt.",
  },
  messaging: {
    why: [
      "LinkedIn-Outreach ist ein Kanal, nicht mehr. Er bringt dein Angebot vor die richtigen Entscheider. Ob sie zugreifen, entscheidet das Angebot selbst.",
      "Und es ist ein kalter Kanal: Die Menschen, die wir anschreiben, haben noch nie von dir gehört. Sie kennen dich nicht, vertrauen dir noch nicht und suchen gerade nicht nach dir. Dein Angebot muss deshalb schon in der ersten Nachricht so klingen, dass man kaum Nein sagen kann.",
    ],
    what: [
      "Wir positionieren dein Angebot für kalte Interessenten: klar, konkret und mit sofortigem Mehrwert",
      "Entweder stellen wir dein Hauptangebot direkt vor, oder wir entwickeln mit dir ein Mikro-Angebot als Einstieg. Es ist leicht anzunehmen, bringt mehr Interessenten in den Funnel und führt sie später zu deinem Hauptangebot",
      "Mehrere Varianten laufen von Anfang an parallel. Die beste bekommt das Volumen, die schwächsten werden ersetzt",
      "Jede Woche schärfen wir Zielgruppe und Ansprache anhand der Ergebnisse nach",
    ],
    summary:
      "Der Hebel: Sobald der Message-Market-Fit steht, machst du aus völlig kalten Kontakten günstig und wiederholbar Kunden. Du kannst deinen gesamten Markt bespielen, ohne viel Geld in bezahlte Werbung zu stecken oder jahrelang eine Marke auf Social Media aufzubauen.",
  },
  reply: {
    why: [
      "Interesse hat ein kurzes Verfallsdatum. Wer auf eine Nachricht antwortet, denkt genau in diesem Moment über dein Angebot nach. Eine Stunde später sitzt er im nächsten Meeting, am nächsten Tag hat er es vergessen.",
      "Die Forschung dazu ist eindeutig. In der Lead Response Management Study (Oldroyd, MIT) war die Chance, einen Interessenten zu erreichen, bei einer Reaktion innerhalb von 5 Minuten 100-mal höher als nach 30 Minuten. Die Chance, ihn als Lead zu qualifizieren, war 21-mal höher.",
      "Trotzdem lassen sich die meisten Unternehmen Zeit. Eine Untersuchung der Harvard Business Review unter mehr als 2.000 Unternehmen ergab eine durchschnittliche Reaktionszeit von 42 Stunden. Wer innerhalb einer Stunde reagierte, qualifizierte fast siebenmal so häufig einen Lead wie Unternehmen, die länger brauchten.",
    ],
    what: [
      "Jede Antwort bekommt innerhalb von 5 Minuten eine Rückmeldung, solange das Interesse noch frisch ist",
      "Jede Nachricht schreibt ein echter Mensch, in deinem Ton, nie ein Autoresponder",
      "Wir fassen nach, bis es ein klares Nein gibt oder ein Termin steht",
      "Termine landen direkt in deinem Kalender",
    ],
    summary:
      "Komplett Done-for-You: Du kümmerst dich um kein Postfach und keine einzige Nachricht. Du lernst den Interessenten erst kennen, wenn der Termin in deinem Kalender steht.",
  },
};

const System = () => (
  <Section id="system" className="text-body">
    <SectionHeader
      eyebrow="Das System"
      title="Ein klarer Prozess, von der Zielgruppe"
      accent="bis zum Termin"
      description="Wir arbeiten über die Profile deines Teams, denn Entscheider sprechen lieber mit einem Menschen als mit einer Marke."
    />
    <SystemSteps
      steps={systemSteps}
      visuals={systemVisuals}
      details={systemDetails}
      detailLabels={{
        why: "Warum das wichtig ist",
        how: "So lösen wir es",
        close: "Schließen",
      }}
      moreLabel="Mehr erfahren"
    />
  </Section>
);

// A column of checked points under a small label
const OfferGroup = ({ label, items }) => (
  <div className="flex flex-col gap-5 p-6 md:p-8">
    <span className="ui-label text-muted">{label}</span>
    <ul className="flex flex-col gap-3.5">
      {items.map((item, i) => (
        <li key={i} className="type-body text-body flex gap-3">
          <Check
            size={16}
            strokeWidth={1.75}
            className="mt-1 flex-shrink-0 text-brand"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// Each message variant runs on two profiles
const MESSAGE_VARIANT_PER_PROFILES = 2;

const Offer = ({ model }) => {
  const ref = useRef(null);
  useReveal(ref);
  const {
    profiles,
    ownUsed,
    rentedProfiles,
    requests,
    feePerMeeting,
    toolCost,
    setup,
  } = model;

  // Own profiles get optimised, missing ones we provide
  const profileSetup = [
    ownUsed > 0 &&
      `${plural(ownUsed, "eigenes Profil", "eigene Profile")} optimiert (Headline, Info-Bereich und Banner)`,
    rentedProfiles > 0 &&
      `${plural(rentedProfiles, "Profil", "Profile")} von uns gestellt`,
  ]
    .filter(Boolean)
    .join(", ");

  // One message variant per two profiles, tested against each other
  const variants = Math.ceil(profiles / MESSAGE_VARIANT_PER_PROFILES);

  // Sized to the settings in the ROI calculator, in the order they happen
  const included = [
    <>
      <span className="text-heading">Setup in 7 Tagen:</span> {profileSetup}
    </>,
    <>
      <span className="text-heading">
        {plural(variants, "Nachrichtenvariante", "Nachrichtenvarianten")}
      </span>{" "}
      im Test gegeneinander
    </>,
    <>
      <span className="text-heading">
        Kontaktliste mit {fmtInt(requests)} Entscheidern
      </span>{" "}
      im Monat, aus aktuellen Signalen und passend zu deinem Idealkundenprofil
    </>,
    <>
      <span className="text-heading">
        {fmtInt(requests)} Vernetzungsanfragen
      </span>{" "}
      im Monat über {plural(profiles, "Profil", "Profile")}
    </>,
    "Wir übernehmen alles: Antworten in 5 Minuten und Nachfassen bis zum Termin",
    "Du kommst nur noch zu den Terminen",
  ];

  // Two prices only: a monthly fee for software and profiles, with the
  // setup folded into the first month, and the fee per meeting
  const terms = [
    <>
      Software und Profile:{" "}
      <span className="text-heading">{fmtMoney(setup + toolCost)}</span> im
      ersten Monat inklusive Setup, danach{" "}
      <span className="text-heading">{fmtMoney(toolCost)}</span> im Monat
    </>,
    <>
      Dazu <span className="text-heading">{fmtMoney(feePerMeeting)}</span> pro
      wahrgenommenem Termin
    </>,
    "Kein Retainer, monatlich kündbar",
  ];

  return (
    <Section id="angebot" ref={ref}>
      <SectionHeader
        eyebrow="Angebot"
        title="Ein Angebot,"
        accent="ohne Retainer"
        description="Eine Monatsgebühr für Software und Profile, dazu ein Preis pro Termin, der tatsächlich stattfindet."
      />
      <div className="frame-body">
        <div
          data-reveal
          className="flex items-center justify-center text-center gap-2.5 mb-4"
        >
          <Info size={15} className="flex-shrink-0 text-brand" />
          <p className="type-small text-heading">
            Alle Zahlen basieren auf deinen Einstellungen im ROI-Rechner oben.
          </p>
        </div>
        <div data-reveal className="border border-borderLight w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-borderLight">
            <OfferGroup label="Was du bekommst" items={included} />
            <OfferGroup label="So funktioniert es" items={terms} />
          </div>
        </div>
      </div>
    </Section>
  );
};

const faqs = [
  {
    q: "Sind unsere LinkedIn-Konten dabei sicher?",
    a: "Ja. Wir bleiben unter den Limits, die LinkedIn für Vernetzungen und Nachrichten vorgibt, und steigern das Volumen schrittweise. So verhält sich jedes Konto wie das eines aktiven Nutzers.",
  },
  {
    q: "Wie viel Aufwand habe ich?",
    a: "Sehr wenig: ein Onboarding-Call, die Freigabe von Zielliste und Nachrichten, und die Termine selbst. Alles dazwischen übernehmen wir.",
  },
  {
    q: "Wann kommen die ersten Termine?",
    a: "Die Kampagnen gehen an Tag 7 live, also eine Woche nach dem Onboarding-Formular. Die ersten Antworten kommen meist in den ersten Tagen danach, die ersten Termine kurz darauf.",
  },
  {
    q: "Was kostet das?",
    a: "Du zahlst eine Monatsgebühr für Software und Profile und einen Preis pro wahrgenommenem Termin. Der erste Monat ist höher, weil er das Setup enthält. Wie hoch der Preis pro Termin ist, hängt von deinem Zielmarkt und deiner Dealgröße ab. Die genauen Zahlen legen wir gemeinsam im Strategiegespräch fest.",
  },
  {
    q: "Was zählt als qualifizierter Termin?",
    a: "Das entscheidest du. Passt ein Interessent nicht zu deinem Idealkunden, nimmst du den Termin einfach nicht an und zahlst nichts. Du zahlst nur für Termine, die du wahrnehmen willst.",
  },
  {
    q: "Kann ich die Nachrichten vorher freigeben?",
    a: "Ja. Jede Nachrichtenvariante geht erst raus, wenn du sie freigegeben hast.",
  },
  {
    q: "Warum über echte Profile aus meinem Team?",
    a: "Entscheider antworten auf Menschen, nicht auf Firmenseiten. Echte Profile mit echter Erfahrung schaffen das Vertrauen, das ein erstes Gespräch braucht.",
  },
];

const PANEL_EASE = "0.35s cubic-bezier(0.4, 0, 0.2, 1)";

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Section id="faq" ref={ref}>
      <div className="frame-header grid grid-cols-1 gap-y-12 min-[810px]:gap-y-16 min-[1200px]:grid-cols-[minmax(0,460px)_minmax(0,1fr)] min-[1200px]:gap-x-[120px]">
        <SectionHeader
          align="left"
          className="!p-0 md:!items-start"
          eyebrow="FAQ"
          title="Häufige Fragen"
          description="Alles, was du vor dem Start wissen solltest."
        />
        <div data-reveal className="flex flex-col min-w-0">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const Icon = isOpen ? Minus : Plus;
            return (
              <div
                key={faq.q}
                className="border-b border-borderLight overflow-hidden"
              >
                <button
                  className="w-full py-6 flex items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span className="type-title text-heading">{faq.q}</span>
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={`flex-shrink-0 ${isOpen ? "text-brand" : "text-foreground"}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    marginTop: isOpen ? "-8px" : "0",
                    opacity: isOpen ? 1 : 0,
                    transition: `grid-template-rows ${PANEL_EASE}, margin-top ${PANEL_EASE}, opacity ${PANEL_EASE}`,
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-6 max-w-[600px] type-body text-body">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="text-body">
    <Section>
      <div className="p-4">
        <div className="relative overflow-hidden rounded-[16px] border border-borderLight">
          <HeroGrid />
          <div
            id={CAL_SECTION_ID}
            className="relative px-4 md:px-[var(--ci)] py-20 md:py-28 flex flex-col items-center text-center scroll-mt-20"
          >
            <h2 className="type-h1 text-heading text-balance max-w-4xl">
              Finde heraus, ob Scalar zu{" "}
              <span className="text-muted">dir passt.</span>
            </h2>
            <p className="mt-5 type-body text-body max-w-xl">
              In 30 Minuten klären wir, wer deine Käufer sind, wie wir sie über
              LinkedIn erreichen und wie die Zahlen aussehen. Den Plan behältst
              du, ob wir zusammenarbeiten oder nicht.
            </p>
            <CalEmbed theme="light" label="Strategiegespräch buchen" />
            <p className="mt-5 type-small text-muted">
              Kalender lädt nicht?{" "}
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-body"
              >
                Auf cal.com öffnen
              </a>
            </p>
          </div>
        </div>
      </div>
    </Section>

    <div className="shell">
      <div className="frame p-4">
        <div className="rounded-[8px] border border-borderLight p-4 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col gap-6 md:w-80">
            <a href="/linkedin" className="flex items-center gap-2 w-fit">
              <img
                src={`${import.meta.env.BASE_URL}logo18-white.svg`}
                alt="Scalar Logo"
                className="brand-logo h-6"
              />
              <span className="font-brand font-normal text-[20px] leading-none tracking-[-0.02em] translate-y-px text-foreground">
                Scalar
              </span>
            </a>
            <p className="type-body text-body">
              LinkedIn-Outreach für B2B, abgerechnet pro Termin.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </nav>
        </div>

        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 px-4 md:px-8 pt-6 pb-2">
          <p className="type-small text-muted">
            &copy; {new Date().getFullYear()} Scalar. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <FooterLink label="Impressum" href="/imprint" />
            <FooterLink label="Datenschutz" href="/privacy-policy" />
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const LinkedIn = () => {
  const model = useLinkedInModel();

  // Light mode and German for this page only; the main site stays dark.
  // Layout effect, so the dark palette never flashes in between
  useLayoutEffect(() => {
    const html = document.documentElement;
    const theme = document.querySelector('meta[name="theme-color"]');
    const prev = {
      theme: html.dataset.theme,
      lang: html.lang,
      title: document.title,
      color: theme?.content,
    };
    html.dataset.theme = "light";
    html.lang = "de";
    document.title = TITLE;
    theme?.setAttribute("content", "#ffffff");
    return () => {
      html.dataset.theme = prev.theme;
      html.lang = prev.lang;
      document.title = prev.title;
      if (prev.color) theme?.setAttribute("content", prev.color);
    };
  }, []);

  return (
    <>
      <Navbar
        links={navLinks}
        ctaLabel="Strategiegespräch buchen"
        homeHref="/linkedin"
      />
      <Hero />
      <System />
      <Onboarding />
      <LinkedInROI model={model} />
      <Offer model={model} />
      <FAQ />
      <Footer />
    </>
  );
};

export default LinkedIn;

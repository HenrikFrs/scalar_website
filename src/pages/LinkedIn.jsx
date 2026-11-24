import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  Clock,
  MessageSquareOff,
  Minus,
  Plus,
  Shuffle,
} from "lucide-react";
import { Navbar, MagneticButton } from "../components/Header";
import { CalEmbed, FooterLink } from "../components/Footer";
import HeroGrid from "../components/HeroGrid";
import { Section, SectionBorder, SectionHeader } from "../components/ui";
import { CAL_SECTION_ID, CAL_URL } from "../lib/cal";

gsap.registerPlugin(ScrollTrigger);

// LinkedIn outreach for the DACH region: a separate, German offer in light
// mode. It isn't in the main navigation; the main footer links here.

const TITLE = "LinkedIn-Outreach für B2B im DACH-Raum | Scalar";

const navLinks = [
  { label: "Ablauf", href: "/linkedin#ablauf" },
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
              LinkedIn-Outreach für B2B im DACH-Raum
            </span>
            <h1 className="type-h1 text-[40px] md:text-[56px] lg:text-[72px] leading-none text-heading">
              <span className="hero-element block text-balance">
                Neue Kundengespräche über LinkedIn.
              </span>
              <span className="hero-element block text-balance text-muted">
                Sie zahlen nur pro Termin.
              </span>
            </h1>

            <p className="hero-element mt-6 type-lead text-body max-w-xl">
              Wir übernehmen Zielgruppe, Nachrichten und Antworten über Ihr
              LinkedIn-Profil. Ihr Vertrieb bekommt qualifizierte Termine in
              den Kalender.
            </p>

            <MagneticButton
              variant="primary"
              className="hero-element mt-8"
              onClick={scrollToBooking}
            >
              Erstgespräch buchen
            </MagneticButton>
          </div>
        </div>
      </div>
      <SectionBorder />
    </section>
  );
};

const problems = [
  {
    icon: Clock,
    title: "Keine Zeit im Alltag",
    description:
      "Vernetzen, schreiben, nachfassen: LinkedIn kostet jeden Tag Zeit. Im Tagesgeschäft bleibt es als Erstes liegen, und ohne Kontinuität entsteht keine Pipeline.",
  },
  {
    icon: MessageSquareOff,
    title: "Pitch statt Gespräch",
    description:
      "Die meisten Nachrichten sind Verkaufstexte direkt nach der Vernetzung. Entscheider bekommen davon jeden Tag mehrere und ignorieren sie.",
  },
  {
    icon: Shuffle,
    title: "Kein System dahinter",
    description:
      "Ohne klare Zielliste, getestete Nachrichten und konsequentes Nachfassen bleiben Termine Zufall. Was funktioniert, lässt sich so weder erkennen noch skalieren.",
  },
];

const Problem = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Section id="problem" ref={ref}>
      <SectionHeader
        eyebrow="Das Problem"
        title="Warum LinkedIn bei den meisten"
        accent="nicht funktioniert"
        description="Fast jeder Entscheider im DACH-Raum ist auf LinkedIn. Trotzdem kommen bei den meisten Unternehmen kaum Termine darüber zustande. Meist liegt es an einem dieser drei Punkte."
      />
      <div className="frame-body">
        <div data-reveal className="box-grid">
          {problems.map((item) => (
            <div key={item.title} className="p-6 md:p-8 flex flex-col gap-2">
              <item.icon size={28} strokeWidth={1.25} className="mb-8 text-brand" />
              <p className="type-title-lg text-heading">{item.title}</p>
              <p className="type-body text-body">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const steps = [
  {
    number: "01",
    title: "Profil",
    description:
      "Wir schärfen Ihr Profil, damit es Interessenten in wenigen Sekunden zeigt, wem Sie helfen und warum ein Gespräch sich lohnt.",
  },
  {
    number: "02",
    title: "Zielgruppe",
    description:
      "Wir identifizieren die Entscheider in Ihrem Markt und prüfen jeden Kontakt gegen Ihr Idealkundenprofil, bevor er angeschrieben wird.",
  },
  {
    number: "03",
    title: "Nachrichten",
    description:
      "Persönliche Ansprache ohne Pitch in der ersten Nachricht. Wir testen mehrere Varianten und bauen aus, was die meisten Gespräche bringt.",
  },
  {
    number: "04",
    title: "Antworten",
    description:
      "Wir führen jedes Gespräch bis zum Termin, schnell und in Ihrem Ton. Sie steigen erst ein, wenn der Termin im Kalender steht.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Section id="ablauf" ref={ref}>
      <SectionHeader
        eyebrow="Ablauf"
        title="Ein klarer Prozess, von der Zielgruppe"
        accent="bis zum Termin"
        description="Wir arbeiten über Ihr eigenes Profil, denn Entscheider sprechen lieber mit einem Menschen als mit einer Marke."
      />
      <div className="frame-body">
        <div
          data-reveal
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-borderLight"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 md:p-8 flex flex-col gap-2 border-r border-b border-borderLight"
            >
              <span className="ui-label text-brand mb-8">{step.number}</span>
              <p className="type-title-lg text-heading">{step.title}</p>
              <p className="type-body text-body">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const timeline = [
  {
    when: "Woche 1",
    title: "Onboarding",
    bullets: [
      "Onboarding-Call zu Positionierung und Zielmarkt",
      "Profil-Optimierung und Zugang zu Ihrem Konto",
      "Zielliste und Nachrichten zur Freigabe",
    ],
  },
  {
    when: "Woche 2",
    title: "Start",
    bullets: [
      "Kampagnen gehen live",
      "Erste Vernetzungen und Antworten",
      "Volumen steigt schrittweise, innerhalb der Limits von LinkedIn",
    ],
  },
  {
    when: "Ab Woche 3",
    title: "Termine",
    bullets: [
      "Qualifizierte Termine in Ihrem Kalender",
      "Nachrichten und Zielgruppe werden laufend verfeinert",
      "Was funktioniert, wird ausgebaut",
    ],
  },
];

const Timeline = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Section id="zeitplan" ref={ref}>
      <SectionHeader eyebrow="Zeitplan" title="Vom Kickoff zu" accent="den ersten Terminen" />
      <div className="frame-body">
        <div data-reveal className="box-grid">
          {timeline.map((step) => (
            <div key={step.when} className="p-6 md:p-8 flex flex-col gap-2">
              <span className="type-stat text-foreground mb-6">{step.when}</span>
              <p className="type-title-lg text-heading">{step.title}</p>
              <ul className="flex flex-col gap-2.5 mt-2">
                {step.bullets.map((b) => (
                  <li key={b} className="type-small text-body flex gap-2.5">
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="mt-1 flex-shrink-0 text-foreground"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const offerGroups = [
  {
    label: "Was Sie bekommen",
    items: [
      "Optimiertes LinkedIn-Profil, das Gespräche auslöst",
      "Geprüfte Zielliste aus Entscheidern, die zu Ihrem Idealkunden passen",
      "Wir übernehmen alles: Zielgruppe, Nachrichten, Nachfassen und Antworten",
      "Sie kommen nur noch zu den Terminen",
    ],
  },
  {
    label: "So funktioniert es",
    items: [
      "Sie zahlen pro wahrgenommenem Termin, nicht für unsere Zeit",
      "Der Preis pro Termin richtet sich nach Zielmarkt und Dealgröße; die Zahlen legen wir im Erstgespräch fest",
      "Kein Retainer, monatlich kündbar",
      "Sie geben jede Nachricht frei, bevor sie rausgeht",
    ],
  },
];

const Offer = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <Section id="angebot" ref={ref}>
      <SectionHeader
        eyebrow="Angebot"
        title="Ein Angebot,"
        accent="ohne Retainer"
        description="Wir machen die Arbeit im Voraus. Sie zahlen, wenn ein Termin tatsächlich stattfindet."
      />
      <div className="frame-body">
        <div data-reveal className="border border-borderLight w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-borderLight">
            {offerGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-5 p-6 md:p-8">
                <span className="ui-label text-muted">{group.label}</span>
                <ul className="flex flex-col gap-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="type-body text-body flex gap-3">
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
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const faqs = [
  {
    q: "Ist mein LinkedIn-Konto dabei sicher?",
    a: "Ja. Wir bleiben unter den Limits, die LinkedIn für Vernetzungen und Nachrichten vorgibt, und steigern das Volumen schrittweise. So verhält sich Ihr Konto wie das eines aktiven Nutzers.",
  },
  {
    q: "Wie viel Aufwand habe ich?",
    a: "Sehr wenig: ein Onboarding-Call, die Freigabe von Zielliste und Nachrichten, und die Termine selbst. Alles dazwischen übernehmen wir.",
  },
  {
    q: "Wann kommen die ersten Termine?",
    a: "Die Kampagnen starten in der Regel in der zweiten Woche. Die ersten Antworten kommen meist in den ersten Tagen danach, die ersten Termine kurz darauf.",
  },
  {
    q: "Was kostet das?",
    a: "Sie zahlen pro wahrgenommenem Termin. Wie hoch der Preis ist, hängt von Ihrem Zielmarkt und Ihrer Dealgröße ab. Die genauen Zahlen legen wir gemeinsam im Erstgespräch fest.",
  },
  {
    q: "Was zählt als qualifizierter Termin?",
    a: "Das entscheiden Sie. Passt ein Interessent nicht zu Ihrem Idealkunden, nehmen Sie den Termin einfach nicht an und zahlen nichts. Sie zahlen nur für Termine, die Sie wahrnehmen wollen.",
  },
  {
    q: "Kann ich die Nachrichten vorher freigeben?",
    a: "Ja. Jede Nachrichtenvariante geht erst raus, wenn Sie sie freigegeben haben.",
  },
  {
    q: "Warum über mein eigenes Profil?",
    a: "Entscheider antworten auf Menschen, nicht auf Firmenseiten. Ein echtes Profil mit Ihrer Erfahrung schafft das Vertrauen, das ein erstes Gespräch braucht.",
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
          description="Alles, was Sie vor dem Start wissen sollten."
        />
        <div data-reveal className="flex flex-col min-w-0">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const Icon = isOpen ? Minus : Plus;
            return (
              <div key={faq.q} className="border-b border-borderLight overflow-hidden">
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
                    <div className="pb-6 max-w-[600px] type-body text-body">{faq.a}</div>
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
              Finden Sie heraus, ob Scalar zu{" "}
              <span className="text-muted">Ihnen passt.</span>
            </h2>
            <p className="mt-5 type-body text-body max-w-xl">
              In 30 Minuten klären wir, wer Ihre Käufer sind, wie wir sie über
              LinkedIn erreichen und wie die Zahlen aussehen. Den Plan behalten
              Sie, ob wir zusammenarbeiten oder nicht.
            </p>
            <CalEmbed theme="light" label="Erstgespräch buchen" />
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
              LinkedIn-Outreach für B2B. Sie zahlen nur pro Termin.
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
      <Navbar links={navLinks} ctaLabel="Erstgespräch buchen" homeHref="/linkedin" />
      <Hero />
      <Problem />
      <HowItWorks />
      <Timeline />
      <Offer />
      <FAQ />
      <Footer />
    </>
  );
};

export default LinkedIn;

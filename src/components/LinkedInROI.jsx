import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BreakdownRow,
  BreakdownSection,
  NumberField,
  SliderField,
} from "./ROICalculator";
import { Section, SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

// German ROI calculator for the LinkedIn page. Same layout as the cold email
// one, but the volume comes from LinkedIn profiles instead of domains. Its
// state lives in useLinkedInModel, so the offer section can show the same
// numbers.

// Connection requests one profile sends per week, kept well under LinkedIn's
// weekly limit so the accounts stay safe
const REQUESTS_PER_PROFILE_PER_WEEK = 100;
const WEEKS_PER_MONTH = 4.3;
export const REQUESTS_PER_PROFILE = Math.round(
  REQUESTS_PER_PROFILE_PER_WEEK * WEEKS_PER_MONTH,
);

// HeyReach Growth, monthly billing (heyreach.io/pricing, Nov 2026): billed
// per LinkedIn sender, with a lower rate for every sender from 10 senders on.
// Includes a dedicated proxy per sender. Prices are in USD
const HEYREACH_USD = { base: 79, volume: 59, volumeFrom: 10 };
// Fixed conversion for the calculator; update when the rate moves a lot
const USD_TO_EUR = 0.86;
const heyreachPerSender = (senders) =>
  (senders >= HEYREACH_USD.volumeFrom ? HEYREACH_USD.volume : HEYREACH_USD.base) *
  USD_TO_EUR;

// Monthly cost of one rented LinkedIn profile, on top of its HeyReach seat.
// The client's own profiles cost nothing extra
export const RENTED_PROFILE_EUR = 117;

// One-time setup, a flat fee whatever the number of profiles. It is billed
// with the first month's software fee
const SETUP_EUR = 1000;

const LOCALE = "de-DE";
const fmt = (n) =>
  n.toLocaleString(LOCALE, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
export const fmtInt = (n) => n.toLocaleString(LOCALE);
const fmtCurrency = (n) => n.toLocaleString(LOCALE, { minimumFractionDigits: 2 });
export const fmtMoney = (n) =>
  n.toLocaleString(LOCALE, { maximumFractionDigits: 0 }) + " €";

const fmtPct = (n) =>
  n.toLocaleString(LOCALE, { maximumFractionDigits: 1 }) + " %";

// Calculator inputs and everything derived from them
export const useLinkedInModel = () => {
  const [profiles, setProfiles] = useState(10);
  const [ownProfiles, setOwnProfiles] = useState(5);
  const [acceptRate, setAcceptRate] = useState(30);
  const [interestRate, setInterestRate] = useState(5);
  const [meetingRate, setMeetingRate] = useState(35);
  const [feePerMeeting, setFeePerMeeting] = useState(300);
  const [closeRate, setCloseRate] = useState(25);
  const [ltv, setLtv] = useState(30000);

  const requests = profiles * REQUESTS_PER_PROFILE;
  const connections = requests * (acceptRate / 100);
  const interestedLeads = connections * (interestRate / 100);
  const attendedMeetings = interestedLeads * (meetingRate / 100);
  const closed = attendedMeetings * (closeRate / 100);
  const totalPipeline = closed * ltv;
  const meetingCost = attendedMeetings * feePerMeeting;
  const softwarePerSender = heyreachPerSender(profiles);
  const softwareCost = profiles * softwarePerSender;
  const ownUsed = Math.min(ownProfiles, profiles);
  const rentedProfiles = profiles - ownUsed;
  const rentalCost = rentedProfiles * RENTED_PROFILE_EUR;
  const toolCost = softwareCost + rentalCost;
  const totalCost = meetingCost + toolCost;

  return {
    profiles, setProfiles, ownProfiles, setOwnProfiles, acceptRate,
    setAcceptRate, interestRate, setInterestRate, meetingRate, setMeetingRate,
    feePerMeeting, setFeePerMeeting, closeRate, setCloseRate, ltv, setLtv,
    requests, connections, interestedLeads, attendedMeetings, closed,
    totalPipeline, meetingCost, softwarePerSender, softwareCost, ownUsed,
    rentedProfiles, rentalCost, toolCost, totalCost,
    setup: SETUP_EUR,
  };
};

const LinkedInROI = ({ model }) => {
  const sectionRef = useRef(null);
  const {
    profiles, setProfiles, setOwnProfiles, acceptRate, setAcceptRate,
    interestRate, setInterestRate, meetingRate, setMeetingRate, feePerMeeting,
    setFeePerMeeting, closeRate, setCloseRate, ltv, setLtv, requests,
    connections, interestedLeads, attendedMeetings, closed, totalPipeline,
    meetingCost, softwarePerSender, softwareCost, ownUsed, rentedProfiles,
    rentalCost, toolCost, totalCost, setup,
  } = model;
  const profit = totalPipeline - totalCost;
  const roiMultiple =
    totalCost > 0
      ? (totalPipeline / totalCost).toLocaleString(LOCALE, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
      : "∞";
  const costPerClient = closed > 0 ? totalCost / closed : null;
  const orDash = (n) => (n === null ? "–" : fmtMoney(n));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".roi-element", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="roi" ref={sectionRef} className="text-body">
      <SectionHeader
        className="roi-element"
        eyebrow="ROI"
        title="Rechne es mit"
        accent="deinen Zahlen durch"
        description="Trage deine Kampagnenwerte und Geschäftszahlen ein und sieh, was ein Monat Kampagnen langfristig einbringt."
      />

      <div className="frame-body">
        <div className="roi-element border border-borderLight w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-7 p-6 md:p-8 lg:border-r border-borderLight">
            <SliderField
              label="LinkedIn-Profile"
              value={profiles}
              display={`${profiles} ${profiles === 1 ? "Profil" : "Profile"} · ${fmtInt(requests)} Anfragen / Monat`}
              min={1}
              max={20}
              step={1}
              onChange={setProfiles}
              tooltip={`Wie viele LinkedIn-Profile insgesamt Anfragen senden. Jedes Profil sendet etwa ${REQUESTS_PER_PROFILE_PER_WEEK} Vernetzungsanfragen pro Woche, deutlich unter dem Limit von LinkedIn. Pro Profil fällt eine HeyReach-Lizenz an, die Software, über die die Kampagnen laufen.`}
            />
            <SliderField
              label="Davon eigene Profile"
              value={ownUsed}
              display={`${ownUsed} eigene · ${rentedProfiles} gemietet`}
              min={0}
              max={profiles}
              step={1}
              onChange={setOwnProfiles}
              note={`Benötigt ${profiles} HeyReach-${profiles === 1 ? "Lizenz" : "Lizenzen"} und ${rentedProfiles} ${rentedProfiles === 1 ? "gemieteten LinkedIn-Account" : "gemietete LinkedIn-Accounts"}.`}
              tooltip={`Wie viele Profile du aus deinem Team selbst stellen kannst. Für sie fällt nur die HeyReach-Lizenz an. Fehlende Profile stellen wir dir für ${fmtMoney(RENTED_PROFILE_EUR)} pro Profil und Monat bereit.`}
            />
            <SliderField
              label="Annahmequote"
              value={acceptRate}
              display={`${acceptRate} % · ${fmtInt(Math.round(connections))} Vernetzungen / Monat`}
              min={5}
              max={60}
              step={1}
              onChange={setAcceptRate}
              tooltip="Wie viel Prozent der Vernetzungsanfragen angenommen werden. Ein starkes Profil und eine präzise Zielgruppe heben diesen Wert."
            />
            <SliderField
              label="Interessenten"
              value={interestRate}
              display={`${fmtPct(interestRate)} der Vernetzungen`}
              min={1}
              max={20}
              step={0.5}
              onChange={setInterestRate}
              tooltip="Wie viel Prozent der neuen Vernetzungen Interesse an einem Gespräch zeigen. Der Wert hängt vor allem vom Angebot ab: wie klar es ist, ob es konkrete Ergebnisse und Referenzen gibt und ob du eine Garantie oder Risikoumkehr anbietest."
            />
            <SliderField
              label="Terminrate"
              value={meetingRate}
              display={`${meetingRate} %`}
              min={0}
              max={100}
              step={1}
              onChange={setMeetingRate}
              tooltip="Wie viel Prozent der Interessenten am Ende einen Termin wahrnehmen, also buchen und auch erscheinen."
            />
            <SliderField
              label="Preis pro wahrgenommenem Termin"
              value={feePerMeeting}
              display={fmtMoney(feePerMeeting)}
              min={150}
              max={600}
              step={10}
              onChange={setFeePerMeeting}
              tooltip="Was du pro wahrgenommenem Termin zahlst. Der genaue Preis hängt von deinem Zielmarkt und deiner Dealgröße ab und wird im Strategiegespräch festgelegt."
            />
            <SliderField
              label="Abschlussquote"
              value={closeRate}
              display={`${closeRate} %`}
              min={0}
              max={100}
              step={1}
              onChange={setCloseRate}
              tooltip="Wie viel Prozent der wahrgenommenen Termine du zu zahlenden Kunden machst."
            />
            <NumberField
              label="Durchschnittlicher Kundenwert"
              value={ltv}
              min={0}
              max={500000}
              step={500}
              onChange={setLtv}
              suffix="€"
              locale={LOCALE}
              tooltip="Der gesamte Rohertrag, den ein Kunde über die ganze Zusammenarbeit bringt, mit allen Zahlungen. Rechne auch Empfehlungen ein: Empfiehlt jeder vierte Kunde einen weiteren, schlag 25 % deines durchschnittlichen Auftragswerts oben drauf."
            />
          </div>

          <div className="border-t lg:border-t-0 border-borderLight flex flex-col">
            <div className="grid grid-cols-2 border-b border-borderLight">
              {[
                { label: "Vernetzungen", value: fmtInt(Math.round(connections)) },
                { label: "Interessenten", value: fmt(interestedLeads) },
                { label: "Termine", value: fmt(attendedMeetings) },
                { label: "Neue Kunden", value: fmt(closed) },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1 p-6 md:p-8 border-borderLight ${
                    i % 2 === 0 ? "border-r" : ""
                  } ${i < 2 ? "border-b" : ""}`}
                >
                  <span className="ui-label text-muted">{label}</span>
                  <span className="type-stat text-heading tabular-nums mt-2">
                    {value}
                    <span className="type-small text-muted ml-1.5">/ Monat</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col flex-1 justify-center gap-5 p-6 md:p-8">
              <p className="type-lead text-body">
                Jeden Monat investierst du{" "}
                <span className="text-heading">{fmtMoney(totalCost)}</span>{" "}
                <span className="text-muted">
                  ({fmtMoney(meetingCost)} für Termine + {fmtMoney(toolCost)}{" "}
                  für Software und Profile)
                </span>{" "}
                und gewinnst Kunden im Wert von{" "}
                <span className="text-heading">{fmtMoney(totalPipeline)}</span>
                {costPerClient !== null && (
                  <span className="text-muted">
                    {" "}
                    (Kosten pro Kunde: {fmtMoney(costPerClient)})
                  </span>
                )}
                .
              </p>
              <div className="flex flex-col items-start gap-5">
                <p className="font-serif text-2xl md:text-[28px] leading-tight tracking-[-0.02em] text-heading">
                  Jeder Euro bringt{" "}
                  <span className="text-brand">{roiMultiple}×</span>
                </p>
                <div className="relative group flex-shrink-0">
                  <span className="ui-label text-muted cursor-default underline underline-offset-4 decoration-dotted hover:text-brand transition-colors duration-300">
                    Wie wird das berechnet?
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-[22rem] max-w-[calc(100vw-4.5rem)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-surface3 border border-borderLight shadow-xl px-4 py-4 text-xs leading-relaxed flex flex-col gap-4">
                      <BreakdownSection title="Pipeline">
                        <BreakdownRow
                          label="Vernetzungsanfragen"
                          detail={`${profiles} × ${REQUESTS_PER_PROFILE}`}
                          value={fmtInt(requests)}
                        />
                        <BreakdownRow
                          label="Vernetzungen"
                          detail={`× ${acceptRate} %`}
                          value={fmtInt(Math.round(connections))}
                        />
                        <BreakdownRow
                          label="Interessenten"
                          detail={`× ${fmtPct(interestRate)}`}
                          value={fmt(interestedLeads)}
                        />
                        <BreakdownRow
                          label="Termine"
                          detail={`× ${meetingRate} %`}
                          value={fmt(attendedMeetings)}
                        />
                        <BreakdownRow
                          label="Neue Kunden"
                          detail={`× ${closeRate} %`}
                          value={fmt(closed)}
                        />
                        <BreakdownRow
                          label="Langfristiger Umsatz"
                          detail={`× ${fmtMoney(ltv)}`}
                          value={fmtMoney(totalPipeline)}
                          strong
                        />
                      </BreakdownSection>

                      <BreakdownSection title="Kosten">
                        <BreakdownRow
                          label="Termine"
                          detail={`${fmt(attendedMeetings)} × ${fmtMoney(feePerMeeting)}`}
                          value={fmtMoney(meetingCost)}
                        />
                        <BreakdownRow
                          label="HeyReach"
                          detail={`${profiles} × ${fmtMoney(softwarePerSender)}`}
                          value={fmtMoney(softwareCost)}
                        />
                        <BreakdownRow
                          label="Gemietete Profile"
                          detail={`${rentedProfiles} × ${fmtMoney(RENTED_PROFILE_EUR)}`}
                          value={fmtMoney(rentalCost)}
                        />
                        <BreakdownRow
                          label="Gesamtkosten"
                          value={fmtMoney(totalCost)}
                          strong
                        />
                      </BreakdownSection>

                      <BreakdownSection title="Ergebnis">
                        <BreakdownRow
                          label="Langfristiger Gewinn"
                          value={fmtMoney(profit)}
                          strong
                        />
                        <BreakdownRow
                          label="Kosten pro Kunde"
                          value={orDash(costPerClient)}
                        />
                        <BreakdownRow
                          label="Rendite"
                          value={`${roiMultiple}×`}
                        />
                      </BreakdownSection>

                      <p className="text-[11px] text-body leading-relaxed border-t border-borderMid pt-3">
                        Jedes Profil sendet {REQUESTS_PER_PROFILE_PER_WEEK}{" "}
                        Vernetzungsanfragen pro Woche, bei{" "}
                        {fmt(WEEKS_PER_MONTH)} Wochen also{" "}
                        {REQUESTS_PER_PROFILE} pro Monat. HeyReach kostet{" "}
                        {HEYREACH_USD.base} $ pro Profil, ab{" "}
                        {HEYREACH_USD.volumeFrom} Profilen{" "}
                        {HEYREACH_USD.volume} $, umgerechnet mit{" "}
                        {fmtCurrency(USD_TO_EUR)} € pro $. Im ersten Monat kommt
                        das Setup von {fmtMoney(setup)} dazu, das hier nicht
                        eingerechnet ist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LinkedInROI;

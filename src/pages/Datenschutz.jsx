import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Datenschutz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" /> Zurück zur Startseite
        </Link>

        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 font-sans text-white">
          Datenschutz
        </h1>

        <div className="prose prose-invert prose-lg text-white/70 max-w-none mt-12 space-y-8">
          <p className="text-sm text-white/40">
            Zuletzt geändert am 13. September 2025
          </p>

          <p>
            ScalarAI respektiert Ihre Privatsphäre und verpflichtet sich, Ihre
            personenbezogenen Daten zu schützen. Diese Datenschutzerklärung
            erläutert, welche Arten von Informationen wir erheben, wie wir diese
            verwenden und welche Rechte Sie in Bezug auf Ihre Daten haben.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            1. Erhebung von Informationen
          </h3>
          <p>
            Wir können verschiedene Arten von Informationen erfassen, darunter:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Personenbezogene Daten:</strong> Zum Beispiel Name,
              E-Mail-Adresse, Telefonnummer und Firmenname, wenn Sie Formulare
              ausfüllen oder mit uns Kontakt aufnehmen.
            </li>
            <li>
              <strong>Nutzungsdaten:</strong> Informationen darüber, wie Sie
              unsere Website nutzen, einschließlich IP-Adresse, Browsertyp,
              Betriebssystem, Referrer-URLs, besuchte Seiten sowie Datum und
              Uhrzeit des Zugriffs.
            </li>
            <li>
              <strong>Cookies und Tracking-Technologien:</strong> Kleine
              Dateien, die auf Ihrem Endgerät gespeichert werden, um Ihr
              Nutzungserlebnis zu verbessern und den Website-Traffic zu
              analysieren.
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            2. Verwendung Ihrer Informationen
          </h3>
          <p>
            Wir verwenden die erhobenen Daten unter anderem für folgende Zwecke:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              Bereitstellung, Betrieb und Wartung unserer Dienstleistungen
            </li>
            <li>
              Verbesserung, Personalisierung und Weiterentwicklung unserer
              Website
            </li>
            <li>Analyse der Nutzung unserer Website</li>
            <li>Entwicklung neuer Funktionen, Produkte und Services</li>
            <li>
              Kommunikation mit Ihnen, direkt oder über beauftragte Partner
            </li>
            <li>
              Abwicklung von Transaktionen und Versand entsprechender
              Informationen
            </li>
            <li>Erfüllung gesetzlicher Verpflichtungen</li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            3. Weitergabe von Informationen
          </h3>
          <p>
            Wir verkaufen oder vermieten Ihre personenbezogenen Daten nicht.
            Eine Weitergabe kann jedoch in folgenden Fällen erfolgen:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>An Dienstleister:</strong> Externe Anbieter, die in
              unserem Auftrag Leistungen erbringen (z. B. Hosting,
              Analyse-Dienste, Kundensupport).
            </li>
            <li>
              <strong>Aus rechtlichen Gründen:</strong> Wenn dies zur Einhaltung
              geltender Gesetze, behördlicher Anordnungen oder rechtlicher
              Verfahren erforderlich ist.
            </li>
            <li>
              <strong>Im Rahmen von Unternehmensübertragungen:</strong> Bei
              Fusionen, Übernahmen oder dem Verkauf von Vermögenswerten können
              Daten übertragen werden.
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            4. Cookies and Tracking
          </h3>
          <p>
            Wir verwenden Cookies und vergleichbare Technologien, um
            Website-Aktivitäten zu verfolgen und bestimmte Informationen zu
            speichern. Cookies helfen uns, die Benutzerfreundlichkeit zu
            verbessern und Trends zu analysieren.
          </p>
          <p>
            Sie können Cookies über Ihre Browsereinstellungen deaktivieren.
            Bitte beachten Sie, dass dadurch die Funktionalität einzelner
            Bereiche der Website eingeschränkt sein kann.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            5. Speicherdauer
          </h3>
          <p>
            Wir speichern personenbezogene Daten nur so lange, wie dies zur
            Erfüllung der in dieser Datenschutzerklärung genannten Zwecke
            erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            6. Ihre Datenschutzrechte
          </h3>
          <p>
            Abhängig von Ihrem Wohnsitzland stehen Ihnen folgende Rechte zu:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
            <li>Recht auf Berichtigung oder Löschung</li>
            <li>Recht auf Einschränkung der Verarbeitung oder Widerspruch</li>
            <li>Recht auf Datenübertragbarkeit</li>
            <li>
              Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für
              die Zukunft
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            7. Links zu Drittanbietern
          </h3>
          <p>
            Unsere Website kann Links zu externen Websites enthalten. Für deren
            Datenschutzpraktiken übernehmen wir keine Verantwortung. Bitte
            informieren Sie sich dort jeweils über die geltenden
            Datenschutzbestimmungen.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            8. Datensicherheit
          </h3>
          <p>
            Wir setzen angemessene technische und organisatorische
            Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen. Dennoch kann
            keine Übertragung über das Internet oder elektronische Speicherung
            eine absolute Sicherheit garantieren.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            9. Datenschutz von Kindern
          </h3>
          <p>
            Unsere Angebote richten sich nicht an Personen unter 13 Jahren. Wir
            erheben wissentlich keine personenbezogenen Daten von Kindern.
            Sollten Sie Kenntnis davon erhalten, dass uns ein Kind
            personenbezogene Daten übermittelt hat, kontaktieren Sie uns bitte
            umgehend.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            10. Änderungen dieser Datenschutzerklärung
          </h3>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung gelegentlich
            anzupassen. Änderungen werden auf dieser Seite mit einem
            aktualisierten „Stand“-Datum veröffentlicht.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            11. Kontakt
          </h3>
          <p className="mb-4">
            Bei Fragen zu dieser Datenschutzerklärung erreichen Sie uns unter:
          </p>
          <div className="text-white/70">
            <p className="mb-1">Henrik Freisleben</p>
            <p className="mb-1">Rheingutstraße 36</p>
            <p className="mb-4">78462 Konstanz</p>
            <p>
              <span className="text-white">Email:</span> henrik@ScalarAI.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-borderLight">
            <button
                className="w-full py-6 flex items-center justify-between text-left group"
                onClick={onClick}
            >
                <span className={`text-lg md:text-xl font-medium font-sans pr-8 transition-colors ${isOpen ? 'text-foreground font-medium' : 'text-foreground/80 group-hover:text-foreground'}`}>
                    {question}
                </span>
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown size={20} className="text-muted group-hover:text-foreground transition-colors" />
                </div>
            </button>

            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
            >
                <div className="pb-8 text-muted leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(0);

    const faqs = [
        {
            q: "Wie lange dauert die Implementierung eines KI-Workflows?",
            a: "Die Dauer hängt von der Komplexität ab. Einfache Workflows (z.B. Lead-Scraping) integrieren wir in 1-2 Wochen. Umfangreiche Automatisierungen mit mehreren Schnittstellen und Custom LLMs dauern in der Regel 4-6 Wochen vom Kickoff bis zum finalen Testing."
        },
        {
            q: "Sind unsere Unternehmensdaten sicher?",
            a: "Absolute Datensicherheit hat höchste Priorität. Wir arbeiten DSGVO-konform, speichern keine sensiblen Kundendaten dauerhaft und nutzen bei Bedarf Enterprise-KI-Modelle, bei denen Ihre Daten nicht für das Training der Modelle verwendet werden."
        },
        {
            q: "Brauchen wir technisches Vorwissen in unserem Team?",
            a: "Nein. Wir übernehmen die komplette technische Umsetzung und Architektur. Nach der Implementierung erhalten Sie eine einfache Einweisung in die Bedienung der Systeme, die so konzipiert sind, dass sie ohne Code-Kenntnisse nutzbar sind."
        },
        {
            q: "Wie wird die Wartung der Systeme sichergestellt?",
            a: "Systemlandschaften und APIs ändern sich. Deshalb bieten wir Maintenance-Packages an, bei denen wir Ihre Workflows kontinuierlich überwachen und bei Bedarf proaktiv anpassen, damit alles reibungslos weiterläuft."
        }
    ];

    return (
        <section id="faq" className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-borderLight">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground font-sans mb-4 pb-2">
                        Häufige Fragen.
                    </h2>
                    <p className="text-lg text-muted font-medium">
                        Transparenz ist unser Prinzip.
                    </p>
                </div>

                <div className="border-t border-borderLight flex flex-col">
                    {faqs.map((faq, idx) => (
                        <FAQItem
                            key={idx}
                            question={faq.q}
                            answer={faq.a}
                            isOpen={openIdx === idx}
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

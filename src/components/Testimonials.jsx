import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Wir arbeiten sehr gerne mit Henrik (von Scalar) zusammen. Er achtet auf Details und versteht es, skalierbare Automationen aufzubauen – insbesondere im Zusammenspiel von Outbound-Tools und CRM-Systemen. Für uns und unsere Kunden liefert er hochwertige Arbeit in Kombination mit einer professionellen Arbeitsweise. Eine klare Empfehlung für die Zusammenarbeit mit ihm.",
      author: "Patrick Perner",
      role: "Co-Founder, Founder Sales",
      image: `${import.meta.env.BASE_URL}patrick.png`,
    },
    {
      quote:
        "Ich war anfangs ehrlich gesagt eher skeptisch, wenn jemand mit einem Automatisierungssystem auf mich zukommt. Henrik hat das aber auf eine sehr angenehme und professionelle Art gemacht, was mich als marketingaffinen Unternehmer sofort abgeholt hat. In der Zusammenarbeit war er jederzeit sehr responsive, lösungsorientiert und absolut zuverlässig in der Umsetzung und bei den Timelines. Die Resultate können sich sehen lassen und der Austausch auf Augenhöhe hat richtig Spass gemacht.",
      author: "Nicolas Borer",
      role: "Managing Partner, Kontaktkompass",
      image: null,
    },
    {
      quote:
        "Henrik (from Scalar) was great - attentive, good clear communications, fast turnaround, high quality. He is exactly what I'm looking for in an automation developer. We will certainly be working again very soon on our next projects.",
      author: "Gordon Grant",
      role: "Co-Founder, Secondcity AI",
      image: `${import.meta.env.BASE_URL}gordon.png`,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-borderLight"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-medium tracking-normal text-foreground font-sans mb-4 pb-2">
            Was unsere Partner sagen
          </h2>
          <p className="text-lg text-muted max-w-2xl font-medium">
            Ein paar Worte zufriedener Kunden, die bereits mit unseren Systemen
            arbeiten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-surface p-8 md:p-10 rounded-[2rem] border border-borderLight flex flex-col h-full hover:border-foreground/20 transition-colors"
            >
              <svg
                className="w-8 h-8 text-muted/30 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-foreground font-medium leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface2 border border-borderLight flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-muted font-sans">
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground font-sans">
                    {t.author}
                  </p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

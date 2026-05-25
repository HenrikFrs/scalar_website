import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Impressum = () => {

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 font-sans text-white">
          Imprint
        </h1>

        <div className="prose prose-invert prose-lg text-white/70 max-w-none mt-12 space-y-8">
          <p className="text-sm text-white/40">
            Last updated March 25, 2026
          </p>

          <div>
            <p className="mb-1">Henrik Freisleben</p>
            <p className="mb-1">Ludwig-Finckh-Straße 1d</p>
            <p className="mb-4">78432 Engen</p>
          </div>

          <div>
            <p>
              <span className="text-white">Email:</span> henrik@scalarai.co
            </p>
            <p>
              <span className="text-white">Telefon:</span> +49 1590 2239382
            </p>
          </div>
          <div>
            <p>
              <span className="text-white">USt-IdNr.:</span> DE454136928
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;

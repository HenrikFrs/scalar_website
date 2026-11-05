import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Impressum = () => {

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <Link
          to="/"
          className="inline-flex items-center ui-label text-muted hover:text-green transition-colors duration-300 mb-12"
        >
          <ArrowLeft size={14} className="mr-2" /> Back to Home
        </Link>

        <h1 className="type-h1 mb-4 text-heading">
          Imprint
        </h1>

        <div className="type-body text-body max-w-none mt-12 space-y-8">
          <p className="ui-label text-green">
            Last updated March 25, 2026
          </p>

          <div>
            <p className="mb-1">Henrik Freisleben</p>
            <p className="mb-1">Ludwig-Finckh-Straße 1d</p>
            <p className="mb-4">78432 Engen</p>
          </div>

          <div>
            <p>
              <span className="text-heading">Email:</span> henrik@scalarai.co
            </p>
            <p>
              <span className="text-heading">Telefon:</span> +49 1590 2239382
            </p>
          </div>
          <div>
            <p>
              <span className="text-heading">USt-IdNr.:</span> DE454136928
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;

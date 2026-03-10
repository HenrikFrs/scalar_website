import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Impressum = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12 text-sm font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Zurück zur Startseite
                </Link>

                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 font-sans text-white">
                    Impressum
                </h1>

                <div className="prose prose-invert prose-lg text-white/70 max-w-none mt-12 space-y-8">
                    <p className="text-sm text-white/40">Zuletzt geändert am 13. September 2025</p>

                    <div>
                        <p className="mb-1">Henrik Freisleben</p>
                        <p className="mb-1">Ludwig-Finckh-Straße 1d</p>
                        <p className="mb-4">78432 Engen</p>
                    </div>

                    <div>
                        <p><span className="text-white">Email:</span> henrik@scalardrift.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Impressum;

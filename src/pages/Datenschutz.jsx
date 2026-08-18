import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Datenschutz = () => {
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
          Privacy Policy
        </h1>

        <div className="prose prose-invert prose-lg text-white/70 max-w-none mt-12 space-y-8">
          <p className="text-sm text-white/40">Last updated May 25, 2026</p>

          <p>
            Scalar respects your privacy and is committed to protecting your
            personal data. This privacy policy explains what types of
            information we collect, how we use it, and what rights you have
            regarding your data.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            1. Collection of Information
          </h3>
          <p>We may collect various types of information, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Personal data:</strong> For example, name, email address,
              phone number, and company name when you fill out forms or contact
              us.
            </li>
            <li>
              <strong>Usage data:</strong> Information about how you use our
              website, including IP address, browser type, operating system,
              referrer URLs, pages visited, and date and time of access.
            </li>
            <li>
              <strong>Cookies and tracking technologies:</strong> Small files
              stored on your device to improve your user experience and analyze
              website traffic.
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            2. Use of Your Information
          </h3>
          <p>
            We use the collected data for the following purposes, among others:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Providing, operating, and maintaining our services</li>
            <li>
              Improving, personalizing, and further developing our website
            </li>
            <li>Analyzing the use of our website</li>
            <li>Developing new features, products, and services</li>
            <li>
              Communicating with you, directly or through authorized partners
            </li>
            <li>Processing transactions and sending related information</li>
            <li>Fulfilling legal obligations</li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            3. Sharing of Information
          </h3>
          <p>
            We do not sell or rent your personal data. However, sharing may
            occur in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>With service providers:</strong> Third-party vendors
              providing services on our behalf (e.g. hosting, analytics,
              customer support).
            </li>
            <li>
              <strong>For legal reasons:</strong> When required to comply with
              applicable laws, regulatory orders, or legal proceedings.
            </li>
            <li>
              <strong>In connection with business transfers:</strong> In the
              event of mergers, acquisitions, or asset sales, data may be
              transferred.
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            4. Cookies and Tracking
          </h3>
          <p>
            We use cookies and similar technologies to track website activity
            and store certain information. Cookies help us improve usability and
            analyze trends.
          </p>
          <p>
            You can disable cookies through your browser settings. Please note
            that this may limit the functionality of certain areas of the
            website.
          </p>
          <p>
            For visitors in the European Union, we display a cookie consent
            banner before any tracking is activated. You may accept or decline
            tracking at any time. Your choice is stored locally in your browser
            and respected on subsequent visits.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            4a. Google Tag Manager
          </h3>
          <p>
            This website uses Google Tag Manager (GTM), a tag management service
            provided by Google Ireland Limited, Gordon House, Barrow Street,
            Dublin 4, Ireland. GTM itself does not set cookies or collect
            personal data; it is a framework that loads other tracking scripts
            ("tags") only after you have given your consent.
          </p>
          <p>
            The tags currently deployed via GTM may include analytics tools
            (e.g. Google Analytics) that collect usage data such as pages
            visited, session duration, approximate location derived from IP
            address, and device information. This data is processed by Google on
            servers that may be located outside the European Economic Area. Data
            transfers to the USA are carried out on the basis of the EU Standard
            Contractual Clauses.
          </p>
          <p>
            Legal basis for processing: Art. 6(1)(a) GDPR (consent). EU visitors
            can withdraw consent at any time by contacting us or clearing their
            browser's local storage for this site. Withdrawal does not affect
            the lawfulness of processing carried out prior to withdrawal.
          </p>
          <p>
            For more information on how Google handles data, please refer to
            Google's privacy policy at{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              policies.google.com/privacy
            </a>
            .
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            5. Retention Period
          </h3>
          <p>
            We retain personal data only for as long as necessary to fulfill the
            purposes described in this privacy policy or as required by law.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            6. Your Privacy Rights
          </h3>
          <p>
            Depending on your country of residence, you may have the following
            rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Right to access your stored data</li>
            <li>Right to rectification or erasure</li>
            <li>Right to restriction of processing or objection</li>
            <li>Right to data portability</li>
            <li>
              Right to withdraw consent previously given, with effect for the
              future
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            7. Third-Party Links
          </h3>
          <p>
            Our website may contain links to external websites. We are not
            responsible for their privacy practices. Please review their
            respective privacy policies.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            8. Data Security
          </h3>
          <p>
            We employ appropriate technical and organizational security measures
            to protect your data. However, no transmission over the internet or
            electronic storage can guarantee absolute security.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            9. Children's Privacy
          </h3>
          <p>
            Our services are not directed at persons under the age of 13. We do
            not knowingly collect personal data from children. If you become
            aware that a child has submitted personal data to us, please contact
            us immediately.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            10. Changes to This Privacy Policy
          </h3>
          <p>
            We reserve the right to update this privacy policy occasionally.
            Changes will be published on this page with an updated "last
            updated" date.
          </p>

          <h3 className="text-2xl font-medium text-white mt-12 mb-4">
            11. Contact
          </h3>
          <p className="mb-4">
            If you have questions about this privacy policy, you can reach us
            at:
          </p>
          <div className="text-white/70">
            <p className="mb-1">Henrik Freisleben</p>
            <p className="mb-1">Ludwig-Finckh-Straße 1D</p>
            <p className="mb-4">78234 Engen</p>
            <p>
              <span className="text-white">Email:</span> henrik@scalarai.co
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;

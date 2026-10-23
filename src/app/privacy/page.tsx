import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Niche Scout Pro for Etsy",
  description: "Official Privacy Policy for the Niche Scout Pro for Etsy Chrome Extension and Web Suite.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-sm text-zinc-950 hover:opacity-80">
            <div className="w-7 h-7 rounded-lg bg-[#ea580c] text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span>Niche Scout Pro for Etsy</span>
          </Link>
          <Link href="/" className="text-xs font-semibold text-zinc-600 hover:text-zinc-950">
            &larr; Back to App
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
              Chrome Web Store Compliant · GDPR &amp; CCPA Ready
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 mb-2">Privacy Policy</h1>
            <p className="text-xs text-zinc-500">Last updated: October 24, 2026 · Effective immediately</p>
          </div>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">1. Single Purpose &amp; Overview</h2>
            <p>
              <strong>Niche Scout Pro for Etsy</strong> (&quot;the Extension&quot;, &quot;we&quot;, &quot;our&quot;) is an independent product research and sales velocity estimation utility engineered for e-commerce sellers.
              The Extension operates strictly on Etsy marketplace product, search, and public shop pages to extract publicly accessible sales velocity signals (such as 24-hour transaction urgency indicators and in-cart counts).
            </p>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">2. Data We NEVER Collect</h2>
            <p>We respect user privacy and operate under strict data minimization guidelines. We do not collect, store, transmit, or sell:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-600">
              <li>Personally Identifiable Information (PII) such as full names, home addresses, phone numbers, or government IDs.</li>
              <li>Financial credentials, credit card numbers, bank routing information, or Etsy billing details.</li>
              <li>Personal buyer browsing history outside of public Etsy listings.</li>
              <li>Etsy account credentials, passwords, or authentication session cookies.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">3. Chrome Extension Permissions Justification</h2>
            <p>The Extension requests the absolute minimum permissions required to perform its single purpose:</p>
            <div className="space-y-3 mt-3">
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                <code className="font-mono font-bold text-xs text-[#ea580c]">activeTab</code>
                <p className="text-xs text-zinc-600 mt-1">
                  Required solely to inject the forensic sales velocity HUD and badge overlays into the current active Etsy tab when requested by the user.
                </p>
              </div>
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                <code className="font-mono font-bold text-xs text-[#ea580c]">storage</code>
                <p className="text-xs text-zinc-600 mt-1">
                  Used strictly on the user&apos;s local device to persist UI preferences, fee calculator default rates, and cached listing metrics to prevent redundant network requests.
                </p>
              </div>
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                <code className="font-mono font-bold text-xs text-[#ea580c]">host_permissions: https://*.etsy.com/*</code>
                <p className="text-xs text-zinc-600 mt-1">
                  Strictly limited to the Etsy domain. The Extension explicitly excludes sensitive paths such as <code className="bg-zinc-200/60 px-1 py-0.5 rounded">/cart</code>, <code className="bg-zinc-200/60 px-1 py-0.5 rounded">/checkout</code>, and <code className="bg-zinc-200/60 px-1 py-0.5 rounded">/your/account</code> to guarantee zero interaction with private personal data.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">4. Third-Party Services &amp; Advertising</h2>
            <p>
              Our web application may feature affiliate partner recommendations (such as print-on-demand fulfillment providers, graphic template services, or bookkeeping software).
              If you click an affiliate partner link, you will be redirected to that partner&apos;s independent website, governed by their own respective privacy policies.
              We do not sell user data to advertising brokers.
            </p>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">5. Contact Information &amp; Data Deletion Requests</h2>
            <p>
              For privacy inquiries, questions regarding this policy, or assistance with developer disclosures, contact:
            </p>
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs font-medium space-y-1">
              <div><strong>Publisher:</strong> Niche Scout Pro Studio</div>
              <div><strong>Support &amp; Developer Email:</strong> support@scoutpro.app</div>
              <div><strong>Compliance Jurisdiction:</strong> European Economic Area (EEA) &amp; United States</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

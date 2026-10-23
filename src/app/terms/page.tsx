import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Niche Scout Pro for Etsy",
  description: "Terms and Conditions of Service for Niche Scout Pro for Etsy.",
};

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 mb-2">Terms of Service</h1>
            <p className="text-xs text-zinc-500">Effective: October 2026</p>
          </div>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">1. Acceptance of Terms</h2>
            <p>
              By installing, accessing, or using the <strong>Niche Scout Pro for Etsy</strong> browser extension and web application, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
            </p>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">2. Trademark &amp; Independent Disclaimer</h2>
            <p>
              &quot;Etsy&quot; is a registered trademark of Etsy, Inc. Niche Scout Pro is an independent third-party market research utility. Niche Scout Pro is not endorsed by, sponsored by, or affiliated with Etsy, Inc.
            </p>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">3. Subscriptions &amp; Commercial Terms</h2>
            <p>
              Niche Scout Pro offers Free and Premium subscription tiers. Subscriptions unlock extended search volumes, shop SKU forensics, and MCP API features. Subscriptions are billed on a recurring monthly or annual basis and may be cancelled at any time through your account management settings.
            </p>
          </section>

          <section className="space-y-3 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-6">
            <h2 className="text-lg font-bold text-zinc-950">4. Limitation of Liability</h2>
            <p>
              All sales metrics, in-cart statistics, fee calculations, and projected profit margins provided by Niche Scout Pro are estimations based on public forensic signals and historical review frequencies. Actual store results depend upon product quality, market competition, and merchant fulfillment.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

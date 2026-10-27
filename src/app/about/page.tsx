import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us & Business Information — Niche Scout Pro",
  description: "Official business profile, legal representation, registered physical address, and company overview for Niche Scout Pro.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-sm text-zinc-950 hover:opacity-80">
            <div className="w-8 h-8 rounded-lg bg-[#ea580c] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              S
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">Niche Scout Pro</span>
              <span className="text-[10px] text-zinc-500 font-normal">E-Commerce Market Intelligence</span>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/" className="text-zinc-600 hover:text-zinc-950">
              Home
            </Link>
            <Link href="/contact" className="text-zinc-600 hover:text-zinc-950">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-950">
              Privacy
            </Link>
            <Link href="/terms" className="text-zinc-600 hover:text-zinc-950">
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-12 shadow-sm space-y-10">
          {/* Header Title */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] text-xs font-bold mb-3 uppercase tracking-wider">
              Official Corporate &amp; Business Profile
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mb-3">
              About Niche Scout Pro
            </h1>
            <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
              Niche Scout Pro is an independent market intelligence, sales velocity analytics, and fee-auditing software terminal engineered for e-commerce entrepreneurs, digital creators, and Etsy merchants worldwide.
            </p>
          </div>

          {/* Business & Legal Identity Anchor (Payoneer Verification Verified) */}
          <section className="bg-gradient-to-br from-zinc-50 to-orange-50/30 rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-200/80 pb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
                🏢
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-950">Registered Business &amp; Merchant Details</h2>
                <p className="text-xs text-zinc-500">Official verified contact and business address as registered for global banking and payment operations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Business Legal Representative &amp; Owner</div>
                  <div className="font-extrabold text-base text-zinc-900 mt-0.5">Muhammad Shoiab</div>
                  <div className="text-xs text-zinc-500">Founder &amp; Principal Software Publisher</div>
                </div>

                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Business Operating Name</div>
                  <div className="font-bold text-zinc-900 mt-0.5">Niche Scout Pro</div>
                  <div className="text-xs text-zinc-500">Digital Software, Analytics &amp; E-Commerce Tooling</div>
                </div>

                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Official Website URL</div>
                  <div className="font-mono font-semibold text-[#ea580c] mt-0.5 break-all">
                    https://niche-scout-pro-web.vercel.app
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Registered Physical Business Address</div>
                  <div className="font-medium text-zinc-800 mt-1 leading-relaxed bg-white p-3.5 rounded-xl border border-zinc-200/90 shadow-2xs">
                    <p className="font-semibold text-zinc-950">Post Office Chak No. 172 TDA, Ameer Kalasra</p>
                    <p>Tehsil and District Layyah, East</p>
                    <p>Punjab, Pakistan</p>
                    <p className="text-xs text-zinc-500 mt-1">Postal Code: 31200</p>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Corporate &amp; Merchant Support Inquiries</div>
                  <div className="font-mono font-semibold text-zinc-900 mt-0.5">
                    support@nichescoutpro.com
                  </div>
                  <div className="text-xs text-zinc-500">Alternative: contact@nichescoutpro.com</div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Purpose & Operations */}
          <section className="space-y-4 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-8">
            <h2 className="text-xl font-bold text-zinc-950">Our Mission &amp; Software Products</h2>
            <p>
              Founded and managed by <strong>Muhammad Shoiab</strong>, Niche Scout Pro provides accurate, non-destructive market intelligence tools designed to eliminate guesswork for online merchants. We build high-performance software utilities that analyze public e-commerce listings, project realistic sales turnover, calculate true bank deposits after all marketplace and payment processing fees, and extract high-ranking search keywords.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-1.5">
                <div className="font-bold text-zinc-950 text-sm">1. Browser Extension</div>
                <p className="text-xs text-zinc-600">
                  A high-density Chrome extension that injects clean micro-forensics ribbons into product search results and shop catalogs with zero lag.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-1.5">
                <div className="font-bold text-zinc-950 text-sm">2. Cloud Research Hub</div>
                <p className="text-xs text-zinc-600">
                  A web terminal offering live profit margin calculators, store SKU unmasking, and customer review friction mining algorithms.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-1.5">
                <div className="font-bold text-zinc-950 text-sm">3. Agentic Research MCP</div>
                <p className="text-xs text-zinc-600">
                  Universal Model Context Protocol endpoints allowing AI assistants (Claude, Cursor) to pull verified e-commerce research directly.
                </p>
              </div>
            </div>
          </section>

          {/* Commercial Structure & Payment Transparency */}
          <section className="space-y-4 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-8">
            <h2 className="text-xl font-bold text-zinc-950">Commercial Structure &amp; Monetization</h2>
            <p>
              Niche Scout Pro operates under a hybrid freemium software-as-a-service (SaaS) and digital asset model:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-zinc-600 text-xs sm:text-sm">
              <li>
                <strong>Free Tier:</strong> Basic in-grid listing analysis, standard profit margin calculations, and community tag generation.
              </li>
              <li>
                <strong>Professional &amp; Agency Subscriptions:</strong> Advanced store SKU reverse-engineering, unlimited search exports, and automated API access billed recurringly via verified international merchant payment gateways.
              </li>
              <li>
                <strong>Digital Research Bundles &amp; Templates:</strong> One-time downloadable spreadsheet workflows and analytical templates delivered digitally upon purchase.
              </li>
            </ul>
          </section>

          {/* Customer Support & Fair Business Practices */}
          <section className="space-y-4 text-sm text-zinc-700 leading-relaxed border-t border-zinc-100 pt-8">
            <h2 className="text-xl font-bold text-zinc-950">Customer Support &amp; Consumer Protection</h2>
            <p>
              We are dedicated to fair trading, transparent pricing, and prompt customer assistance. All user inquiries, billing questions, or data rights requests are personally handled by our support desk with a guaranteed response within 24 to 48 business hours.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
              >
                Contact Support Desk &rarr;
              </Link>
              <Link
                href="/privacy"
                className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-800 font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                View Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-800 font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                View Terms of Service
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Niche Scout Pro. Owned and operated by <strong>Muhammad Shoiab</strong>.
          </div>
          <div className="flex items-center gap-4 text-zinc-600 font-medium">
            <Link href="/" className="hover:text-zinc-950">Home</Link>
            <Link href="/about" className="text-[#ea580c] font-bold">About Us</Link>
            <Link href="/contact" className="hover:text-zinc-950">Contact</Link>
            <Link href="/privacy" className="hover:text-zinc-950">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-950">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

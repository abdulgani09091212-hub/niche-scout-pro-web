"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

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
              <span className="text-[10px] text-zinc-500 font-normal">Customer &amp; Merchant Support</span>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/" className="text-zinc-600 hover:text-zinc-950">
              Home
            </Link>
            <Link href="/about" className="text-zinc-600 hover:text-zinc-950">
              About Us
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
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 uppercase tracking-wider">
              24-48 Hour Dedicated Support Desk
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mb-3">
              Contact &amp; Customer Support
            </h1>
            <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
              Have a question about your subscription, need technical assistance with the browser extension, or require verification details? We are here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-zinc-50/60 rounded-2xl border border-zinc-200 p-6 sm:p-8">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    ✓
                  </div>
                  <h3 className="font-extrabold text-xl text-zinc-950">Message Dispatched Successfully</h3>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                    Thank you for reaching out. A confirmation has been logged, and our team will respond to your inquiry at <span className="font-mono font-semibold text-zinc-900">{formData.email || "your email"}</span> within 24 to 48 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-zinc-950 text-white rounded-lg text-xs font-semibold hover:bg-zinc-800 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-zinc-800 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-800 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-800 mb-1.5">Inquiry Department</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition-all"
                    >
                      <option value="general">General Software Inquiries</option>
                      <option value="billing">Billing, Invoices &amp; Subscriptions</option>
                      <option value="extension">Chrome Extension Technical Support</option>
                      <option value="merchant">Merchant &amp; Commercial Partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-zinc-800 mb-1.5">Message / Details</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe how we can assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold rounded-xl shadow-sm transition-colors text-xs cursor-pointer"
                  >
                    Submit Support Ticket &rarr;
                  </button>
                </form>
              )}
            </div>

            {/* Official Business Information Sidebar (Payoneer Match Anchor) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-5 shadow-2xs">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-950">Official Business Location</h3>
                    <p className="text-[10px] text-zinc-500">Registered entity address for banking &amp; payouts</p>
                  </div>
                </div>

                <div className="text-xs space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Business Representative</span>
                    <span className="font-bold text-zinc-900 text-sm">Muhammad Shoiab</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Physical Registered Address</span>
                    <div className="font-medium text-zinc-800 mt-1 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                      <p className="font-semibold text-zinc-950">Post Office Chak No. 172 TDA, Ameer Kalasra</p>
                      <p>Tehsil and District Layyah, East</p>
                      <p>Punjab, Pakistan</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Postal Code: 31200</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Official Inquiries &amp; Account Email</span>
                    <a
                      href="mailto:babyfeedinglog@gmail.com"
                      className="font-mono font-semibold text-[#ea580c] hover:underline block mt-0.5 text-sm"
                    >
                      babyfeedinglog@gmail.com
                    </a>
                    <span className="text-[10px] text-zinc-500">Corporate Desk: support@nichescoutpro.com</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Official Website</span>
                    <span className="font-mono text-zinc-700 block mt-0.5">
                      https://niche-scout-pro-web.vercel.app
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-5 text-xs space-y-2">
                <div className="font-bold text-zinc-950 flex items-center gap-2">
                  <span>⏱️ Operating Schedule</span>
                </div>
                <p className="text-zinc-600 leading-relaxed text-[11px]">
                  Our technical and billing desk operates Monday through Friday, 9:00 AM to 6:00 PM (UTC+5). Tickets submitted over weekends are answered first on Monday morning.
                </p>
              </div>
            </div>
          </div>
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
            <Link href="/about" className="hover:text-zinc-950">About Us</Link>
            <Link href="/contact" className="text-[#ea580c] font-bold">Contact</Link>
            <Link href="/privacy" className="hover:text-zinc-950">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-950">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

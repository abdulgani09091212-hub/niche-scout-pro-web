"use client";

import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"claude" | "cursor" | "python">("claude");
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [testKeyword, setTestKeyword] = useState("Wooden Bird Figurine");
  const [testPrice, setTestPrice] = useState(16.50);
  const [isDigital, setIsDigital] = useState(false);
  const [hasOffsiteAds, setHasOffsiteAds] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  // Dynamic live calculation
  const listingFee = 0.20;
  const transactionFee = Math.round(testPrice * 0.065 * 100) / 100;
  const paymentFee = Math.round((testPrice * 0.03 + 0.25) * 100) / 100;
  const offsiteFee = hasOffsiteAds ? Math.round(testPrice * 0.15 * 100) / 100 : 0;
  const totalFees = Math.round((listingFee + transactionFee + paymentFee + offsiteFee) * 100) / 100;
  const netTakeHome = Math.max(0, Math.round((testPrice - totalFees) * 100) / 100);
  const marginPct = testPrice > 0 ? Math.round((netTakeHome / testPrice) * 100) : 0;

  const sampleTags = [
    "wooden bird",
    "robin figurine",
    "carved wood animal",
    "desk decor aesthetic",
    "hand carved bird",
    "rustic home accent",
    "bird lover gift",
    "wood animal statue",
    "miniature robin",
    "shelf art sculpture",
    "wood sculpture gift",
    "living room decor",
    "tabletop ornament"
  ];

  const handleCopyTags = () => {
    navigator.clipboard.writeText(sampleTags.join(", "));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleCopyMcp = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const claudeConfig = JSON.stringify({
    mcpServers: {
      "etsy-niche-scout": {
        url: "https://your-domain.vercel.app/api/mcp",
        headers: {
          "x-api-key": "scout_live_sample_key"
        }
      }
    }
  }, null, 2);

  const cursorConfig = JSON.stringify({
    mcpServers: {
      "etsy-scout": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://your-domain.vercel.app/api/mcp", "--header", "x-api-key:scout_live_sample_key"]
      }
    }
  }, null, 2);

  const pythonConfig = `import requests

MCP_ENDPOINT = "https://your-domain.vercel.app/api/mcp"
HEADERS = {"Content-Type": "application/json", "x-api-key": "scout_live_sample_key"}

# Query live Etsy keyword suggestions and competition
payload = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "etsy_keyword_scout",
        "arguments": {"query": "wooden bird figurine"}
    }
}
response = requests.post(MCP_ENDPOINT, json=payload, headers=HEADERS)
print(response.json()["result"])`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              S
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">Niche Scout Pro</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                2026 Edition
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#demo" className="hover:text-slate-900 transition">Live Sandbox</a>
            <a href="#mcp" className="hover:text-slate-900 transition">Remote MCP (AI)</a>
            <a href="#comparison" className="hover:text-slate-900 transition">Compare vs EverBee</a>
            <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#mcp"
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition hidden sm:inline-flex"
            >
              ⚡ Connect AI Agent
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-brand-500 text-white shadow-sm hover:bg-brand-600 transition"
            >
              Add to Chrome (Free)
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-8">
          <span>★ 4.9/5 Rating</span>
          <span className="text-amber-400">•</span>
          <span>100% Free Client-Side Engine</span>
          <span className="text-amber-400">•</span>
          <span>Universal Remote MCP Live</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find Etsy Cash Cows in Seconds.<br />
          <span className="text-brand-500">Zero Guesswork. Zero Monthly Fees.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          The high-density product research extension and remote MCP server. Unmasks competitor store bestsellers, calculates true post-fee take-home cash, and generates 13 compliant tags with 1 click.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-500/20 hover:bg-brand-600 transition"
          >
            Test Live Interactive Sandbox
          </a>
          <a
            href="#mcp"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-base hover:bg-slate-50 transition"
          >
            Connect Remote MCP to Claude / Cursor
          </a>
        </div>

        {/* 5-Pillar Snapshot Ribbon Banner */}
        <div className="mt-16 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto text-left">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Preview: 5-Pillar Core Forensics Strip (Embedded Under Every Etsy Listing)
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
            <span className="px-2.5 py-1 rounded bg-amber-100 border border-amber-200 text-amber-900 font-bold">
              🏆 Bestseller (#1 Rank)
            </span>
            <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700">
              🔑 Wooden Bird Figurine
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
              📅 New (2026) · 35d active
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
              ⭐ 124 reviews (4.9 ★)
            </span>
            <span className="px-2.5 py-1 rounded bg-purple-50 border border-purple-200 text-purple-900 font-bold">
              💰 ~240/mo · $14.15 Net Take-Home (86%)
            </span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Sandbox Demo Section */}
      <section id="demo" className="py-16 bg-slate-100/60 border-t border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Interactive Forensics Sandbox</h2>
            <p className="mt-2 text-slate-600">Simulate live research and fee economics before installing the extension.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Input Simulator */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
              <h3 className="font-bold text-slate-900 text-base">Listing Parameters</h3>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Target Keyword / Product Name</label>
                <input
                  type="text"
                  value={testKeyword}
                  onChange={(e) => setTestKeyword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>Retail Price</span>
                  <span className="text-brand-600 font-mono">${testPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="100"
                  step="0.5"
                  value={testPrice}
                  onChange={(e) => setTestPrice(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-brand-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-700">Digital Download Format</span>
                <input
                  type="checkbox"
                  checked={isDigital}
                  onChange={(e) => setIsDigital(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-700">Offsite Ads Sale (15%)</span>
                  <div className="text-xs text-slate-400">Mandatory for shops over $10k/yr</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasOffsiteAds}
                  onChange={(e) => setHasOffsiteAds(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                />
              </div>

              <div className="mt-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 uppercase">Automated Verdict</div>
                <div className="text-sm font-bold text-emerald-900 mt-0.5">
                  🟢 HIGH-INROAD OPPORTUNITY (STRONG BUY)
                </div>
                <div className="text-xs text-emerald-700 mt-1">
                  Page 1 has low incumbent dominance. 35% new-seller penetration.
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Take-Home Breakdown & Tags */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-4">True Take-Home Cashflow Engine</h3>

                {/* Profit KPI Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-500">Net Take-Home Cash</div>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      ${netTakeHome.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Per item sold</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs font-semibold text-emerald-700">True Profit Margin</div>
                    <div className="text-2xl font-black text-emerald-800 font-mono mt-1">
                      {marginPct}%
                    </div>
                    <div className="text-xs text-emerald-700 mt-0.5">Post-Etsy deductions</div>
                  </div>
                </div>

                {/* Fee Deductions Row */}
                <div className="space-y-2 text-xs font-medium text-slate-600 mb-6">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Listing Renewal Fee</span>
                    <span className="font-mono text-slate-900">${listingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Transaction Fee (6.5%)</span>
                    <span className="font-mono text-slate-900">${transactionFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Payment Processing (3% + $0.25)</span>
                    <span className="font-mono text-slate-900">${paymentFee.toFixed(2)}</span>
                  </div>
                  {hasOffsiteAds && (
                    <div className="flex justify-between py-1 border-b border-slate-100 text-amber-700">
                      <span>Offsite Ads Deduction (15%)</span>
                      <span className="font-mono text-amber-900">${offsiteFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 font-bold text-slate-900 text-sm">
                    <span>Total Etsy Cut</span>
                    <span className="font-mono text-red-600">-${totalFees.toFixed(2)}</span>
                  </div>
                </div>

                {/* 13 Compliant Tags Copy Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">13 Compliant Backend Tags (Under 20c)</span>
                    <button
                      onClick={handleCopyTags}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 transition"
                    >
                      {copiedTags ? "✓ Copied to Clipboard" : "Copy All 13 Tags"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-lg bg-slate-50 border border-slate-200">
                    {sampleTags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-xs text-slate-700 font-medium">
                        {tag} <span className="text-slate-400 text-[10px]">({tag.length}c)</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Universal Remote MCP & AI Agent Hub */}
      <section id="mcp" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-3">
            Model Context Protocol (MCP) • 2026 Production Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Let Claude & AI Agents Scout Etsy for You
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Connect Claude Desktop, Cursor, or autonomous agent swarms directly to your live Vercel endpoint. Empower LLMs to execute live keyword forensics, store bestseller audits, and profit simulations.
          </p>
        </div>

        {/* MCP Code Switcher Box */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("claude")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "claude" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Claude Desktop
              </button>
              <button
                onClick={() => setActiveTab("cursor")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "cursor" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Cursor / Windsurf
              </button>
              <button
                onClick={() => setActiveTab("python")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "python" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Python & LangChain
              </button>
            </div>

            <button
              onClick={() => handleCopyMcp(activeTab === "claude" ? claudeConfig : (activeTab === "cursor" ? cursorConfig : pythonConfig))}
              className="text-xs font-bold px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              {copiedConfig ? "✓ Copied" : "Copy Snippet"}
            </button>
          </div>

          <div className="p-6 overflow-x-auto text-xs font-mono leading-relaxed">
            <pre>
              {activeTab === "claude" && claudeConfig}
              {activeTab === "cursor" && cursorConfig}
              {activeTab === "python" && pythonConfig}
            </pre>
          </div>

          <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
            <span>Remote Endpoint: <code>POST /api/mcp</code></span>
            <span>Transport: JSON-RPC 2.0 / Streamable HTTP</span>
            <span className="text-emerald-400 font-semibold">● Protocol Status: 2024-11-05 Verified</span>
          </div>
        </div>
      </section>

      {/* 5. Head-to-Head Comparison Table */}
      <section id="comparison" className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why ScoutPro Beats Legacy Tools</h2>
            <p className="mt-2 text-slate-600">A clear, technical look at how we eliminate the flaws of EverBee and Alura.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-bold text-slate-900">Feature</th>
                  <th className="py-3 px-4 font-bold text-brand-600">Niche Scout Pro</th>
                  <th className="py-3 px-4 font-semibold text-slate-500">EverBee</th>
                  <th className="py-3 px-4 font-semibold text-slate-500">Alura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Monthly Cost</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">100% Free / Client-Side ($0)</td>
                  <td className="py-3 px-4 text-slate-500">$29.99 – $49.99 / mo</td>
                  <td className="py-3 px-4 text-slate-500">$29.99 – $39.99 / mo</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Search Limits</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">Unlimited (No Daily Caps)</td>
                  <td className="py-3 px-4 text-slate-500">10 searches / mo (Free)</td>
                  <td className="py-3 px-4 text-slate-500">Limited on Free tier</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">True Net Take-Home</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">Exact fees deducted (6.5% + ads)</td>
                  <td className="py-3 px-4 text-slate-500">None (Gross Revenue only)</td>
                  <td className="py-3 px-4 text-slate-500">None (Gross Revenue only)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Store Bestseller Unmasker</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">Review-to-Listing Correlation</td>
                  <td className="py-3 px-4 text-slate-500">Paywalled Shop Analyzer</td>
                  <td className="py-3 px-4 text-slate-500">Paywalled Shop Inspector</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">13 Tags Formatter</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">1-Click (Under 20c limit)</td>
                  <td className="py-3 px-4 text-slate-500">Manual copy / Exceeds limits</td>
                  <td className="py-3 px-4 text-slate-500">Paywalled export</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Remote MCP for AI Agents</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">Native Vercel Endpoint</td>
                  <td className="py-3 px-4 text-slate-500">Not Available</td>
                  <td className="py-3 px-4 text-slate-500">Not Available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Niche Scout Pro. Built with Next.js 16 and Model Context Protocol.
          </div>
          <div className="flex items-center gap-6">
            <a href="#demo" className="hover:text-slate-900 transition">Interactive Demo</a>
            <a href="#mcp" className="hover:text-slate-900 transition">Remote MCP Docs</a>
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition">Deploy on Vercel</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

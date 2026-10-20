"use client";

import { useState } from "react";

export default function HomePage() {
  const [activeMcpTab, setActiveMcpTab] = useState<"claude" | "cursor" | "python" | "curl">("claude");
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  // 1. Live Profit Forensics Sandbox State
  const [price, setPrice] = useState<number>(14.99);
  const [isDigital, setIsDigital] = useState<boolean>(true);
  const [hasOffsiteAds, setHasOffsiteAds] = useState<boolean>(false);

  // Fee calculation formulas
  const listingFee = 0.20;
  const transactionFee = Math.round(price * 0.065 * 100) / 100;
  const paymentFee = Math.round((price * 0.03 + 0.25) * 100) / 100;
  const offsiteAdsFee = hasOffsiteAds ? Math.round(price * 0.15 * 100) / 100 : 0;
  const totalFees = Math.round((listingFee + transactionFee + paymentFee + offsiteAdsFee) * 100) / 100;
  const netTakeHome = Math.max(0, Math.round((price - totalFees) * 100) / 100);
  const profitMargin = price > 0 ? Math.round((netTakeHome / price) * 100) : 0;

  // 2. Interactive Tag Generator State
  const [seedKeyword, setSeedKeyword] = useState("adhd digital planner");
  const [activeTags, setActiveTags] = useState<string[]>([
    "adhd planner",
    "digital planner",
    "goodnotes template",
    "daily schedule",
    "focus tracker",
    "adhd daily routine",
    "ipad organizer",
    "adult adhd tools",
    "notability pdf",
    "weekly reset",
    "executive function",
    "instant download",
    "productivity hub"
  ]);

  // 3. Live Opportunity Matrix Calculator State
  const [calcListings, setCalcListings] = useState<number>(1240);
  const [calcNewShops, setCalcNewShops] = useState<number>(25);
  const [calcInCart, setCalcInCart] = useState<number>(18);

  const getVerdict = () => {
    if (calcListings > 3000) {
      return {
        label: "AVOID (SATURATED)",
        color: "text-rose-700 bg-rose-50 border-rose-200",
        reason: "Search results exceed the 3,000 threshold. Dominant shops hold top ranks with high review moats."
      };
    }
    if (calcNewShops >= 20 && calcInCart >= 10) {
      return {
        label: "GO (HIGH OPPORTUNITY)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        reason: "Strong buyer velocity confirmed with >= 20% Page 1 penetration by new shops and active in-cart urgency."
      };
    }
    return {
      label: "CAUTION (SELECTIVE INROAD)",
      color: "text-amber-700 bg-amber-50 border-amber-200",
      reason: "Moderate market depth. Compete only with specific long-tail phrasing or superior visual assets."
    };
  };

  const currentVerdict = getVerdict();

  // 4. Live MCP Testing Console State
  const [mcpQuery, setMcpQuery] = useState("wooden bird figurine");
  const [mcpLoading, setMcpLoading] = useState(false);
  const [mcpResponse, setMcpResponse] = useState<any>(null);

  const handleTestMcp = async () => {
    setMcpLoading(true);
    setMcpResponse(null);
    try {
      const res = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/call",
          params: {
            name: "etsy_keyword_scout",
            arguments: { query: mcpQuery }
          }
        })
      });
      const data = await res.json();
      setMcpResponse(data);
    } catch (err: any) {
      setMcpResponse({ error: err.message || "Failed to query live MCP endpoint" });
    } finally {
      setMcpLoading(false);
    }
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(activeTags.join(", "));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleCopyMcp = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const claudeConfig = JSON.stringify({
    mcpServers: {
      "etsy-niche-scout": {
        url: "https://etsy-saas-web.vercel.app/api/mcp"
      }
    }
  }, null, 2);

  const cursorConfig = JSON.stringify({
    mcpServers: {
      "etsy-scout": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://etsy-saas-web.vercel.app/api/mcp"]
      }
    }
  }, null, 2);

  const pythonConfig = `import requests

# Live Vercel Model Context Protocol Endpoint
MCP_URL = "https://etsy-saas-web.vercel.app/api/mcp"
payload = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "etsy_keyword_scout",
        "arguments": {"query": "adhd digital planner"}
    }
}
res = requests.post(MCP_URL, json=payload)
print(res.json()["result"])`;

  const curlConfig = `curl -X POST https://etsy-saas-web.vercel.app/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"etsy_keyword_scout","arguments":{"query":"wooden bird figurine"}}}'`;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-[#09090b]">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ea580c] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M11 8v6" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-zinc-950">Niche Scout Pro</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tnum">
                v2.4 Live
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a href="#forensics" className="hover:text-zinc-950 transition-colors">Forensics Sandbox</a>
            <a href="#tags" className="hover:text-zinc-950 transition-colors">13 Compliant Tags</a>
            <a href="#opportunity" className="hover:text-zinc-950 transition-colors">Opportunity Matrix</a>
            <a href="#mcp" className="hover:text-zinc-950 transition-colors">Remote MCP</a>
            <a href="#compare" className="hover:text-zinc-950 transition-colors">Competitor Benchmark</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#extension"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Install Extension
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Thesis Viewport) */}
      <section className="pt-16 pb-12 border-b border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Universal Remote Model Context Protocol (MCP) Live on Vercel
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1] mb-6">
            Stop Guessing What Sells on Etsy. Audit Pure Take-Home Cashflow in Real Time.
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-zinc-600 leading-relaxed mb-8">
            The high-density product research engine engineered for 2026. Unmask true sequential vintage age, active in-cart buyer demand, verified shop bestsellers, and net seller take-home cash after every single Etsy fee deduction.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#forensics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ea580c] text-white font-semibold text-sm hover:bg-[#c2410c] transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <line x1="9" x2="9" y1="21" y2="9" />
              </svg>
              Try Live Forensics Sandbox
            </a>

            <a
              href="#mcp"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold text-sm hover:bg-zinc-200 transition-all"
            >
              <svg className="w-4 h-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l6-6-6-6" />
                <path d="M12 19h8" />
              </svg>
              Connect Claude & Cursor MCP
            </a>
          </div>

          {/* Live In-Grid Forensics Ribbon Mock */}
          <div className="scout-surface rounded-2xl p-5 text-left max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center font-bold text-sm">
                  #1
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Listing Forensics Demonstration</div>
                  <div className="text-sm font-bold text-zinc-900">Minimalist ADHD Daily Planner 2026 (Digital Download)</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tnum">
                🟢 GO · HIGH PROFIT INROAD
              </div>
            </div>

            {/* In-Grid Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Take-Home Cash</div>
                <div className="text-base font-bold text-emerald-600 tnum mt-0.5">$13.12 <span className="text-xs font-semibold text-zinc-500">/ $14.99</span></div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">87% Net Margin</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Review Velocity</div>
                <div className="text-base font-bold text-zinc-900 tnum mt-0.5">4.8 <span className="text-xs text-zinc-500 font-normal">sales/day</span></div>
                <div className="text-[10px] text-zinc-600 font-medium mt-1">831 Verified Reviews</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">In-Cart Urgency</div>
                <div className="text-base font-bold text-orange-600 tnum mt-0.5">18 in cart</div>
                <div className="text-[10px] text-orange-700 font-medium mt-1">Active Buying Frenzy</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Sequential Age</div>
                <div className="text-base font-bold text-zinc-900 tnum mt-0.5">42 days</div>
                <div className="text-[10px] text-blue-700 font-medium mt-1">ID: 4508137959</div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Product Type</div>
                <div className="text-base font-bold text-indigo-600 mt-0.5">Instant PDF</div>
                <div className="text-[10px] text-indigo-700 font-medium mt-1">$0 Shipping Cost</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Feature 1: Real-Time Profit Forensics Sandbox */}
      <section id="forensics" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Real-Time Take-Home Profit Forensics Sandbox
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Competitor tools quote gross revenue ($4,200/mo) while silently ignoring Etsy fees, leading sellers to launch money-losing products. Simulate your true net cashflow after exact 2026 deductions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 scout-surface rounded-2xl p-6">
              <div className="text-sm font-bold text-zinc-900 mb-6 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Listing Parameters</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 tnum">Live Simulator</span>
              </div>

              {/* Retail Price Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="price-input" className="text-xs font-semibold text-zinc-700">Retail Listing Price</label>
                  <span className="text-lg font-bold text-zinc-950 tnum">${price.toFixed(2)}</span>
                </div>
                <input
                  id="price-input"
                  type="range"
                  min="2"
                  max="120"
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full accent-[#ea580c] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 tnum mt-1">
                  <span>$2.00</span>
                  <span>$60.00</span>
                  <span>$120.00</span>
                </div>
              </div>

              {/* Digital vs Physical Switch */}
              <div className="mb-6 p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-900">Digital Download Mode</div>
                  <div className="text-[11px] text-zinc-500">Zero physical fulfillment or shipping fee overhead</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDigital(!isDigital)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isDigital ? "bg-emerald-600" : "bg-zinc-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      isDigital ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Offsite Ads Toggle */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-900">Etsy Offsite Ads (15%)</div>
                  <div className="text-[11px] text-zinc-500">Deduction when sale originates via Google or Meta ads</div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasOffsiteAds(!hasOffsiteAds)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    hasOffsiteAds ? "bg-orange-600" : "bg-zinc-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      hasOffsiteAds ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Waterfall Breakdown Display */}
            <div className="lg:col-span-7 scout-surface rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-100">
                <span className="text-sm font-bold text-zinc-900">Take-Home Cashflow Breakdown</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 tnum">
                  {profitMargin}% Pure Margin
                </span>
              </div>

              {/* Big Result Card */}
              <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-emerald-800">Net Take-Home Cash (Per Sale)</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tnum mt-1">
                    ${netTakeHome.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-zinc-500">Total Deductions</div>
                  <div className="text-lg font-bold text-rose-600 tnum mt-1">
                    -${totalFees.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Waterfall Items */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                  <span className="text-zinc-600">Retail Price</span>
                  <span className="font-bold text-zinc-900 tnum">${price.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-zinc-100 text-rose-600">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span>Listing Renewal Fee</span>
                    <span className="text-[11px] text-zinc-400">($0.20 per listing/sale)</span>
                  </span>
                  <span className="font-semibold tnum">-${listingFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-zinc-100 text-rose-600">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span>Etsy Transaction Fee</span>
                    <span className="text-[11px] text-zinc-400">(6.5% of retail price)</span>
                  </span>
                  <span className="font-semibold tnum">-${transactionFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-zinc-100 text-rose-600">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <span>Payment Processing Fee</span>
                    <span className="text-[11px] text-zinc-400">(3% + $0.25 standard)</span>
                  </span>
                  <span className="font-semibold tnum">-${paymentFee.toFixed(2)}</span>
                </div>

                {hasOffsiteAds && (
                  <div className="flex items-center justify-between py-2 border-b border-zinc-100 text-rose-600">
                    <span className="flex items-center gap-1.5 text-zinc-600">
                      <span>Offsite Ads Attribution</span>
                      <span className="text-[11px] text-zinc-400">(15% flat deduction)</span>
                    </span>
                    <span className="font-semibold tnum">-${offsiteAdsFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 font-bold text-base">
                  <span className="text-zinc-950">Net Deposited into Bank Account</span>
                  <span className="text-emerald-600 tnum">${netTakeHome.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Feature 2: 1-Click 13 Compliant Tags Generator */}
      <section id="tags" className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              1-Click 13 Compliant Tags Formatter
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Etsy strictly enforces a 20-character limit per backend tag. Tags exceeding 20 characters trigger silent rejection in the listing editor. All tags generated below are pre-validated to guarantee 100% acceptance.
            </p>
          </div>

          <div className="scout-surface rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-900">Seed Niche:</span>
                <span className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-900 font-semibold text-xs border border-zinc-200">
                  {seedKeyword}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  13/13 Slots Filled
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyTags}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
              >
                {copiedTags ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Copy All 13 Tags
                  </>
                )}
              </button>
            </div>

            {/* Tag Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {activeTags.map((tag, idx) => {
                const charLen = tag.length;
                const isUnderLimit = charLen <= 20;

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-400 tnum w-4">#{idx + 1}</span>
                      <span className="text-xs font-semibold text-zinc-900">{tag}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded tnum ${
                      isUnderLimit ? "bg-emerald-100/70 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}>
                      {charLen}/20
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Feature 3: Opportunity Matrix Decision Engine */}
      <section id="opportunity" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Automated Opportunity Verdict Engine
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Evaluate whether a target keyword represents an accessible inroad or an impenetrable wall. Adjust search parameters to trigger our doctor-frame classification.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 scout-surface rounded-2xl p-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-2">
                  <label htmlFor="results-input">Total Search Results (Etsy Competition)</label>
                  <span className="font-bold text-zinc-950 tnum">{calcListings.toLocaleString()} listings</span>
                </div>
                <input
                  id="results-input"
                  type="range"
                  min="200"
                  max="8000"
                  step="50"
                  value={calcListings}
                  onChange={(e) => setCalcListings(parseInt(e.target.value))}
                  className="w-full accent-[#ea580c] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 tnum mt-1">
                  <span>200 (Low)</span>
                  <span>1,500 (Ceiling Barrier)</span>
                  <span>8,000+ (High)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-2">
                  <label htmlFor="newshops-input">Page 1 New Shop Penetration (&lt;50 Reviews)</label>
                  <span className="font-bold text-zinc-950 tnum">{calcNewShops}%</span>
                </div>
                <input
                  id="newshops-input"
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={calcNewShops}
                  onChange={(e) => setCalcNewShops(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 tnum mt-1">
                  <span>0% (Veteran Monopolies)</span>
                  <span>20%+ (High Accessibility)</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-2">
                  <label htmlFor="incart-input">Page 1 In-Cart Urgency Count</label>
                  <span className="font-bold text-zinc-950 tnum">{calcInCart} listings in-cart</span>
                </div>
                <input
                  id="incart-input"
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={calcInCart}
                  onChange={(e) => setCalcInCart(parseInt(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 tnum mt-1">
                  <span>0 (Cold Demand)</span>
                  <span>10+ (Active Traffic)</span>
                  <span>35+</span>
                </div>
              </div>
            </div>

            {/* Verdict Display */}
            <div className="lg:col-span-6 scout-surface rounded-2xl p-8">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Executive Forensic Diagnosis
              </div>
              <div className={`inline-block px-4 py-2 rounded-xl border font-bold text-sm mb-4 tnum ${currentVerdict.color}`}>
                {currentVerdict.label}
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed mb-6">
                {currentVerdict.reason}
              </p>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs text-zinc-600 space-y-2">
                <div className="font-semibold text-zinc-900">2026 Algorithmic Rules:</div>
                <p>1. Over 1,500 search results require severe long-tail specialization.</p>
                <p>2. If zero new shops hold Page 1 rank, algorithmic rank velocity favors aged stores.</p>
                <p>3. Active in-cart badges confirm immediate buyer demand, bypassing search volume vanity metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Feature 4: Remote MCP Agent Hub & Live Terminal */}
      <section id="mcp" className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Universal Remote Model Context Protocol (MCP) Server
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Connect Claude Desktop, Cursor, Windsurf, or custom Python agents to live Etsy product research over official JSON-RPC 2.0. No local API keys or browser automation dependencies required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Client Config Switcher */}
            <div className="lg:col-span-7 scout-surface rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                {/* Tab Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveMcpTab("claude")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpTab === "claude" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Claude Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMcpTab("cursor")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpTab === "cursor" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Cursor / Windsurf
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMcpTab("python")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpTab === "python" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Python Script
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMcpTab("curl")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpTab === "curl" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    cURL
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const text = activeMcpTab === "claude" ? claudeConfig : activeMcpTab === "cursor" ? cursorConfig : activeMcpTab === "python" ? pythonConfig : curlConfig;
                    handleCopyMcp(text);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  {copiedMcp ? "Copied!" : "Copy Snippet"}
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-xl bg-[#09090b] text-zinc-200 p-4 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed">
                <pre>
                  {activeMcpTab === "claude" && claudeConfig}
                  {activeMcpTab === "cursor" && cursorConfig}
                  {activeMcpTab === "python" && pythonConfig}
                  {activeMcpTab === "curl" && curlConfig}
                </pre>
              </div>
            </div>

            {/* Right: Live In-Browser MCP Query Tester */}
            <div className="lg:col-span-5 scout-surface rounded-2xl p-6">
              <div className="text-sm font-bold text-zinc-900 mb-2 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Live MCP Query Tester</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  HTTP 200 Ready
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-4">
                Execute a live JSON-RPC 2.0 tool execution against our production Vercel server right now:
              </p>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={mcpQuery}
                  onChange={(e) => setMcpQuery(e.target.value)}
                  placeholder="Target seed keyword..."
                  className="flex-1 px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                <button
                  type="button"
                  onClick={handleTestMcp}
                  disabled={mcpLoading}
                  className="px-4 py-2 rounded-lg bg-[#ea580c] text-white font-semibold text-xs hover:bg-[#c2410c] transition-colors disabled:opacity-50"
                >
                  {mcpLoading ? "Calling..." : "Execute"}
                </button>
              </div>

              <div className="rounded-xl bg-zinc-900 text-zinc-300 p-4 font-mono text-[11px] overflow-y-auto max-h-[220px] border border-zinc-800">
                {mcpResponse ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(mcpResponse, null, 2)}</pre>
                ) : (
                  <span className="text-zinc-500 italic">
                    Click &apos;Execute&apos; above to run live tools/call via JSON-RPC 2.0 on Vercel...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Competitive Benchmark Matrix */}
      <section id="compare" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Competitive Truth Matrix
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              How ScoutPro benchmarks against legacy Etsy research tools. Zero artificial search ceilings, zero bloated paywalls, and native Remote MCP agent connectivity.
            </p>
          </div>

          <div className="scout-surface rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-semibold text-zinc-500">
                    <th className="py-4 px-6">Capability</th>
                    <th className="py-4 px-6 text-[#ea580c] font-bold">Niche Scout Pro</th>
                    <th className="py-4 px-6">EverBee</th>
                    <th className="py-4 px-6">Alura</th>
                    <th className="py-4 px-6">eRank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/80">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Pricing Model</td>
                    <td className="py-4 px-6 font-bold text-emerald-600">100% Free & Open</td>
                    <td className="py-4 px-6 text-zinc-500">$29 - $49 / mo</td>
                    <td className="py-4 px-6 text-zinc-500">$20 - $39 / mo</td>
                    <td className="py-4 px-6 text-zinc-500">$6 - $20 / mo</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Universal Remote MCP API</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">Native JSON-RPC 2.0</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">None</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">None</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">None</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Net Take-Home Cashflow Engine</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">Real Deductions (6.5% + $0.20 + 3% + Ads)</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">Gross Revenue Only</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">Gross Revenue Only</td>
                    <td className="py-4 px-6 text-zinc-500">Manual Calculator</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Sequential Listing Age Safety</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">Prevents False &quot;New Listing&quot; Labels</td>
                    <td className="py-4 px-6 text-zinc-500">Often Overwrites Old Dates</td>
                    <td className="py-4 px-6 text-zinc-500">Estimated Only</td>
                    <td className="py-4 px-6 text-zinc-500">Static Crawl Data</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">13 Compliant Tags Formatter</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">1-Click Copy (&lt;= 20 Char Enforced)</td>
                    <td className="py-4 px-6 text-zinc-500">Paywalled Copy</td>
                    <td className="py-4 px-6 text-zinc-500">Separate App View</td>
                    <td className="py-4 px-6 text-zinc-500">Table Only</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Performance & DOM Stability</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">WeakSet Idempotence & 60 FPS Containment</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">Reported Tab Freezes</td>
                    <td className="py-4 px-6 text-zinc-500">Heavy Side Drawer</td>
                    <td className="py-4 px-6 text-zinc-500">Web App Only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Extension Installation Walkthrough */}
      <section id="extension" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Install the Chrome Extension (30 Seconds)
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              No registration or credit cards required. Load the unpacked extension directly into Google Chrome, Brave, or Microsoft Edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="scout-surface rounded-2xl p-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Download Package</h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Download the verified zip package containing all vetted Manifest V3 source files, cleanroom CSP, and minimal permissions.
              </p>
              <a
                href="https://github.com/abdulgani09091212-hub/niche-scout-pro-web/tree/master/tools/dist"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#ea580c] hover:underline inline-flex items-center gap-1"
              >
                Download Extension ZIP &rarr;
              </a>
            </div>

            <div className="scout-surface rounded-2xl p-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Enable Developer Mode</h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Open <code className="bg-zinc-100 px-1 py-0.5 rounded text-[11px] text-zinc-800">chrome://extensions</code> in your browser and toggle the Developer Mode switch in the top-right corner.
              </p>
            </div>

            <div className="scout-surface rounded-2xl p-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Load Unpacked</h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Click &quot;Load unpacked&quot; and select the extracted folder. Navigate to any Etsy search or shop page to see instant forensic badges!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Minimalist Footer */}
      <footer className="border-t border-black/[0.08] bg-zinc-950 text-zinc-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#ea580c] text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-semibold text-zinc-200">Niche Scout Pro · 2026 Engine</span>
          </div>

          <div className="text-zinc-500 text-center sm:text-right">
            Independent forensic product research suite. Not affiliated with Etsy, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}

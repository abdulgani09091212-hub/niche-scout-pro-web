"use client";

import { useState } from "react";

export default function HomePage() {
  const [activeMcpTab, setActiveMcpTab] = useState<"claude" | "cursor" | "python" | "curl">("claude");
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

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

  // 3. 3-Second Niche Verdict Simulator
  const [selectedNiche, setSelectedNiche] = useState<"planner" | "spreadsheet" | "jewelry" | "svg">("planner");

  const nicheData = {
    planner: {
      title: "ADHD Digital Planner 2026",
      results: "1,240 listings",
      verdict: "GO (HIGH INROAD)",
      verdictClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      takeHome: "$13.12 net (87%)",
      velocity: "4.8 sales/day",
      inCart: "18 in cart",
      age: "42 days",
      advice: "Strong buyer velocity confirmed. 28% of Page 1 listings belong to shops with under 50 reviews. High in-cart intent confirms active cashflow."
    },
    spreadsheet: {
      title: "Courier Dispatch Bookkeeping Excel",
      results: "412 listings",
      verdict: "GO (UNTAPPED BLUE OCEAN)",
      verdictClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      takeHome: "$18.42 net (88%)",
      velocity: "3.2 sales/day",
      inCart: "11 in cart",
      age: "18 days",
      advice: "Low competition ceiling under 500 listings. High commercial intent from business operators. Immediate Page 1 penetration achievable."
    },
    jewelry: {
      title: "Handmade Dainty Gold Necklace",
      results: "48,900 listings",
      verdict: "AVOID (SATURATED GRAVEYARD)",
      verdictClass: "bg-rose-50 text-rose-800 border-rose-200",
      takeHome: "$24.10 net (68%)",
      velocity: "1.1 sales/day",
      inCart: "4 in cart",
      age: "4.2 years",
      advice: "Extreme saturation. 96% of Page 1 is dominated by veteran shops with 10k+ reviews. Organic rank impossible without aggressive offsite ad spend."
    },
    svg: {
      title: "Halloween Ghost SVG Bundle",
      results: "8,400 listings",
      verdict: "CAUTION (SEASONAL SPIKE)",
      verdictClass: "bg-amber-50 text-amber-800 border-amber-200",
      takeHome: "$2.45 net (72%)",
      velocity: "8.5 sales/day",
      inCart: "32 in cart",
      age: "65 days",
      advice: "High in-cart demand but severe price compression ($3.50 median). High transaction volume required to overcome the $0.20 listing fee."
    }
  };

  const activeNicheData = nicheData[selectedNiche];

  // 4. Live MCP Testing Console
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
      setMcpResponse({ error: err.message || "Failed to execute live MCP call" });
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

  const samplePrompt = `Claude, audit the '${activeNicheData.title}' niche on Etsy using our connected Niche Scout Pro MCP server.
1. Find 3 long-tail keyword inroads with under 1,500 total listings.
2. Check if new shops (<50 reviews) hold Page 1 rank.
3. Calculate my pure net take-home cash if I sell for $${price.toFixed(2)} (deduct 6.5% transaction, $0.20 listing, and payment processing).
4. Generate 13 compliant backend tags strictly under 20 characters ready for the Etsy listing editor.
5. Write a high-converting 140-character mobile title placing the primary keyword in the first 40 characters.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
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

# Live Model Context Protocol Server Endpoint
API_URL = "https://etsy-saas-web.vercel.app/api/mcp"
payload = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "etsy_keyword_scout",
        "arguments": {"query": "adhd digital planner"}
    }
}
response = requests.post(API_URL, json=payload)
print(response.json()["result"])`;

  const curlConfig = `curl -X POST https://etsy-saas-web.vercel.app/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"etsy_keyword_scout","arguments":{"query":"wooden bird figurine"}}}'`;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-[#09090b]">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ea580c] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <circle cx="11" cy="11" r="3" fill="#ffffff" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-zinc-950">Niche Scout Pro</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tnum">
                2026 Engine
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <a href="#realm" className="hover:text-zinc-950 transition-colors">Real-World Forensic View</a>
            <a href="#profit" className="hover:text-zinc-950 transition-colors">Take-Home Cashflow</a>
            <a href="#verdict" className="hover:text-zinc-950 transition-colors">3-Second Verdict</a>
            <a href="#tags" className="hover:text-zinc-950 transition-colors">13 Compliant Tags</a>
            <a href="#mcp" className="hover:text-zinc-950 transition-colors">Claude &amp; Cursor MCP</a>
            <a href="#compare" className="hover:text-zinc-950 transition-colors">Truth Matrix</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#install"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Get Extension Free
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Thesis Viewport) */}
      <section className="pt-16 pb-12 border-b border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Universal Remote Model Context Protocol (MCP) Live &amp; Free
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1] mb-6">
            Stop Guessing What Sells on Etsy. Audit Pure Take-Home Cashflow in Real Time.
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-zinc-600 leading-relaxed mb-8">
            The high-density product research suite that exposes sequential vintage age, active in-cart buyer demand, verified shop bestsellers, and true seller profit after all 2026 Etsy fee deductions. No $49/month paywalls. Zero tab freezing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#realm"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ea580c] text-white font-semibold text-sm hover:bg-[#c2410c] transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <line x1="9" x2="9" y1="21" y2="9" />
              </svg>
              See Real-World Extension View
            </a>

            <a
              href="#mcp"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold text-sm hover:bg-zinc-200 transition-all"
            >
              <svg className="w-4 h-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l6-6-6-6" />
                <path d="M12 19h8" />
              </svg>
              Connect Claude Desktop MCP
            </a>
          </div>
        </div>
      </section>

      {/* 3. Real-World Realm Mockup (Photorealistic Etsy Card Overlay) */}
      <section id="realm" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Real-World Etsy Realm View
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              How ScoutPro overlays seamlessly onto native Etsy search pages without cluttering the screen or pushing product cards out of view.
            </p>
          </div>

          {/* Real Etsy Card Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* The Photorealistic Card */}
            <div className="scout-surface rounded-2xl p-4 bg-white max-w-md mx-auto shadow-sm">
              {/* Product Image Mock */}
              <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-50 via-zinc-100 to-amber-50 border border-zinc-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-[10px] font-bold text-zinc-700 border border-zinc-200 shadow-xs">
                  Bestseller
                </div>
                <div className="w-16 h-20 rounded bg-white shadow-sm border border-zinc-200 flex flex-col p-2 text-left justify-between mb-2">
                  <div className="h-2 w-8 bg-emerald-500 rounded-xs" />
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-zinc-200 rounded-xs" />
                    <div className="h-1 w-10 bg-zinc-200 rounded-xs" />
                  </div>
                  <div className="text-[8px] font-mono text-zinc-400">2026</div>
                </div>
                <span className="text-xs font-semibold text-zinc-700">Minimalist ADHD Daily Planner 2026</span>
                <span className="text-[10px] text-zinc-400 mt-0.5">Instant PDF &amp; GoodNotes Download</span>
              </div>

              {/* Native Listing Info */}
              <div className="pt-3 pb-2 space-y-1">
                <div className="text-xs font-medium text-zinc-500">AestheticStudioUK · 4,821 sales</div>
                <div className="text-sm font-bold text-zinc-900 leading-tight">
                  Minimalist ADHD Daily Planner 2026 (Digital Download)
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-sm font-extrabold text-zinc-950 tnum">$14.99</span>
                  <span className="text-xs text-emerald-600 font-semibold">Free instant delivery</span>
                </div>
              </div>

              {/* SCOUTPRO SINGLE-LINE DIAGNOSTIC STRIP */}
              <div className="mt-2 pt-2 border-t border-zinc-100">
                <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-between text-xs tnum">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-emerald-700">$13.12 Net</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/60 px-1 py-0.2 rounded">87%</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 text-[11px] font-medium">
                    <span title="Review velocity">⚡ 4.8/day</span>
                    <span title="In-cart buyer urgency" className="text-orange-600 font-semibold">🛒 18 in cart</span>
                    <span title="Sequential age">📅 42d</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation / Doctor Frame */}
            <div className="space-y-6">
              <div className="scout-surface rounded-2xl p-6 bg-white">
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">The Holy Trinity of Product Decision</div>
                <h3 className="text-xl font-bold text-zinc-950 mb-3">Everything You Need to Decide in 1.5 Seconds</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  Legacy extensions force you to open slow external dashboards or drown you in 25-column spreadsheets. ScoutPro injects an ultra-dense, 1-line diagnostic strip right below the product image:
                </p>

                <ul className="space-y-3 text-xs text-zinc-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-zinc-950">True Take-Home Cash:</strong> Know immediately that a $14.99 digital product puts $13.12 pure cash in your pocket after all 2026 fee rules.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-zinc-950">Live Buyer Urgency (In-Cart):</strong> Ignore vanity views. In-cart counts prove buyers are adding this item to their cart today.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-zinc-950">Sequential Vintage Age:</strong> Never be deceived by a 6-year-old bestseller that renewed yesterday. We compute true listing launch dates from sequential ID curves.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Real-Time Profit Forensics Sandbox */}
      <section id="profit" className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              True Take-Home Profit Forensics Sandbox
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Competitor tools quote gross revenue ($4,200/mo) while silently ignoring Etsy fees, leading sellers to launch money-losing products. Simulate your true net cashflow after exact 2026 deductions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 scout-surface rounded-2xl p-6 bg-white">
              <div className="text-sm font-bold text-zinc-900 mb-6 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Listing Parameters</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 tnum">Live Simulator</span>
              </div>

              {/* Retail Price Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="price-slider" className="text-xs font-semibold text-zinc-700">Retail Listing Price</label>
                  <span className="text-lg font-bold text-zinc-950 tnum">${price.toFixed(2)}</span>
                </div>
                <input
                  id="price-slider"
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
            <div className="lg:col-span-7 scout-surface rounded-2xl p-6 bg-white">
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

      {/* 5. The 3-Second Niche Verdict Simulator */}
      <section id="verdict" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              The 3-Second Executive Verdict Engine
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              No confusing data soup. Pick a target niche to see our instant doctor-frame classification: Should you sell this or avoid it?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Niche Selector */}
            <div className="lg:col-span-5 space-y-3">
              {[
                { id: "planner", label: "ADHD Digital Planner 2026", type: "Digital PDF · 1,240 Results" },
                { id: "spreadsheet", label: "Courier Dispatch Bookkeeping", type: "Excel Spreadsheet · 412 Results" },
                { id: "jewelry", label: "Handmade Dainty Gold Necklace", type: "Physical Jewelry · 48,900 Results" },
                { id: "svg", label: "Halloween Ghost SVG Bundle", type: "Digital Vectors · 8,400 Results" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedNiche(item.id as any)}
                  className={`w-full p-4 rounded-xl text-left transition-all border ${
                    selectedNiche === item.id
                      ? "bg-white border-zinc-950 shadow-sm"
                      : "bg-white/60 border-zinc-200/80 hover:bg-white"
                  }`}
                >
                  <div className="text-sm font-bold text-zinc-950">{item.label}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{item.type}</div>
                </button>
              ))}
            </div>

            {/* Verdict Display Card */}
            <div className="lg:col-span-7 scout-surface rounded-2xl p-6 sm:p-8 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                <div>
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Niche Viability Analysis</div>
                  <div className="text-lg font-bold text-zinc-950">{activeNicheData.title}</div>
                </div>
                <div className={`px-3 py-1 rounded-full border text-xs font-bold ${activeNicheData.verdictClass}`}>
                  {activeNicheData.verdict}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-zinc-100 tnum">
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                  <div className="text-[11px] font-medium text-zinc-500">Competition</div>
                  <div className="text-sm font-bold text-zinc-950 mt-0.5">{activeNicheData.results}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                  <div className="text-[11px] font-medium text-zinc-500">Take-Home Cash</div>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">{activeNicheData.takeHome}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                  <div className="text-[11px] font-medium text-zinc-500">Daily Velocity</div>
                  <div className="text-sm font-bold text-zinc-900 mt-0.5">{activeNicheData.velocity}</div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60">
                  <div className="text-[11px] font-medium text-zinc-500">In-Cart Urgency</div>
                  <div className="text-sm font-bold text-orange-600 mt-0.5">{activeNicheData.inCart}</div>
                </div>
              </div>

              {/* Executive Diagnosis */}
              <div className="pt-6">
                <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">Doctor Diagnosis:</div>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {activeNicheData.advice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 1-Click 13 Compliant Tags Generator */}
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

          <div className="scout-surface rounded-2xl p-6 sm:p-8 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-900">Niche:</span>
                <span className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-900 font-semibold text-xs border border-zinc-200">
                  {activeNicheData.title}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  13/13 Slots Compliant
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyTags}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
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

      {/* 7. What Connecting MCP REALLY Does for Users (The Superpower) */}
      <section id="mcp" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              What Does Connecting Remote MCP Actually Do For You?
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              No competitor (EverBee, Alura, eRank) supports the Model Context Protocol. By connecting ScoutPro to Claude Desktop or Cursor, you eliminate 3 to 4 hours of tedious manual spreadsheet work per product listing.
            </p>
          </div>

          {/* Workflow Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="scout-surface rounded-2xl p-6 bg-white border border-rose-200/80">
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">The Legacy Way (Without MCP)</div>
              <h3 className="text-lg font-bold text-zinc-950 mb-3">Manual 4-Hour Grind Per Listing</h3>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li className="flex items-center gap-2">❌ Open 20 Etsy search tabs and wait for slow pages to load.</li>
                <li className="flex items-center gap-2">❌ Manually copy keywords into Excel and count character lengths.</li>
                <li className="flex items-center gap-2">❌ Do fee math on a calculator to see if you even make profit.</li>
                <li className="flex items-center gap-2">❌ Guess 13 tags, only to have Etsy reject tags over 20 chars.</li>
                <li className="flex items-center gap-2">❌ Pay $49 every month to EverBee before making a single dollar.</li>
              </ul>
            </div>

            <div className="scout-surface rounded-2xl p-6 bg-white border border-emerald-300">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">The ScoutPro Way (With Remote MCP)</div>
              <h3 className="text-lg font-bold text-zinc-950 mb-3">10-Second Autonomous AI Research</h3>
              <ul className="space-y-2 text-xs text-zinc-700 font-medium">
                <li className="flex items-center gap-2">⚡ Ask Claude Desktop to find profitable digital sub-niches.</li>
                <li className="flex items-center gap-2">⚡ Claude queries live Etsy data via ScoutPro MCP tools automatically.</li>
                <li className="flex items-center gap-2">⚡ Automatically extracts 13 compliant tags under 20 characters.</li>
                <li className="flex items-center gap-2">⚡ Computes exact take-home cash after all 2026 Etsy fee rules.</li>
                <li className="flex items-center gap-2">⚡ 100% Free &amp; Open with zero monthly subscription bleed.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Claude Prompt Builder */}
          <div className="scout-surface rounded-2xl p-6 sm:p-8 bg-white mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-100">
              <div>
                <span className="text-sm font-bold text-zinc-900">Ready-to-Use Prompt for Claude Desktop</span>
                <span className="ml-2 text-xs text-zinc-500">(Paste into Claude once connected to ScoutPro MCP)</span>
              </div>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
              >
                {copiedPrompt ? "Copied Prompt!" : "Copy Prompt"}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs leading-relaxed whitespace-pre-wrap border border-zinc-800">
              {samplePrompt}
            </div>
          </div>

          {/* Client Connection Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 scout-surface rounded-2xl p-6 bg-white">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  {copiedMcp ? "Copied!" : "Copy Config"}
                </button>
              </div>

              <div className="rounded-xl bg-[#09090b] text-zinc-200 p-4 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed">
                <pre>
                  {activeMcpTab === "claude" && claudeConfig}
                  {activeMcpTab === "cursor" && cursorConfig}
                  {activeMcpTab === "python" && pythonConfig}
                  {activeMcpTab === "curl" && curlConfig}
                </pre>
              </div>
            </div>

            {/* Live In-Browser Tester */}
            <div className="lg:col-span-5 scout-surface rounded-2xl p-6 bg-white">
              <div className="text-sm font-bold text-zinc-900 mb-2 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Live MCP Query Tester</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  HTTP 200 Ready
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-4">
                Execute a live JSON-RPC 2.0 tool execution against our production cloud server right now:
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
                    Click &apos;Execute&apos; above to test tools/call via JSON-RPC 2.0 live...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Competitive Truth Matrix */}
      <section id="compare" className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Competitive Truth Matrix
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              How ScoutPro benchmarks against legacy Etsy research tools. Zero artificial search ceilings, zero bloated paywalls, and native Remote MCP agent connectivity.
            </p>
          </div>

          <div className="scout-surface rounded-2xl overflow-hidden bg-white">
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
                    <td className="py-4 px-6 font-bold text-emerald-600">100% Free &amp; Open</td>
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
                    <td className="py-4 px-6 font-semibold text-zinc-900">Performance &amp; DOM Stability</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">WeakSet Idempotence &amp; 60 FPS Containment</td>
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

      {/* 9. Extension Installation Walkthrough */}
      <section id="install" className="py-16 bg-[#fafafa]">
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
            <div className="scout-surface rounded-2xl p-6 bg-white">
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

            <div className="scout-surface rounded-2xl p-6 bg-white">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Enable Developer Mode</h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Open <code className="bg-zinc-100 px-1 py-0.5 rounded text-[11px] text-zinc-800">chrome://extensions</code> in your browser and toggle the Developer Mode switch in the top-right corner.
              </p>
            </div>

            <div className="scout-surface rounded-2xl p-6 bg-white">
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

      {/* 10. Minimalist Footer */}
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

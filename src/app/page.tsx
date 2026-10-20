"use client";

import { useState } from "react";

export default function HomePage() {
  const [activeViewTab, setActiveViewTab] = useState<"search" | "listing" | "shop">("search");
  const [activeMcpClient, setActiveMcpClient] = useState<"claude" | "cursor" | "python" | "curl">("claude");
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Table sorting / filtering state
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "digital" | "physical">("all");

  const sampleProducts = [
    {
      id: "1",
      title: "ADHD Daily Routine & Focus Planner (GoodNotes/Notability)",
      shop: "AestheticStudioUK",
      shopSales: "4,821",
      format: "Digital PDF",
      isDigital: true,
      price: 14.99,
      moSales: 480,
      moGross: 7195,
      netTakeHome: 13.12,
      marginPct: 87,
      age: "42 days",
      reviews: 831,
      inCart: 18,
      tags: ["adhd planner", "digital planner", "goodnotes template", "focus tracker", "adhd routine"]
    },
    {
      id: "2",
      title: "Courier Dispatch & Freight Bookkeeping Spreadsheet (Excel/Sheets)",
      shop: "LogisticsTemplates",
      shopSales: "1,290",
      format: "Spreadsheet",
      isDigital: true,
      price: 21.00,
      moSales: 165,
      moGross: 3465,
      netTakeHome: 18.42,
      marginPct: 88,
      age: "18 days",
      reviews: 94,
      inCart: 11,
      tags: ["dispatch template", "freight bookkeeping", "trucking spreadsheet", "courier log", "excel book"]
    },
    {
      id: "3",
      title: "Minimalist Wedding Vow Books Set of 2 (Handmade Foil Embossed)",
      shop: "PaperLoomStudio",
      shopSales: "18,450",
      format: "Physical Goods",
      isDigital: false,
      price: 32.00,
      moSales: 310,
      moGross: 9920,
      netTakeHome: 22.85,
      marginPct: 71,
      age: "1.4 years",
      reviews: 1420,
      inCart: 24,
      tags: ["wedding vow book", "his and hers vows", "foil vow booklet", "keepsake journal", "wedding gift"]
    },
    {
      id: "4",
      title: "Self-Care & Mental Wellness Journal 2026 (Hyperlinked Canva Template)",
      shop: "MindfulDigitalLab",
      shopSales: "3,110",
      format: "Canva Template",
      isDigital: true,
      price: 11.50,
      moSales: 290,
      moGross: 3335,
      netTakeHome: 10.05,
      marginPct: 87,
      age: "3 months",
      reviews: 312,
      inCart: 14,
      tags: ["mental health journal", "self care planner", "canva template", "wellness tracker", "digital book"]
    },
    {
      id: "5",
      title: "Custom Engraved Leather Keychain (Personalized Coordinates)",
      shop: "TimberCraftGifts",
      shopSales: "42,000",
      format: "Physical Goods",
      isDigital: false,
      price: 18.50,
      moSales: 620,
      moGross: 11470,
      netTakeHome: 12.80,
      marginPct: 69,
      age: "3.8 years",
      reviews: 3890,
      inCart: 35,
      tags: ["leather keychain", "coordinates gift", "personalized key", "anniversary for him", "custom leather"]
    }
  ];

  const filteredProducts = sampleProducts.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(searchFilter.toLowerCase()) || p.shop.toLowerCase().includes(searchFilter.toLowerCase());
    if (categoryFilter === "digital") return matchesQuery && p.isDigital;
    if (categoryFilter === "physical") return matchesQuery && !p.isDigital;
    return matchesQuery;
  });

  const sampleTags = [
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
  ];

  const handleCopyTags = () => {
    navigator.clipboard.writeText(sampleTags.join(", "));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleCopyMcp = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const claudePrompt = `Claude, audit the 'ADHD Digital Planner' niche on Etsy using our connected Niche Scout Pro MCP server.
1. Find 3 low-competition sub-niches with under 1,500 total listings.
2. Check if new shops (<50 reviews) hold Page 1 rank.
3. Calculate my pure net take-home cash if I sell for $14.99 (deduct 6.5% transaction, $0.20 listing, and payment processing).
4. Generate 13 compliant backend tags strictly under 20 characters ready for the Etsy listing editor.
5. Write a high-converting 140-character mobile title placing the primary keyword in the first 40 characters.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(claudePrompt);
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
            <a href="#views" className="hover:text-zinc-950 transition-colors">3 Canonical Views</a>
            <a href="#table" className="hover:text-zinc-950 transition-colors">Product Analytics</a>
            <a href="#claude" className="hover:text-zinc-950 transition-colors">Claude Desktop MCP</a>
            <a href="#compare" className="hover:text-zinc-950 transition-colors">Truth Matrix</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#install"
              className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm"
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
      <section className="pt-16 pb-14 border-b border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Zero $49/mo Paywalls · 100% Free Client-Side Speed · Remote MCP Connected
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1] mb-6">
            Real Sales. True Take-Home Cash. Unmask What Sells on Etsy in Seconds.
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-zinc-600 leading-relaxed mb-8">
            The high-density Etsy product research suite engineered for 2026. Spot low-competition breakout listings, extract 13 pre-validated tags, calculate net bank deposits after all 4 Etsy fees, and connect Claude Desktop for autonomous research.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href="#views"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ea580c] text-white font-semibold text-sm hover:bg-[#c2410c] transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <line x1="9" x2="9" y1="21" y2="9" />
              </svg>
              See the 3 Canonical Views
            </a>

            <a
              href="#claude"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold text-sm hover:bg-zinc-200 transition-all"
            >
              <svg className="w-4 h-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l6-6-6-6" />
                <path d="M12 19h8" />
              </svg>
              See Claude Desktop MCP in Action
            </a>
          </div>
        </div>
      </section>

      {/* 3. The 3 Canonical Views (Real-World Extension Showcase) */}
      <section id="views" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              How ScoutPro Operates on Etsy in Real Life
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              No generic widgets or disconnected dashboards. Here is exactly how ScoutPro integrates directly into the 3 canonical surfaces you navigate every day on Etsy.
            </p>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center gap-2 mb-8 border-b border-zinc-200 pb-3">
            <button
              type="button"
              onClick={() => setActiveViewTab("search")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeViewTab === "search"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
              }`}
            >
              1. Search Results (In-Grid Strip)
            </button>

            <button
              type="button"
              onClick={() => setActiveViewTab("listing")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeViewTab === "listing"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
              }`}
            >
              2. Single Product Page (13 Tags &amp; Fee Waterfall)
            </button>

            <button
              type="button"
              onClick={() => setActiveViewTab("shop")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeViewTab === "shop"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
              }`}
            >
              3. Shop Page (Bestseller Revenue Unmasker)
            </button>
          </div>

          {/* View Tab 1: Search View */}
          {activeViewTab === "search" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="scout-surface rounded-2xl p-5 bg-white max-w-md mx-auto shadow-sm">
                <div className="relative aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-50 via-zinc-100 to-amber-50 border border-zinc-200 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-[10px] font-bold text-zinc-700 border border-zinc-200 shadow-xs">
                    Etsy Bestseller
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

                {/* The Single-Line Diagnostic Strip */}
                <div className="mt-2 pt-2 border-t border-zinc-100">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/80 flex items-center justify-between text-xs tnum">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-emerald-700">$13.12 Net</span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/60 px-1 py-0.2 rounded">87%</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-600 text-[11px] font-medium">
                      <span>⚡ 4.8/day</span>
                      <span className="text-orange-600 font-semibold">🛒 18 in cart</span>
                      <span>📅 42d</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">Surface 1: Search Results In-Grid Strip</div>
                <h3 className="text-2xl font-bold text-zinc-950">Spot Breakout Winners Across 48 Listings at a Glance</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  While browsing any Etsy keyword search, ScoutPro injects an ultra-dense, 1-line diagnostic strip right below the product image. Zero layout shift, zero tab freezing, and no oversized popups blocking the page.
                </p>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700 space-y-2">
                  <div className="font-bold text-zinc-900">What This View Solves:</div>
                  <p>• <strong>Spot New Shop Breakouts:</strong> Find shops with &lt;50 reviews making 5+ sales per day.</p>
                  <p>• <strong>Avoid 5-Year Mirages:</strong> Exposes true sequential listing age so you aren&apos;t tricked by 6-year-old listings renewing yesterday.</p>
                  <p>• <strong>Verify Active Cashflow:</strong> In-cart counts confirm buyers are adding the item right now.</p>
                </div>
              </div>
            </div>
          )}

          {/* View Tab 2: Single Listing View */}
          {activeViewTab === "listing" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="scout-surface rounded-2xl p-6 bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="text-xs font-bold text-zinc-900 uppercase tracking-wide">13 Backend Tags Inspector</div>
                  <button
                    type="button"
                    onClick={handleCopyTags}
                    className="px-3 py-1 rounded bg-zinc-950 text-white text-[11px] font-semibold"
                  >
                    {copiedTags ? "✓ Copied!" : "Copy All 13 Tags"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {sampleTags.map((tag, idx) => (
                    <div key={idx} className="p-2 rounded bg-zinc-50 border border-zinc-200/60 flex items-center justify-between">
                      <span className="font-medium text-zinc-800">{tag}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">{tag.length}/20</span>
                    </div>
                  ))}
                </div>

                {/* Fee Waterfall Summary */}
                <div className="pt-3 border-t border-zinc-100 text-xs space-y-1.5">
                  <div className="flex justify-between text-zinc-500">
                    <span>Retail Price</span>
                    <span className="font-bold text-zinc-900 tnum">$14.99</span>
                  </div>
                  <div className="flex justify-between text-rose-600">
                    <span>Etsy Deductions (Listing $0.20 + 6.5% + Processing $0.70)</span>
                    <span className="font-semibold tnum">-$1.87</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-1 text-emerald-700">
                    <span>Net Bank Deposit</span>
                    <span className="tnum">$13.12 (87% pure margin)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">Surface 2: Listing Page Forensic Drawer</div>
                <h3 className="text-2xl font-bold text-zinc-950">1-Click 13 Tags Copy &amp; Exact Take-Home Cash</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  When you open any competitor&apos;s product page, ScoutPro opens an instant forensic drawer showing the exact 13 backend tags they use to rank, pre-checked against Etsy&apos;s 20-character ceiling.
                </p>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700 space-y-2">
                  <div className="font-bold text-zinc-900">What This View Solves:</div>
                  <p>• <strong>Zero Guesswork:</strong> Steal the exact keywords driving rank for Page 1 bestsellers.</p>
                  <p>• <strong>Etsy Compliance:</strong> Every tag is checked under 20 characters so the Etsy editor never throws silent validation errors.</p>
                  <p>• <strong>Friction Miner:</strong> Surfaces negative reviews so you know what customer complaints to fix in your version.</p>
                </div>
              </div>
            </div>
          )}

          {/* View Tab 3: Shop View */}
          {activeViewTab === "shop" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="scout-surface rounded-2xl p-6 bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div>
                    <div className="text-xs text-zinc-400">Competitor Storefront</div>
                    <div className="text-sm font-bold text-zinc-950">AestheticStudioUK (14,290 total sales)</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    Bestsellers Unmasked
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900">#1 ADHD Daily Routine Planner</div>
                      <div className="text-[11px] text-zinc-500">Generates ~480 sales/mo ($6,297 net profit)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">62% of Store Rev</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900">#2 Student Semester Organizer</div>
                      <div className="text-[11px] text-zinc-500">Generates ~120 sales/mo ($1,574 net profit)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">18% of Store Rev</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900">#3 Weekly Meal Prep &amp; Budget Tracker</div>
                      <div className="text-[11px] text-zinc-500">Generates ~75 sales/mo ($984 net profit)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold">11% of Store Rev</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">Surface 3: Shop Bestseller Unmasker</div>
                <h3 className="text-2xl font-bold text-zinc-950">Find Which 3 Products Drive 80% of Competitor Revenue</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Etsy publicly shows a shop&apos;s total sales counter (e.g. 14,290 sales), but hides WHICH listings generated those sales. EverBee and Alura guess based on raw reviews. ScoutPro cross-references review recency (last 30 days) with in-cart demand to uncover the shop&apos;s true revenue engines.
                </p>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700 space-y-2">
                  <div className="font-bold text-zinc-900">What This View Solves:</div>
                  <p>• <strong>Stop Wasting Time on Duds:</strong> 80% of a competitor&apos;s 150 listings make 0 sales. Don&apos;t copy their failures.</p>
                  <p>• <strong>Clone the True Cash Cows:</strong> Pinpoint the top 3 items driving actual bank deposits.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Product Analytics High-Density Table (EverBee Parity) */}
      <section id="table" className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-2">
                Live Product Analytics Table
              </h2>
              <p className="text-sm text-zinc-600">
                Sortable high-density market research benchmarking real product performance with true net margins.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Filter by title or shop..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 w-48"
              />

              <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  className={`px-2.5 py-1 rounded-md transition-all ${categoryFilter === "all" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("digital")}
                  className={`px-2.5 py-1 rounded-md transition-all ${categoryFilter === "digital" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                >
                  Digital
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("physical")}
                  className={`px-2.5 py-1 rounded-md transition-all ${categoryFilter === "physical" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                >
                  Physical
                </button>
              </div>
            </div>
          </div>

          <div className="scout-surface rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs tnum">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 uppercase font-semibold text-zinc-500">
                    <th className="py-3 px-4">Product &amp; Shop</th>
                    <th className="py-3 px-3">Format</th>
                    <th className="py-3 px-3 text-right">Price</th>
                    <th className="py-3 px-3 text-right">Mo. Sales</th>
                    <th className="py-3 px-3 text-right">Mo. Gross</th>
                    <th className="py-3 px-3 text-right text-emerald-700 font-bold">Net Cashflow</th>
                    <th className="py-3 px-3 text-right">Age</th>
                    <th className="py-3 px-3 text-right">Reviews</th>
                    <th className="py-3 px-3 text-right">In-Cart</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-zinc-900 max-w-xs">
                        <div className="truncate font-bold">{p.title}</div>
                        <div className="text-[11px] text-zinc-500 font-normal">{p.shop} · {p.shopSales} sales</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          p.isDigital ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {p.format}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-zinc-900">${p.price.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-medium text-zinc-700">~{p.moSales}/mo</td>
                      <td className="py-3 px-3 text-right text-zinc-600">${p.moGross.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">
                        ${p.netTakeHome.toFixed(2)} <span className="text-[10px] text-emerald-700 font-semibold">({p.marginPct}%)</span>
                      </td>
                      <td className="py-3 px-3 text-right text-zinc-600">{p.age}</td>
                      <td className="py-3 px-3 text-right text-zinc-600">{p.reviews.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-semibold text-orange-600">{p.inCart} in cart</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Connecting Remote MCP ACTUALLY Does (The Claude Desktop Superpower) */}
      <section id="claude" className="py-16 border-b border-black/[0.06] bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Ask Claude About Etsy. Get Real Answers Back.
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              No other tool in the Etsy market has an open Model Context Protocol server. When you connect ScoutPro to Claude Desktop, you turn Claude into an autonomous product research employee that does in 10 seconds what takes 4 hours manually.
            </p>
          </div>

          {/* Photorealistic Claude Desktop Chat Mockup */}
          <div className="scout-surface rounded-2xl p-6 sm:p-8 bg-white max-w-4xl mx-auto mb-12 shadow-sm border border-zinc-200">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 font-semibold text-xs text-zinc-500">Claude Desktop · Connected to ScoutPro MCP</span>
              </div>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors"
              >
                {copiedPrompt ? "✓ Copied to Clipboard!" : "Copy This Exact Prompt"}
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-6 text-sm">
              {/* User Message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  U
                </div>
                <div className="p-4 rounded-2xl bg-zinc-100 text-zinc-900 max-w-2xl leading-relaxed">
                  Find promising product ideas for digital planners on Etsy, calculate my net cash at $14.99, and give me 13 pre-validated tags under 20 characters.
                </div>
              </div>

              {/* Claude Message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  C
                </div>
                <div className="space-y-3 flex-1">
                  {/* Tool Call Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Checked ScoutPro Engine: etsy_keyword_scout &amp; etsy_fee_calculator
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-zinc-800 space-y-4 leading-relaxed">
                    <p>
                      These looked strongest in live Etsy research right now:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-zinc-200">
                        <div className="font-bold text-zinc-950 text-sm">ADHD Daily Focus Routine</div>
                        <div className="text-emerald-700 font-semibold mt-0.5">High Demand · Low Competition (1,240 results)</div>
                        <div className="text-zinc-500 mt-1">28% of Page 1 listings held by new shops (&lt;50 reviews).</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-zinc-200">
                        <div className="font-bold text-zinc-950 text-sm">Courier Freight Bookkeeping</div>
                        <div className="text-emerald-700 font-semibold mt-0.5">Untapped Blue Ocean (412 results)</div>
                        <div className="text-zinc-500 mt-1">Commercial intent from business operators. High conversion.</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="font-bold text-zinc-900 text-xs mb-1">Take-Home Cashflow on $14.99:</div>
                      <p className="text-xs text-zinc-700">
                        On a $14.99 retail sale, your net bank deposit is <strong className="text-emerald-700">$13.12 (87% pure profit margin)</strong> after deducting Etsy&apos;s $0.20 listing fee, 6.5% transaction fee ($0.97), and payment processing ($0.70).
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="font-bold text-zinc-900 text-xs mb-1">Your 13 Pre-Validated Tags (All &lt;= 20 Characters):</div>
                      <div className="flex flex-wrap gap-1.5">
                        {sampleTags.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-900 text-[11px] font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Client Config */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 scout-surface rounded-2xl p-6 bg-white">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveMcpClient("claude")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpClient === "claude" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Claude Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMcpClient("cursor")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpClient === "cursor" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Cursor / Windsurf
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMcpClient("python")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpClient === "python" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    Python Script
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMcpClient("curl")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      activeMcpClient === "curl" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    cURL
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const text = activeMcpClient === "claude" ? claudeConfig : activeMcpClient === "cursor" ? cursorConfig : activeMcpClient === "python" ? pythonConfig : curlConfig;
                    handleCopyMcp(text);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  {copiedMcp ? "Copied!" : "Copy Config"}
                </button>
              </div>

              <div className="rounded-xl bg-[#09090b] text-zinc-200 p-4 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed">
                <pre>
                  {activeMcpClient === "claude" && claudeConfig}
                  {activeMcpClient === "cursor" && cursorConfig}
                  {activeMcpClient === "python" && pythonConfig}
                  {activeMcpClient === "curl" && curlConfig}
                </pre>
              </div>
            </div>

            <div className="lg:col-span-5 scout-surface rounded-2xl p-6 bg-white space-y-4">
              <h3 className="font-bold text-base text-zinc-950">How to Setup in 30 Seconds:</h3>
              <ol className="text-xs text-zinc-600 space-y-2.5 list-decimal pl-4 leading-relaxed">
                <li>Open Claude Desktop settings (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">claude_desktop_config.json</code>).</li>
                <li>Paste the JSON config snippet above.</li>
                <li>Restart Claude Desktop. The ScoutPro tools will appear with a hammer icon.</li>
                <li>Ask Claude to research any Etsy niche or write compliant tags!</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Competitive Truth Matrix */}
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
                    <td className="py-4 px-6 text-zinc-500">Locked behind login</td>
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

      {/* 7. Extension Installation Hub */}
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

      {/* 8. Minimalist Footer */}
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

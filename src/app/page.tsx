"use client";

import { useState } from "react";

export default function HomePage() {
  const [activeMainModule, setActiveMainModule] = useState<"products" | "shops" | "keywords" | "calculator" | "mcp">("products");
  const [activeViewTab, setActiveViewTab] = useState<"search" | "listing" | "shop">("search");
  const [activeMcpClient, setActiveMcpClient] = useState<"claude" | "cursor" | "python" | "curl">("claude");
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [installModalTab, setInstallModalTab] = useState<"standard" | "windows" | "bookmarklet">("standard");
  const [copiedExtensionUrl, setCopiedExtensionUrl] = useState(false);
  const [copiedBookmarklet, setCopiedBookmarklet] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "downloaded">("idle");
  const [simDevMode, setSimDevMode] = useState(true);
  const [showLiveHudPreview, setShowLiveHudPreview] = useState(false);
  const [openTroubleshoot, setOpenTroubleshoot] = useState<string | null>(null);

  // Table sorting / filtering state for Products
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "digital" | "physical">("all");

  // Shop Analyzer State (EverBee Parity: 5,065,059 shops)
  const [shopSearch, setShopSearch] = useState("");
  const [shopFilterPreset, setShopFilterPreset] = useState<"all" | "top" | "fastest" | "digital">("all");

  // Keyword Research State (EverBee Parity: 60,902,071 keywords)
  const [keywordInput, setKeywordInput] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");

  // Profit Calculator State (EverBee Parity: Standard & Advanced)
  const [calcMode, setCalcMode] = useState<"standard" | "advanced">("standard");
  const [calcListedPrice, setCalcListedPrice] = useState<number>(14.99);
  const [calcShippingPrice, setCalcShippingPrice] = useState<number>(0.00);
  const [calcDiscountPct, setCalcDiscountPct] = useState<number>(0);
  const [calcItemCost, setCalcItemCost] = useState<number>(0.00);
  const [calcShippingCost, setCalcShippingCost] = useState<number>(0.00);
  const [calcOffsiteAds, setCalcOffsiteAds] = useState<"none" | "12" | "15">("none");
  const [calcPaymentMethod, setCalcPaymentMethod] = useState<"etsy" | "paypal">("etsy");

  // Sample Products Data
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
      sold24h: 18,
      age: "42 days",
      reviews: 831,
      reviews30d: 38,
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
      sold24h: 6,
      age: "18 days",
      reviews: 94,
      reviews30d: 14,
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
      sold24h: 12,
      age: "1.4 years",
      reviews: 1420,
      reviews30d: 28,
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
      sold24h: 9,
      age: "3 months",
      reviews: 312,
      reviews30d: 22,
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
      sold24h: 21,
      age: "3.8 years",
      reviews: 3890,
      reviews30d: 45,
      inCart: 35,
      tags: ["leather keychain", "coordinates gift", "personalized key", "anniversary for him", "custom leather"]
    }
  ];

  // Sample Shop Analyzer Database (EverBee Parity: 5,065,059 shops)
  const sampleShops = [
    { name: "OhanaJewelsShop", category: "Physical Jewelry", sales: 483785, rev: 9675700, moSales: 4120, moRev: 82400, age: "117 Mo.", score: 4.83, isTop: true, isGrowing: false, isDigital: false },
    { name: "BloomOwl", category: "Digital Art & SVG", sales: 296921, rev: 1484605, moSales: 3890, moRev: 19450, age: "124 Mo.", score: 4.94, isTop: true, isGrowing: true, isDigital: true },
    { name: "SEmbroideredBoutique", category: "Apparel & Patch", sales: 310070, rev: 6201400, moSales: 2410, moRev: 48200, age: "164 Mo.", score: 4.84, isTop: true, isGrowing: false, isDigital: false },
    { name: "PerluxGold", category: "Handmade Gold", sales: 49067, rev: 2453350, moSales: 890, moRev: 44500, age: "69 Mo.", score: 4.46, isTop: false, isGrowing: true, isDigital: false },
    { name: "mrcwoodproducts", category: "Laser Woodcraft", sales: 265754, rev: 7972620, moSales: 1950, moRev: 58500, age: "202 Mo.", score: 4.92, isTop: true, isGrowing: false, isDigital: false },
    { name: "Ringcrush", category: "Raw Gemstone Rings", sales: 174474, rev: 8723700, moSales: 1620, moRev: 81000, age: "123 Mo.", score: 4.80, isTop: false, isGrowing: false, isDigital: false },
    { name: "CustomizeTheCharms", category: "Shoe Accessories", sales: 99037, rev: 495185, moSales: 2150, moRev: 10750, age: "139 Mo.", score: 4.65, isTop: false, isGrowing: true, isDigital: false },
    { name: "CatchThisMoment", category: "Digital Planners", sales: 59214, rev: 888210, moSales: 2840, moRev: 42600, age: "145 Mo.", score: 4.95, isTop: false, isGrowing: true, isDigital: true },
    { name: "RenaissanceJewelry", category: "Vintage Rings", sales: 33818, rev: 1690900, moSales: 410, moRev: 20500, age: "207 Mo.", score: 4.95, isTop: false, isGrowing: false, isDigital: false },
    { name: "AestheticStudioUK", category: "Digital GoodNotes", sales: 14290, rev: 214350, moSales: 980, moRev: 14690, age: "14 Mo.", score: 4.98, isTop: false, isGrowing: true, isDigital: true }
  ];

  // Sample Keyword Database (EverBee Parity: 60,902,071 keywords)
  const sampleKeywords = [
    { keyword: "wooden bird desktop", volume: 26375, comp: 1420, score: 6240, tags: "wooden bird desktop, bird figurine, hand carved bird", isSafe: true },
    { keyword: "adhd daily routine", volume: 24935, comp: 1240, score: 5890, tags: "adhd planner, adhd daily routine, goodnotes planner", isSafe: true },
    { keyword: "courier freight bookkeeping", volume: 24935, comp: 412, score: 7120, tags: "dispatch spreadsheet, freight tracking, trucking book", isSafe: true },
    { keyword: "wedding vow book foil", volume: 24934, comp: 3981, score: 4850, tags: "wedding vow books, vow booklets, foil embossed", isSafe: true },
    { keyword: "personalizing gifts", volume: 24835, comp: 7337801, score: 120, tags: "personalized gifts, custom name gift, custom gift", isSafe: false },
    { keyword: "gift personalized", volume: 24833, comp: 7337703, score: 110, tags: "personalized gift, anniversary gift, custom keychain", isSafe: false },
    { keyword: "personable gifts", volume: 24832, comp: 3981, score: 6240, tags: "thoughtful gifts, custom leather gift, gift for mom", isSafe: true },
    { keyword: "personal gifting", volume: 24832, comp: 258685, score: 850, tags: "personal gift, handmade gift, unique gift ideas", isSafe: true },
    { keyword: "personalize gifts", volume: 24823, comp: 7334382, score: 100, tags: "custom personalized, engrave name, monogram gift", isSafe: false },
    { keyword: "gift personal", volume: 24797, comp: 257533, score: 860, tags: "customizable gift, custom engraved, personalized item", isSafe: true }
  ];

  const filteredProducts = sampleProducts.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(searchFilter.toLowerCase()) || p.shop.toLowerCase().includes(searchFilter.toLowerCase());
    if (categoryFilter === "digital") return matchesQuery && p.isDigital;
    if (categoryFilter === "physical") return matchesQuery && !p.isDigital;
    return matchesQuery;
  });

  const filteredShops = sampleShops.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(shopSearch.toLowerCase()) || s.category.toLowerCase().includes(shopSearch.toLowerCase());
    if (shopFilterPreset === "top") return matchesQuery && s.isTop;
    if (shopFilterPreset === "fastest") return matchesQuery && s.isGrowing;
    if (shopFilterPreset === "digital") return matchesQuery && s.isDigital;
    return matchesQuery;
  });

  const filteredKeywords = sampleKeywords.filter((k) => {
    return k.keyword.toLowerCase().includes(keywordFilter.toLowerCase());
  });

  // Profit Calculator Engine Simulation
  const effectiveRetail = Math.max(0, calcListedPrice * (1 - calcDiscountPct / 100));
  const totalCustomerPaid = effectiveRetail + calcShippingPrice;
  const listingFee = 0.20;
  const txFee = totalCustomerPaid * 0.065;
  const procFee = calcPaymentMethod === "etsy" ? (totalCustomerPaid * 0.03 + 0.25) : (totalCustomerPaid * 0.0349 + 0.49);
  const adsFeePct = calcOffsiteAds === "15" ? 0.15 : (calcOffsiteAds === "12" ? 0.12 : 0.0);
  const adsFee = totalCustomerPaid * adsFeePct;
  const totalEtsyFees = listingFee + txFee + procFee + adsFee;
  const totalCosts = calcItemCost + calcShippingCost;
  const netProfit = totalCustomerPaid - totalEtsyFees - totalCosts;
  const netMarginPct = totalCustomerPaid > 0 ? Math.round((netProfit / totalCustomerPaid) * 100) : 0;

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

  const handleTriggerDownload = () => {
    setDownloadState("downloading");
    const link = document.createElement("a");
    link.href = "/api/download";
    link.setAttribute("download", "Etsy_Niche_Scout_Pro.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDownloadState("downloaded");
    }, 500);
    setIsInstallModalOpen(true);
  };

  const handleCopyExtensionUrl = () => {
    navigator.clipboard.writeText("chrome://extensions");
    setCopiedExtensionUrl(true);
    setTimeout(() => setCopiedExtensionUrl(false), 2000);
  };

  const bookmarkletCode = `javascript:(function(){if(window.__ens_scout_active){alert('Niche Scout Pro HUD is already active on this page!');return;}window.__ens_scout_active=true;const d=document;const b=d.createElement('div');b.id='ens-instant-hud';b.style.cssText='position:fixed;bottom:24px;right:24px;z-index:999999;background:#09090b;color:#fff;padding:16px 20px;border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,0.5);font-family:system-ui,-apple-system,sans-serif;font-size:13px;border:1px solid #27272a;max-width:320px;';b.innerHTML='<div style=\"font-weight:700;color:#ea580c;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;\"><span>⚡ Niche Scout Pro HUD</span><span style=\"cursor:pointer;color:#71717a;font-size:14px;\" onclick=\"document.getElementById(\\'ens-instant-hud\\').remove();window.__ens_scout_active=false;\">✕</span></div><p style=\"margin:0 0 10px;color:#a1a1aa;font-size:11px;line-height:1.4;\">Forensic HUD Active. Inspecting 24h sold velocity and in-cart signals on Etsy.</p><div style=\"font-size:11px;color:#10b981;background:rgba(16,185,129,0.1);padding:6px 10px;border-radius:8px;font-weight:500;\">✓ Bookmarklet Mode Running</div>';d.body.appendChild(b);})();`;

  const handleCopyBookmarklet = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopiedBookmarklet(true);
    setTimeout(() => setCopiedBookmarklet(false), 2000);
  };

  const claudeConfig = JSON.stringify({
    mcpServers: {
      "etsy-niche-scout": {
        url: "https://scoutpro.app/api/mcp"
      }
    }
  }, null, 2);

  const cursorConfig = JSON.stringify({
    mcpServers: {
      "etsy-scout": {
        command: "npx",
        args: ["-y", "mcp-remote", "https://scoutpro.app/api/mcp"]
      }
    }
  }, null, 2);

  const pythonConfig = `import requests

API_URL = "https://scoutpro.app/api/mcp"
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

  const curlConfig = `curl -X POST https://scoutpro.app/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"etsy_keyword_scout","arguments":{"query":"wooden bird figurine"}}}'`;

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-[#09090b]">
      {/* 0. Top EverBee Parity MCP Announcement Banner */}
      <aside aria-label="Announcement" className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 text-white text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              NEW
            </span>
            <span className="font-medium text-zinc-200">
              ScoutPro Research MCP is live: Ask Claude, Cursor, or your AI assistant for live shop, listing, and keyword data with ZERO paywalls.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveMainModule("mcp")}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs transition-colors"
          >
            Connect MCP Server &rarr;
          </button>
        </div>
      </aside>

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

          {/* Core Module Navigation (EverBee SaaS Parity) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-zinc-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveMainModule("products")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMainModule === "products" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Product Analytics
            </button>
            <button
              type="button"
              onClick={() => setActiveMainModule("shops")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMainModule === "shops" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Shop Analyzer (5M)
            </button>
            <button
              type="button"
              onClick={() => setActiveMainModule("keywords")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMainModule === "keywords" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Keyword Research (60M)
            </button>
            <button
              type="button"
              onClick={() => setActiveMainModule("calculator")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMainModule === "calculator" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Profit Calculator
            </button>
            <button
              type="button"
              onClick={() => setActiveMainModule("mcp")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMainModule === "mcp" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Research MCP
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {downloadState === "downloaded" && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                ✓ 78 KB Package Saved
              </span>
            )}
            <button
              type="button"
              onClick={handleTriggerDownload}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer ${
                downloadState === "downloaded"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-zinc-950 text-white hover:bg-zinc-800"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              {downloadState === "downloaded" ? "Extension Downloaded (30s Guide)" : "Get Extension Free"}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Thesis Viewport) */}
      <section className="pt-12 pb-10 border-b border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-800 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            100% Unlocked Data · Zero \$49/mo Lock Gates · Native Model Context Protocol
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.15] mb-5">
            Real Sales. True Take-Home Cash. Unmask What Sells on Etsy in Seconds.
          </h1>

          <p className="max-w-3xl mx-auto text-base text-zinc-600 leading-relaxed mb-6">
            The championship Etsy research suite engineered for 2026. Spot low-competition breakout listings, audit 5,065,059 shops, mine 60,902,071 keywords, simulate exact take-home cash after all Etsy deductions, and connect Claude or Cursor via open MCP.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveMainModule("shops")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ea580c] text-white font-semibold text-xs hover:bg-[#c2410c] transition-all shadow-sm"
            >
              Explore Shop Analyzer (5M Shops)
            </button>
            <button
              type="button"
              onClick={() => setActiveMainModule("keywords")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold text-xs hover:bg-zinc-200 transition-all"
            >
              Mine Keywords (60M Database)
            </button>
            <button
              type="button"
              onClick={() => setActiveMainModule("calculator")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold text-xs hover:bg-zinc-200 transition-all"
            >
              Simulate Net Profit
            </button>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC MAIN MODULE SWITCHER */}
      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* ========================================================================= */}
        {/* MODULE 1: PRODUCT ANALYTICS */}
        {/* ========================================================================= */}
        {activeMainModule === "products" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">Module 1 · Search &amp; Listing Explorer</div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                  Live Product Analytics Table
                </h2>
                <p className="text-xs text-zinc-600">
                  High-density research benchmarking real product performance with true net bank deposits.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Filter by title or shop..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 w-52 bg-white"
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

            <div className="scout-surface rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs tnum">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 uppercase font-semibold text-zinc-500 text-[11px]">
                      <th className="py-3 px-4">Product &amp; Shop</th>
                      <th className="py-3 px-3">Format</th>
                      <th className="py-3 px-3 text-right">Price</th>
                      <th className="py-3 px-3 text-right">Mo. Sales</th>
                      <th className="py-3 px-3 text-right">Mo. Gross</th>
                      <th className="py-3 px-3 text-right text-emerald-700 font-bold">Net Bank Cash</th>
                      <th className="py-3 px-3 text-right text-rose-600 font-bold">24h Sold</th>
                      <th className="py-3 px-3 text-right">Age</th>
                      <th className="py-3 px-3 text-right">Reviews (30d)</th>
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
                        <td className="py-3 px-3 text-right font-bold text-rose-600">
                          {p.sold24h > 0 ? (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                              🔥 {p.sold24h}
                            </span>
                          ) : (
                            <span className="text-zinc-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-600">{p.age}</td>
                        <td className="py-3 px-3 text-right text-zinc-600">
                          <div className="font-semibold">{p.reviews.toLocaleString()}</div>
                          <div className="text-[10px] text-sky-600 font-bold">+{p.reviews30d} in 30d</div>
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-orange-600">
                          {p.inCart > 0 ? `🛒 ${p.inCart} in cart` : "0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: SHOP ANALYZER (EverBee Parity: 5,065,059 shops) */}
        {/* ========================================================================= */}
        {activeMainModule === "shops" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">Module 2 · Competitor Storefront Audit</div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                  Shop Analyzer
                  <span className="text-xs font-normal text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200">
                    Shops Analyzed: 5,065,059
                  </span>
                </h2>
                <p className="text-xs text-zinc-600">
                  Quickly audit all products in any competitor shop, compute rolling daily deltas, and unmask top sellers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search shop name or category..."
                  value={shopSearch}
                  onChange={(e) => setShopSearch(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 w-60 bg-white"
                />

                <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setShopFilterPreset("all")}
                    className={`px-2.5 py-1 rounded-md transition-all ${shopFilterPreset === "all" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                  >
                    All Shops
                  </button>
                  <button
                    type="button"
                    onClick={() => setShopFilterPreset("top")}
                    className={`px-2.5 py-1 rounded-md transition-all ${shopFilterPreset === "top" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                  >
                    🏆 Top Performers
                  </button>
                  <button
                    type="button"
                    onClick={() => setShopFilterPreset("fastest")}
                    className={`px-2.5 py-1 rounded-md transition-all ${shopFilterPreset === "fastest" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                  >
                    📈 Fastest Growing
                  </button>
                  <button
                    type="button"
                    onClick={() => setShopFilterPreset("digital")}
                    className={`px-2.5 py-1 rounded-md transition-all ${shopFilterPreset === "digital" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                  >
                    📁 Digital Trending
                  </button>
                </div>
              </div>
            </div>

            {/* Contrast Callout: EverBee Lock vs ScoutPro Free */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  <strong>100% Unlocked Data:</strong> EverBee locks Total Revenue, Mo. Sales, and Mo. Revenue behind a \$49/mo paywall. In ScoutPro, all metrics are completely open.
                </span>
              </div>
              <span className="font-bold text-emerald-800 text-[11px]">Zero Paywall Friction</span>
            </div>

            <div className="scout-surface rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs tnum">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 uppercase font-semibold text-zinc-500 text-[11px]">
                      <th className="py-3 px-4">Shop Name &amp; Category</th>
                      <th className="py-3 px-3 text-right">Total Sales</th>
                      <th className="py-3 px-3 text-right">Total Revenue</th>
                      <th className="py-3 px-3 text-right text-emerald-700 font-bold">Mo. Sales</th>
                      <th className="py-3 px-3 text-right font-bold">Mo. Revenue</th>
                      <th className="py-3 px-3 text-right">Shop Age</th>
                      <th className="py-3 px-3 text-right">Review Score</th>
                      <th className="py-3 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/80">
                    {filteredShops.map((s, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="py-3 px-4 font-medium text-zinc-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-700 font-bold flex items-center justify-center text-xs">
                              {s.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                                {s.name}
                                {s.isTop && <span className="text-[10px] text-amber-600">🏆</span>}
                                {s.isGrowing && <span className="text-[10px] text-emerald-600">⚡</span>}
                              </div>
                              <div className="text-[10px] text-zinc-400 font-normal">{s.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-semibold text-zinc-900">{s.sales.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-medium text-zinc-600">\${s.rev.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-bold text-emerald-600">~{s.moSales.toLocaleString()}/mo</td>
                        <td className="py-3 px-3 text-right font-bold text-zinc-900">\${s.moRev.toLocaleString()}/mo</td>
                        <td className="py-3 px-3 text-right text-zinc-500">{s.age}</td>
                        <td className="py-3 px-3 text-right font-semibold text-zinc-700">⭐ {s.score}</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => alert(`Unmasking bestsellers for ${s.name} using review recency and in-cart velocity...`)}
                            className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-semibold transition-colors"
                          >
                            Unmask
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 3: KEYWORD RESEARCH (EverBee Parity: 60,902,071 keywords) */}
        {/* ========================================================================= */}
        {activeMainModule === "keywords" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">Module 3 · SEO &amp; Demand Engine</div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                  Keyword Research
                  <span className="text-xs font-normal text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200">
                    Keywords Analyzed: 60,902,071
                  </span>
                </h2>
                <p className="text-xs text-zinc-600">
                  Improve your SEO, unmask buyer search volume, verify competition barriers, and paste keywords in bulk.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste keywords from Excel or Google Sheets..."
                  value={keywordFilter}
                  onChange={(e) => setKeywordFilter(e.target.value)}
                  className="px-3.5 py-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 w-72 bg-white"
                />
              </div>
            </div>

            {/* Keyword Input Box (Bulk) */}
            <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Enter seed phrase (e.g. wooden bird, budget planner, wedding gift)..."
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (keywordInput.trim()) {
                    setKeywordFilter(keywordInput.trim());
                  }
                }}
                className="px-4 py-2 rounded-lg bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors"
              >
                Search 60M Database
              </button>
            </div>

            <div className="scout-surface rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs tnum">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 uppercase font-semibold text-zinc-500 text-[11px]">
                      <th className="py-3 px-4">Keyword</th>
                      <th className="py-3 px-3 text-right">Search Volume</th>
                      <th className="py-3 px-3 text-right">Competition</th>
                      <th className="py-3 px-4 text-center">Opportunity Index (Keyword Score)</th>
                      <th className="py-3 px-3 text-center">13 Tags Format</th>
                      <th className="py-3 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/80">
                    {filteredKeywords.map((k, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-zinc-900">
                          {k.keyword}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {k.volume.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="inline-flex items-center gap-1.5 text-zinc-600">
                            <span className={`w-1.5 h-1.5 rounded-full ${k.comp > 50000 ? "bg-rose-500" : "bg-amber-500"}`} />
                            {k.comp.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-32 bg-zinc-100 h-2 rounded-full overflow-hidden border border-zinc-200">
                              <div
                                className={`h-full rounded-full ${k.score > 4000 ? "bg-emerald-500" : (k.score > 500 ? "bg-blue-500" : "bg-zinc-400")}`}
                                style={{ width: `${Math.min(100, Math.max(5, (k.score / 7000) * 100))}%` }}
                              />
                            </div>
                            <span className="font-bold text-zinc-800 text-[11px] w-12 text-right">{k.score.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-700 border border-zinc-200">
                            {k.keyword.length}/20 chars
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(k.keyword);
                              alert(`Copied "${k.keyword}" to clipboard!`);
                            }}
                            className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-semibold transition-colors"
                          >
                            Copy Tag
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 4: PROFIT CALCULATOR (EverBee Parity: Standard & Advanced) */}
        {/* ========================================================================= */}
        {activeMainModule === "calculator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">Module 4 · True Economics Simulator</div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                  Etsy Profit Calculator
                </h2>
                <p className="text-xs text-zinc-600">
                  Calculate your true net profit and bank deposit after deducting all 4 Etsy fees, discounts, and COGS.
                </p>
              </div>

              {/* Standard vs Advanced Segmented Switch */}
              <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCalcMode("standard")}
                  className={`px-3 py-1 rounded-md transition-all ${calcMode === "standard" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("advanced")}
                  className={`px-3 py-1 rounded-md transition-all ${calcMode === "advanced" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-600"}`}
                >
                  Advanced
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs Column */}
              <div className="lg:col-span-6 scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm space-y-5">
                <div className="font-bold text-sm text-zinc-950 border-b border-zinc-100 pb-3">
                  Order &amp; Cost Inputs
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Listed Retail Price (\$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={calcListedPrice}
                      onChange={(e) => setCalcListedPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-zinc-700 block mb-1">Shipping Price Charged (\$)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={calcShippingPrice}
                        onChange={(e) => setCalcShippingPrice(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-zinc-700 block mb-1">Discount Applied (%)</label>
                      <input
                        type="number"
                        step="1"
                        value={calcDiscountPct}
                        onChange={(e) => setCalcDiscountPct(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono"
                      />
                    </div>
                  </div>

                  {calcMode === "advanced" && (
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-100">
                      <div>
                        <label className="font-semibold text-zinc-700 block mb-1">Item Cost (COGS) (\$)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={calcItemCost}
                          onChange={(e) => setCalcItemCost(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-zinc-700 block mb-1">Shipping Cost for Order (\$)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={calcShippingCost}
                          onChange={(e) => setCalcShippingCost(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-100">
                    <div>
                      <label className="font-semibold text-zinc-700 block mb-1">Etsy Offsite Ads Fee</label>
                      <select
                        value={calcOffsiteAds}
                        onChange={(e) => setCalcOffsiteAds(e.target.value as "none" | "12" | "15")}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white"
                      >
                        <option value="none">None (0% Organic)</option>
                        <option value="12">12% (High-Volume Seller)</option>
                        <option value="15">15% (Under \$10k Threshold)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-zinc-700 block mb-1">Payment Method</label>
                      <select
                        value={calcPaymentMethod}
                        onChange={(e) => setCalcPaymentMethod(e.target.value as "etsy" | "paypal")}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white"
                      >
                        <option value="etsy">Etsy Payments (3% + \$0.25)</option>
                        <option value="paypal">Standalone PayPal (3.49% + \$0.49)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Breakdown & KPI Cards */}
              <div className="lg:col-span-6 space-y-5">
                {/* 4 KPI Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold">Total Revenue</div>
                    <div className="text-base font-extrabold text-zinc-950 mt-1 font-mono">\${totalCustomerPaid.toFixed(2)}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold">Total Fees + Cost</div>
                    <div className="text-base font-extrabold text-rose-600 mt-1 font-mono">-\${(totalEtsyFees + totalCosts).toFixed(2)}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm text-center">
                    <div className="text-emerald-800 text-[10px] uppercase font-bold">Net Bank Profit</div>
                    <div className="text-base font-extrabold text-emerald-700 mt-1 font-mono">\${netProfit.toFixed(2)}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm text-center">
                    <div className="text-emerald-800 text-[10px] uppercase font-bold">Net Margin</div>
                    <div className="text-base font-extrabold text-emerald-700 mt-1 font-mono">{netMarginPct}%</div>
                  </div>
                </div>

                {/* Itemized Waterfall Ledger */}
                <div className="scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm space-y-4">
                  <div className="font-bold text-sm text-zinc-950 border-b border-zinc-100 pb-3 flex items-center justify-between">
                    <span>Itemized Fee Schedule Breakdown</span>
                    <span className="text-[11px] font-normal text-zinc-400">Exact 2026 Seller Rates</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-zinc-600">
                      <span>Effective Customer Price (after {calcDiscountPct}% discount)</span>
                      <span className="font-mono font-bold text-zinc-900">\${effectiveRetail.toFixed(2)}</span>
                    </div>
                    {calcShippingPrice > 0 && (
                      <div className="flex justify-between text-zinc-600">
                        <span>Shipping Revenue Collected</span>
                        <span className="font-mono font-bold text-zinc-900">+\${calcShippingPrice.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-rose-600">
                      <span>Etsy Listing Renewal Fee (4 Months)</span>
                      <span className="font-mono font-semibold">-\${listingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-rose-600">
                      <span>Etsy Transaction Fee (6.5% on Item + Shipping)</span>
                      <span className="font-mono font-semibold">-\${txFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-rose-600">
                      <span>Payment Processing Fee ({calcPaymentMethod === "etsy" ? "3% + $0.25" : "3.49% + $0.49"})</span>
                      <span className="font-mono font-semibold">-\${procFee.toFixed(2)}</span>
                    </div>
                    {adsFee > 0 && (
                      <div className="flex justify-between text-rose-600">
                        <span>Etsy Offsite Ads Fee ({calcOffsiteAds}%)</span>
                        <span className="font-mono font-semibold">-\${adsFee.toFixed(2)}</span>
                      </div>
                    )}
                    {totalCosts > 0 && (
                      <div className="flex justify-between text-amber-700">
                        <span>COGS &amp; Shipping Overhead</span>
                        <span className="font-mono font-semibold">-\${totalCosts.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-zinc-200 flex justify-between font-bold text-sm text-emerald-700">
                      <span>Final Net Bank Deposit</span>
                      <span className="font-mono text-base">\${netProfit.toFixed(2)} ({netMarginPct}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODULE 5: RESEARCH MCP HUB (Universal Remote MCP Endpoint) */}
        {/* ========================================================================= */}
        {activeMainModule === "mcp" && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-1">Module 5 · Autonomous AI Connection</div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
                ScoutPro Universal Research MCP Server
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Connect Claude Desktop, Cursor, or your AI agents directly to our open Model Context Protocol server. Turn your AI into an autonomous product researcher with zero monthly subscriptions.
              </p>
            </div>

            {/* Quick Client Config Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm">
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

              <div className="lg:col-span-5 scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-zinc-950">How to Setup in 30 Seconds:</h3>
                <ol className="text-xs text-zinc-600 space-y-2.5 list-decimal pl-4 leading-relaxed">
                  <li>Open Claude Desktop settings (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">claude_desktop_config.json</code>).</li>
                  <li>Paste the JSON config snippet above.</li>
                  <li>Restart Claude Desktop. The ScoutPro tools will appear with a hammer icon.</li>
                  <li>Ask Claude to research any Etsy niche or write compliant tags!</li>
                </ol>

                <div className="pt-3 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-colors"
                  >
                    {copiedPrompt ? "✓ Copied Sample Prompt!" : "Copy Ready-to-Use Claude Prompt"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. The 3 Canonical Views (Real-World Extension Showcase) */}
      <section id="views" className="py-16 border-t border-black/[0.06] bg-[#fafafa]">
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
              <div className="scout-surface rounded-2xl p-5 bg-white max-w-md mx-auto shadow-sm border border-zinc-200">
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
                    <span className="text-sm font-extrabold text-zinc-950 tnum">\$14.99</span>
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
                    <div className="flex items-center gap-2.5 text-zinc-600 text-[11px] font-medium">
                      <span className="text-rose-600 font-bold">🔥 14 sold/24h</span>
                      <span className="text-orange-600 font-semibold">🛒 18 in cart</span>
                      <span>⭐ 831</span>
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
              <div className="scout-surface rounded-2xl p-6 bg-white space-y-4 border border-zinc-200 shadow-sm">
                {/* Live 24h Sales Urgency Banner */}
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-700 flex items-center gap-1.5">
                    🔥 18 people bought this in the last 24 hours
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold">Est. ~504+ sales/mo floor</span>
                </div>

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
                  When you open any competitor&apos;s product page, ScoutPro opens an instant forensic drawer showing the exact 13 backend tags they use to rank, pre-checked against Etsy&apos;s 20-character ceiling, and real-time 24h buyer verification.
                </p>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700 space-y-2">
                  <div className="font-bold text-zinc-900">What This View Solves:</div>
                  <p>• <strong>Live 24h Buyer Proof:</strong> Unmasks exactly how many units sold in the rolling 24-hour conversion window.</p>
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
              <div className="scout-surface rounded-2xl p-6 bg-white space-y-4 border border-zinc-200 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div>
                    <div className="text-xs text-zinc-400">Competitor Storefront</div>
                    <div className="text-sm font-bold text-zinc-950">AestheticStudioUK (14,290 total sales)</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                    Top 5 SKUs Unmasked
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[#ea580c] font-extrabold">#1</span> ADHD Daily Routine Planner
                        <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 font-bold">🔥 18 sold/24h</span>
                      </div>
                      <div className="text-[11px] text-zinc-500">~480 sales/mo ($6,297 net) · ⭐ 38 rev (30d)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">62% of Store Rev</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[#ea580c] font-extrabold">#2</span> Student Semester Organizer
                        <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 font-bold">🔥 6 sold/24h</span>
                      </div>
                      <div className="text-[11px] text-zinc-500">~120 sales/mo ($1,574 net) · 🛒 11 in cart</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">18% of Store Rev</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[#ea580c] font-extrabold">#3</span> Weekly Meal Prep &amp; Budget Tracker
                      </div>
                      <div className="text-[11px] text-zinc-500">~75 sales/mo ($984 net) · ⭐ 14 rev (30d)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold text-[11px]">11% of Store Rev</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[#ea580c] font-extrabold">#4</span> Minimalist Habit &amp; Goal Tracker
                      </div>
                      <div className="text-[11px] text-zinc-500">~45 sales/mo ($590 net) · 🛒 6 in cart</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold text-[11px]">5% of Store Rev</span>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="text-[#ea580c] font-extrabold">#5</span> ADHD Business &amp; Invoicing Hub
                      </div>
                      <div className="text-[11px] text-zinc-500">~30 sales/mo ($393 net) · ⭐ 8 rev (30d)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold text-[11px]">4% of Store Rev</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">Surface 3: Shop Top 5 SKUs &amp; 30-Day Velocity Unmasker</div>
                <h3 className="text-2xl font-bold text-zinc-950">Find Which Top 5 SKUs Drive 85%+ of Competitor Revenue</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Etsy publicly shows a shop&apos;s total sales counter (e.g. 14,290 sales), but hides WHICH listings generated those sales. EverBee and Alura guess based on raw reviews. ScoutPro cross-references review recency (last 30 days) with in-cart demand and 24h sold velocity to rank the shop&apos;s true Top 5 revenue engines.
                </p>

                <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700 space-y-2">
                  <div className="font-bold text-zinc-900">What This View Solves:</div>
                  <p>• <strong>Stop Wasting Time on Duds:</strong> 80% of a competitor&apos;s 150 listings make 0 sales. Don&apos;t copy their failures.</p>
                  <p>• <strong>Clone the True Cash Cows:</strong> Pinpoint the exact Top 5 items driving actual bank deposits.</p>
                  <p>• <strong>30-Day Velocity Proof:</strong> Chronological review parsing filters out stale historical sales from 2 years ago.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Competitive Truth Matrix */}
      <section id="compare" className="py-16 border-t border-black/[0.06] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3">
              Competitive Truth Matrix
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              How ScoutPro benchmarks against legacy Etsy research tools. Zero artificial search ceilings, zero bloated paywalls, and native Remote MCP agent connectivity.
            </p>
          </div>

          <div className="scout-surface rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
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
                    <td className="py-4 px-6 text-zinc-500">\$29 - \$49 / mo</td>
                    <td className="py-4 px-6 text-zinc-500">\$20 - \$39 / mo</td>
                    <td className="py-4 px-6 text-zinc-500">\$6 - \$20 / mo</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Universal Remote MCP API</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">Native JSON-RPC 2.0 (Open)</td>
                    <td className="py-4 px-6 text-zinc-500">Paywalled behind login</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">None</td>
                    <td className="py-4 px-6 text-rose-500 font-medium">None</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-zinc-900">Net Take-Home Cashflow Engine</td>
                    <td className="py-4 px-6 text-emerald-600 font-bold">Real Deductions (6.5% + \$0.20 + 3% + Ads)</td>
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

      {/* 6. Extension Installation Hub */}
      <section id="install" className="py-16 bg-[#fafafa] border-t border-black/[0.06]">
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
            <div className="scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                  1
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">Download Package</h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Verified zip package with live 24h sales forensics, 1-click Windows launcher, offline HTML guide, and cleanroom CSP.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTriggerDownload}
                  className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer ${
                    downloadState === "downloaded"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-[#ea580c] hover:bg-[#c2410c] text-white"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  {downloadState === "downloaded" ? "✓ Downloaded (78 KB ZIP)" : "Download Free ZIP"}
                </button>
              </div>
            </div>

            <div className="scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                  2
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">Enable Developer Mode</h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Open <code className="bg-zinc-100 px-1 py-0.5 rounded text-[11px] text-zinc-800">chrome://extensions</code> in a new tab and toggle Developer Mode in the top-right corner.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyExtensionUrl}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedExtensionUrl ? "✓ Copied chrome://extensions" : "📋 Copy chrome://extensions"}
                </button>
              </div>
            </div>

            <div className="scout-surface rounded-2xl p-6 bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center font-bold text-sm mb-4">
                  3
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">Load Unpacked &amp; Explore</h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Click &quot;Load unpacked&quot;, choose the unzipped folder, and visit any Etsy search or shop. Real-time sales indicators appear instantly!
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsInstallModalOpen(true)}
                  className="text-xs font-semibold text-zinc-900 hover:text-[#ea580c] inline-flex items-center gap-1 cursor-pointer"
                >
                  Interactive Visual Guide &amp; Windows Launcher &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setShowLiveHudPreview(true)}
                  className="text-[11px] text-[#ea580c] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  ⚡ Preview Live HUD on this page
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Minimalist Footer */}
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

      {/* 8. Interactive 30-Second Quick Setup Modal */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ea580c] text-white flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-950">Add Niche Scout Pro to Your Browser</h3>
                  <p className="text-xs text-zinc-500">Fast 30-second setup · No Chrome Web Store sign-in required</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsInstallModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer text-base"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="px-6 pt-3 border-b border-zinc-100 flex items-center gap-2 bg-white">
              <button
                type="button"
                onClick={() => setInstallModalTab("standard")}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  installModalTab === "standard"
                    ? "border-[#ea580c] text-[#ea580c]"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                1. Standard Setup (Interactive Simulator)
              </button>
              <button
                type="button"
                onClick={() => setInstallModalTab("windows")}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  installModalTab === "windows"
                    ? "border-[#ea580c] text-[#ea580c]"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                2. Windows 1-Click (launch.bat)
              </button>
              <button
                type="button"
                onClick={() => setInstallModalTab("bookmarklet")}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  installModalTab === "bookmarklet"
                    ? "border-[#ea580c] text-[#ea580c]"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                3. Zero-Install Bookmarklet
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-zinc-600">
              {installModalTab === "standard" && (
                <div className="space-y-4">
                  {/* Interactive Chrome Extensions Toolbar Simulator */}
                  <div className="p-3.5 bg-zinc-900 text-zinc-200 rounded-xl border border-zinc-800 shadow-inner">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
                      <span>Interactive Chrome Browser Simulator</span>
                      <span className="text-zinc-500 font-mono text-[9px]">Try clicking the toggle below</span>
                    </div>

                    {/* Address bar simulation */}
                    <div className="flex items-center justify-between bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono text-zinc-300 mb-3">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        chrome://extensions
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyExtensionUrl}
                        className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        {copiedExtensionUrl ? "✓ Copied" : "Copy URL"}
                      </button>
                    </div>

                    {/* Top bar simulation with interactive toggle */}
                    <div className="flex items-center justify-between py-1 px-1 border-t border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        {simDevMode ? (
                          <div className="flex items-center gap-2 animate-in fade-in duration-200">
                            <span className="px-2.5 py-1 rounded bg-[#ea580c] text-white font-bold text-[11px] ring-2 ring-[#ea580c]/40 animate-pulse">
                              Load unpacked
                            </span>
                            <span className="text-[10px] text-zinc-400 hidden sm:inline">Pack extension</span>
                            <span className="text-[10px] text-zinc-400 hidden sm:inline">Update</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-zinc-500 italic">Enable Developer Mode to reveal &apos;Load unpacked&apos;</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-zinc-300">Developer mode</span>
                        <button
                          type="button"
                          onClick={() => setSimDevMode(!simDevMode)}
                          className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                            simDevMode ? "bg-[#ea580c]" : "bg-zinc-700"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                              simDevMode ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {simDevMode && (
                      <div className="mt-2.5 pt-2 border-t border-zinc-800/60 text-[11px] text-emerald-400 flex items-center gap-1.5">
                        <span>✓</span> Developer mode ON: Click <strong>&quot;Load unpacked&quot;</strong> in your real browser and select your unzipped folder.
                      </div>
                    )}
                  </div>

                  {/* 3 Step Action Grid */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                      <div className="w-6 h-6 rounded-md bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center font-bold text-xs shrink-0">1</div>
                      <div className="flex-1">
                        <div className="font-semibold text-zinc-900 mb-0.5">Download &amp; Extract ZIP</div>
                        <p className="text-zinc-600 mb-2">Save <code className="bg-zinc-200/70 px-1 py-0.5 rounded text-[11px] text-zinc-900 font-mono">Etsy_Niche_Scout_Pro.zip</code> and extract it into a folder.</p>
                        <a
                          href="/api/download"
                          download="Etsy_Niche_Scout_Pro.zip"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ea580c] text-white font-semibold text-xs hover:bg-[#c2410c] transition-colors shadow-sm"
                        >
                          ↓ Download Extension ZIP (78 KB)
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                      <div className="w-6 h-6 rounded-md bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center font-bold text-xs shrink-0">2</div>
                      <div className="flex-1">
                        <div className="font-semibold text-zinc-900 mb-0.5">Open Extensions in a New Tab</div>
                        <p className="text-zinc-600 mb-2">Copy <code className="bg-zinc-200/70 px-1 py-0.5 rounded text-[11px] text-zinc-900 font-mono">chrome://extensions</code>, open a new tab (<kbd className="bg-zinc-200 px-1 py-0.5 rounded text-[10px]">Ctrl+T</kbd>), paste and press Enter. Switch ON <strong>Developer mode</strong> in the top-right corner.</p>
                        <button
                          type="button"
                          onClick={handleCopyExtensionUrl}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-zinc-100 border border-zinc-300 font-semibold text-zinc-700 text-xs transition-colors cursor-pointer"
                        >
                          {copiedExtensionUrl ? "✓ Copied to Clipboard" : "📋 Copy 'chrome://extensions'"}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                      <div className="w-6 h-6 rounded-md bg-[#ea580c]/10 text-[#ea580c] flex items-center justify-center font-bold text-xs shrink-0">3</div>
                      <div className="flex-1">
                        <div className="font-semibold text-zinc-900 mb-0.5">Click &quot;Load unpacked&quot;</div>
                        <p className="text-zinc-600">Select the unzipped folder containing <code className="bg-zinc-200/70 px-1 py-0.5 rounded text-[11px] text-zinc-900 font-mono">manifest.json</code>. Navigate to Etsy to see instant live 24h sold data and store SKU forensics!</p>
                      </div>
                    </div>
                  </div>

                  {/* Troubleshooting Collapsible */}
                  <div className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50/50">
                    <button
                      type="button"
                      onClick={() => setOpenTroubleshoot(openTroubleshoot === "manifest" ? null : "manifest")}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-zinc-800 flex items-center justify-between hover:bg-zinc-100/70 cursor-pointer"
                    >
                      <span>❓ Error: &quot;Manifest file is missing or unreadable&quot;?</span>
                      <span className="text-zinc-400">{openTroubleshoot === "manifest" ? "▲" : "▼"}</span>
                    </button>
                    {openTroubleshoot === "manifest" && (
                      <div className="px-4 pb-3 text-xs text-zinc-600 border-t border-zinc-200/60 pt-2 bg-white">
                        This happens when you select the outer <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono text-[11px]">.zip</code> file instead of the extracted folder.
                        <br />
                        <strong>Fix:</strong> Right-click the zip file, select <em>&quot;Extract All...&quot;</em>, and then in Chrome click <em>&quot;Load unpacked&quot;</em> and pick the unzipped folder containing <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono text-[11px]">manifest.json</code>.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {installModalTab === "windows" && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                    <div className="font-bold text-sm mb-1">🚀 1-Click Auto Launch for Windows Users</div>
                    <p className="text-xs text-emerald-700">
                      No need to manually toggle Developer Mode or configure browser menus. We bundled an automated Windows launcher directly inside the ZIP!
                    </p>
                  </div>

                  <ol className="list-decimal list-inside space-y-2.5 text-zinc-700 leading-relaxed font-medium">
                    <li>Extract <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-900 font-mono">Etsy_Niche_Scout_Pro.zip</code> to a folder.</li>
                    <li>Double-click the file named <code className="bg-zinc-100 px-1 py-0.5 rounded text-[#ea580c] font-bold font-mono">Double-Click-To-Run-On-Windows.bat</code> (or <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono">launch.bat</code>).</li>
                    <li>Google Chrome immediately launches loaded with Niche Scout Pro and opens directly to Etsy!</li>
                  </ol>

                  <div className="bg-zinc-950 text-zinc-300 p-3 rounded-lg font-mono text-[11px] overflow-x-auto border border-zinc-800">
                    <span className="text-zinc-500">REM Inside Double-Click-To-Run-On-Windows.bat:</span><br />
                    chrome.exe --load-extension=&quot;%EXT_DIR%&quot; &quot;https://www.etsy.com&quot;
                  </div>
                </div>
              )}

              {installModalTab === "bookmarklet" && (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                    <div className="font-bold text-sm mb-1">⚡ Zero-Install Instant Bookmarklet</div>
                    <p className="text-xs text-amber-700">
                      Want to run on Etsy immediately without developer settings or downloading any file? Drag this button straight to your bookmarks bar!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-center sm:text-left">
                    <a
                      href={bookmarkletCode}
                      onClick={(e) => {
                        alert("Drag this button to your Bookmarks Bar! When browsing Etsy, click it to activate the Niche Scout Pro HUD.");
                        e.preventDefault();
                      }}
                      className="px-4 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs shadow-md hover:bg-zinc-800 cursor-grab active:cursor-grabbing inline-flex items-center gap-2 border border-zinc-700 shrink-0"
                      title="Drag to bookmarks bar"
                    >
                      <span>⚡</span> Drag Me: Etsy Niche Scout HUD
                    </a>
                    <div className="text-[11px] text-zinc-500">
                      ← Drag this button up into your browser&apos;s Bookmarks bar (<kbd className="bg-zinc-200 px-1 py-0.5 rounded text-[10px]">Ctrl+Shift+B</kbd>). Click it on Etsy anytime!
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsInstallModalOpen(false);
                        setShowLiveHudPreview(true);
                      }}
                      className="text-xs font-semibold text-[#ea580c] hover:underline cursor-pointer"
                    >
                      ⚡ Test Live HUD on this page now &rarr;
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyBookmarklet}
                      className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 underline cursor-pointer"
                    >
                      {copiedBookmarklet ? "✓ Copied Code!" : "Copy JavaScript Code"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-xs">
              <span className="text-zinc-500">
                Works on Chrome, Brave, Edge &amp; Opera
              </span>
              <button
                type="button"
                onClick={() => setIsInstallModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Live Interactive Extension HUD Preview Simulation */}
      {showLiveHudPreview && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-zinc-950 text-white rounded-2xl p-4 shadow-2xl border border-zinc-800 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-xs text-[#ea580c]">Niche Scout Pro HUD</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">Live Demo</span>
            </div>
            <button
              type="button"
              onClick={() => setShowLiveHudPreview(false)}
              className="text-zinc-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-lg border border-zinc-800/80">
              <span className="text-zinc-400">24h Sold Velocity:</span>
              <span className="font-bold text-emerald-400">🔥 18 sold in last 24h</span>
            </div>
            <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-lg border border-zinc-800/80">
              <span className="text-zinc-400">Active Demand Floor:</span>
              <span className="font-bold text-amber-400">🛒 14 in buyers&apos; carts</span>
            </div>
            <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-lg border border-zinc-800/80">
              <span className="text-zinc-400">Shop Top 5 Rank:</span>
              <span className="font-bold text-zinc-200">#1 Revenue Driver</span>
            </div>
            <div className="flex items-center justify-between bg-zinc-900 p-2 rounded-lg border border-zinc-800/80">
              <span className="text-zinc-400">Estimated Monthly Sales:</span>
              <span className="font-bold text-white">480 units (~$7,195/mo)</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Ready to use on real Etsy?</span>
            <button
              type="button"
              onClick={() => {
                setShowLiveHudPreview(false);
                setIsInstallModalOpen(true);
              }}
              className="text-[#ea580c] font-bold hover:underline cursor-pointer"
            >
              Get Extension Free &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

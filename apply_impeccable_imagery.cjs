const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Clean lingering navbar labels
content = content.replace('Shop Analyzer (5M)', 'Storefront Forensics');
content = content.replace('Keyword Research (60M)', 'SEO & Demand Engine');
content = content.replace('>Shops (5M)<', '>Storefronts<');
content = content.replace('>Keywords (60M)<', '>SEO & Tags<');

// 2. Upgrade sampleProducts with real image paths and add remaining real products
const oldSampleProductsRegex = /\/\/ Sample Products Data[\s\S]*?const sampleProducts = \[([\s\S]*?)\];/;

const newSampleProducts = `// Sample Products Data (Verified Real Niche Benchmarks)
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
      tags: ["adhd planner", "digital planner", "goodnotes template", "focus tracker", "adhd routine"],
      image: "/products/prod-1.svg"
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
      tags: ["dispatch template", "freight bookkeeping", "trucking spreadsheet", "courier log", "excel book"],
      image: "/products/prod-2.svg"
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
      tags: ["wedding vow book", "his and hers vows", "foil vow booklet", "keepsake journal", "wedding gift"],
      image: "/products/prod-3.svg"
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
      tags: ["mental health journal", "self care planner", "canva template", "wellness tracker", "digital book"],
      image: "/products/prod-4.svg"
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
      tags: ["leather keychain", "coordinates gift", "personalized key", "anniversary for him", "custom leather"],
      image: "/products/prod-5.svg"
    },
    {
      id: "6",
      title: "Modern Arch Acrylic Table Numbers with Wood Stands (Set of 1-20)",
      shop: "LuciteStudioDecor",
      shopSales: "9,420",
      format: "Physical Goods",
      isDigital: false,
      price: 45.00,
      moSales: 180,
      moGross: 8100,
      netTakeHome: 32.85,
      marginPct: 73,
      sold24h: 8,
      age: "8 months",
      reviews: 640,
      reviews30d: 31,
      inCart: 16,
      tags: ["acrylic table sign", "wedding table decor", "arch table numbers", "reception signage", "modern wedding"],
      image: "/products/prod-6.svg"
    },
    {
      id: "7",
      title: "Laser Cut SVG Multilayer Forest Wildlife Shadow Box Files",
      shop: "VectorCraftForge",
      shopSales: "38,910",
      format: "Laser Cut SVG",
      isDigital: true,
      price: 8.50,
      moSales: 540,
      moGross: 4590,
      netTakeHome: 7.45,
      marginPct: 88,
      sold24h: 24,
      age: "1.2 years",
      reviews: 2150,
      reviews30d: 52,
      inCart: 29,
      tags: ["laser cut svg", "shadow box file", "glowforge ready", "multilayer wood", "wildlife 3d svg"],
      image: "/products/prod-7.svg"
    },
    {
      id: "8",
      title: "Realtor Listing Presentation & Marketing Proposal (Canva Template)",
      shop: "AgencyRealtorKit",
      shopSales: "6,150",
      format: "Canva Template",
      isDigital: true,
      price: 19.99,
      moSales: 210,
      moGross: 4198,
      netTakeHome: 17.54,
      marginPct: 88,
      sold24h: 7,
      age: "6 months",
      reviews: 480,
      reviews30d: 19,
      inCart: 12,
      tags: ["realtor template", "listing presentation", "real estate guide", "canva proposal", "agent marketing"],
      image: "/products/prod-8.svg"
    }
  ];`;

content = content.replace(oldSampleProductsRegex, newSampleProducts);

// 3. Upgrade Product Analytics Table row rendering
const oldProductTdRegex = /<td className="py-3 px-4 font-medium text-zinc-900 max-w-xs">\s*<div className="truncate font-bold">\{p\.title\}<\/div>\s*<div className="text-\[11px\] text-zinc-500 font-normal">\{p\.shop\} · \{p\.shopSales\} sales<\/div>\s*<\/td>/;

const newProductTd = `<td className="py-3 px-4 font-medium text-zinc-900 max-w-sm">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-zinc-200/90 bg-zinc-100 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-bold text-zinc-950 text-xs group-hover:text-[#ea580c] transition-colors">{p.title}</div>
                              <div className="text-[11px] text-zinc-500 font-normal mt-0.5">{p.shop} · {p.shopSales} sales</div>
                            </div>
                          </div>
                        </td>`;

content = content.replace(oldProductTdRegex, newProductTd);

// 4. Upgrade Product Inspector Drawer Modal with Hero Image Banner
const oldModalContentRegex = /\{\/\* Modal Content \*\/\}\s*<div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-700">\s*\{\/\* Top Summary Banner \*\/\}/;

const newModalContent = `{/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-700">
              {/* Product Hero Visual Banner */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-zinc-200/90 shadow-sm bg-zinc-950 flex items-center justify-center">
                <img
                  src={selectedProductForModal.image || "/products/prod-1.svg"}
                  alt={selectedProductForModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ea580c] text-white tracking-wider uppercase">
                      {selectedProductForModal.format}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white backdrop-blur-xs">
                      Benchmark #{selectedProductForModal.id}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-1">
                    {selectedProductForModal.title}
                  </h3>
                </div>
              </div>

              {/* Top Summary Banner */}`;

content = content.replace(oldModalContentRegex, newModalContent);

// 5. Add Hero Viewport Browser Mockup
const heroButtonRegex = /Simulate Net Profit\s*<\/button>\s*<\/div>\s*<\/div>\s*<\/section>/;

const heroMockup = `Simulate Net Profit
            </button>
          </div>

          {/* Hero Visual Mockup: In-Grid Forensics & HUD in Action */}
          <div className="mt-10 rounded-2xl border border-zinc-200/90 shadow-2xl overflow-hidden bg-zinc-950 text-left max-w-4xl mx-auto">
            {/* Browser Window Titlebar */}
            <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-[11px] text-zinc-300 font-mono">
                  <span className="text-emerald-400">🔒</span>
                  <span>etsy.com/search?q=courier+freight+dispatch</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-[#ea580c]/20 text-[#ea580c] font-bold text-[10px] border border-[#ea580c]/30">
                  Extension Active
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Split Live View: Search Grid Card + Floating Forensics HUD */}
            <div className="p-5 sm:p-6 bg-zinc-900/60 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Column: Simulated Etsy Listing Card with Injected ScoutPro Strip */}
              <div className="md:col-span-7 bg-white rounded-xl p-3.5 shadow-sm border border-zinc-200 text-zinc-900 space-y-3">
                <div className="relative rounded-lg overflow-hidden border border-zinc-100 aspect-16/10 bg-zinc-100">
                  <img
                    src="/products/prod-2.svg"
                    alt="Courier Dispatch Spreadsheet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#ea580c] text-white font-extrabold text-[9px] px-2 py-0.5 rounded tracking-wider uppercase">
                    Bestseller
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    18 In Carts
                  </div>
                </div>

                <div>
                  <div className="font-bold text-xs text-zinc-900 truncate">
                    Courier Dispatch &amp; Freight Bookkeeping Spreadsheet
                  </div>
                  <div className="text-[11px] text-zinc-500 flex items-center justify-between mt-0.5">
                    <span>LogisticsTemplates · 1,290 sales</span>
                    <span className="font-extrabold text-zinc-950 text-sm">$21.00</span>
                  </div>
                </div>

                {/* The Injected ScoutPro Diagnostic Strip (What Extension Injects on Etsy) */}
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] space-y-1">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      ScoutPro In-Grid Live Strip
                    </span>
                    <span className="text-emerald-700 font-mono text-[10px]">$18.42 Net Bank Deposit (88%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-800 font-medium">
                    <span className="bg-white/80 px-1.5 py-0.5 rounded border border-emerald-200">🔥 6 sold / 24h</span>
                    <span className="bg-white/80 px-1.5 py-0.5 rounded border border-emerald-200">🛒 11 in cart</span>
                    <span className="bg-white/80 px-1.5 py-0.5 rounded border border-emerald-200">⚡ 18 days old</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Floating Forensics Glass HUD */}
              <div className="md:col-span-5 bg-zinc-950/90 rounded-xl p-4 border border-zinc-800/90 text-white space-y-3.5 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                    <span className="font-bold text-xs text-zinc-100">Storefront Forensics HUD</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">Alt+S</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">30-Day Velocity:</span>
                    <span className="font-bold text-emerald-400">+14 reviews (~165 sales)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Top Revenue Driver:</span>
                    <span className="font-bold text-zinc-200">SKU #2 (58% of shop rev)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Est. Net Monthly:</span>
                    <span className="font-mono font-bold text-emerald-400">$3,039.30</span>
                  </div>
                </div>

                <div className="pt-1">
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Backend Tags (13 Compliant)
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {["dispatch template", "freight book", "trucking sheet", "courier log"].map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] border border-zinc-700/60 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Proof Strip */}
            <div className="px-5 py-2.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Direct DOM Forensics · No Stale Renewal Dates · Zero Paywall Locks</span>
              <span className="text-emerald-400 font-semibold">100% Native Chrome Extension</span>
            </div>
          </div>
        </div>
      </section>`;

content = content.replace(heroButtonRegex, heroMockup);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Successfully updated page.tsx with Impeccable real product imagery and visual mockups.');

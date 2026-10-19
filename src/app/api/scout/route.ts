import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query, price, isDigital, hasOffsiteAds } = await req.json();

    const cleanQuery = String(query || "").trim() || "Wooden Bird Figurine";
    const testPrice = parseFloat(price) || 16.50;

    // 1. Fee Breakdown Engine
    const listingFee = 0.20;
    const transactionFee = Math.round(testPrice * 0.065 * 100) / 100;
    const paymentFee = Math.round((testPrice * 0.03 + 0.25) * 100) / 100;
    const offsiteFee = hasOffsiteAds ? Math.round(testPrice * 0.15 * 100) / 100 : 0;
    const totalFees = Math.round((listingFee + transactionFee + paymentFee + offsiteFee) * 100) / 100;
    const netTakeHome = Math.max(0, Math.round((testPrice - totalFees) * 100) / 100);
    const marginPct = testPrice > 0 ? Math.round((netTakeHome / testPrice) * 100) : 0;

    // 2. 5-Pillar Core Forensics Mock/Synthesis for Live Demo
    const tags = [
      cleanQuery.toLowerCase().slice(0, 20),
      "handmade gift",
      "desk decor aesthetic",
      "home decor accent",
      "birthday gift idea",
      "unique keepsake",
      "trending gift item",
      "room aesthetic decor",
      "collector figurine",
      "artisan crafted",
      "minimalist style",
      "custom made design",
      "tabletop display",
    ].slice(0, 13);

    return NextResponse.json({
      query: cleanQuery,
      pillars: {
        topListing: "🏆 #1 Niche Leader",
        focusKeyword: cleanQuery,
        listingAge: "🌱 New (2026)",
        reviews: "148 verified reviews (4.9 ★)",
        salesVelocity: `~220/mo ($${netTakeHome} net)`,
      },
      economics: {
        price: testPrice,
        listingFee,
        transactionFee,
        paymentFee,
        offsiteFee,
        totalFees,
        netTakeHome,
        marginPct,
      },
      compliant13Tags: tags,
      verdict: "🟢 PRIME INROAD OPPORTUNITY (LOW COMPETITION CEILING)",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to process audit" }, { status: 400 });
  }
}

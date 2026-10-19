# Niche Scout Pro — Live SaaS Web Portal & Universal Remote MCP Server

A standalone Next.js 15+ web application and universal Remote Model Context Protocol (MCP) server engineered for instant 1-click deployment on Vercel.

---

## What Is Inside This Project:

1. **High-Converting 2026 SaaS Landing Page (`src/app/page.tsx`):**
   - Modern Apple/EverBee grade Light SaaS UI.
   - Interactive live forensics sandbox & 13 compliant tag copy tool.
   - Live fee & net profit take-home simulator.
   - Remote MCP connection hub with 1-click config snippets for Claude Desktop, Cursor, and Python agents.
   - Feature comparison matrix benchmarking ScoutPro against EverBee and Alura.

2. **Universal Remote MCP Endpoint (`src/app/api/mcp/route.ts`):**
   - Compliant with official JSON-RPC 2.0 / MCP specification (`2024-11-05`).
   - Exposes 5 production-grade Etsy research tools:
     - `etsy_keyword_scout`: Buyer search suggestions & competition tier.
     - `etsy_listing_forensics`: 5-Pillar listing audit (Age, reviews, in-cart, 13 tags, net fees).
     - `etsy_shop_bestsellers`: Store bestseller unmasker using review-to-listing correlation.
     - `etsy_fee_calculator`: Dynamic Etsy fee deduction and profit margin breakdown.
     - `etsy_opportunity_verdict`: Instant market viability classification (GO / CAUTION / AVOID).

---

## How to Deploy to Vercel in 60 Seconds:

### Method A: Deploy via GitHub & Vercel Dashboard (Recommended)

1. Create a new GitHub repository (e.g. `niche-scout-pro-web`).
2. Push the contents of this folder (`tools/etsy-saas-web`) to your new GitHub repository:
   ```bash
   cd tools/etsy-saas-web
   git init
   git add .
   git commit -m "feat: initial commit of Niche Scout Pro live web & MCP server"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/niche-scout-pro-web.git
   git push -u origin main
   ```
3. Open [Vercel](https://vercel.com/new).
4. Click **"Import"** next to your new `niche-scout-pro-web` repository.
5. Keep default settings (Framework: Next.js) and click **"Deploy"**.

**Your live website is now online at `https://your-project.vercel.app`!**

---

### Method B: Deploy via Vercel CLI (Instant)

```bash
cd tools/etsy-saas-web
npm install -g vercel
vercel
```
Follow the 3 prompts, and Vercel will output your live URL immediately.

---

## How Any LLM Connects to Your Remote MCP Server:

Once deployed to Vercel, any AI agent can connect to your live endpoint:

### 1. Claude Desktop (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "etsy-niche-scout": {
      "url": "https://your-project.vercel.app/api/mcp",
      "headers": {
        "x-api-key": "scout_live_your_key"
      }
    }
  }
}
```

### 2. Cursor / Windsurf (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "etsy-scout": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://your-project.vercel.app/api/mcp", "--header", "x-api-key:scout_live_your_key"]
    }
  }
}
```

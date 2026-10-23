# Niche Scout Pro — Live SaaS Web Portal & Universal Remote MCP Server

A standalone Next.js 15+ web application and universal Remote Model Context Protocol (MCP) server engineered for high-performance cloud deployment.

---

## What Is Inside This Project:

1. **High-Converting 2026 SaaS Dashboard & Landing Page (`src/app/page.tsx`):**
   - High-density SaaS UI with full competitor parity.
   - 4 Core Analytics Modules: Product Analytics, Shop Analyzer (5M shops), Keyword Research (60M keywords), Profit Calculator.
   - Interactive live forensics sandbox and 13 compliant tag copy tool.
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

## Deployment & Hosting Guide:

### Production Build & Launch

```bash
cd tools/etsy-saas-web
pnpm install
pnpm run build
pnpm run start
```

### Docker Container Deployment

```dockerfile
FROM node:22-alpine AS runner
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install && pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]
```

---

## Connecting AI Agents to the Remote MCP Server:

Once deployed to your production domain (e.g. `https://scoutpro.app`), any AI agent can connect to your live endpoint:

### 1. Claude Desktop Configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "etsy-niche-scout": {
      "url": "https://scoutpro.app/api/mcp",
      "headers": {
        "x-api-key": "scout_live_your_key"
      }
    }
  }
}
```

### 2. Cursor IDE Configuration (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "etsy-niche-scout": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://scoutpro.app/api/mcp", "--header", "x-api-key:scout_live_your_key"]
    }
  }
}
```

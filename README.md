# Vista Operator Dashboard v2

A Next.js dashboard for discovering blockchain protocol operator opportunities. This version uses a **static JSON file** instead of a database for maximum simplicity.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📊 Data Management

All protocol data is stored in a single JSON file instead of a database:

### Local Development
- Data is served from `public/protocols.json`
- Edit this file directly to add/modify protocols

### Production (GitHub-hosted)
1. Upload your `protocols.json` to a GitHub repository
2. Update the `DATA_URL` in `src/lib/data.ts`:
   ```typescript
   const DATA_URL = "https://raw.githubusercontent.com/your-username/your-repo/main/protocols.json";
   ```

## 📝 JSON Schema

```json
{
  "protocols": [
    {
      "id": "protocol-id",
      "name": "Protocol Name",
      "website": "https://protocol.website",
      "description": "Description of the protocol",
      "documentation": "https://docs.protocol.website",
      "isActive": true,
      "tags": ["L2", "Privacy", "ZK"],
      "opportunities": [
        {
          "id": "opportunity-id",
          "type": "prover|sequencer|validator|full_node|light_client",
          "status": "mainnet|testnet|devnet",
          "requirements": [
            {
              "tier": "recommended|minimum",
              "entry": "permissioned|permissionless",
              "hardware": {
                "cpuCores": 8,
                "ramGb": 32,
                "storageGb": 1000,
                "storageMedia": "NVME|SSD|HDD",
                "upMbps": 100,
                "downMbps": 100,
                "staticIpPreferred": true,
                "upsRequired": false,
                "notes": "Optional hardware notes"
              }
            }
          ]
        }
      ]
    }
  ],
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

## 🎯 Features

### ✅ What Works
- **Operator Dashboard**: Browse all operator opportunities with filtering
- **Protocol Pages**: Individual protocol details at `/[protocol-id]`
- **Admin Dashboard**: View all protocols and their opportunities (read-only)
- **Search/Filter**: Find opportunities by protocol name, category, or requirements
- **Responsive Design**: Mobile-friendly interface

### ❌ What Was Removed
- Database (PostgreSQL + Drizzle ORM)
- Server actions and API routes
- Admin creation forms
- User authentication
- Complex backend logic

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │
├─────────────────┤
│ Client Components│ ← Fetch JSON directly
├─────────────────┤
│  Static JSON    │ ← Single source of truth
│ (GitHub/public) │
└─────────────────┘
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── [protocol]/        # Dynamic protocol pages
│   ├── admin/dashboard/   # Admin view (read-only)
│   └── page.tsx           # Main operator dashboard
├── components/
│   ├── features/          # Main UI components
│   └── ui/               # Reusable UI elements
├── lib/
│   └── data.ts           # JSON fetching & data utilities
└── public/
    └── protocols.json    # Static data file
```

## 🔧 Adding New Protocols

1. **Edit `public/protocols.json`**
2. **Add protocol icon** to `src/components/ui/svg/protocols/`
3. **Update icon mapping** in `src/components/features/OperatorDashboard/OperatorDashboard.tsx`

Example:
```typescript
const protocolIcons: Record<string, React.ReactNode> = {
  aztec: <AztecIcon />,
  lido: <LidoIcon />,
  eigenda: <EigenDAIcon />,
  buildernet: <BuildernetIcon />,
  "your-protocol": <YourProtocolIcon />, // Add this
};
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
pnpm build
# Deploy to Vercel
```

### GitHub Pages
1. Build the static site: `pnpm build && pnpm export`
2. Deploy the `out/` folder to GitHub Pages

### Self-hosted
```bash
pnpm build
pnpm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS 4
- **Data Tables**: TanStack React Table
- **Type Safety**: TypeScript
- **Data Source**: Static JSON (no database!)

## 🔄 Migration Notes

This version **completely eliminates** the backend complexity:
- ❌ No PostgreSQL database
- ❌ No Drizzle ORM
- ❌ No server actions
- ❌ No API routes
- ❌ No environment variables
- ✅ Simple JSON file
- ✅ GitHub-hosted data
- ✅ Zero backend maintenance

Perfect for static deployments and maximum simplicity!

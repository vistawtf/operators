# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with Turbopack (faster builds)
- `npm run build` - Build for production 
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run export` - Build and export static files

### Package Management
The project uses npm with package-lock.json, though README mentions pnpm. Use npm commands as configured in package.json.

## Architecture Overview

This is a **static JSON-based Next.js 15 application** for blockchain operator opportunities discovery. Key architectural decisions:

- **No database**: All data comes from `public/protocols.json` (local) or GitHub-hosted JSON
- **No server actions**: Pure client-side data fetching with caching
- **Static-first**: Designed for static deployment (Vercel, GitHub Pages)

### Data Flow
```
public/protocols.json → src/lib/data.ts → Components → UI
```

The application fetches protocol data once and caches it in memory. Data transformations happen in `src/lib/data.ts:105` via `transformToTableRows()`.

### Key Components Architecture

**Feature-based structure** in `src/components/features/`:
- `OperatorDashboard/` - Main dashboard with filtering and table views
- `OperatorView/` - Individual protocol detail pages

**Routing**:
- `/` - Main operator dashboard
- `/[protocol]` - Dynamic protocol pages (src/app/[protocol]/page.tsx)
- `/admin/dashboard` - Read-only admin view

## Data Management

### Protocol Data Schema
All protocol data follows the interface defined in `src/lib/data.ts:5-46`. Key types:
- `Protocol` - Main protocol entity with opportunities
- `Opportunity` - Operator roles (prover, sequencer, validator, etc.)
- `HardwareSpec` - Hardware requirements with CPU, RAM, storage specs

### Adding New Protocols
1. Edit `public/protocols.json` following the JSON schema
2. Add protocol icon SVG to `src/components/ui/svg/protocols/`
3. Update icon mapping in `OperatorDashboard.tsx` protocolIcons object

### Data URL Configuration
Production deployments should update `DATA_URL` in `src/lib/data.ts:2` to point to GitHub raw URL.

## Code Patterns

### Component Structure
- Feature components use barrel exports (index.ts files)
- UI components are in `src/components/ui/` with individual SVG icons
- Layout components (Header, Footer) in `src/components/layout/`

### State Management
- No global state management - uses React state and data fetching
- Caching handled by `fetchProtocols()` function with session-level cache

### Styling
- TailwindCSS 4 for styling
- Responsive design patterns throughout
- Custom noise texture background via `src/components/layout/noise.tsx`

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **UI**: TailwindCSS 4, TanStack React Table for data tables
- **Language**: TypeScript with strict typing
- **Deployment**: Static-friendly (no server dependencies)

## Development Notes

### No Backend Complexity
This version intentionally removes all backend complexity - no databases, APIs, or server actions. All data operations are client-side.

### Icon Management
Protocol icons are manually mapped in the main dashboard component. When adding new protocols, both the JSON data and icon mapping must be updated.

### Performance
- Uses Next.js 15 Turbopack for faster development builds
- Client-side data caching prevents repeated API calls
- Static deployment ready for CDN optimization
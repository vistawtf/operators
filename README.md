# Vista Operator Dashboard v2

A Next.js dashboard for discovering blockchain protocol operator opportunities. This version uses a **git submodule** to consume protocol data from the public [operators repository](https://github.com/vistawtf/operators).

## 🚀 Quick Start

```bash
# Clone with submodules
git clone --recursive <this-repo-url>

# Or if already cloned, initialize submodules
npm run data:init

# Install dependencies
npm install

# Update protocol data (optional)
npm run data:update

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📊 Data Management with Git Submodule

The frontend consumes protocol data from a git submodule located at `data/operators/`. This allows:

- **Separation of concerns**: Public data contributions vs private frontend
- **External contributions**: Anyone can contribute to the operators repo
- **Automatic updates**: Frontend stays synced with latest protocol data
- **Version control**: Track data changes alongside code changes

### Data Flow

```
External Contributors → operators repo → Validation & Compilation → protocols.json
                                                                      ↓
Frontend Submodule ← Git Submodule Update ← protocols.json ← Auto-compilation
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run data:init` | Initialize submodules (run once after clone) |
| `npm run data:update` | Update submodule to latest data |
| `npm run data:sync` | Sync and update submodule URLs and data |
| `npm run dev` | Start development server |
| `npm run build` | Build for production (auto-updates data) |

### Submodule Workflow

1. **Development**: Use `npm run data:update` to get latest protocol data
2. **Build**: The `prebuild` script automatically updates data before building
3. **Deployment**: Ensure submodules are initialized in CI/CD:
   ```bash
   git submodule update --init --recursive
   ```

## 📁 Project Structure

```
src/
├── lib/
│   ├── protocols.ts      # Core data access layer
│   ├── types.ts          # TypeScript interfaces
│   ├── data.ts           # Legacy compatibility layer
│   └── server-data.ts    # Server-side data fetching
├── app/
│   ├── api/protocols/    # API route for client-side access
│   └── [protocol]/       # Dynamic protocol pages
└── components/
    └── features/         # Dashboard and view components

data/
└── operators/            # Git submodule
    ├── protocols.json    # Compiled protocol data
    └── protocols/        # Individual protocol files
```

## 🔧 Data Access Patterns

### Server-side (SSG/SSR)
```typescript
import { getAllProtocols, getProtocolById } from '@/lib/protocols';

// Get all protocols
const protocols = getAllProtocols();

// Get specific protocol
const protocol = getProtocolById('aztec');
```

### Client-side
```typescript
import { fetchProtocols } from '@/lib/data';

// Fetch via API route
const protocols = await fetchProtocols();
```

### Flexible Data Structure

The system supports both structured protocols (following strict schema) and flexible protocols (allowing creative contributions):

```typescript
// Structured protocol (backward compatible)
interface Protocol {
  id: string;
  name: string;
  // ... strict schema
}

// Flexible protocol (enables discoveries)
interface FlexibleProtocol {
  id: string;
  name: string;
  description: string;
  [key: string]: any; // Allows additional properties
}
```

## 📝 Contributing to Protocol Data

Protocol data lives in the public [operators repository](https://github.com/vistawtf/operators). To add new protocols:

1. Fork the `operators` repository
2. Add your protocol file to `protocols/yourprotocol.json`
3. Submit a pull request
4. Once merged, update this frontend: `npm run data:update`

The operators repo has minimal validation (JSON + basic fields) to encourage creative contributions and community discovery of new operator patterns.

## 🏗 Development

### Local Development
- Data is read from `data/operators/protocols.json`
- Use `npm run data:update` to sync latest changes
- The development server supports both submodule and fallback data sources

### Production Deployment

#### Railway Deployment (Primary Platform)

This application is optimized for Railway deployment:

1. **Connect your repository** to Railway
2. **Configure build settings** in Railway dashboard:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
3. **Set up git submodules** in Railway:
   - Add this environment variable: `RAILWAY_GIT_COMMIT_SHA=true`
   - Railway will automatically initialize submodules during build

#### Alternative Platforms

For other platforms, ensure submodules are initialized in your build process:
```bash
git submodule update --init --recursive
npm run build
npm run start
```

**Note:** The `prebuild` script automatically updates submodule data before each build.

### Environment Variables
No environment variables required - all data comes from the git submodule.

## 📊 Data Features

- **Flexible schema**: Supports both structured and creative protocol contributions
- **Automatic caching**: 5-minute cache for performance
- **Search functionality**: Search by name, description, tags
- **Filtering**: By status, operator type, tags
- **Statistics**: Protocol counts and distributions
- **Type safety**: Full TypeScript support with flexible interfaces

## 🔄 Updating Protocol Data

The frontend automatically stays in sync with the operators repository:

1. **Manual Update**: `npm run data:update`
2. **Build-time Update**: `npm run build` (automatic via `prebuild`)
3. **CI/CD**: Include submodule update in deployment pipeline

This ensures the frontend always has the latest protocol information from community contributions.

---

For questions about the frontend, open an issue here.
For questions about protocol data, visit the [operators repository](https://github.com/vistawtf/operators).
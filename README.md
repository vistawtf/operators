# Operators Protocol Database

Community-driven operator opportunities for blockchain protocols. We use minimal validation and flexible schemas to enable discovery of new operator patterns.

## Quick Start

**Three steps to contribute:**

1. **Copy** any file from `protocols/`
2. **Edit** with your protocol details + add your logo to `logos/`
3. **Submit** a pull request

**Automated validation:** Every PR is automatically validated for data structure, required fields, logo presence, and security checks. You'll get immediate feedback if something needs fixing.

**Bonus points** if you surprise us with operator angles we hadn't considered.

## What's Required

### Minimum Required Fields

Only three fields are mandatory:
- `id` - unique identifier (lowercase-recommended)
- `name` - protocol display name
- `description` - what the protocol does + operator opportunities

**Logo is also required:**
- Add your protocol logo as `logos/{id}.svg` (must match your protocol `id`)
- SVG format only (keeps file sizes small and scalable)
- Recommended size: 24x24px or similar square dimensions
- Keep file size under 100KB (validation will warn if larger)

### Recommended Structure for Dashboard Integration

For your protocol to display properly in the operator dashboard, we recommend including these fields:

**Operator Opportunities** (`opportunities` array):
Each protocol can have multiple operator roles. Each opportunity should include:

- `id` - unique identifier for this opportunity (e.g., "aztec-sequencer")
- `type` - operator role type (see supported types below)
- `status` - network status: `mainnet`, `testnet`, or `beta`
- `requirements` - array of requirement tiers (minimum, recommended, institutional)

**Supported Operator Types:**
- `validator` - Network validators / consensus operators
- `minipool_operator` - Minipool operators (e.g., Rocket Pool)
- `dvt_operator` - Distributed Validator Technology operators
- `vault_operator` - Vault operators (e.g., EtherFi)
- `sequencer` - Transaction sequencers / block builders
- `prover` - Proof generators
- `zk_prover` - Zero-knowledge proof generators
- `full_node` - Full node operators
- `light_client` - Light client operators
- `light_node` - Light node operators
- `relayer` - Cross-chain relayers / bridges
- `infrastructure_tool` - Infrastructure tools and services

**Hardware Requirements** (per tier):
- `tier` - `minimum`, `recommended`, `institutional` (or `datacenter`/`optimal` for compatibility)
- `entry` - `permissionless` or `permissioned`
- `hardware` object:
  - `cpuCores` - Number of CPU cores
  - `ramGb` - RAM in gigabytes
  - `storageGb` - Storage in gigabytes
  - `storageMedia` - `SSD`, `NVME`, or `HDD`
  - `upMbps` / `downMbps` - Network bandwidth
  - `iopsRead` / `iopsWrite` - I/O operations per second (optional)
  - `staticIpPreferred` - Boolean (optional)
  - `upsRequired` - Boolean (optional)
  - `notes` - Additional requirements or context (optional)

**Example Structure:**
```json
{
  "id": "your-protocol",
  "name": "Your Protocol",
  "opportunities": [
    {
      "id": "your-protocol-validator",
      "type": "validator",
      "status": "mainnet",
      "requirements": [
        {
          "tier": "recommended",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 8,
            "ramGb": 32,
            "storageGb": 2000,
            "storageMedia": "NVME",
            "upMbps": 100,
            "downMbps": 100,
            "notes": "Additional info here"
          }
        }
      ]
    }
  ]
}
```

**Everything else is optional.** Add whatever helps operators understand your protocol.

Our flexible schema means you can include custom categories, unique operator types, reward structures, governance details, or community links in any format you prefer.

**We want to learn from your submissions.** Creative contributions help us discover new operator categories and requirements patterns.

## For Maintainers

```bash
# Validate all protocol files (comprehensive validation)
node scripts/validate.js

# Compile individual files into protocols.json
node scripts/compile.js
```

**Validation philosophy:** Comprehensive automated validation ensures data integrity while maintaining flexibility for creative contributions.

### GitHub Actions Integration

Every PR automatically runs:
- **Comprehensive validation:** JSON structure, required fields, data types, URL validation
- **Logo validation:** SVG format, file size checks, required logo presence
- **Security checks:** XSS prevention, malicious content detection
- **Compilation testing:** Ensures all data compiles correctly

Contributors get immediate feedback with specific error messages and helpful suggestions.

## Data Flow & Architecture

### Two-Repository System

This repository works seamlessly with the [operators-frontend](https://github.com/vistawtf/operators-frontend) dashboard:

```
operators repo (this repo)          →          operators-frontend repo
─────────────────────────                      ─────────────────────────
Individual files in protocols/                 Git submodule: data/operators/
         ↓                                                  ↓
  Validation (CI)                              Reads from submodule
         ↓                                                  ↓
  Compilation                                   API route /api/protocols
         ↓                                                  ↓
  protocols.json                                Dashboard components
```

### How It Works

1. **Contributors add protocols** - Submit individual JSON files to `protocols/` directory
2. **Automated validation** - CI validates structure, types, and logos on every PR
3. **Compilation** - Individual files are compiled into `protocols.json`
4. **Frontend consumption** - Frontend uses this repo as a git submodule
5. **Automatic sync** - Frontend reads from submodule server-side with caching

### For Frontend Developers

The frontend repo includes this repository as a git submodule at `data/operators/`:

```bash
# Initialize submodule (first time)
git submodule update --init --recursive

# Update submodule to latest
cd data/operators
git pull origin main
cd ../..
git add data/operators
git commit -m "chore: update operators data"

# Or use the sync script
npm run sync-logos  # Downloads logos from GitHub
```

### For Protocol Contributors

You only need to work with this repository:

1. Fork this repo
2. Add your protocol JSON file to `protocols/`
3. Add your logo SVG to `logos/`
4. Submit a pull request
5. Automated CI validates your submission
6. Once merged, frontend automatically picks up changes via submodule

**No manual frontend updates needed** - the git submodule system handles synchronization.

---

**Questions?** Open an issue or check [CONTRIBUTING.md](CONTRIBUTING.md) for detailed examples.

**Want to add your protocol?** We're excited to see what operator opportunities you'll show us.
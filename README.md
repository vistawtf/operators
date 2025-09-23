# Operators Protocol Database

Community-driven operator opportunities for blockchain protocols. We use minimal validation and flexible schemas to enable discovery of new operator patterns.

## Quick Start

**Three steps to contribute:**

1. **Copy** any file from `protocols/`
2. **Edit** with your protocol details
3. **Submit** a pull request

**Bonus points** if you surprise us with operator angles we hadn't considered.

## What's Required

Only three fields are mandatory:
- `id` - unique identifier (lowercase-recommended)
- `name` - protocol display name
- `description` - what the protocol does + operator opportunities

**Everything else is optional.** Add whatever helps operators understand your protocol.

Our flexible schema means you can include hardware requirements, custom categories, unique operator types, reward structures, governance details, or community links in any format you prefer.

**We want to learn from your submissions.** Creative contributions help us discover new operator categories and requirements patterns.

## For Maintainers

```bash
# Validate all protocol files (JSON + required fields)
node scripts/validate.js

# Compile individual files into protocols.json
node scripts/compile.js
```

**Validation philosophy:** We check JSON syntax and three required fields. Everything else gets manually reviewed for quality and interesting patterns.

## Data Flow

```
Individual Protocol Files → Validation → protocols.json → Git Submodule Consumption
```

The compiled `protocols.json` is consumed by downstream applications via git submodule, enabling automatic updates when new protocols are added.

---

**Questions?** Open an issue or check [CONTRIBUTING.md](CONTRIBUTING.md) for detailed examples.

**Want to add your protocol?** We're excited to see what operator opportunities you'll show us.
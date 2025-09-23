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

Only three fields are mandatory:
- `id` - unique identifier (lowercase-recommended)
- `name` - protocol display name
- `description` - what the protocol does + operator opportunities

**Logo is also required:**
- Add your protocol logo as `logos/{id}.svg` (must match your protocol `id`)
- SVG format only (keeps file sizes small and scalable)
- Recommended size: 24x24px or similar square dimensions
- Keep file size under 100KB (validation will warn if larger)

**Everything else is optional.** Add whatever helps operators understand your protocol.

Our flexible schema means you can include hardware requirements, custom categories, unique operator types, reward structures, governance details, or community links in any format you prefer.

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

## Data Flow

```
Individual Protocol Files → Validation → protocols.json → Git Submodule Consumption
```

The compiled `protocols.json` is consumed by downstream applications via git submodule, enabling automatic updates when new protocols are added.

---

**Questions?** Open an issue or check [CONTRIBUTING.md](CONTRIBUTING.md) for detailed examples.

**Want to add your protocol?** We're excited to see what operator opportunities you'll show us.
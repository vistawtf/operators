# Contributing

## 🚀 Add Your Protocol (3 steps)

1. **Copy** any file from `protocols/` (use `aztec.json` as a reference)
2. **Edit** with your info + add logo to `logos/`
3. **Submit PR**

## 📋 Minimum Required

Only 3 fields are absolutely required:

```json
{
  "id": "yourprotocol",
  "name": "Your Protocol",
  "description": "What it does + operator opportunities"
}
```

## 🎯 Recommended Structure

For your protocol to display properly in the operator dashboard, include the `opportunities` array with operator roles:

### Single Opportunity Example

```json
{
  "id": "yourprotocol",
  "name": "Your Protocol",
  "website": "https://yourprotocol.xyz",
  "description": "A brief description of your protocol and what operators do",
  "documentation": "https://docs.yourprotocol.xyz",
  "isActive": true,
  "tags": ["L2", "ZK"],
  "docsIntegration": [
    {
      "text": "Link to operator setup guides and documentation"
    }
  ],
  "opportunities": [
    {
      "id": "yourprotocol-validator",
      "type": "validator",
      "status": "mainnet",
      "requirements": [
        {
          "tier": "minimum",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 4,
            "ramGb": 16,
            "storageGb": 500,
            "storageMedia": "SSD",
            "upMbps": 50,
            "downMbps": 50,
            "staticIpPreferred": false,
            "upsRequired": false,
            "notes": "Basic setup for testing"
          }
        },
        {
          "tier": "recommended",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 8,
            "ramGb": 32,
            "storageGb": 2000,
            "storageMedia": "NVME",
            "iopsRead": 80000,
            "iopsWrite": 50000,
            "upMbps": 100,
            "downMbps": 100,
            "staticIpPreferred": true,
            "upsRequired": true,
            "notes": "Production-grade setup"
          }
        }
      ]
    }
  ]
}
```

### Multiple Opportunities Example

Protocols can have multiple operator roles. See `protocols/aztec.json` for a real example with sequencer, full_node, and prover opportunities:

```json
{
  "id": "yourprotocol",
  "name": "Your Protocol",
  "opportunities": [
    {
      "id": "yourprotocol-sequencer",
      "type": "sequencer",
      "status": "mainnet",
      "requirements": [...]
    },
    {
      "id": "yourprotocol-prover",
      "type": "prover",
      "status": "testnet",
      "requirements": [...]
    },
    {
      "id": "yourprotocol-validator",
      "type": "validator",
      "status": "mainnet",
      "requirements": [...]
    }
  ]
}
```

## 📊 Supported Operator Types

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

## 🔧 Hardware Requirement Tiers

- `minimum` - Bare minimum to run (testing/personal use)
- `recommended` - Production-ready setup
- `institutional` - Enterprise-grade infrastructure (preferred)
- `datacenter` / `optimal` - Also supported for compatibility

## 💡 Add Whatever Makes Sense

Beyond the recommended structure, feel free to include:

- Custom operator types we haven't seen before
- Unique hardware requirements
- Staking, rewards, governance info
- Community links and resources
- Creative fields that help operators

## ✅ Validation & Review

- **Automated checks:** JSON syntax, required fields, logo presence
- **Manual review:** Content accuracy and completeness
- **Your creativity helps us discover new operator patterns**

---

*See `protocols/aztec.json` for a complete real-world example.*
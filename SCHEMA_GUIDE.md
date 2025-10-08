# Protocol Schema Guide

Complete reference for structuring protocol data for the operator dashboard.

## Table of Contents

- [Core Structure](#core-structure)
- [Opportunities](#opportunities)
- [Operator Types](#operator-types)
- [Hardware Requirements](#hardware-requirements)
- [Best Practices](#best-practices)
- [Complete Examples](#complete-examples)

## Core Structure

### Required Fields

```json
{
  "id": "protocol-identifier",
  "name": "Protocol Display Name",
  "description": "What the protocol does and operator opportunities available"
}
```

### Recommended Fields

```json
{
  "id": "protocol-identifier",
  "name": "Protocol Display Name",
  "website": "https://protocol.xyz",
  "description": "Comprehensive description of the protocol",
  "documentation": "https://docs.protocol.xyz",
  "isActive": true,
  "tags": ["Category1", "Category2"],
  "docsIntegration": [
    {
      "text": "Description of operator documentation and resources"
    }
  ],
  "opportunities": []
}
```

**Field Descriptions:**
- `id` - Unique lowercase identifier (no spaces), used for URLs and file matching
- `name` - Display name shown in dashboard
- `website` - Official protocol website
- `description` - Overview of protocol and operator roles (supports markdown)
- `documentation` - Link to operator/technical documentation
- `isActive` - Boolean indicating if opportunities are currently available
- `tags` - Array of categories (e.g., ["L2", "ZK", "DeFi"])
- `docsIntegration` - Array of objects describing integrations, tools, and resources

## Opportunities

Each protocol can have **multiple opportunities** representing different operator roles.

### Opportunity Structure

```json
{
  "id": "unique-opportunity-id",
  "type": "operator-type",
  "status": "network-status",
  "requirements": []
}
```

**Field Descriptions:**
- `id` - Unique identifier (recommended format: `{protocol-id}-{type}`)
- `type` - One of the supported operator types (see below)
- `status` - Network status: `mainnet`, `testnet`, or `beta`
- `requirements` - Array of requirement tiers (minimum, recommended, etc.)

### Multiple Opportunities Example

```json
{
  "id": "aztec",
  "name": "Aztec",
  "opportunities": [
    {
      "id": "aztec-sequencer",
      "type": "sequencer",
      "status": "testnet",
      "requirements": [...]
    },
    {
      "id": "aztec-full-node",
      "type": "full_node",
      "status": "testnet",
      "requirements": [...]
    },
    {
      "id": "aztec-prover",
      "type": "prover",
      "status": "testnet",
      "requirements": [...]
    }
  ]
}
```

## Operator Types

### Supported Types

1. **`validator`** - Network validators / consensus operators
   - Example: Ethereum validators, Cosmos validators
   - Characteristics: Stake required, consensus participation

2. **`minipool_operator`** - Minipool operators
   - Example: Rocket Pool minipool operators
   - Characteristics: Lower stake requirements, liquid staking participation

3. **`dvt_operator`** - Distributed Validator Technology operators
   - Example: SSV Network operators
   - Characteristics: Multi-operator validation, fault tolerance

4. **`vault_operator`** - Vault operators
   - Example: EtherFi vault operators
   - Characteristics: Asset management, vault infrastructure

5. **`sequencer`** - Transaction sequencers / block builders
   - Example: L2 sequencers, MEV builders
   - Characteristics: Low latency requirements, MEV opportunities

6. **`prover`** - Proof generators
   - Example: Generic proof generation
   - Characteristics: Compute-intensive workloads

7. **`zk_prover`** - Zero-knowledge proof generators
   - Example: ZK-rollup provers, proof networks
   - Characteristics: Highly compute-intensive, often specialized hardware

8. **`full_node`** - Full node operators
   - Example: Archive nodes, RPC nodes
   - Characteristics: High storage, data availability

9. **`light_client`** - Light client operators
   - Example: Light clients, mobile sync
   - Characteristics: Minimal resources, sync verification

10. **`light_node`** - Light node operators
    - Example: Lightweight infrastructure nodes
    - Characteristics: Lower resource requirements than full nodes

11. **`relayer`** - Cross-chain relayers / bridges
    - Example: IBC relayers, bridge operators
    - Characteristics: Multi-chain infrastructure, monitoring

12. **`infrastructure_tool`** - Infrastructure tools and services
    - Example: Monitoring, analytics, developer tools
    - Characteristics: Supporting infrastructure for protocols

### Custom Types

While we recommend using the supported types above, you can propose new operator types if they don't fit existing categories. The dashboard may not have specific filters for custom types initially, but we'll add support for popular new categories.

## Hardware Requirements

### Requirement Tiers

Each opportunity can have multiple requirement tiers to accommodate different operator setups:

- **`minimum`** - Bare minimum to run (testing, learning, personal use)
- **`recommended`** - Production-ready setup for serious operators
- **`institutional`** - Enterprise-grade infrastructure (preferred for high-end deployments)
- **`datacenter`** / **`optimal`** - Also supported for backwards compatibility

### Tier Structure

```json
{
  "tier": "institutional",
  "entry": "permissionless",
  "hardware": {
    "cpuCores": 16,
    "ramGb": 64,
    "storageGb": 4000,
    "storageMedia": "NVME",
    "iopsRead": 100000,
    "iopsWrite": 80000,
    "upMbps": 1000,
    "downMbps": 1000,
    "staticIpPreferred": true,
    "upsRequired": true,
    "notes": "Enterprise-grade setup with high redundancy"
  }
}
```

### Hardware Fields

**Required:**
- `cpuCores` - Number of CPU cores (integer)
- `ramGb` - RAM in gigabytes (integer)
- `storageGb` - Storage in gigabytes (integer)
- `storageMedia` - Storage type: `"SSD"`, `"NVME"`, or `"HDD"`
- `upMbps` - Upload bandwidth in Mbps (integer)
- `downMbps` - Download bandwidth in Mbps (integer)

**Optional:**
- `iopsRead` - Read I/O operations per second (integer)
- `iopsWrite` - Write I/O operations per second (integer)
- `staticIpPreferred` - Whether static IP is preferred (boolean)
- `upsRequired` - Whether UPS/power backup is required (boolean)
- `notes` - Additional context, requirements, or important details (string)

### Entry Types

- **`permissionless`** - Anyone can participate without approval
- **`permissioned`** - Requires approval, stake threshold, or whitelist

## Best Practices

### 1. Be Specific with Hardware Requirements

❌ **Bad:**
```json
{
  "tier": "minimum",
  "hardware": {
    "cpuCores": 2,
    "ramGb": 4,
    "storageGb": 100
  }
}
```

✅ **Good:**
```json
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
    "notes": "Suitable for testnet participation. Port 30303 must be forwarded."
  }
}
```

### 2. Provide Multiple Tiers When Relevant

```json
{
  "requirements": [
    {
      "tier": "minimum",
      "entry": "permissionless",
      "hardware": { /* basic specs */ }
    },
    {
      "tier": "recommended",
      "entry": "permissionless",
      "hardware": { /* production specs */ }
    },
    {
      "tier": "institutional",
      "entry": "permissionless",
      "hardware": { /* enterprise-grade specs */ }
    }
  ]
}
```

### 3. Use Descriptive IDs

❌ **Bad:** `"id": "opp1"`

✅ **Good:** `"id": "aztec-sequencer"`

### 4. Include Important Context in Notes

```json
{
  "notes": "Requires 32 ETH stake. Must maintain 99.9% uptime to avoid slashing. Rewards distributed monthly."
}
```

### 5. Keep Descriptions Informative

Focus on what operators need to know:
- What the protocol does
- Why operators are needed
- What value operators provide
- Current status (testnet/mainnet)

## Complete Examples

### Example 1: Single Opportunity Protocol

```json
{
  "id": "lido",
  "name": "Lido",
  "website": "https://lido.fi",
  "description": "Lido is a liquid staking protocol that allows users to stake their ETH while maintaining liquidity through stETH tokens. As a validator operator for Lido, you help secure the Ethereum network while earning staking rewards.",
  "documentation": "https://docs.lido.fi",
  "isActive": true,
  "tags": ["LST", "Staking"],
  "docsIntegration": [
    {
      "text": "Official validator operator documentation covers node setup, key management, and monitoring requirements"
    },
    {
      "text": "Lido SDK and APIs available for integration with staking infrastructure"
    }
  ],
  "opportunities": [
    {
      "id": "lido-validator",
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
            "iopsRead": 80000,
            "iopsWrite": 50000,
            "upMbps": 100,
            "downMbps": 100,
            "staticIpPreferred": true,
            "upsRequired": true,
            "notes": "Requires 32 ETH stake. Slashing penalties apply for downtime."
          }
        }
      ]
    }
  ]
}
```

### Example 2: Multi-Opportunity Protocol

```json
{
  "id": "aztec",
  "name": "Aztec",
  "website": "https://aztec.network",
  "description": "Aztec is a privacy-first Layer 2 solution built on Ethereum, bringing privacy to blockchain transactions through zero-knowledge proofs. Currently in Adversarial Testnet with 23,000+ operators.",
  "documentation": "https://docs.aztec.network",
  "isActive": true,
  "tags": ["L2", "Privacy", "ZK", "Testnet"],
  "docsIntegration": [
    {
      "text": "Official documentation for operators available at https://docs.aztec.network/the_aztec_network/guides/run_nodes"
    },
    {
      "text": "Tools include Aztec.js and Aztec.nr (Noir framework for private smart contracts)"
    }
  ],
  "opportunities": [
    {
      "id": "aztec-sequencer",
      "type": "sequencer",
      "status": "testnet",
      "requirements": [
        {
          "tier": "minimum",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 8,
            "ramGb": 16,
            "storageGb": 1000,
            "storageMedia": "SSD",
            "upMbps": 25,
            "downMbps": 25,
            "staticIpPreferred": true,
            "upsRequired": false,
            "notes": "Port 40400 must be forwarded. Requires 0.1 ETH Sepolia. ZKPassport verification required."
          }
        }
      ]
    },
    {
      "id": "aztec-full-node",
      "type": "full_node",
      "status": "testnet",
      "requirements": [
        {
          "tier": "minimum",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 8,
            "ramGb": 16,
            "storageGb": 1000,
            "storageMedia": "SSD",
            "upMbps": 25,
            "downMbps": 25,
            "staticIpPreferred": false,
            "upsRequired": false,
            "notes": "Most private way to interact with Aztec. Requires L1 RPC endpoints with blob support."
          }
        }
      ]
    },
    {
      "id": "aztec-prover",
      "type": "prover",
      "status": "testnet",
      "requirements": [
        {
          "tier": "datacenter",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 16,
            "ramGb": 128,
            "storageGb": 1000,
            "storageMedia": "NVME",
            "iopsRead": 50000,
            "iopsWrite": 30000,
            "upMbps": 100,
            "downMbps": 100,
            "staticIpPreferred": true,
            "upsRequired": false,
            "notes": "CPU-based proving (no GPU needed). Full setup requires ~40 machines @ 16 cores/128GB each. Monthly cost $10,000+. No active incentive program yet."
          }
        }
      ]
    }
  ]
}
```

### Example 3: Sequencer with MEV Opportunities

```json
{
  "id": "buildernet",
  "name": "Buildernet",
  "website": "https://buildernet.org",
  "description": "MEV-focused Layer 2 solution designed to optimize transaction ordering and maximize value extraction. Operators run sequencers that efficiently order transactions while capturing MEV rewards.",
  "documentation": "https://docs.buildernet.org",
  "isActive": true,
  "tags": ["L2", "MEV"],
  "docsIntegration": [
    {
      "text": "Sequencer documentation covers MEV extraction strategies and optimal transaction ordering"
    },
    {
      "text": "MEV toolkit includes flash loan interfaces and arbitrage detection APIs"
    }
  ],
  "opportunities": [
    {
      "id": "buildernet-sequencer",
      "type": "sequencer",
      "status": "mainnet",
      "requirements": [
        {
          "tier": "minimum",
          "entry": "permissionless",
          "hardware": {
            "cpuCores": 4,
            "ramGb": 8,
            "storageGb": 1000,
            "storageMedia": "SSD",
            "iopsRead": 25000,
            "iopsWrite": 20000,
            "upMbps": 100,
            "downMbps": 100,
            "staticIpPreferred": false,
            "upsRequired": false,
            "notes": "No stake required. MEV rewards auto-distributed. Low-latency connection recommended for optimal MEV capture."
          }
        }
      ]
    }
  ]
}
```

## Questions?

- Check existing protocols in `protocols/` for real-world examples
- Open an issue for schema questions or suggestions
- See [CONTRIBUTING.md](CONTRIBUTING.md) for submission guidelines

// TypeScript interfaces for protocol data from operators repository

export interface HardwareRequirements {
  cpuCores: number;
  ramGb: number;
  storageGb: number;
  storageMedia: "SSD" | "NVME" | "HDD";
  iopsRead: number;
  iopsWrite: number;
  upMbps: number;
  downMbps: number;
  staticIpPreferred: boolean;
  upsRequired: boolean;
  notes?: string;
}

export interface RequirementTier {
  tier: "minimum" | "recommended" | "optimal";
  entry: "permissionless" | "permissioned";
  hardware: HardwareRequirements;
}

export interface OperatorOpportunity {
  id: string;
  type: "validator" | "prover" | "sequencer" | "relayer";
  status: "testnet" | "mainnet" | "beta";
  requirements: RequirementTier[];
}

export interface DocsIntegration {
  text: string;
}

export interface Protocol {
  id: string;
  name: string;
  website: string;
  description: string;
  documentation: string;
  isActive: boolean;
  tags: string[];
  docsIntegration: DocsIntegration[];
  opportunities: OperatorOpportunity[];
}

export interface ProtocolsData {
  protocols: Protocol[];
  lastUpdated: string;
}

// Flexible interface for future protocol extensions
export interface FlexibleProtocol extends Omit<Protocol, 'tags' | 'opportunities'> {
  tags: string[]; // Allow any tags for creative contributions
  opportunities: any[]; // Allow flexible opportunity structures
  [key: string]: any; // Allow additional properties
}

export interface FlexibleProtocolsData {
  protocols: FlexibleProtocol[];
  lastUpdated: string;
}

// Union type for backward compatibility
export type AnyProtocol = Protocol | FlexibleProtocol;
export type AnyProtocolsData = ProtocolsData | FlexibleProtocolsData;
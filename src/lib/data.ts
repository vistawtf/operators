// Updated to consume data from git submodule
import {
  getAllProtocols,
  getProtocolById,
  getActiveProtocols,
  getLastUpdated,
  clearProtocolsCache,
} from './protocols';
import type { FlexibleProtocol } from './types';

// Re-export types for backward compatibility
export type { FlexibleProtocol as Protocol } from './types';

export interface DocsIntegrationItem {
  text: string;
}

export interface Opportunity {
  id: string;
  type: "prover" | "sequencer" | "validator" | "full_node" | "light_client" | "relayer";
  status: "mainnet" | "testnet" | "devnet" | "beta";
  requirements: Requirement[];
}

export interface Requirement {
  tier: "recommended" | "minimum" | "optimal";
  entry: "permissioned" | "permissionless";
  hardware: HardwareSpec;
}

export interface HardwareSpec {
  cpuCores: number;
  ramGb: number;
  storageGb: number;
  storageMedia: "NVME" | "SSD" | "HDD";
  iopsRead?: number;
  iopsWrite?: number;
  upMbps: number;
  downMbps: number;
  staticIpPreferred: boolean;
  upsRequired: boolean;
  notes?: string;
}

// Server-side data fetching using submodule
export async function fetchProtocols(): Promise<FlexibleProtocol[]> {
  try {
    // Use the submodule data directly in production
    if (typeof window === 'undefined') {
      // Server-side: read directly from submodule
      return getAllProtocols();
    } else {
      // Client-side: fetch from API route that reads submodule
      const response = await fetch('/api/protocols', {
        headers: {
          'Cache-Control': 'max-age=300', // 5 minutes
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch protocols: ${response.status}`);
      }

      const data = await response.json();
      return data.protocols;
    }
  } catch (error) {
    console.error('Error fetching protocols:', error);

    // Fallback: try to use the direct submodule approach
    try {
      return getAllProtocols();
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return [];
    }
  }
}

// Transform data for the OperatorDashboard table format
interface TableRow {
  id: string;
  project: {
    icon: React.ReactNode;
    name: string;
    url: string;
    protocolId: string;
  };
  category: string[];
  status: string;
  entry: {
    type: string;
    condition: string;
  };
  hardware: {
    cpu: string;
    ram: string;
    storage: string;
    bandwith: string;
  };
}

export function transformToTableRows(protocols: FlexibleProtocol[]): TableRow[] {
  const rows: TableRow[] = [];

  protocols.forEach(protocol => {
    // Handle flexible opportunity structures
    const opportunities = protocol.opportunities || [];

    opportunities.forEach((opportunity: any) => {
      // Support both structured and flexible requirements
      const requirements = opportunity.requirements || [];

      // Prefer recommended tier, fallback to minimum if recommended doesn't exist
      let filteredRequirements = requirements.filter((req: any) => req.tier === "minimum");

      // If no minimum requirements exist, use recommended as fallback
      if (filteredRequirements.length === 0) {
        filteredRequirements = requirements.filter((req: any) => req.tier === "recommended");
      }

      // If still no requirements, create a default one from any available data
      if (filteredRequirements.length === 0 && requirements.length > 0) {
        filteredRequirements = [requirements[0]];
      }

      filteredRequirements.forEach((requirement: any) => {
        // Handle flexible hardware structures
        const hardware = requirement.hardware || {};

        // Generate entry condition text with flexible handling
        let entryCondition = "NO STAKE";

        if (requirement.entry === "permissioned") {
          entryCondition = "PERMISSIONED";
        } else if (requirement.entry === "permissionless") {
          if (hardware.notes && hardware.notes.includes("stake")) {
            entryCondition = "STAKE REQUIRED";
          } else if (hardware.notes && hardware.notes.includes("top")) {
            entryCondition = "TOP 200 STAKE";
          }
        }

        rows.push({
          id: `${protocol.id}-${opportunity.id || 'default'}-${requirement.tier || 'default'}-${requirement.entry || 'default'}`,
          project: {
            icon: null, // Will be set in component
            name: protocol.name,
            url: (protocol.website || '').replace("https://", ""),
            protocolId: protocol.id,
          },
          category: protocol.tags || [],
          status: opportunity.status ?
            opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1) :
            'Unknown',
          entry: {
            type: requirement.entry ?
              requirement.entry.charAt(0).toUpperCase() + requirement.entry.slice(1) :
              'Unknown',
            condition: entryCondition,
          },
          hardware: {
            cpu: hardware.cpuCores ? `${hardware.cpuCores} cores` : 'N/A',
            ram: hardware.ramGb ? `${hardware.ramGb}GB` : 'N/A',
            storage: hardware.storageGb ? `${hardware.storageGb}GB` : 'N/A',
            bandwith: hardware.upMbps ? `${hardware.upMbps}Mbps` : 'N/A',
          },
        });
      });
    });
  });

  return rows;
}

// Get protocols for admin dashboard (simpler format)
export function getProtocolsForAdmin(protocols: FlexibleProtocol[]) {
  return protocols.map(p => ({
    id: p.id,
    name: p.name,
    website: p.website || '',
    isActive: p.isActive !== false, // Default to true if not specified
    createdAt: new Date().toISOString(), // Since we don't have real timestamps
  }));
}

// Clear cache when needed (useful for development)
export function clearCache() {
  clearProtocolsCache();
}

// Additional utility functions using the new submodule data
export async function getProtocolByIdFromSubmodule(id: string): Promise<FlexibleProtocol | null> {
  return await getProtocolById(id);
}

export async function getActiveProtocolsFromSubmodule(): Promise<FlexibleProtocol[]> {
  return await getActiveProtocols();
}

export async function getDataLastUpdated(): Promise<string> {
  try {
    return await getLastUpdated();
  } catch (error) {
    console.error('Error getting last updated timestamp:', error);
    return new Date().toISOString();
  }
}
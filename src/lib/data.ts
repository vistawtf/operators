// Replace this with your GitHub raw URL when ready
const DATA_URL = "/protocols.json"; // For now, serve from public folder
// const DATA_URL = "https://raw.githubusercontent.com/your-username/your-repo/main/protocols.json";

export interface Protocol {
  id: string;
  name: string;
  website: string;
  description: string;
  documentation: string;
  isActive: boolean;
  tags: string[];
  opportunities: Opportunity[];
}

export interface Opportunity {
  id: string;
  type: "prover" | "sequencer" | "validator" | "full_node" | "light_client";
  status: "mainnet" | "testnet" | "devnet";
  requirements: Requirement[];
}

export interface Requirement {
  tier: "recommended" | "minimum";
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

interface ProtocolsResponse {
  protocols: Protocol[];
  lastUpdated: string;
}

// Cache the data for the session
let cachedData: ProtocolsResponse | null = null;

export async function fetchProtocols(): Promise<Protocol[]> {
  if (cachedData) {
    return cachedData.protocols;
  }

  try {
    const response = await fetch(DATA_URL, {
      // Add cache headers for GitHub hosting
      headers: {
        'Cache-Control': 'max-age=300', // 5 minutes
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch protocols: ${response.status}`);
    }
    
    cachedData = await response.json();
    return cachedData!.protocols;
  } catch (error) {
    console.error('Error fetching protocols:', error);
    return [];
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

export function transformToTableRows(protocols: Protocol[]): TableRow[] {
  const rows: TableRow[] = [];

  protocols.forEach(protocol => {
    protocol.opportunities.forEach(opportunity => {
      opportunity.requirements.forEach(requirement => {
        // Generate entry condition text
        const entryCondition = requirement.entry === "permissionless" 
          ? requirement.hardware.notes?.includes("stake") 
            ? "STAKE REQUIRED" 
            : "NO STAKE"
          : requirement.tier === "recommended" 
            ? "TOP 200 STAKE" 
            : "PERMISSIONED";

        rows.push({
          id: `${protocol.id}-${opportunity.id}-${requirement.tier}-${requirement.entry}`,
          project: {
            icon: null, // Will be set in component
            name: protocol.name,
            url: protocol.website.replace("https://", ""),
            protocolId: protocol.id, // Add this for icon mapping
          },
          category: protocol.tags,
          status: opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1),
          entry: {
            type: requirement.entry.charAt(0).toUpperCase() + requirement.entry.slice(1),
            condition: entryCondition,
          },
          hardware: {
            cpu: `${requirement.hardware.cpuCores} cores`,
            ram: `${requirement.hardware.ramGb}GB`,
            storage: `${requirement.hardware.storageGb}GB`,
            bandwith: `${requirement.hardware.upMbps}Mbps`,
          },
        });
      });
    });
  });

  return rows;
}

// Get protocols for admin dashboard (simpler format)
export function getProtocolsForAdmin(protocols: Protocol[]) {
  return protocols.map(p => ({
    id: p.id,
    name: p.name,
    website: p.website,
    isActive: p.isActive,
    createdAt: new Date().toISOString(), // Since we don't have real timestamps
  }));
}

// Clear cache when needed (useful for development)
export function clearCache() {
  cachedData = null;
}

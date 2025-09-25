import type { ProtocolsData, FlexibleProtocolsData, AnyProtocolsData, Protocol, FlexibleProtocol } from './types';

/**
 * GitHub raw URL for the protocols data file
 */
const PROTOCOLS_DATA_URL = 'https://raw.githubusercontent.com/vistawtf/operators/main/protocols.json';

/**
 * Cache for protocols data to avoid repeated API calls
 */
let protocolsCache: AnyProtocolsData | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches and parses the protocols.json file from GitHub
 */
export async function readProtocolsData(): Promise<AnyProtocolsData> {
  try {
    // Check cache validity
    const now = Date.now();
    if (protocolsCache && (now - cacheTimestamp) < CACHE_TTL) {
      return protocolsCache;
    }

    const response = await fetch(PROTOCOLS_DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch protocols data: ${response.status}`);
    }

    const fileContent = await response.text();
    const data = JSON.parse(fileContent) as AnyProtocolsData;

    // Validate basic structure
    if (!data.protocols || !Array.isArray(data.protocols)) {
      throw new Error('Invalid protocols data structure: missing protocols array');
    }

    if (!data.lastUpdated) {
      throw new Error('Invalid protocols data structure: missing lastUpdated field');
    }

    // Update cache
    protocolsCache = data;
    cacheTimestamp = now;

    return data;
  } catch (error) {
    console.error('Error reading protocols data:', error);
    throw new Error(`Failed to load protocols data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all protocols
 */
export async function getAllProtocols(): Promise<FlexibleProtocol[]> {
  const data = await readProtocolsData();
  return data.protocols;
}

/**
 * Get a specific protocol by ID
 */
export async function getProtocolById(id: string): Promise<FlexibleProtocol | null> {
  const protocols = await getAllProtocols();
  return protocols.find(protocol => protocol.id === id) || null;
}

/**
 * Get protocols filtered by tags
 */
export async function getProtocolsByTag(tag: string): Promise<FlexibleProtocol[]> {
  const protocols = await getAllProtocols();
  return protocols.filter(protocol =>
    protocol.tags && protocol.tags.includes(tag)
  );
}

/**
 * Get protocols filtered by operator type
 */
export async function getProtocolsByOperatorType(type: string): Promise<FlexibleProtocol[]> {
  const protocols = await getAllProtocols();
  return protocols.filter(protocol =>
    protocol.opportunities &&
    protocol.opportunities.some((opp: any) => opp.type === type)
  );
}

/**
 * Get protocols filtered by status
 */
export async function getProtocolsByStatus(status: string): Promise<FlexibleProtocol[]> {
  const protocols = await getAllProtocols();
  return protocols.filter(protocol =>
    protocol.opportunities &&
    protocol.opportunities.some((opp: any) => opp.status === status)
  );
}

/**
 * Get only active protocols
 */
export async function getActiveProtocols(): Promise<FlexibleProtocol[]> {
  const protocols = await getAllProtocols();
  return protocols.filter(protocol => protocol.isActive === true);
}

/**
 * Get protocol statistics
 */
export async function getProtocolStats() {
  const protocols = await getAllProtocols();

  const stats = {
    total: protocols.length,
    active: protocols.filter(p => p.isActive).length,
    byStatus: {} as Record<string, number>,
    byType: {} as Record<string, number>,
    byTags: {} as Record<string, number>,
  };

  protocols.forEach(protocol => {
    // Count by opportunity status
    if (protocol.opportunities) {
      protocol.opportunities.forEach((opp: any) => {
        if (opp.status) {
          stats.byStatus[opp.status] = (stats.byStatus[opp.status] || 0) + 1;
        }
        if (opp.type) {
          stats.byType[opp.type] = (stats.byType[opp.type] || 0) + 1;
        }
      });
    }

    // Count by tags
    if (protocol.tags) {
      protocol.tags.forEach(tag => {
        stats.byTags[tag] = (stats.byTags[tag] || 0) + 1;
      });
    }
  });

  return stats;
}

/**
 * Get the last updated timestamp
 */
export async function getLastUpdated(): Promise<string> {
  const data = await readProtocolsData();
  return data.lastUpdated;
}

/**
 * Clear the protocols cache (useful for development)
 */
export function clearProtocolsCache(): void {
  protocolsCache = null;
  cacheTimestamp = 0;
}

/**
 * Validate if a protocol has the minimum required fields
 */
export function isValidProtocol(protocol: any): protocol is FlexibleProtocol {
  return (
    typeof protocol === 'object' &&
    protocol !== null &&
    typeof protocol.id === 'string' &&
    typeof protocol.name === 'string' &&
    typeof protocol.description === 'string'
  );
}

/**
 * Search protocols by query string (searches name, description, tags)
 */
export async function searchProtocols(query: string): Promise<FlexibleProtocol[]> {
  if (!query.trim()) {
    return await getAllProtocols();
  }

  const protocols = await getAllProtocols();
  const searchTerm = query.toLowerCase().trim();

  return protocols.filter(protocol => {
    const searchableText = [
      protocol.name,
      protocol.description,
      ...(protocol.tags || [])
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}
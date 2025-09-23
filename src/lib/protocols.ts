import { readFileSync } from 'fs';
import { join } from 'path';
import type { ProtocolsData, FlexibleProtocolsData, AnyProtocolsData, Protocol, FlexibleProtocol } from './types';

/**
 * Path to the protocols data file from the git submodule
 */
const PROTOCOLS_DATA_PATH = join(process.cwd(), 'data', 'operators', 'protocols.json');

/**
 * Cache for protocols data to avoid repeated file reads
 */
let protocolsCache: AnyProtocolsData | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Reads and parses the protocols.json file from the submodule
 */
export function readProtocolsData(): AnyProtocolsData {
  try {
    // Check cache validity
    const now = Date.now();
    if (protocolsCache && (now - cacheTimestamp) < CACHE_TTL) {
      return protocolsCache;
    }

    const fileContent = readFileSync(PROTOCOLS_DATA_PATH, 'utf-8');
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
export function getAllProtocols(): FlexibleProtocol[] {
  const data = readProtocolsData();
  return data.protocols;
}

/**
 * Get a specific protocol by ID
 */
export function getProtocolById(id: string): FlexibleProtocol | null {
  const protocols = getAllProtocols();
  return protocols.find(protocol => protocol.id === id) || null;
}

/**
 * Get protocols filtered by tags
 */
export function getProtocolsByTag(tag: string): FlexibleProtocol[] {
  const protocols = getAllProtocols();
  return protocols.filter(protocol =>
    protocol.tags && protocol.tags.includes(tag)
  );
}

/**
 * Get protocols filtered by operator type
 */
export function getProtocolsByOperatorType(type: string): FlexibleProtocol[] {
  const protocols = getAllProtocols();
  return protocols.filter(protocol =>
    protocol.opportunities &&
    protocol.opportunities.some((opp: any) => opp.type === type)
  );
}

/**
 * Get protocols filtered by status
 */
export function getProtocolsByStatus(status: string): FlexibleProtocol[] {
  const protocols = getAllProtocols();
  return protocols.filter(protocol =>
    protocol.opportunities &&
    protocol.opportunities.some((opp: any) => opp.status === status)
  );
}

/**
 * Get only active protocols
 */
export function getActiveProtocols(): FlexibleProtocol[] {
  const protocols = getAllProtocols();
  return protocols.filter(protocol => protocol.isActive === true);
}

/**
 * Get protocol statistics
 */
export function getProtocolStats() {
  const protocols = getAllProtocols();

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
export function getLastUpdated(): string {
  const data = readProtocolsData();
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
export function searchProtocols(query: string): FlexibleProtocol[] {
  if (!query.trim()) {
    return getAllProtocols();
  }

  const protocols = getAllProtocols();
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
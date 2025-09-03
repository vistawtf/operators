import { readFileSync } from 'fs';
import { join } from 'path';
import { Protocol } from './data';

interface ProtocolsResponse {
  protocols: Protocol[];
  lastUpdated: string;
}

// Server-side data fetching for build time
export async function fetchProtocolsServer(): Promise<Protocol[]> {
  try {
    // Read file directly from the file system
    const filePath = join(process.cwd(), 'public', 'protocols.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data: ProtocolsResponse = JSON.parse(fileContents);
    return data.protocols;
  } catch (error) {
    console.error('Error reading protocols file:', error);
    return [];
  }
}

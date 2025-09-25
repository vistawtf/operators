// Server-side data fetching updated to use git submodule
import { getAllProtocols } from './protocols';
import type { FlexibleProtocol } from './types';

// Server-side data fetching for build time using submodule
export async function fetchProtocolsServer(): Promise<FlexibleProtocol[]> {
  try {
    // Read data directly from the git submodule
    const protocols = getAllProtocols();
    return protocols;
  } catch (error) {
    console.error('Error reading protocols from submodule:', error);

    // Fallback: try to read from public folder for backward compatibility
    try {
      const { readFileSync } = await import('fs');
      const { join } = await import('path');

      const filePath = join(process.cwd(), 'public', 'protocols.json');
      const fileContents = readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      return data.protocols || [];
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return [];
    }
  }
}

// Get a specific protocol by ID (server-side)
export async function fetchProtocolByIdServer(id: string): Promise<FlexibleProtocol | null> {
  try {
    const protocols = await fetchProtocolsServer();
    return protocols.find(protocol => protocol.id === id) || null;
  } catch (error) {
    console.error('Error fetching protocol by ID:', error);
    return null;
  }
}

// Export for backward compatibility
export type Protocol = FlexibleProtocol;
import { NextRequest, NextResponse } from 'next/server';
import { readProtocolsData } from '@/lib/protocols';

export const dynamic = 'force-static';
export const revalidate = 300; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    // Read data from the git submodule
    const data = await readProtocolsData();

    // Set cache headers for better performance
    const response = NextResponse.json(data);

    // Cache for 5 minutes to reduce file reads
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('Error reading protocols data:', error);

    // Return error response
    return NextResponse.json(
      {
        error: 'Failed to load protocols data',
        message: error instanceof Error ? error.message : 'Unknown error',
        protocols: [],
        lastUpdated: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Optional: Add other HTTP methods if needed
export async function POST(request: NextRequest) {
  // For future use - could handle data refresh requests
  return NextResponse.json({ message: 'Method not implemented' }, { status: 501 });
}
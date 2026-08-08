// ============================================================================
// AgentOS — AI Agent API Route
// POST endpoint for AI agent queries.
// ============================================================================

import { NextResponse } from 'next/server';
import { processAgentQuery } from '@/lib/ai/agent';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const result = await processAgentQuery(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Agent Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

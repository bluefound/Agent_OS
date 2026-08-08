// ============================================================================
// AgentOS — AI Agent Service
//
// Abstraction layer for the AI agent. Currently uses keyword matching and
// deterministic tool routing. Structured so an OpenAI API call (with function
// calling / structured output) can replace the mock logic without changing
// the response shape or the UI.
// ============================================================================

import type { AgentMessage, AgentToolCall, AgentAction, AgentResponse } from './types';
import { executeAgentTool } from './tools';

// --- Query routing ---
// Maps user intent keywords to tool sequences

interface QueryRoute {
  keywords: string[];
  tools: Array<{ tool: AgentToolCall['tool']; label: string; args?: Record<string, string> }>;
  responseTemplate: (results: Record<string, unknown>) => {
    content: string;
    actions?: AgentAction[];
    sources?: string[];
    recommendations?: string[];
  };
}

const QUERY_ROUTES: QueryRoute[] = [
  {
    keywords: ['find clubs', 'clubs in', 'destinations for', 'transfer for', 'where should'],
    tools: [
      { tool: 'searchPlayers', label: 'Searching player database...' },
      { tool: 'searchClubs', label: 'Scanning club network...' },
      { tool: 'findTransferOpportunities', label: 'Ranking opportunities...' },
    ],
    responseTemplate: (results) => ({
      content: `I've analysed potential destinations based on position fit, age profile, competition level, recruitment history, and squad needs. Here are the strongest matches from our club network.`,
      actions: [{ type: 'view_opportunities', label: 'View All Opportunities', data: results.opportunities }],
      sources: ['Player Database', 'Club Network', 'Transfer Intelligence Engine'],
      recommendations: [
        'Prioritise clubs with the highest match scores for initial outreach',
        'Prepare a transfer brief for the top 3 clubs',
        'Schedule calls with sporting directors at matching clubs',
      ],
    }),
  },
  {
    keywords: ['contracts expiring', 'contract expir', 'running out', 'end of contract'],
    tools: [
      { tool: 'searchPlayers', label: 'Searching player database...' },
    ],
    responseTemplate: () => ({
      content: `I've identified players with contracts expiring within the next 12 months. These require immediate attention for renewal negotiations or transfer planning.`,
      actions: [{ type: 'view_player', label: 'View Player Details' }],
      sources: ['Player Database', 'Contract Records'],
      recommendations: [
        'Begin renewal discussions with players whose contracts expire within 6 months',
        'Explore transfer opportunities for players open to moving',
        'Review market valuations for expiring-contract players',
      ],
    }),
  },
  {
    keywords: ['commercial', 'brand', 'endorsement', 'sponsorship'],
    tools: [
      { tool: 'searchPlayers', label: 'Searching player database...' },
    ],
    responseTemplate: () => ({
      content: `Here's an overview of the strongest commercial opportunities across your portfolio. I've ranked them by match score and potential value.`,
      actions: [{ type: 'view_player', label: 'View Commercial Details' }],
      sources: ['Player Database', 'Commercial Pipeline'],
      recommendations: [
        'Focus on high-match-score opportunities with approaching deadlines',
        'Explore cross-promotion opportunities between players at the same club',
        'Schedule brand meetings for top prospects',
      ],
    }),
  },
  {
    keywords: ['transfer brief', 'prepare brief', 'dossier', 'report for'],
    tools: [
      { tool: 'getPlayer', label: 'Retrieving player profile...' },
      { tool: 'getPlayerStatistics', label: 'Analysing statistics...' },
      { tool: 'searchClubs', label: 'Scanning club network...' },
      { tool: 'findTransferOpportunities', label: 'Ranking opportunities...' },
      { tool: 'generateTransferBrief', label: 'Generating transfer brief...' },
    ],
    responseTemplate: (results) => ({
      content: `Transfer brief prepared. I've compiled the player's full profile, performance data, market analysis, and top club recommendations into a structured report.`,
      actions: [
        { type: 'transfer_brief', label: 'Open Brief', data: results.brief },
        { type: 'view_opportunities', label: 'View Opportunities', data: results.opportunities },
      ],
      sources: ['Player Database', 'Statistics Engine', 'Club Network', 'Transfer Intelligence'],
      recommendations: [
        'Review the brief and share with relevant club contacts',
        'Consider timing: mid-season vs. summer window approach',
        'Prepare video highlights to accompany the brief',
      ],
    }),
  },
  {
    keywords: ['african defenders', 'signed african', 'african players'],
    tools: [
      { tool: 'searchClubs', label: 'Scanning club network...' },
      { tool: 'searchPlayers', label: 'Searching player database...' },
    ],
    responseTemplate: () => ({
      content: `I've identified clubs across Scandinavia with a track record of signing African defenders. These clubs have established recruitment pipelines in West and East Africa.`,
      sources: ['Club Network', 'Transfer History'],
      recommendations: [
        'Focus outreach on clubs with highest nationality-match scores',
        'Leverage existing relationships at clubs that have signed our players before',
        'Prepare player profiles tailored to each club\'s tactical system',
      ],
    }),
  },
];

// --- Default fallback route ---
const DEFAULT_ROUTE: QueryRoute = {
  keywords: [],
  tools: [
    { tool: 'searchPlayers', label: 'Searching player database...' },
    { tool: 'searchClubs', label: 'Scanning club network...' },
  ],
  responseTemplate: () => ({
    content: `I've searched across our player portfolio and club network. Here's what I found based on your query.`,
    sources: ['Player Database', 'Club Network'],
    recommendations: [
      'Try asking about specific players, clubs, or transfer opportunities',
      'Use filters to narrow down results by position, nationality, or league',
    ],
  }),
};

function findRoute(query: string): QueryRoute {
  const q = query.toLowerCase();
  return QUERY_ROUTES.find(route =>
    route.keywords.some(kw => q.includes(kw))
  ) || DEFAULT_ROUTE;
}

function extractPlayerName(query: string): string | null {
  // Simple extraction — look for capitalized names in the query
  const namePatterns = [
    /for\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/,
    /about\s+([A-Z][a-z]+\s+[A-Z][a-z]+)/,
    /([A-Z][a-z]+\s+[A-Z][a-z]+)(?:'s|\s+transfer|\s+brief|\s+dossier)/,
  ];
  for (const pattern of namePatterns) {
    const match = query.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Process a user query through the AI agent.
 *
 * In production, this function would:
 * 1. Send the query to OpenAI with function definitions
 * 2. Execute tool calls as requested by the model
 * 3. Return the structured response
 *
 * Currently uses keyword matching for deterministic demo behaviour.
 */
export async function processAgentQuery(query: string): Promise<AgentResponse> {
  const route = findRoute(query);
  const conversationId = `conv-${Date.now()}`;
  const playerName = extractPlayerName(query);

  // Build tool calls
  const toolCalls: AgentToolCall[] = route.tools.map((t, i) => ({
    id: `tc-${Date.now()}-${i}`,
    tool: t.tool,
    label: t.label,
    status: 'completed' as const,
    result: null,
  }));

  // Execute tools and collect results
  const results: Record<string, unknown> = {};

  for (const tc of toolCalls) {
    const result = await executeAgentTool(tc.tool, {
      query,
      playerName: playerName || undefined,
    });
    tc.result = result;
    results[tc.tool] = result;
  }

  // Generate response from template
  const response = route.responseTemplate(results);

  const message: AgentMessage = {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: response.content,
    timestamp: new Date().toISOString(),
    toolCalls,
    actions: response.actions,
    sources: response.sources,
    recommendations: response.recommendations,
  };

  return { message, conversationId };
}

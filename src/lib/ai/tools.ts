// ============================================================================
// AgentOS — AI Tool Handlers
// Implementations of tool functions available to the AI Agent abstraction layer.
// ============================================================================

import {
  getPlayers,
  getPlayerById,
  searchPlayers as dbSearchPlayers,
  getClubs,
  getClubById,
  searchClubs as dbSearchClubs,
  getPlayerStatistics,
  getPlayerCareer,
  getPlayerCommercial,
  getPlayerDocuments,
} from '../db';
import { findOpportunitiesForPlayer } from '../matching';
import type { AgentToolName, Player } from '../types';

export async function executeAgentTool(
  tool: AgentToolName,
  params: { query?: string; playerName?: string; playerId?: string; clubId?: string }
): Promise<unknown> {
  switch (tool) {
    case 'searchPlayers': {
      const q = params.playerName || params.query || '';
      return await dbSearchPlayers(q);
    }

    case 'getPlayer': {
      if (params.playerId) {
        return await getPlayerById(params.playerId);
      }
      if (params.playerName) {
        const found = await dbSearchPlayers(params.playerName);
        return found[0] || null;
      }
      const all = await getPlayers();
      return all[0] || null;
    }

    case 'searchClubs': {
      const q = params.query || '';
      return await dbSearchClubs(q);
    }

    case 'getClub': {
      if (params.clubId) {
        return await getClubById(params.clubId);
      }
      const all = await getClubs();
      return all[0] || null;
    }

    case 'findTransferOpportunities': {
      let targetPlayer: Player | undefined;

      if (params.playerId) {
        targetPlayer = await getPlayerById(params.playerId);
      } else if (params.playerName) {
        const found = await dbSearchPlayers(params.playerName);
        targetPlayer = found[0];
      }

      if (!targetPlayer) {
        const allPlayers = await getPlayers();
        targetPlayer = allPlayers[0]; // Fallback to Samuel Adeyemi
      }

      if (!targetPlayer) return [];

      const allClubs = await getClubs();
      return findOpportunitiesForPlayer(targetPlayer, allClubs);
    }

    case 'getPlayerStatistics': {
      const playerId = params.playerId || 'p-001';
      return await getPlayerStatistics(playerId);
    }

    case 'generateTransferBrief': {
      let targetPlayer: Player | undefined;

      if (params.playerId) {
        targetPlayer = await getPlayerById(params.playerId);
      } else if (params.playerName) {
        const found = await dbSearchPlayers(params.playerName);
        targetPlayer = found[0];
      }

      if (!targetPlayer) {
        const allPlayers = await getPlayers();
        targetPlayer = allPlayers[0];
      }

      if (!targetPlayer) return null;

      const [stats, career, docs, commercial, allClubs] = await Promise.all([
        getPlayerStatistics(targetPlayer.id),
        getPlayerCareer(targetPlayer.id),
        getPlayerDocuments(targetPlayer.id),
        getPlayerCommercial(targetPlayer.id),
        getClubs(),
      ]);

      const opportunities = findOpportunitiesForPlayer(targetPlayer, allClubs);

      return {
        player: targetPlayer,
        statistics: stats,
        career,
        documents: docs,
        commercial,
        topOpportunities: opportunities.slice(0, 5),
        generatedAt: new Date().toISOString(),
      };
    }

    default:
      return null;
  }
}

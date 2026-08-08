// ============================================================================
// AgentOS — Data Access Layer
// All data access functions are centralized here. Currently reads from local
// mock arrays. Each function can be swapped to a Supabase query later
// without touching frontend callers.
// ============================================================================

import { players } from './data/players';
import { clubs } from './data/clubs';
import { playerStatistics, monthlyStatistics } from './data/statistics';
import { careers } from './data/careers';
import { documents } from './data/documents';
import { commercialOpportunities } from './data/commercial';
import type {
  Player, Club, PlayerStatistic, MonthlyStatistic,
  CareerEntry, PlayerDocument, CommercialOpportunity,
  Position, MarketStatus, ContractStatus,
} from './types';

// --- Players ---

export async function getPlayers(filters?: {
  search?: string;
  position?: Position;
  country?: string;
  contractStatus?: ContractStatus;
  marketStatus?: MarketStatus;
}): Promise<Player[]> {
  let result = [...players];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      p.currentClub.toLowerCase().includes(q) ||
      p.nationality.toLowerCase().includes(q)
    );
  }
  if (filters?.position) {
    result = result.filter(p => p.position === filters.position || p.secondaryPosition === filters.position);
  }
  if (filters?.country) {
    result = result.filter(p => p.nationality === filters.country);
  }
  if (filters?.contractStatus) {
    result = result.filter(p => p.contractStatus === filters.contractStatus);
  }
  if (filters?.marketStatus) {
    result = result.filter(p => p.marketStatus === filters.marketStatus);
  }

  return result;
}

export async function getPlayerById(id: string): Promise<Player | undefined> {
  return players.find(p => p.id === id);
}

export async function searchPlayers(query: string): Promise<Player[]> {
  const q = query.toLowerCase();
  return players.filter(p =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
    p.currentClub.toLowerCase().includes(q) ||
    p.nationality.toLowerCase().includes(q) ||
    p.position.toLowerCase().includes(q)
  );
}

// --- Clubs ---

export async function getClubs(): Promise<Club[]> {
  return [...clubs];
}

export async function getClubById(id: string): Promise<Club | undefined> {
  return clubs.find(c => c.id === id);
}

export async function searchClubs(query: string): Promise<Club[]> {
  const q = query.toLowerCase();
  return clubs.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q) ||
    c.league.toLowerCase().includes(q)
  );
}

// --- Statistics ---

export async function getPlayerStatistics(playerId: string): Promise<PlayerStatistic | undefined> {
  return playerStatistics.find(s => s.playerId === playerId);
}

export async function getPlayerMonthlyStats(playerId: string): Promise<MonthlyStatistic[]> {
  return monthlyStatistics.filter(s => s.playerId === playerId);
}

// --- Career ---

export async function getPlayerCareer(playerId: string): Promise<CareerEntry[]> {
  return careers.filter(c => c.playerId === playerId).sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
  );
}

// --- Documents ---

export async function getPlayerDocuments(playerId: string): Promise<PlayerDocument[]> {
  return documents.filter(d => d.playerId === playerId);
}

// --- Commercial ---

export async function getPlayerCommercial(playerId: string): Promise<CommercialOpportunity[]> {
  return commercialOpportunities.filter(c => c.playerId === playerId);
}

// --- Aggregate KPIs ---

export async function getDashboardKPIs() {
  const allPlayers = players;
  const totalPlayers = allPlayers.length;
  const activeOpportunities = allPlayers.filter(p =>
    p.marketStatus === 'Active' || p.marketStatus === 'Available'
  ).length;
  const contractsExpiring = allPlayers.filter(p =>
    p.contractStatus === 'Expiring'
  ).length;
  const commercialOps = commercialOpportunities.length;

  return {
    totalPlayers,
    activeOpportunities,
    contractsExpiring,
    commercialOpportunities: commercialOps,
  };
}

// --- Unique filter values ---

export async function getUniqueCountries(): Promise<string[]> {
  return [...new Set(players.map(p => p.nationality))].sort();
}

export async function getUniquePositions(): Promise<Position[]> {
  return [...new Set(players.map(p => p.position))].sort() as Position[];
}

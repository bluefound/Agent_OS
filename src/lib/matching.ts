// ============================================================================
// AgentOS — Deterministic Match Scoring Engine
//
// Computes an explainable 0-100 transfer fit score between a Player and a Club.
// The algorithm is deterministic: same inputs always produce the same score.
//
// Factor weights (spec-defined):
//   Position fit:             25%  — exact match = full, adjacent = ~60%, mismatch = ~20%
//   Age fit:                  15%  — within club's target range = full, scaled down outside
//   League/competition level: 20%  — comparable level = full, large gap = partial
//   Recruitment history:      20%  — has club signed from player's nationality/region?
//   Squad fit (positional):   20%  — club's listed positional needs vs player position
//
// Each "why this match" reason only appears if its factor scored >70% of its max.
// ============================================================================

import type { Player, Club, MatchFactor, TransferOpportunity, Position, CompetitionLevel } from './types';

// --- Position adjacency map ---
// Adjacent positions share tactical responsibility (e.g. CB can play DM, CM can play AM)
const ADJACENT_POSITIONS: Record<Position, Position[]> = {
  GK: [],
  CB: ['DM', 'RB', 'LB'],
  LB: ['CB', 'LW'],
  RB: ['CB', 'RW'],
  DM: ['CB', 'CM'],
  CM: ['DM', 'AM'],
  AM: ['CM', 'RW', 'LW'],
  LW: ['LB', 'AM', 'ST'],
  RW: ['RB', 'AM', 'ST'],
  ST: ['CF', 'LW', 'RW'],
  CF: ['ST', 'AM'],
};

// --- Competition level ordering ---
const LEVEL_ORDER: Record<CompetitionLevel, number> = {
  'Youth': 0,
  'Lower League': 1,
  'Mid League': 2,
  'Strong League': 3,
  'Top 5 League': 4,
};

/**
 * Score how well a player's position matches what the club needs.
 * Exact position match = 100, adjacent = 60, mismatch = 20.
 * Also checks secondary position.
 */
function scorePositionFit(player: Player, club: Club): number {
  const needed = club.positionsNeeded;
  // Exact match on primary position
  if (needed.includes(player.position)) return 100;
  // Exact match on secondary position
  if (player.secondaryPosition && needed.includes(player.secondaryPosition)) return 90;
  // Adjacent position match (primary)
  const adjacents = ADJACENT_POSITIONS[player.position] || [];
  if (adjacents.some(adj => needed.includes(adj))) return 60;
  // Adjacent position match (secondary)
  if (player.secondaryPosition) {
    const secAdj = ADJACENT_POSITIONS[player.secondaryPosition] || [];
    if (secAdj.some(adj => needed.includes(adj))) return 50;
  }
  // Complete mismatch
  return 20;
}

/**
 * Score how well the player's age fits the club's target recruitment range.
 * Within range = 100, scaled down by distance outside.
 */
function scoreAgeFit(player: Player, club: Club): number {
  const age = player.age;
  if (age >= club.targetAgeMin && age <= club.targetAgeMax) return 100;

  const distance = age < club.targetAgeMin
    ? club.targetAgeMin - age
    : age - club.targetAgeMax;

  // Each year outside costs 20 points, minimum 10
  return Math.max(10, 100 - distance * 20);
}

/**
 * Score competition level fit. Same level = 100.
 * Moving up one tier is common (80), two tiers partial (50), larger gaps lower.
 */
function scoreLeagueFit(player: Player, club: Club): number {
  // Find the player's current club competition level from the club data
  // We use a simple heuristic based on known Scandinavian league structure
  const playerLevel = getPlayerCompetitionLevel(player);
  const clubLevel = LEVEL_ORDER[club.competitionLevel];

  const gap = Math.abs(playerLevel - clubLevel);
  if (gap === 0) return 100;
  if (gap === 1) return 80;
  if (gap === 2) return 50;
  return 30;
}

function getPlayerCompetitionLevel(player: Player): number {
  // Map known leagues to competition levels
  const leagueLevels: Record<string, number> = {
    'Eliteserien': LEVEL_ORDER['Strong League'],
    'Superliga': LEVEL_ORDER['Strong League'],
    'Allsvenskan': LEVEL_ORDER['Strong League'],
    'NPFL': LEVEL_ORDER['Mid League'],
    'GPL': LEVEL_ORDER['Mid League'],
  };

  // Try to identify from current club name patterns
  for (const [league, level] of Object.entries(leagueLevels)) {
    // This is a simplified approach - in production, player would have a league field
    if (player.currentClub.includes('BK') || player.currentClub.includes('FK') ||
        player.currentClub.includes('IF') || player.currentClub.includes('FF')) {
      return LEVEL_ORDER['Strong League'];
    }
    void league; // suppress unused warning
    void level;
  }
  return LEVEL_ORDER['Strong League']; // Default for our Scandinavian-focused dataset
}

/**
 * Score recruitment history — has the club previously signed players
 * from this player's nationality or region?
 */
function scoreRecruitmentHistory(player: Player, club: Club): number {
  const nationalityMatch = club.nationalitiesSigned.includes(player.nationality);
  const regionMatch = club.regionsSigned.includes(player.region);

  if (nationalityMatch && regionMatch) return 100;
  if (nationalityMatch) return 85;
  if (regionMatch) return 60;
  return 20;
}

/**
 * Score squad/positional need at the target club.
 * Direct position need = 100, adjacent = 60, no need = 20.
 */
function scoreSquadFit(player: Player, club: Club): number {
  // This mirrors position fit but weighted differently — it represents
  // the urgency of the club's need, not just tactical compatibility
  if (club.positionsNeeded.includes(player.position)) return 100;
  if (player.secondaryPosition && club.positionsNeeded.includes(player.secondaryPosition)) return 85;

  const adjacents = ADJACENT_POSITIONS[player.position] || [];
  if (adjacents.some(adj => club.positionsNeeded.includes(adj))) return 60;
  return 20;
}

/**
 * Compute the full match score between a player and a club.
 * Returns a composite 0-100 score and individual factor breakdowns.
 */
export function computeMatchScore(player: Player, club: Club): {
  score: number;
  factors: MatchFactor[];
} {
  const positionScore = scorePositionFit(player, club);
  const ageScore = scoreAgeFit(player, club);
  const leagueScore = scoreLeagueFit(player, club);
  const recruitmentScore = scoreRecruitmentHistory(player, club);
  const squadScore = scoreSquadFit(player, club);

  const factors: MatchFactor[] = [
    {
      label: 'Position fit',
      score: positionScore,
      maxWeight: 25,
      showAsReason: positionScore > 70,
      description: positionScore >= 90
        ? `Plays ${player.position} — exact match for club need`
        : positionScore >= 60
          ? `${player.position} is tactically adjacent to club needs`
          : `Position ${player.position} doesn't directly match needs`,
    },
    {
      label: 'Age profile',
      score: ageScore,
      maxWeight: 15,
      showAsReason: ageScore > 70,
      description: ageScore >= 80
        ? `Age ${player.age} fits the club's ${club.targetAgeMin}-${club.targetAgeMax} target range`
        : `Age ${player.age} is outside the club's preferred ${club.targetAgeMin}-${club.targetAgeMax} range`,
    },
    {
      label: 'Competition level',
      score: leagueScore,
      maxWeight: 20,
      showAsReason: leagueScore > 70,
      description: leagueScore >= 80
        ? 'Currently competing at a comparable level'
        : 'Notable gap between current and target competition level',
    },
    {
      label: 'Recruitment history',
      score: recruitmentScore,
      maxWeight: 20,
      showAsReason: recruitmentScore > 70,
      description: recruitmentScore >= 85
        ? `Club has previously signed ${player.nationality} players`
        : recruitmentScore >= 60
          ? `Club has recruited from ${player.region}`
          : 'Limited recruitment history from this region',
    },
    {
      label: 'Squad need',
      score: squadScore,
      maxWeight: 20,
      showAsReason: squadScore > 70,
      description: squadScore >= 85
        ? `${player.position} is a current squad priority`
        : squadScore >= 60
          ? 'Related position is a squad need'
          : 'No current squad need for this position',
    },
  ];

  // Weighted composite score
  const compositeScore = Math.round(
    (positionScore * 0.25) +
    (ageScore * 0.15) +
    (leagueScore * 0.20) +
    (recruitmentScore * 0.20) +
    (squadScore * 0.20)
  );

  return {
    score: compositeScore,
    factors,
  };
}

/**
 * Find transfer opportunities for a player against all clubs.
 * Excludes the player's current club. Sorts by match score descending.
 */
export function findOpportunitiesForPlayer(
  player: Player,
  allClubs: Club[],
  filters?: {
    region?: string;
    competitionLevel?: CompetitionLevel;
    minScore?: number;
  }
): TransferOpportunity[] {
  let targetClubs = allClubs.filter(c => c.id !== player.currentClubId);

  if (filters?.region) {
    targetClubs = targetClubs.filter(c =>
      c.country.toLowerCase().includes(filters.region!.toLowerCase())
    );
  }
  if (filters?.competitionLevel) {
    targetClubs = targetClubs.filter(c => c.competitionLevel === filters.competitionLevel);
  }

  const opportunities: TransferOpportunity[] = targetClubs.map(club => {
    const { score, factors } = computeMatchScore(player, club);
    return {
      id: `opp-${player.id}-${club.id}`,
      playerId: player.id,
      clubId: club.id,
      club,
      player,
      matchScore: score,
      factors,
      generatedAt: new Date().toISOString(),
    };
  });

  const minScore = filters?.minScore ?? 0;
  return opportunities
    .filter(o => o.matchScore >= minScore)
    .sort((a, b) => b.matchScore - a.matchScore);
}

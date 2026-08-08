// ============================================================================
// AgentOS — Mock Statistics Data
// Fictional performance data for demo players.
// ============================================================================

import { PlayerStatistic, MonthlyStatistic } from '../types';

export const playerStatistics: PlayerStatistic[] = [
  {
    playerId: 'p-001', season: '2025/26',
    appearances: 28, minutes: 2380, goals: 3, assists: 2,
    tacklesPct: 78, duelsWonPct: 72, passAccuracy: 88, aerialWonPct: 74,
    cleanSheets: 12, interceptions: 67,
  },
  {
    playerId: 'p-002', season: '2025/26',
    appearances: 31, minutes: 2650, goals: 7, assists: 9,
    tacklesPct: 68, duelsWonPct: 64, passAccuracy: 91, aerialWonPct: 52,
  },
  {
    playerId: 'p-003', season: '2025/26',
    appearances: 26, minutes: 2100, goals: 11, assists: 7,
    tacklesPct: 42, duelsWonPct: 56, passAccuracy: 82, aerialWonPct: 38,
  },
  {
    playerId: 'p-004', season: '2025/26',
    appearances: 24, minutes: 1920, goals: 1, assists: 4,
    tacklesPct: 82, duelsWonPct: 71, passAccuracy: 89, aerialWonPct: 58,
    interceptions: 72,
  },
  {
    playerId: 'p-005', season: '2025/26',
    appearances: 30, minutes: 2580, goals: 16, assists: 5,
    tacklesPct: 35, duelsWonPct: 58, passAccuracy: 78, aerialWonPct: 62,
  },
  {
    playerId: 'p-006', season: '2025/26',
    appearances: 27, minutes: 2340, goals: 1, assists: 6,
    tacklesPct: 75, duelsWonPct: 68, passAccuracy: 85, aerialWonPct: 48,
    cleanSheets: 9,
  },
  {
    playerId: 'p-007', season: '2025/26',
    appearances: 29, minutes: 2410, goals: 8, assists: 11,
    tacklesPct: 45, duelsWonPct: 52, passAccuracy: 87, aerialWonPct: 42,
  },
  {
    playerId: 'p-008', season: '2025/26',
    appearances: 22, minutes: 1980, goals: 0, assists: 0,
    tacklesPct: 0, duelsWonPct: 0, passAccuracy: 72, aerialWonPct: 0,
    cleanSheets: 8,
  },
  {
    playerId: 'p-009', season: '2025/26',
    appearances: 25, minutes: 2150, goals: 2, assists: 5,
    tacklesPct: 72, duelsWonPct: 65, passAccuracy: 83, aerialWonPct: 55,
  },
  {
    playerId: 'p-010', season: '2025/26',
    appearances: 23, minutes: 1870, goals: 9, assists: 6,
    tacklesPct: 38, duelsWonPct: 50, passAccuracy: 80, aerialWonPct: 35,
  },
  {
    playerId: 'p-011', season: '2025/26',
    appearances: 28, minutes: 2350, goals: 14, assists: 3,
    tacklesPct: 32, duelsWonPct: 54, passAccuracy: 76, aerialWonPct: 65,
  },
  {
    playerId: 'p-012', season: '2025/26',
    appearances: 20, minutes: 1680, goals: 1, assists: 1,
    tacklesPct: 76, duelsWonPct: 70, passAccuracy: 86, aerialWonPct: 72,
    cleanSheets: 7, interceptions: 54,
  },
];

export const monthlyStatistics: MonthlyStatistic[] = [
  // Samuel Adeyemi (p-001) — CB
  { playerId: 'p-001', month: 'Aug', appearances: 4, minutes: 360, goals: 0, assists: 0, rating: 7.1 },
  { playerId: 'p-001', month: 'Sep', appearances: 3, minutes: 270, goals: 1, assists: 0, rating: 7.3 },
  { playerId: 'p-001', month: 'Oct', appearances: 4, minutes: 340, goals: 0, assists: 1, rating: 7.0 },
  { playerId: 'p-001', month: 'Nov', appearances: 3, minutes: 270, goals: 1, assists: 0, rating: 7.4 },
  { playerId: 'p-001', month: 'Dec', appearances: 2, minutes: 180, goals: 0, assists: 0, rating: 6.8 },
  { playerId: 'p-001', month: 'Jan', appearances: 2, minutes: 160, goals: 0, assists: 0, rating: 7.0 },
  { playerId: 'p-001', month: 'Feb', appearances: 3, minutes: 250, goals: 0, assists: 1, rating: 7.2 },
  { playerId: 'p-001', month: 'Mar', appearances: 4, minutes: 310, goals: 1, assists: 0, rating: 7.5 },
  { playerId: 'p-001', month: 'Apr', appearances: 3, minutes: 240, goals: 0, assists: 0, rating: 7.1 },

  // Chinedu Okafor (p-002) — CM
  { playerId: 'p-002', month: 'Aug', appearances: 4, minutes: 350, goals: 1, assists: 1, rating: 7.2 },
  { playerId: 'p-002', month: 'Sep', appearances: 4, minutes: 340, goals: 1, assists: 2, rating: 7.6 },
  { playerId: 'p-002', month: 'Oct', appearances: 3, minutes: 270, goals: 0, assists: 1, rating: 7.0 },
  { playerId: 'p-002', month: 'Nov', appearances: 4, minutes: 320, goals: 2, assists: 1, rating: 7.8 },
  { playerId: 'p-002', month: 'Dec', appearances: 3, minutes: 250, goals: 0, assists: 1, rating: 7.1 },
  { playerId: 'p-002', month: 'Jan', appearances: 2, minutes: 170, goals: 0, assists: 0, rating: 6.9 },
  { playerId: 'p-002', month: 'Feb', appearances: 4, minutes: 330, goals: 1, assists: 1, rating: 7.3 },
  { playerId: 'p-002', month: 'Mar', appearances: 4, minutes: 340, goals: 1, assists: 1, rating: 7.5 },
  { playerId: 'p-002', month: 'Apr', appearances: 3, minutes: 280, goals: 1, assists: 1, rating: 7.4 },

  // Daniel Mensah (p-003) — RW
  { playerId: 'p-003', month: 'Aug', appearances: 3, minutes: 240, goals: 2, assists: 1, rating: 7.5 },
  { playerId: 'p-003', month: 'Sep', appearances: 3, minutes: 250, goals: 1, assists: 1, rating: 7.2 },
  { playerId: 'p-003', month: 'Oct', appearances: 4, minutes: 310, goals: 2, assists: 2, rating: 7.8 },
  { playerId: 'p-003', month: 'Nov', appearances: 3, minutes: 240, goals: 1, assists: 0, rating: 7.0 },
  { playerId: 'p-003', month: 'Dec', appearances: 2, minutes: 160, goals: 1, assists: 1, rating: 7.3 },
  { playerId: 'p-003', month: 'Jan', appearances: 2, minutes: 150, goals: 0, assists: 0, rating: 6.7 },
  { playerId: 'p-003', month: 'Feb', appearances: 3, minutes: 250, goals: 2, assists: 1, rating: 7.6 },
  { playerId: 'p-003', month: 'Mar', appearances: 3, minutes: 260, goals: 1, assists: 1, rating: 7.4 },
  { playerId: 'p-003', month: 'Apr', appearances: 3, minutes: 240, goals: 1, assists: 0, rating: 7.1 },

  // Kwame Asante (p-005) — ST
  { playerId: 'p-005', month: 'Aug', appearances: 4, minutes: 340, goals: 2, assists: 0, rating: 7.4 },
  { playerId: 'p-005', month: 'Sep', appearances: 4, minutes: 350, goals: 3, assists: 1, rating: 8.0 },
  { playerId: 'p-005', month: 'Oct', appearances: 3, minutes: 270, goals: 1, assists: 1, rating: 7.2 },
  { playerId: 'p-005', month: 'Nov', appearances: 4, minutes: 340, goals: 3, assists: 0, rating: 7.9 },
  { playerId: 'p-005', month: 'Dec', appearances: 3, minutes: 250, goals: 1, assists: 1, rating: 7.1 },
  { playerId: 'p-005', month: 'Jan', appearances: 2, minutes: 180, goals: 1, assists: 0, rating: 7.0 },
  { playerId: 'p-005', month: 'Feb', appearances: 3, minutes: 270, goals: 2, assists: 1, rating: 7.6 },
  { playerId: 'p-005', month: 'Mar', appearances: 4, minutes: 310, goals: 2, assists: 1, rating: 7.7 },
  { playerId: 'p-005', month: 'Apr', appearances: 3, minutes: 270, goals: 1, assists: 0, rating: 7.3 },
];

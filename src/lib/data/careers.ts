// ============================================================================
// AgentOS — Mock Career Data
// Fictional career timeline entries for demo players.
// ============================================================================

import { CareerEntry } from '../types';

export const careers: CareerEntry[] = [
  // Samuel Adeyemi (p-001)
  { playerId: 'p-001', club: 'Sunshine Stars FC', country: 'Nigeria', league: 'NPFL', dateFrom: '2021-01-01', dateTo: '2022-07-30', appearances: 34, goals: 2, transferType: 'Youth' },
  { playerId: 'p-001', club: 'FC Nordsjælland', country: 'Denmark', league: 'Superliga', dateFrom: '2022-08-01', dateTo: '2024-06-30', appearances: 48, goals: 3, transferType: 'Transfer' },
  { playerId: 'p-001', club: 'Rosenborg BK', country: 'Norway', league: 'Eliteserien', dateFrom: '2024-07-01', dateTo: null, appearances: 28, goals: 3, transferType: 'Current' },

  // Chinedu Okafor (p-002)
  { playerId: 'p-002', club: 'Enyimba FC', country: 'Nigeria', league: 'NPFL', dateFrom: '2020-06-01', dateTo: '2022-06-30', appearances: 45, goals: 8, transferType: 'Youth' },
  { playerId: 'p-002', club: 'FC Midtjylland', country: 'Denmark', league: 'Superliga', dateFrom: '2022-07-01', dateTo: null, appearances: 78, goals: 14, transferType: 'Current' },

  // Daniel Mensah (p-003)
  { playerId: 'p-003', club: 'Right to Dream Academy', country: 'Ghana', league: 'Academy', dateFrom: '2018-01-01', dateTo: '2020-12-31', appearances: 0, goals: 0, transferType: 'Youth' },
  { playerId: 'p-003', club: 'FC Nordsjælland', country: 'Denmark', league: 'Superliga', dateFrom: '2021-01-01', dateTo: '2023-06-30', appearances: 52, goals: 14, transferType: 'Transfer' },
  { playerId: 'p-003', club: 'Molde FK', country: 'Norway', league: 'Eliteserien', dateFrom: '2023-07-01', dateTo: null, appearances: 55, goals: 22, transferType: 'Current' },

  // Emmanuel Bello (p-004)
  { playerId: 'p-004', club: 'Kano Pillars FC', country: 'Nigeria', league: 'NPFL', dateFrom: '2022-01-01', dateTo: '2023-12-31', appearances: 38, goals: 2, transferType: 'Youth' },
  { playerId: 'p-004', club: 'IFK Göteborg', country: 'Sweden', league: 'Allsvenskan', dateFrom: '2024-01-01', dateTo: null, appearances: 42, goals: 3, transferType: 'Current' },

  // Kwame Asante (p-005)
  { playerId: 'p-005', club: 'Accra Hearts of Oak', country: 'Ghana', league: 'GPL', dateFrom: '2020-01-01', dateTo: '2022-06-30', appearances: 52, goals: 18, transferType: 'Youth' },
  { playerId: 'p-005', club: 'HB Køge', country: 'Denmark', league: '1. Division', dateFrom: '2022-07-01', dateTo: '2023-12-31', appearances: 30, goals: 12, transferType: 'Transfer' },
  { playerId: 'p-005', club: 'Brøndby IF', country: 'Denmark', league: 'Superliga', dateFrom: '2024-01-01', dateTo: null, appearances: 45, goals: 24, transferType: 'Current' },

  // Ibrahim Diallo (p-006)
  { playerId: 'p-006', club: 'ASC Jaraaf', country: 'Senegal', league: 'Ligue 1', dateFrom: '2019-01-01', dateTo: '2021-06-30', appearances: 55, goals: 3, transferType: 'Youth' },
  { playerId: 'p-006', club: 'IFK Norrköping', country: 'Sweden', league: 'Allsvenskan', dateFrom: '2021-07-01', dateTo: '2023-12-31', appearances: 48, goals: 2, transferType: 'Transfer' },
  { playerId: 'p-006', club: 'Malmö FF', country: 'Sweden', league: 'Allsvenskan', dateFrom: '2024-01-01', dateTo: null, appearances: 40, goals: 1, transferType: 'Current' },

  // Obinna Eze (p-007)
  { playerId: 'p-007', club: 'Rivers United FC', country: 'Nigeria', league: 'NPFL', dateFrom: '2021-01-01', dateTo: '2023-06-30', appearances: 42, goals: 10, transferType: 'Youth' },
  { playerId: 'p-007', club: 'FC Nordsjælland', country: 'Denmark', league: 'Superliga', dateFrom: '2023-07-01', dateTo: null, appearances: 56, goals: 15, transferType: 'Current' },

  // Yusuf Mohammed (p-008)
  { playerId: 'p-008', club: 'Plateau United', country: 'Nigeria', league: 'NPFL', dateFrom: '2020-01-01', dateTo: '2022-12-31', appearances: 58, goals: 0, transferType: 'Youth' },
  { playerId: 'p-008', club: 'FK Bodø/Glimt', country: 'Norway', league: 'Eliteserien', dateFrom: '2023-01-01', dateTo: null, appearances: 44, goals: 0, transferType: 'Current' },

  // Moussa Kamara (p-009)
  { playerId: 'p-009', club: 'FC Kallon', country: 'Sierra Leone', league: 'SLPL', dateFrom: '2019-06-01', dateTo: '2022-06-30', appearances: 62, goals: 5, transferType: 'Youth' },
  { playerId: 'p-009', club: 'AIK Stockholm', country: 'Sweden', league: 'Allsvenskan', dateFrom: '2022-07-01', dateTo: null, appearances: 55, goals: 4, transferType: 'Current' },

  // Taiwo Akinola (p-010)
  { playerId: 'p-010', club: 'MFM FC', country: 'Nigeria', league: 'NPFL', dateFrom: '2022-01-01', dateTo: '2024-06-30', appearances: 40, goals: 12, transferType: 'Youth' },
  { playerId: 'p-010', club: 'Hammarby IF', country: 'Sweden', league: 'Allsvenskan', dateFrom: '2024-07-01', dateTo: null, appearances: 28, goals: 11, transferType: 'Current' },

  // Kofi Owusu (p-011)
  { playerId: 'p-011', club: 'Asante Kotoko', country: 'Ghana', league: 'GPL', dateFrom: '2019-01-01', dateTo: '2021-12-31', appearances: 60, goals: 22, transferType: 'Youth' },
  { playerId: 'p-011', club: 'Vålerenga Fotball', country: 'Norway', league: 'Eliteserien', dateFrom: '2022-01-01', dateTo: '2024-06-30', appearances: 50, goals: 18, transferType: 'Transfer' },
  { playerId: 'p-011', club: 'Stabæk Fotball', country: 'Norway', league: 'Eliteserien', dateFrom: '2024-07-01', dateTo: null, appearances: 28, goals: 14, transferType: 'Current' },

  // Adama Traoré (p-012)
  { playerId: 'p-012', club: 'Stade Malien', country: 'Mali', league: 'Première Division', dateFrom: '2020-01-01', dateTo: '2022-12-31', appearances: 48, goals: 3, transferType: 'Youth' },
  { playerId: 'p-012', club: 'Djurgårdens IF', country: 'Sweden', league: 'Allsvenskan', dateFrom: '2023-01-01', dateTo: null, appearances: 45, goals: 2, transferType: 'Current' },
];

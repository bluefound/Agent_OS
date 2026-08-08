// ============================================================================
// AgentOS — Mock Commercial Data
// Fictional commercial opportunities for demo players.
// ============================================================================

import { CommercialOpportunity } from '../types';

export const commercialOpportunities: CommercialOpportunity[] = [
  // Samuel Adeyemi (p-001)
  { id: 'co-001', playerId: 'p-001', brand: 'Nike Football', type: 'Endorsement', matchScore: 78, status: 'Negotiating', value: 120000, description: 'Boot endorsement deal for emerging African defenders in Scandinavia.', deadline: '2026-03-31' },
  { id: 'co-002', playerId: 'p-001', brand: 'Gatorade Nigeria', type: 'Brand Partnership', matchScore: 85, status: 'Proposed', value: 45000, description: 'Regional brand ambassador for West Africa youth sports campaign.', deadline: '2026-06-30' },

  // Chinedu Okafor (p-002)
  { id: 'co-003', playerId: 'p-002', brand: 'Adidas', type: 'Endorsement', matchScore: 82, status: 'Active', value: 95000, description: 'Predator boot ambassador — Nordic region young midfielders.', deadline: '2027-06-30' },
  { id: 'co-004', playerId: 'p-002', brand: 'Beats by Dre', type: 'Social Media', matchScore: 71, status: 'Proposed', value: 30000, description: 'Social media campaign featuring match-day routines.' },

  // Daniel Mensah (p-003)
  { id: 'co-005', playerId: 'p-003', brand: 'PUMA', type: 'Endorsement', matchScore: 76, status: 'Negotiating', value: 80000, description: 'Speed boot range — fast wingers across Scandinavian leagues.' },

  // Kwame Asante (p-005)
  { id: 'co-006', playerId: 'p-005', brand: 'New Balance', type: 'Endorsement', matchScore: 88, status: 'Active', value: 150000, description: 'Lead striker endorsement for the NB Furon range in Scandinavia.', deadline: '2027-12-31' },
  { id: 'co-007', playerId: 'p-005', brand: 'Hisense', type: 'Brand Partnership', matchScore: 73, status: 'Proposed', value: 60000, description: 'TV and electronics brand ambassador — Ghanaian footballers abroad.' },
  { id: 'co-008', playerId: 'p-005', brand: 'EA Sports FC', type: 'Licensing', matchScore: 91, status: 'Active', value: 25000, description: 'Featured player likeness in EA Sports FC game franchise.' },

  // Obinna Eze (p-007)
  { id: 'co-009', playerId: 'p-007', brand: 'Under Armour', type: 'Endorsement', matchScore: 74, status: 'Proposed', value: 55000, description: 'Attacking midfielder showcase — emerging talent campaign.' },

  // Taiwo Akinola (p-010)
  { id: 'co-010', playerId: 'p-010', brand: 'Nike Football', type: 'Endorsement', matchScore: 80, status: 'Negotiating', value: 70000, description: 'Mercurial range ambassador — young Nigerian wingers abroad.' },
];

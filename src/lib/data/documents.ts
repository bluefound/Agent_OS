// ============================================================================
// AgentOS — Mock Documents Data
// Fictional document metadata for demo players.
// ============================================================================

import { PlayerDocument } from '../types';

export const documents: PlayerDocument[] = [
  // Samuel Adeyemi (p-001)
  { id: 'd-001', playerId: 'p-001', type: 'Contract', title: 'Player Contract — Rosenborg BK', status: 'Valid', expiryDate: '2028-06-30', uploadedAt: '2024-07-15', fileSize: '2.4 MB' },
  { id: 'd-002', playerId: 'p-001', type: 'Passport', title: 'Nigerian Passport', status: 'Valid', expiryDate: '2030-03-14', uploadedAt: '2024-01-10', fileSize: '1.2 MB' },
  { id: 'd-003', playerId: 'p-001', type: 'Medical', title: 'Medical Certificate 2025/26', status: 'Valid', expiryDate: '2026-12-31', uploadedAt: '2025-08-01', fileSize: '890 KB' },
  { id: 'd-004', playerId: 'p-001', type: 'Dossier', title: 'Player Dossier', status: 'Valid', uploadedAt: '2025-06-20', fileSize: '4.1 MB' },

  // Chinedu Okafor (p-002)
  { id: 'd-005', playerId: 'p-002', type: 'Contract', title: 'Player Contract — FC Midtjylland', status: 'Valid', expiryDate: '2027-06-30', uploadedAt: '2022-07-01', fileSize: '2.1 MB' },
  { id: 'd-006', playerId: 'p-002', type: 'Passport', title: 'Nigerian Passport', status: 'Valid', expiryDate: '2029-07-22', uploadedAt: '2023-05-15', fileSize: '1.1 MB' },
  { id: 'd-007', playerId: 'p-002', type: 'Medical', title: 'Medical Certificate 2025/26', status: 'Valid', expiryDate: '2026-12-31', uploadedAt: '2025-07-20', fileSize: '920 KB' },

  // Daniel Mensah (p-003)
  { id: 'd-008', playerId: 'p-003', type: 'Contract', title: 'Player Contract — Molde FK', status: 'Expiring', expiryDate: '2026-06-30', uploadedAt: '2023-07-01', fileSize: '2.3 MB' },
  { id: 'd-009', playerId: 'p-003', type: 'Passport', title: 'Ghanaian Passport', status: 'Valid', expiryDate: '2031-11-08', uploadedAt: '2023-02-10', fileSize: '1.3 MB' },
  { id: 'd-010', playerId: 'p-003', type: 'Medical', title: 'Medical Certificate 2025/26', status: 'Valid', expiryDate: '2026-12-31', uploadedAt: '2025-07-15', fileSize: '870 KB' },
  { id: 'd-011', playerId: 'p-003', type: 'Visa', title: 'Norway Work Permit', status: 'Expiring', expiryDate: '2026-06-30', uploadedAt: '2023-07-05', fileSize: '560 KB' },

  // Emmanuel Bello (p-004)
  { id: 'd-012', playerId: 'p-004', type: 'Contract', title: 'Player Contract — IFK Göteborg', status: 'Valid', expiryDate: '2028-12-31', uploadedAt: '2024-01-10', fileSize: '2.0 MB' },
  { id: 'd-013', playerId: 'p-004', type: 'Passport', title: 'Nigerian Passport', status: 'Valid', expiryDate: '2031-01-19', uploadedAt: '2024-01-05', fileSize: '1.1 MB' },

  // Kwame Asante (p-005)
  { id: 'd-014', playerId: 'p-005', type: 'Contract', title: 'Player Contract — Brøndby IF', status: 'Valid', expiryDate: '2027-12-31', uploadedAt: '2024-01-15', fileSize: '2.5 MB' },
  { id: 'd-015', playerId: 'p-005', type: 'Passport', title: 'Ghanaian Passport', status: 'Valid', expiryDate: '2030-05-30', uploadedAt: '2022-08-01', fileSize: '1.2 MB' },
  { id: 'd-016', playerId: 'p-005', type: 'Medical', title: 'Medical Certificate 2025/26', status: 'Valid', expiryDate: '2026-12-31', uploadedAt: '2025-08-05', fileSize: '910 KB' },
  { id: 'd-017', playerId: 'p-005', type: 'Dossier', title: 'Player Dossier', status: 'Valid', uploadedAt: '2025-05-10', fileSize: '3.8 MB' },
];

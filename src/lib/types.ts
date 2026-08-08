// ============================================================================
// AgentOS — Core Data Types
// All interfaces are structured so Supabase/Postgres can replace local mock
// data without touching frontend components.
// ============================================================================

// --- Player ---

export type MarketStatus = 'Rising' | 'Active' | 'Available' | 'Monitoring' | 'Inactive';
export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'DM' | 'CM' | 'AM' | 'LW' | 'RW' | 'ST' | 'CF';
export type ContractStatus = 'Active' | 'Expiring' | 'Expired' | 'Free Agent';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date
  age: number;
  nationality: string;
  secondNationality?: string;
  position: Position;
  secondaryPosition?: Position;
  currentClub: string;
  currentClubId: string;
  contractExpiry: string; // ISO date
  contractStatus: ContractStatus;
  marketStatus: MarketStatus;
  marketValue: number; // in EUR
  imageUrl?: string;
  region: string; // e.g. 'West Africa', 'East Africa'
}

// --- Club ---

export type CompetitionLevel = 'Top 5 League' | 'Strong League' | 'Mid League' | 'Lower League' | 'Youth';

export interface Club {
  id: string;
  name: string;
  country: string;
  league: string;
  competitionLevel: CompetitionLevel;
  targetAgeMin: number;
  targetAgeMax: number;
  positionsNeeded: Position[];
  nationalitiesSigned: string[]; // historical recruitment nationalities
  regionsSigned: string[]; // historical recruitment regions
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  stadiumCapacity?: number;
}

// --- Player Statistics ---

export interface PlayerStatistic {
  playerId: string;
  season: string; // e.g. '2024/25'
  appearances: number;
  minutes: number;
  goals: number;
  assists: number;
  tacklesPct: number; // 0-100
  duelsWonPct: number; // 0-100
  passAccuracy: number; // 0-100
  aerialWonPct: number; // 0-100
  cleanSheets?: number;
  interceptions?: number;
}

export interface MonthlyStatistic {
  playerId: string;
  month: string; // e.g. 'Jan', 'Feb'
  appearances: number;
  minutes: number;
  goals: number;
  assists: number;
  rating: number; // 1-10 scale
}

// --- Career ---

export interface CareerEntry {
  playerId: string;
  club: string;
  country: string;
  league: string;
  dateFrom: string; // ISO date
  dateTo: string | null; // null = current
  appearances: number;
  goals: number;
  transferType: 'Youth' | 'Transfer' | 'Loan' | 'Free' | 'Current';
}

// --- Documents ---

export type DocumentType = 'Contract' | 'Passport' | 'Medical' | 'Dossier' | 'Visa' | 'Insurance';
export type DocumentStatus = 'Valid' | 'Expiring' | 'Expired' | 'Pending';

export interface PlayerDocument {
  id: string;
  playerId: string;
  type: DocumentType;
  title: string;
  status: DocumentStatus;
  expiryDate?: string;
  uploadedAt: string;
  fileSize: string; // e.g. '2.4 MB'
}

// --- Contacts ---

export type ContactRole = 'Club Director' | 'Head Scout' | 'Sporting Director' | 'Agent' | 'Lawyer' | 'Family';

export interface Contact {
  id: string;
  playerId?: string;
  clubId?: string;
  name: string;
  role: ContactRole;
  organization: string;
  email: string;
  phone: string;
  lastContact?: string;
  notes?: string;
}

// --- Commercial ---

export type CommercialType = 'Brand Partnership' | 'Endorsement' | 'Appearance' | 'Social Media' | 'Licensing';
export type CommercialStatus = 'Active' | 'Negotiating' | 'Proposed' | 'Completed' | 'Declined';

export interface CommercialOpportunity {
  id: string;
  playerId: string;
  brand: string;
  type: CommercialType;
  matchScore: number; // 0-100
  status: CommercialStatus;
  value?: number;
  description: string;
  deadline?: string;
}

// --- Transfer Opportunity ---

export interface MatchFactor {
  label: string;
  score: number; // 0-100 for this factor
  maxWeight: number; // the weight percentage (e.g. 25 for position fit)
  showAsReason: boolean; // true if score > 70% of max
  description: string;
}

export interface TransferOpportunity {
  id: string;
  playerId: string;
  clubId: string;
  club: Club;
  player: Player;
  matchScore: number; // 0-100 composite
  factors: MatchFactor[];
  generatedAt: string;
}

// --- AI Agent ---

export type AgentToolName =
  | 'searchPlayers'
  | 'getPlayer'
  | 'searchClubs'
  | 'getClub'
  | 'findTransferOpportunities'
  | 'getPlayerStatistics'
  | 'generateTransferBrief';

export interface AgentToolCall {
  id: string;
  tool: AgentToolName;
  label: string; // human-readable, e.g. "Searching players..."
  status: 'pending' | 'running' | 'completed' | 'error';
  result?: unknown;
}

export interface AgentAction {
  type: 'transfer_brief' | 'view_player' | 'view_club' | 'view_opportunities';
  label: string;
  data?: unknown;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolCalls?: AgentToolCall[];
  actions?: AgentAction[];
  sources?: string[];
  recommendations?: string[];
}

export interface AgentRequest {
  query: string;
  conversationId?: string;
}

export interface AgentResponse {
  message: AgentMessage;
  conversationId: string;
}

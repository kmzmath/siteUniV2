// src/types/ranking.module.ts
import { DateValue } from "./general.module";
import { Team } from "./teams.module";

export interface AdvancedScores {
  borda: number;
  bradley_terry: number;
  colley: number;
  consistency: number;
  elo: number;
  elo_mov: number;
  integrado: number;
  massey: number;
  pagerank: number;
  pca: number;
  sos: number;
  trueskill: number;
}

export interface RemoteRanking {
  cached: boolean;
  last_update: string;
  limit?: number;
  ranking: {
    anomaly: {
      is_anomaly: boolean;
      score: number;
    };
    ci_lower: number;
    ci_upper: number;
    games_count: number;
    incerteza: number;
    nota_final: number;
    posicao: number;
    scores: AdvancedScores;
    tag: string;
    team: string;
    team_id: number;
    university: string;
    variacao: number | null; // Novo campo
    is_new: boolean; // Novo campo
  }[];
}

export interface RankingPlacement {
  anomaly: {
    isAnomaly: boolean;
    score: number;
  };
  ciLower: number;
  ciUpper: number;
  matchesCount: number;
  score: number;
  position: number;
  scores: AdvancedScores;
  team: Team;
  variation: number | null; // Novo campo
  isNew: boolean; // Novo campo
  players?: string[]; // Novo campo para jogadores
}

export interface Ranking {
  lastUpdate: DateValue;
  placements: RankingPlacement[];
}
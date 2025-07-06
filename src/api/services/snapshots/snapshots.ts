// src/api/services/snapshots/snapshots.ts
import { BASE_URL } from "@/api/utils/constants";
// Removi a importação não usada: endpoints
import { Ranking } from "@/types";

// Linha vazia entre grupos de imports
import { rankingAdapter } from "../ranking/utils/adapters";
import { getTeams } from "../teams";
import { getTeamsPlayers } from "../players";

export interface RankingSnapshot {
  id: number;
  created_at: string;
  total_matches: number;
  total_teams: number;
  metadata?: Record<string, unknown>; // Substituído any por tipo específico
}

export interface SnapshotsResponse {
  snapshots: RankingSnapshot[];
  count: number;
  limit: number;
}

export interface HistoricalRankingResponse {
  snapshot_id: number;
  created_at: string;
  total_teams: number;
  total_matches: number;
  metadata: Record<string, unknown>; // Substituído any por tipo específico
  rankings: Array<{
    ci_lower: number;
    ci_upper: number;
    games_count: number;
    incerteza: number;
    nota_final: number;
    position: number;
    scores: Record<string, unknown>;
    team_name: string;
    team_id: number;
    university: string;
    variacao?: number | null;
    is_new?: boolean;
  }>; // Substituído any[] por tipo específico
  compared_with_snapshot?: number | null;
}

// Buscar lista de snapshots disponíveis
export const getSnapshots = async (limit: number = 20): Promise<SnapshotsResponse> => {
  const res = await fetch(`${BASE_URL}/ranking/snapshots?limit=${limit}`, {
    next: {
      revalidate: 60 * 5, // 5 minutos
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch snapshots');
  }
  
  return res.json();
};

// Buscar ranking de um snapshot específico
export const getSnapshotRanking = async (snapshotId: number): Promise<Ranking> => {
  const res = await fetch(`${BASE_URL}/ranking/history/${snapshotId}`, {
    next: {
      revalidate: 60 * 60 * 24, // 24 horas (snapshots históricos não mudam)
    },
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch snapshot ranking: ${snapshotId}`);
  }
  
  const data: HistoricalRankingResponse = await res.json();
  
  // Buscar times e jogadores
  const teams = await getTeams();
  const playersMap = await getTeamsPlayers();
  
  // Adaptar formato do ranking histórico para o formato esperado
  const remoteRanking = {
    cached: false,
    last_update: data.created_at,
    ranking: data.rankings.map(r => ({
      anomaly: { is_anomaly: false, score: 0 },
      ci_lower: r.ci_lower,
      ci_upper: r.ci_upper,
      games_count: r.games_count,
      incerteza: r.incerteza,
      nota_final: r.nota_final,
      posicao: r.position,
      scores: r.scores,
      tag: r.team_name?.match(/\(([^)]+)\)/)?.[1] || '',
      team: r.team_name?.split(' (')[0] || '',
      team_id: r.team_id,
      university: r.university,
      // CORREÇÃO: Usar os valores vindos do backend ao invés de null/false
      variacao: r.variacao !== undefined ? r.variacao : null,
      is_new: r.is_new !== undefined ? r.is_new : false
    }))
  };
  
  const ranking = rankingAdapter(remoteRanking, teams);
  
  // Adicionar jogadores aos placements
  ranking.placements = ranking.placements.map(placement => ({
    ...placement,
    players: playersMap[placement.team.id] || []
  }));
  
  return ranking;
};

// Buscar o snapshot mais recente
export const getLatestSnapshot = async (): Promise<RankingSnapshot | null> => {
  const snapshots = await getSnapshots(1);
  return snapshots.snapshots[0] || null;
};
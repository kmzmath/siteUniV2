import { AdvancedScores, Team } from "@/types";

export type RankingPlacementItemProps = {
  index: number;
  points: number;
  matchesCount: number;
  team: Team;
  scores: AdvancedScores;
  isAdvancedScoresEnabled: boolean;
  players?: string[]; // Novo campo
  variation?: number | null; // Novo campo
  isNew?: boolean; // Novo campo
};
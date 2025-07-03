import { AdvancedScores } from "@/types";

export type TeamCardRowProps = {
  index: number;
  name: string;
  universityTag: string;
  points: number;
  imageUrl: string;
  matchesCount: number;
  isOpen?: boolean;
  isCollapsible?: boolean;
  shouldDisplayAdvancedScores?: boolean;
  advancedScores?: AdvancedScores;
  players?: string[]; // Novo campo
  variation?: number | null; // Novo campo
  isNew?: boolean; // Novo campo
};
import { createDateValue } from "@/api/utils/functions";
import { Ranking, RemoteRanking, Team } from "@/types";

export const rankingAdapter = (
  ranking: RemoteRanking,
  teams: Team[]
): Ranking => {
  const { last_update, ranking: placements } = ranking;

  return {
    lastUpdate: createDateValue(last_update, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    }),
    placements: placements.map((placement) => ({
      anomaly: {
        isAnomaly: placement.anomaly.is_anomaly,
        score: placement.anomaly.score,
      },
      ciLower: placement.ci_lower,
      ciUpper: placement.ci_upper,
      matchesCount: placement.games_count,
      score: placement.nota_final,
      position: placement.posicao,
      scores: placement.scores,
      team: teams.find((t) => t.id === placement.team_id)!,
      variation: placement.variacao, // Novo campo
      isNew: placement.is_new, // Novo campo
    })),
  };
};
import { BASE_URL } from "@/api/utils/constants";
import endpoints from "@/api/utils/endpoints";
import { RemoteRanking } from "@/types";

import { getTeamsPlayers } from "../players";
import { getTeams } from "../teams";

import { rankingAdapter } from "./utils/adapters";

export const getRanking = async () => {
  const res = await fetch(`${BASE_URL}${endpoints.ranking}`, {
    next: {
      revalidate: 60 * 60 * 2, // 2 hours
    },
  });
  const data = (await res.json()) as RemoteRanking;

  const teams = await getTeams();
  const playersMap = await getTeamsPlayers(); // Buscar jogadores

  const ranking = rankingAdapter(data, teams);
  
  // Adicionar jogadores aos placements
  ranking.placements = ranking.placements.map(placement => ({
    ...placement,
    players: playersMap[placement.team.id] || []
  }));

  return ranking;
};
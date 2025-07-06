import { BASE_URL } from "@/api/utils/constants";
import endpoints from "@/api/utils/endpoints";
import { RemoteRanking } from "@/types";

import { getTeamsPlayers } from "../players";
import { getTeams } from "../teams";

import { rankingAdapter } from "./utils/adapters";

export const getRanking = async () => {
  try {
    const res = await fetch(`${BASE_URL}${endpoints.ranking}`, {
      next: {
        revalidate: 60 * 60 * 2, // 2 hours
      },
    });
    
    // Verifica se a resposta é OK
    if (!res.ok) {
      console.error(`Erro ao buscar ranking: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch ranking: ${res.status}`);
    }
    
    // Verifica o content-type
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Resposta não é JSON. Content-Type: ${contentType}`);
      const text = await res.text();
      console.error(`Resposta recebida (primeiros 200 chars): ${text.substring(0, 200)}`);
      throw new Error(`API returned non-JSON response`);
    }
    
    const data = await res.json() as RemoteRanking;

    const teams = await getTeams();
    const playersMap = await getTeamsPlayers(); // Buscar jogadores

    const ranking = rankingAdapter(data, teams);
    
    // Adicionar jogadores aos placements
    ranking.placements = ranking.placements.map(placement => ({
      ...placement,
      players: playersMap[placement.team.id] || []
    }));

    return ranking;
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    // Retorna um ranking vazio em caso de erro
    return {
      lastUpdate: {
        raw: new Date().toISOString(),
        formatted: new Date().toLocaleString('pt-BR'),
      },
      placements: []
    };
  }
};
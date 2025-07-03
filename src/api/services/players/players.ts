import { BASE_URL } from "@/api/utils/constants";

interface PlayersResponse {
  statistics: {
    total_teams: number;
    teams_with_players: number;
    teams_without_players: number;
    total_players: number;
    average_players_per_team: number;
  };
  teams: {
    team_id: number;
    team_name: string;
    team_tag: string;
    university: string;
    player_count: number;
    players: string[];
  }[];
}

export const getTeamsPlayers = async (): Promise<Record<number, string[]>> => {
  try {
    const res = await fetch(`${BASE_URL}/teams/players/summary`, {
      next: {
        revalidate: 60 * 60 * 2, // 2 hours
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch players');
    }
    
    const data = await res.json() as PlayersResponse;
    
    // Converte para um mapa de team_id -> players[]
    const playersMap: Record<number, string[]> = {};
    data.teams.forEach(team => {
      playersMap[team.team_id] = team.players || [];
    });
    
    return playersMap;
  } catch (error) {
    console.error('Error fetching players:', error);
    return {};
  }
};
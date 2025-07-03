// src/api/services/matches/matches.ts
import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "@/api/utils/constants";
import endpoints from "@/api/utils/endpoints";
import { RemoteMatch } from "@/types";

import { matchAdapter } from "./utils/adapters";

export const getMatches = async () => {
  const res = await fetch(`${BASE_URL}${endpoints.matches}`, {
    next: {
      revalidate: 60 * 60 * 2, // 2 hours
    },
  });
  const data = (await res.json()) as RemoteMatch[];

  return data.map(matchAdapter);
};

export const getMatchesByTeamId = async (teamId: string) => {
  const res = await fetch(
    `${BASE_URL}${endpoints.teamMatches.replace(":teamId", teamId)}`
  );
  const data = (await res.json()) as RemoteMatch[];

  return data.map(matchAdapter);
};

export const useGetMatchesByTeamIdQuery = ({
  teamId,
  skip,
}: {
  teamId: string;
  skip?: boolean;
}) =>
  useQuery({
    queryKey: ["matches", teamId],
    queryFn: () => getMatchesByTeamId(teamId),
    enabled: !skip,
  });
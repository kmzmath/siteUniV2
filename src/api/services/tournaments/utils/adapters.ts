import { createDateValue } from "@/api/utils/functions";
import { RemoteTournament, Tournament } from "@/types";

import { TOURNAMENT_MAP } from "./constants";

export const tournamentAdapter = (tournament: RemoteTournament): Tournament => {
  const { id, name, startsOn, endsOn, organizer } = tournament;

  return {
    id,
    name: TOURNAMENT_MAP[name as keyof typeof TOURNAMENT_MAP] ?? name,
    slug: name,
    startsOn: createDateValue(startsOn),
    endsOn: createDateValue(endsOn),
    logo: `/images/tournaments/${name}.png`,
    organizer,
  };
};

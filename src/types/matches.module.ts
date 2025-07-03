import { DateValue } from "./general.module";
import { RemoteTeam, Team } from "./teams.module";
import { RemoteTournament, Tournament } from "./tournaments.module";

export interface RemoteMatchTeam {
  agent_1: string | null;
  agent_2: string | null;
  agent_3: string | null;
  agent_4: string | null;
  agent_5: string | null;
  id: string;
  score: number;
  team: RemoteTeam;
}

export type MatchTeam = {
  id: string;
  score: number;
  agents: string[]; // Array flexível ao invés de tupla fixa
  team: Team;
};

export interface RemoteMatch {
  id: string;
  map: string;
  round: string;
  date: string;
  tmi_a: RemoteMatchTeam;
  tmi_b: RemoteMatchTeam;
  tournament: RemoteTournament;
}

export interface Match {
  id: string;
  map: string;
  round: string;
  date: DateValue;
  teamMatchInfoA: MatchTeam;
  teamMatchInfoB: MatchTeam;
  tournament: Tournament;
}
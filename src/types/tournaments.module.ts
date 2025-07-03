import { DateValue } from "./general.module";

export interface RemoteTournament {
  id: string;
  endsOn: string;
  name: string;
  startsOn: string;
  logo: string;
  organizer: string;
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  startsOn: DateValue;
  endsOn: DateValue;
  logo: string;
  organizer: string;
}

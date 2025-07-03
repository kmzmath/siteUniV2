import Image from "next/image";

import { Row, Text } from "@/ui/atoms";

import { AgentsRow } from "./components";
import { MatchRowProps } from "./types";

const MatchRow: React.FC<MatchRowProps> = ({
  id,
  date,
  round,
  tournament,
  map,
  teamMatchInfoA,
  teamMatchInfoB,
  isVictory,
}) => (
  <li className="grid grid-cols-[200px_200px_1fr_200px_200px] justify-between items-center w-full bg-slate-800 px-2 min-w-[1400px]">
    <Row className="flex-1/8 items-center gap-1">
      <div className="relative h-4 w-[50px] 2xl:h-8 2xl:w-[80px]">
        <Image
          src={tournament.logo}
          alt={tournament.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-start">
        <Text variant="bodySmall" bold>
          {date.formatted}
        </Text>

        <Text variant="bodyXSmall" className="text-slate-400">
          {tournament.name} - {round.toUpperCase()}
        </Text>
      </div>
    </Row>

    <Row className="gap-1 h-3 items-center justify-end">
      <AgentsRow agents={teamMatchInfoA.agents} matchId={id} />
    </Row>

    <div className="grid grid-cols-[1fr_40px_80px_40px_1fr] items-center justify-center gap-1 h-8 xl:gap-2">
      <Row className="gap-2 items-center justify-end">
        <div className="flex flex-col items-end">
          <Text variant="bodySmall" className="text-right" bold>
            {teamMatchInfoA.team.name}
          </Text>
          <Text variant="bodyXSmall" className="text-slate-400">
            {teamMatchInfoA.team.universityTag}
          </Text>
        </div>
      </Row>

      <div className="w-4 h-4 flex items-center justify-center xl:w-5 xl:h-5">
        <Image
          src={teamMatchInfoA.team.imageUrl}
          alt={teamMatchInfoA.team.name}
          width={40}
          height={40}
          className="object-contain w-5 h-5"
        />
      </div>

      <div
        className={`h-full w-10 flex items-center justify-center gap-1 ${
          isVictory ? "bg-green-700" : "bg-red-700"
        }`}
      >
        <div className="flex items-center justify-right w-2">
          <Text variant="bodySmall" bold>
            {teamMatchInfoA.score}
          </Text>
        </div>

        <Text variant="bodySmall">:</Text>

        <div className="flex items-center justify-left w-2">
          <Text variant="bodySmall" bold>
            {teamMatchInfoB.score}
          </Text>
        </div>
      </div>

      <div className="w-4 h-4 flex items-center justify-center xl:w-5 xl:h-5">
        <Image
          src={teamMatchInfoB.team.imageUrl}
          alt={teamMatchInfoB.team.name}
          width={40}
          height={40}
          className="object-contain w-5 h-5"
        />
      </div>

      <Row className="gap-2 items-center">
        <div className="flex flex-col items-start">
          <Text variant="bodySmall" bold>
            {teamMatchInfoB.team.name}
          </Text>
          <Text variant="bodyXSmall" className="text-slate-400">
            {teamMatchInfoB.team.universityTag}
          </Text>
        </div>
      </Row>
    </div>

    <Row className="gap-1 h-3 items-center justify-start">
      <AgentsRow agents={teamMatchInfoB.agents} matchId={id} />
    </Row>

    <div className="flex flex-1/8 justify-end items-center">
      <div className="relative h-8 w-[100px] 2xl:h-8 2xl:w-[150px]">
        <Image
          src={`/images/maps/miniature/${map}.webp`}
          alt={map}
          fill
          className="object-cover"
        />

        <div className="absolute bottom-1/2 right-0 w-full translate-y-1/2 flex items-center justify-center bg-gray-800/60 py-0.25">
          <Text variant="bodySmall" bold>
            {map.toUpperCase()}
          </Text>
        </div>
      </div>
    </div>
  </li>
);

export default MatchRow;

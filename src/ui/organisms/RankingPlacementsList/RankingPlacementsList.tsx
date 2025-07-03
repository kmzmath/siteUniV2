"use client";

import { useState } from "react";

import { RankingPlacement } from "@/types";
import { Text } from "@/ui/atoms";

import { RankingPlacementItem } from "./components";
import { RankingPlacementsListProps } from "./types";

const RankingPlacementsList: React.FC<RankingPlacementsListProps> = ({
  placements,
}) => {
  const [isAdvancedScoresEnabled, setIsAdvancedScoresEnabled] = useState(false);

  const toggleAdvancedScores = () => {
    setIsAdvancedScoresEnabled((prev) => !prev);
  };

  return (
    <ul className="flex flex-col gap-1 w-full">
      <Text
        variant="bodySmall"
        bold
        className="text-center mb-1 max-w-[1200px] text-sky-400 cursor-pointer hover:underline xl:block hidden self-end"
        onClick={toggleAdvancedScores}
      >
        {isAdvancedScoresEnabled ? "Desativar" : "Ativar"} scores detalhados
      </Text>

      {placements?.map((placement: RankingPlacement) => (
        <RankingPlacementItem
          key={placement.team.id}
          index={placement.position}
          points={placement.score}
          matchesCount={placement.matchesCount}
          team={placement.team}
          scores={placement.scores}
          isAdvancedScoresEnabled={isAdvancedScoresEnabled}
          players={placement.players}
          variation={placement.variation}
          isNew={placement.isNew}
        />
      ))}
    </ul>
  );
};

export default RankingPlacementsList;
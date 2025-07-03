// src/ui/molecules/TeamCardRow/TeamCardRow.tsx
import Image from "next/image";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row, Text } from "@/ui/atoms";
import PositionVariation from "@/ui/atoms/PositionVariation";

import { TeamCardRowProps } from "./types";

const TeamCardRow: React.FC<TeamCardRowProps> = ({
  index,
  name,
  universityTag,
  points,
  imageUrl,
  matchesCount,
  isOpen,
  isCollapsible,
  advancedScores,
  shouldDisplayAdvancedScores,
  players = [],
  variation,
  isNew = false,
}) => (
  <Row className="items-center justify-between gap-4 bg-slate-900 px-2 py-1 w-full">
    <Row className="items-center gap-2 flex-1">
      <div className="flex items-center gap-2">
        <div className="w-3 py-0.25 bg-sky-700 rounded-sm flex items-center justify-center sm:w-4">
          <Text variant="bodySmall" bold>
            {index}
          </Text>
        </div>
        
        {/* Variação de posição */}
        <div className="w-12 flex items-center justify-center">
          <PositionVariation variation={variation} isNew={isNew} />
        </div>
      </div>

      <div className="w-4 h-4 flex items-center justify-center sm:w-6 sm:h-6">
        <Image
          src={imageUrl}
          alt={name}
          width={48}
          height={48}
          className="object-contain w-4 h-4 sm:w-6 sm:h-6"
          suppressHydrationWarning
        />
      </div>

      <div className="flex-1">
        <Row className="items-center gap-1">
          <Text variant="bodyLarge" className="text-nowrap">
            {name}
          </Text>
          <Text
            variant="bodySmall"
            className="text-slate-400 hidden text-nowrap sm:block"
          >
            ({matchesCount} {matchesCount === 1 ? "partida" : "partidas"})
          </Text>
        </Row>
        
        <div className="flex flex-col gap-1">
          <Text variant="bodySmall" className="text-slate-400">
            {universityTag}
          </Text>
          
          {/* Lista de jogadores temporária com estilo inline */}
          {players.length > 0 && (
            <div className="grid grid-cols-10 gap-1 max-w-4xl">
              {players.slice(0, 20).map((player, index) => {
                const displayName = player.length > 12 ? `${player.substring(0, 10)}...` : player;
                return (
                  <span 
                    key={`${player}-${index}`}
                    className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium min-w-0 bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200 truncate text-center"
                    title={player}
                  >
                    {displayName}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Row>

    <Row className="gap-2 items-center">
      <div className="flex flex-col items-end">
        <Text variant="bodyLarge">{points.toFixed(2)}</Text>

        {shouldDisplayAdvancedScores && (
          <Row className="gap-1 w-full justify-end flex-wrap hidden xl:flex">
            <Text variant="bodyXSmall">
              r_colley: {advancedScores?.colley.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              r_massey: {advancedScores?.massey.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              r_elo_final: {advancedScores?.elo.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              r_elo_mov: {advancedScores?.elo_mov.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              ts_score: {advancedScores?.trueskill.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              r_pagerank: {advancedScores?.pagerank.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              r_bt_pois: {advancedScores?.bradley_terry.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              sos_score: {advancedScores?.sos.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              consistency: {advancedScores?.consistency.toFixed(2)}
            </Text>
            <Text variant="bodyXSmall">
              pca_score: {advancedScores?.pca.toFixed(2)}
            </Text>
          </Row>
        )}
      </div>

      {isCollapsible && (
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      )}
    </Row>
  </Row>
);

export default TeamCardRow;
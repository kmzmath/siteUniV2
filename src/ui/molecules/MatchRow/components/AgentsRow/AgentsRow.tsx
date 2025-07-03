// src/ui/molecules/MatchRow/components/AgentsRow/AgentsRow.tsx
"use client";

import { useMemo } from "react";

import Image from "next/image";

import { AgentsRowProps } from "./types";
import { orderAgentsByRole } from "./utils/functions";

const AgentsRow: React.FC<AgentsRowProps> = ({ agents, matchId }) => {
  const orderedAgents = useMemo(() => {
    // Filtra agentes válidos antes de ordenar
    const validAgents = agents.filter(agent => agent && agent.trim() !== "");
    return orderAgentsByRole(validAgents);
  }, [agents]);

  // Se não houver agentes, retorna espaços vazios para manter o layout
  if (orderedAgents.length === 0) {
    return (
      <>
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={`${matchId}-empty-${index}`} className="w-3 h-3" />
        ))}
      </>
    );
  }

  return (
    <>
      {orderedAgents.map((agent, index) => (
        <Image
          key={`${matchId}-${agent}-${index}`}
          src={`/images/agents/${agent}.png`}
          alt={agent}
          width={24}
          height={24}
          className="object-contain w-3 h-3"
          onError={(e) => {
            // Oculta imagem se não encontrar
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ))}
      {/* Preenche com espaços vazios se tiver menos de 5 agentes */}
      {orderedAgents.length < 5 && 
        Array.from({ length: 5 - orderedAgents.length }).map((_, index) => (
          <div key={`${matchId}-empty-${index}`} className="w-3 h-3" />
        ))
      }
    </>
  );
};

export default AgentsRow;
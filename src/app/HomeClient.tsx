"use client";

import { useState, useEffect, useCallback } from "react";

import { getSnapshotRanking } from "@/api/services/snapshots";
import { Ranking } from "@/types";
import { RankingPlacementsList } from "@/ui/organisms";

import { HomeFooter, HomeHeader } from "./components";

interface Snapshot {
  id: number;
  created_at: string;
  total_teams: number;
  total_matches: number;
}

interface HomeClientProps {
  initialRanking: Ranking;
  initialSnapshots: Snapshot[];
  initialSnapshotId?: number | null;
}

const HomeClient: React.FC<HomeClientProps> = ({ 
  initialRanking, 
  initialSnapshots,
  initialSnapshotId = null
}) => {
  const [currentRanking, setCurrentRanking] = useState<Ranking>(initialRanking);
  const [liveRanking] = useState<Ranking>(initialRanking);
  const [snapshots] = useState<Snapshot[]>(initialSnapshots || []);
  const [currentSnapshotId, setCurrentSnapshotId] = useState<number | null>(initialSnapshotId);
  const [loadingSnapshot, setLoadingSnapshot] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Lidar com mudança de snapshot
  const handleSnapshotChange = useCallback(async (snapshotId: number | null) => {
    try {
      setLoadingSnapshot(true);
      
      if (snapshotId === null) {
        // Voltar para o ranking ao vivo
        setCurrentRanking(liveRanking);
        setCurrentSnapshotId(null);
      } else {
        // Carregar ranking do snapshot
        const snapshotRanking = await getSnapshotRanking(snapshotId);
        setCurrentRanking(snapshotRanking);
        setCurrentSnapshotId(snapshotId);
      }
    } catch (error) {
      console.error("Erro ao carregar snapshot:", error);
      // Em caso de erro, voltar para o ranking ao vivo
      setCurrentRanking(liveRanking);
      setCurrentSnapshotId(null);
      alert("Erro ao carregar o snapshot. Voltando ao ranking ao vivo.");
    } finally {
      setLoadingSnapshot(false);
    }
  }, [liveRanking]);

  // Se iniciamos com um snapshot, carregar seus dados
  useEffect(() => {
    if (initialSnapshotId !== null && !isInitialized) {
      setIsInitialized(true);
      handleSnapshotChange(initialSnapshotId);
    }
  }, [initialSnapshotId, isInitialized, handleSnapshotChange]);

  return (
    <div className="min-h-screen px-2 font-[family-name:var(--font-geist-sans)] sm:px-4 lg:px-8">
      <HomeHeader 
        lastUpdate={currentRanking.lastUpdate.formatted}
        snapshots={snapshots}
        currentSnapshotId={currentSnapshotId}
        onSnapshotChange={handleSnapshotChange}
        loading={loadingSnapshot}
        isLiveIdenticalToLatest={initialSnapshotId !== null}
      />

      <main className={loadingSnapshot ? "opacity-50 transition-opacity" : "transition-opacity"}>
        <RankingPlacementsList placements={currentRanking.placements} />
      </main>

      <HomeFooter />
    </div>
  );
};

export default HomeClient;
import mainApi from "@/api";
import { getSnapshotsRaw } from "@/api/services/snapshots/snapshotsApi";
import HomeClient from "./HomeClient";

const Home: React.FC = async () => {
  const [ranking, snapshotsData] = await Promise.all([
    mainApi.getRanking(),
    getSnapshotsRaw(50)
  ]);

  // Detectar se o ranking ao vivo é idêntico ao último snapshot
  let initialSnapshotId: number | null = null;
  
  if (snapshotsData.snapshots && snapshotsData.snapshots.length > 0) {
    const latestSnapshot = snapshotsData.snapshots[0];
    const liveTeamsCount = ranking.placements.length;
    
    // Se o número de times no ranking ao vivo é igual ao do último snapshot,
    // provavelmente são idênticos (não houve partidas novas)
    if (latestSnapshot.total_teams === liveTeamsCount) {
      // Iniciar já mostrando o último snapshot ao invés do "ao vivo"
      initialSnapshotId = latestSnapshot.id;
      console.log(`Ranking ao vivo idêntico ao snapshot #${latestSnapshot.id}, iniciando com ele`);
    }
  }

  return (
    <HomeClient
      initialRanking={ranking}
      initialSnapshots={snapshotsData.snapshots || []}
      initialSnapshotId={initialSnapshotId}
    />
  );
};

export default Home;
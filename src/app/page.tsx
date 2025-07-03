import mainApi from "@/api";
import { getSnapshotsRaw } from "@/api/services/snapshots/snapshotsApi";
import HomeClient from "./HomeClient";

const Home: React.FC = async () => {
  const [ranking, snapshotsData] = await Promise.all([
    mainApi.getRanking(),
    getSnapshotsRaw(50)
  ]);

  return (
    <HomeClient
      initialRanking={ranking}
      initialSnapshots={snapshotsData.snapshots || []}
    />
  );
};

export default Home;
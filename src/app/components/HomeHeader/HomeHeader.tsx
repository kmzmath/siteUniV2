"use client";

import { useModals } from "@/providers/ModalProvider";
import { Text } from "@/ui/atoms";

import DateSelector from "../DateSelector";
import RatingDisclaimerModal from "../RatingDisclaimerModal";

type HomeHeaderProps = {
  lastUpdate: string;
  snapshots: Array<{
    id: number;
    created_at: string;
    total_teams: number;
    total_matches: number;
  }>;
  currentSnapshotId: number | null;
  onSnapshotChange: (snapshotId: number | null) => void;
  loading?: boolean;
  isLiveIdenticalToLatest?: boolean;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  lastUpdate, 
  snapshots,
  currentSnapshotId,
  onSnapshotChange,
  loading = false,
  isLiveIdenticalToLatest = false
}) => {
  const { openModal, closeModal } = useModals();

  const openRatingDisclaimerModal = () => {
    openModal(
      "rating-disclaimer",
      <RatingDisclaimerModal closeModal={closeModal} />
    );
  };

  // Determinar se estamos vendo o ranking atual
  const isViewingCurrent = currentSnapshotId === null || 
    (isLiveIdenticalToLatest && snapshots[0]?.id === currentSnapshotId);

  return (
    <header className="flex flex-col items-center justify-center py-4 sm:py-8 lg:py-10">
      <Text variant="titleLarge" bold className="text-center">
        Ranking Universitário de Valorant
      </Text>

      <DateSelector
        snapshots={snapshots}
        currentSnapshotId={currentSnapshotId}
        onSnapshotChange={onSnapshotChange}
        loading={loading}
        isLiveIdenticalToLatest={isLiveIdenticalToLatest}
      />

      <Text
        variant="bodySmall"
        className="text-slate-300 text-center mt-1 mb-2"
      >
        {isViewingCurrent
          ? `Última atualização: ${lastUpdate}`
          : "Visualizando snapshot histórico"
        }
      </Text>

      <Text
        variant="bodySmall"
        className="text-slate-300 text-center mb-3 max-w-[1200px]"
      >
        Esse site tenta prever a força das equipes do cenário universitário de
        Valorant através de seus resultados nos campeonatos do cenário. Tudo não
        passa de uma tentativa de previsão feita por um algoritmo, e não
        necessariamente reflete a realidade da equipe. O algoritmo também não
        leva em consideração pontos importantes como quem foram os jogadores que
        jogaram as partidas, mapas, fases, etc...
        <br />
        <br />O site não possui nenhum objetivo em ofender ou elogiar nenhuma
        equipe, organização ou jogador. Todos os dados são obtidos através de
        cálculos e algoritmos e não possuem nenhum viés de opinião. Você pode
        conferir as métricas{" "}
        <span
          className="text-sky-400 cursor-pointer hover:underline"
          onClick={openRatingDisclaimerModal}
        >
          clicando aqui.
        </span>
      </Text>
    </header>
  );
};

export default HomeHeader;
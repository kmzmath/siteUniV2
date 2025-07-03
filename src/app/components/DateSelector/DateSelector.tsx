"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DateSelectorProps {
  snapshots: Array<{
    id: number;
    created_at: string;
    total_teams: number;
    total_matches: number;
  }>;
  currentSnapshotId: number | null;
  onSnapshotChange: (snapshotId: number | null) => void;
  loading?: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  snapshots,
  currentSnapshotId,
  onSnapshotChange,
  loading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Encontrar o índice do snapshot atual
  useEffect(() => {
    if (currentSnapshotId === null) {
      setCurrentIndex(-1); // -1 indica o ranking ao vivo
    } else {
      const index = snapshots?.findIndex(s => s.id === currentSnapshotId) ?? -1;
      setCurrentIndex(index >= 0 ? index : -1);
    }
  }, [currentSnapshotId, snapshots]);

  const handlePrevious = () => {
    if (loading || !snapshots) return;
    
    if (currentIndex === -1) {
      // Do ranking ao vivo para o snapshot mais recente
      if (snapshots.length > 0) {
        setCurrentIndex(0);
        onSnapshotChange(snapshots[0].id);
      }
    } else if (currentIndex < snapshots.length - 1) {
      // Navegar para snapshot mais antigo
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onSnapshotChange(snapshots[newIndex].id);
    }
  };

  const handleNext = () => {
    if (loading || !snapshots) return;
    
    if (currentIndex > 0) {
      // Navegar para snapshot mais recente
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onSnapshotChange(snapshots[newIndex].id);
    } else if (currentIndex === 0) {
      // Do primeiro snapshot para o ranking ao vivo
      setCurrentIndex(-1);
      onSnapshotChange(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Ranking Ao Vivo";
    
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return "Data inválida";
    }
  };

  const getCurrentDate = () => {
    if (currentIndex === -1) return null;
    if (currentIndex >= 0 && currentIndex < (snapshots?.length ?? 0)) {
      return snapshots[currentIndex].created_at;
    }
    return null;
  };

  const canGoPrevious = currentIndex < (snapshots?.length ?? 0) - 1;
  const canGoNext = currentIndex > -1;

  const isLive = currentIndex === -1;

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious || loading}
        className={`p-2 rounded-lg transition-all ${
          canGoPrevious && !loading
            ? "hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            : "text-slate-600 cursor-not-allowed"
        }`}
        aria-label="Snapshot anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-center gap-2 min-w-[200px] justify-center">
        <Calendar size={20} className="text-slate-400" />
        <span className={`text-lg font-medium ${loading ? "opacity-50" : ""} ${
          isLive ? "text-green-400" : "text-white"
        }`}>
          {loading ? "Carregando..." : formatDate(getCurrentDate())}
        </span>
        {isLive && !loading && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!canGoNext || loading}
        className={`p-2 rounded-lg transition-all ${
          canGoNext && !loading
            ? "hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            : "text-slate-600 cursor-not-allowed"
        }`}
        aria-label="Próximo snapshot"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default DateSelector;
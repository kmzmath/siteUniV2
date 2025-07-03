"use client";

import { useEffect, useState } from "react";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface VisitCounterProps {
  namespace?: string; // Permite diferentes contadores para diferentes páginas
}

const VisitCounter: React.FC<VisitCounterProps> = ({ namespace = "global" }) => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVisit, setIsNewVisit] = useState(false);

  useEffect(() => {
    const fetchAndUpdateVisitCount = async () => {
      try {
        // Verifica se é uma nova visita (não contabiliza refreshs)
        const lastVisit = sessionStorage.getItem(`lastVisit_${namespace}`);
        const isNew = !lastVisit;
        setIsNewVisit(isNew);

        if (isNew) {
          sessionStorage.setItem(`lastVisit_${namespace}`, Date.now().toString());
        }

        // Tenta usar a API principal
        try {
          const endpoint = `https://api.countapi.xyz/${isNew ? 'hit' : 'get'}/univlr.com/${namespace}`;
          const response = await fetch(endpoint);
          
          if (response.ok) {
            const data = await response.json();
            setVisitCount(data.value);
            return;
          }
        } catch {
          console.warn('CountAPI não disponível, usando fallback');
        }

        // Fallback: Use sua própria API se tiver
        if (process.env.NEXT_PUBLIC_API_URL) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/visits${isNew ? '' : '?increment=false'}`,
              { method: isNew ? 'POST' : 'GET' }
            );
            
            if (response.ok) {
              const data = await response.json();
              setVisitCount(data.count);
              return;
            }
          } catch {
            console.warn('API customizada não disponível');
          }
        }

        // Último fallback: localStorage
        const storageKey = `visitCount_${namespace}`;
        const storedCount = localStorage.getItem(storageKey);
        let count = storedCount ? parseInt(storedCount) : 0;
        
        if (isNew) {
          count += 1;
          localStorage.setItem(storageKey, count.toString());
        }
        
        setVisitCount(count);

      } catch (error) {
        console.error('Erro ao processar contador de visitas:', error);
        setVisitCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndUpdateVisitCount();
  }, [namespace]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <FontAwesomeIcon icon={faEye} className="w-3 h-3 animate-pulse" />
        <span className="text-xs animate-pulse">...</span>
      </div>
    );
  }

  if (visitCount === null) {
    return null; // Não mostra nada se houver erro
  }

  return (
    <div 
      className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-all duration-200 group"
      title={isNewVisit ? "Obrigado pela visita! 🎉" : "Contador de visitas"}
    >
      <FontAwesomeIcon 
        icon={faEye} 
        className={`w-3 h-3 transition-transform group-hover:scale-110 ${
          isNewVisit ? 'text-sky-400' : ''
        }`} 
      />
      <span className="text-xs">
        {visitCount.toLocaleString('pt-BR')} {visitCount === 1 ? 'visita' : 'visitas'}
      </span>
    </div>
  );
};

export default VisitCounter;
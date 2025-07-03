"use client";

import { createContext, PropsWithChildren, ReactNode, useState } from "react";

import type { Modal, ModalContextType } from "./types";

export const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (id: string, component: ReactNode) => {
    setModals((prevModals) => {
      // Check if modal with this id already exists
      const existingModalIndex = prevModals.findIndex(
        (modal) => modal.id === id
      );

      if (existingModalIndex !== -1) {
        // Update existing modal
        const updatedModals = [...prevModals];
        updatedModals[existingModalIndex] = { id, component };
        return updatedModals;
      }

      // Add new modal
      return [...prevModals, { id, component }];
    });
  };

  const closeModal = (id?: string) => {
    if (typeof id === "string") {
      // Close specific modal
      setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
    } else {
      // Close all modals
      setModals([]);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const value: ModalContextType = {
    modals,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Modal Backdrop */}
      {modals.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          {modals.map((modal) => (
            <div
              key={modal.id}
              className="overflow-y-auto max-h-[95vh] max-w-[95vw]"
            >
              {modal.component}
            </div>
          ))}
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

import { ReactNode } from "react";

export interface Modal {
  id: string;
  component: ReactNode;
}

export interface ModalContextType {
  modals: Modal[];
  openModal: (id: string, component: ReactNode) => void;
  closeModal: (id?: string) => void;
}

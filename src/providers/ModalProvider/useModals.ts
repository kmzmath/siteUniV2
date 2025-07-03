"use client";

import { useContext } from "react";

import { ModalContext } from "./ModalProvider";

import type { ModalContextType } from "./types";

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }

  return context;
};

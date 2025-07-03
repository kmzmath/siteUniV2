import { PropsWithChildren } from "react";

export type DialogProps = PropsWithChildren<{
  title?: string;
  closeDialog: () => void;
  className?: string;
}>;

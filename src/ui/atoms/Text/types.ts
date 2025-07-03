import { PropsWithChildren } from "react";

import { typography } from "@/ui/tokens";

export type TextProps = PropsWithChildren<{
  className?: string;
  variant?: keyof typeof typography;
  bold?: boolean;
  onClick?: () => void;
}>;

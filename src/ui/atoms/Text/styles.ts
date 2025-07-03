import { tv } from "tailwind-variants";

import { typography } from "@/ui/tokens";

export const textVariants = tv({
  base: typography.titleMedium,
  variants: {
    variant: typography,
    weight: {
      normal: "",
      bold: "font-bold",
    },
  },
});

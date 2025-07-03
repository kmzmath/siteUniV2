import { DateValue } from "@/types";

export const createDateValue = (
  date: string,
  format: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }
): DateValue => ({
  iso: date,
  formatted: new Date(date).toLocaleDateString("pt-BR", format),
});

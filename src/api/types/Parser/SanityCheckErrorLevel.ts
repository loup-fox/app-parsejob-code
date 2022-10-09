import { z } from "zod";

export const SanityCheckErrorLevel = z.union([
  z.literal("error"),
  z.literal("warning"),
  z.literal("info"),
  z.literal("none"),
]);
export type SanityCheckErrorLevel = z.infer<typeof SanityCheckErrorLevel>;

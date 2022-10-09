import { z } from "zod";
import { SanityCheckErrorLevel } from "./SanityCheckErrorLevel";

export const SanityObject = z.object({
  distinctItemQuantity: SanityCheckErrorLevel.optional().nullable(),
  fees: SanityCheckErrorLevel.optional().nullable(),
  fullBlast: SanityCheckErrorLevel.optional().nullable(),
  optionalFields: SanityCheckErrorLevel.optional().nullable(),
  consistency: SanityCheckErrorLevel.optional().nullable(),
  orderItemQuantity: SanityCheckErrorLevel.optional().nullable(),
  outliers: SanityCheckErrorLevel.optional().nullable(),
  pricePerUnit: SanityCheckErrorLevel.optional().nullable(),
});
export type SanityObject = z.infer<typeof SanityObject>;

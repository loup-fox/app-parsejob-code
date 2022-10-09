import { z } from "zod";

export const SanityCheck = z.union([
  z.literal("distinctItemQuantity"),
  z.literal("fees"),
  z.literal("fullBlast"),
  z.literal("consistency"),
  z.literal("optionalFields"),
  z.literal("orderItemQuantity"),
  z.literal("outliers"),
  z.literal("pricePerUnit"),
]);
export type SanityCheck = z.infer<typeof SanityCheck>;
export const SANITY_CHECKS = SanityCheck._def.options.map((o) => o.value);

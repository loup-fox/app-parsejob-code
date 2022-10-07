import { z } from "zod";
import { SanityList } from "./SanityList";

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
export type SanityCheck = SanityList[number];
export const SANITY_CHECKS = SanityCheck._def.options.map((o) => o.value);

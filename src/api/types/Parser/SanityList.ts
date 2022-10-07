import { z } from "zod";
import { SanityCheck } from "./SanityCheck";

export const SanityList = SanityCheck.array();
export type SanityList = z.infer<typeof SanityList>;

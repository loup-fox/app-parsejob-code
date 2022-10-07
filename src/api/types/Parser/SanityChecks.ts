import { z } from "zod";
import { SanityList } from "./SanityList";
import { SanityObject } from "./SanityObject";

export const SanityChecks = z.union([SanityObject, SanityList]);
export type SanityChecks = z.infer<typeof SanityChecks>;

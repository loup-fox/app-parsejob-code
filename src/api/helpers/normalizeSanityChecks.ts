import { SanityChecks } from "../types/SanityChecks";
import { SANITY_CHECKS } from "../types/SANITY_CHECKS";
import { SanityObject } from "../types/SanityObject";

export const normalizeSanityChecks = (
  sanityChecks: SanityChecks
): SanityObject => {
  if (Array.isArray(sanityChecks)) {
    return SANITY_CHECKS.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: sanityChecks.includes(curr) ? "warning" : "none",
      }),
      {} as SanityObject
    );
  }
  return sanityChecks;
};

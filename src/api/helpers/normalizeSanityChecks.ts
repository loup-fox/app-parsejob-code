import { SanityChecks, SanityObject, SANITY_CHECKS } from "../types/Parser";

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

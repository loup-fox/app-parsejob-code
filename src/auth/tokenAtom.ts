import { atomWithStorage, useAtomValue } from "jotai/utils";

export const tokenAtom = atomWithStorage<string | null>("token", null);
export const useToken = () => useAtomValue(tokenAtom);

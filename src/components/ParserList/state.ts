import { atom } from "jotai";
import { ParserSummary } from "../../api/types/ParserSummary";

export type FilterClause = {
  [name: string]: (parser: ParserSummary) => boolean;
};
export const filtersAtom = atom<FilterClause>({});

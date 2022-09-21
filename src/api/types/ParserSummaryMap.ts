import { z } from "zod";
import { ParserSummary, ParserSummary } from "./ParserSummary";

export const ParserSummaryMap = z.record(ParserSummary);
export type ParserSummaryMap = z.infer<typeof ParserSummaryMap>;

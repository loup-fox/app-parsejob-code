import { z } from "zod";

export const PARSER_STATUSES = [
  "to create",
  "to search",
  "to anonymize",
  "to code",
  "coding",
  "to validate",
  "validated",
  "rejected",
];

export const ParserStatus = z.union([
  z.literal("to create"),
  z.literal("to search"),
  z.literal("to anonymize"),
  z.literal("to code"),
  z.literal("coding"),
  z.literal("to validate"),
  z.literal("validated"),
  z.literal("rejected"),
]);
export type ParserStatus = z.infer<typeof ParserStatus>;

import { z } from "zod";

export const ParserPriority = z.union([
  z.literal("critical"),
  z.literal("major"),
  z.literal("minor"),
  z.literal("trivial"),
]);

export type ParserPriority = z.infer<typeof ParserPriority>;

import { z } from "zod";
import { ParserPriority } from "./ParserPriority";
import { ParserStatus } from "./ParserStatus";

export const Parser = z.object({
  name: z.string(),
  version: z.string().optional().default("0"),
  from: z.string().optional().default(""),
  subjectFilter: z.string().optional().default(""),
  useBqFilter: z.boolean().optional().default(false),
  bqFilter: z.string().optional(),
  status: ParserStatus.optional().default("to create"),
  priority: ParserPriority.optional().default("trivial"),
  sourceCode: z.string().nullable().optional().default(""),
  sourceCodeAnonymization: z.string().nullable().optional().default(""),
  sourceCodePostParser: z.string().nullable().optional().default(""),
  samples: z.object({}).array(),
});
export type Parser = z.infer<typeof Parser>;

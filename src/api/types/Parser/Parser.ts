import { z } from "zod";
import { ParserPriority } from "../ParserPriority";
import { ParserStatus } from "../ParserStatus";
import { Sample } from "./Sample";
import { SanityChecks } from "./SanityChecks";

export const Parser = z.object({
  name: z.string().optional().default(""),
  version: z.string().optional().default("0"),
  from: z.string().optional().default(""),
  subjectFilter: z.string().optional().default(""),
  useBqFilter: z.boolean().optional().default(false),
  bqFilter: z.string().optional(),
  htmlFilter: z.string().nullable().optional(),
  type: z
    .union([z.literal("crawler"), z.literal("mail")])
    .nullable()
    .optional(),
  typeTransaction: z.string().nullable().optional(),
  status: ParserStatus.optional().default("to create"),
  priority: ParserPriority.optional().default("trivial"),
  sourceCode: z.string().nullable().optional().default(""),
  sourceCodeAnonymization: z.string().nullable().optional().default(""),
  sourceCodePostParser: z.string().nullable().optional().default(""),
  companyExpeditor: z.string().nullable().optional().default(""),
  samples: Sample.array().optional().default([]),
  parseOnlyHtml: z.boolean().nullable().optional().default(false),
  pdf: z.boolean().optional().default(false),
  note: z.string().nullable().optional(),
  sanityList: SanityChecks.nullable().optional(),
  industry: z.string().nullable().optional(),
  category: z.string().array().nullable().optional(),
});
export type Parser = z.infer<typeof Parser>;

import { z } from "zod";
import { ParserPriority } from "./ParserPriority";
import { ParserStatus } from "./ParserStatus";

export const SanityCheckErrorLevel = z.union([
  z.literal("error"),
  z.literal("warning"),
  z.literal("info"),
  z.literal("none"),
]);
export type SanityCheckItem = z.infer<typeof SanityCheckErrorLevel>;

export const SANITY_CHECKS = [
  "distinctItemQuantity",
  "fees",
  "fullBlast",
  "consistency",
  "optionalFields",
  "orderItemQuantity",
  "outliers",
  "pricePerUnit",
] as const;
export type SanityCheck = typeof SANITY_CHECKS[number];

export const SanityObject = z.object({
  distinctItemQuantity: SanityCheckErrorLevel.optional().nullable(),
  fees: SanityCheckErrorLevel.optional().nullable(),
  fullBlast: SanityCheckErrorLevel.optional().nullable(),
  optionalFields: SanityCheckErrorLevel.optional().nullable(),
  consistency: SanityCheckErrorLevel.optional().nullable(),
  orderItemQuantity: SanityCheckErrorLevel.optional().nullable(),
  outliers: SanityCheckErrorLevel.optional().nullable(),
  pricePerUnit: SanityCheckErrorLevel.optional().nullable(),
});
export type SanityObject = z.infer<typeof SanityObject>;

export const SanityList = z
  .union([
    z.literal("distinctItemQuantity"),
    z.literal("fees"),
    z.literal("fullBlast"),
    z.literal("consistency"),
    z.literal("optionalFields"),
    z.literal("orderItemQuantity"),
    z.literal("outliers"),
    z.literal("pricePerUnit"),
  ])
  .array();
export type SanityList = z.infer<typeof SanityList>;

export const SanityChecks = z.union([SanityObject, SanityList]);
export type SanityChecks = z.infer<typeof SanityChecks>;

export const Parser = z.object({
  name: z.string(),
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
  samples: z.object({}).array(),
  parseOnlyHtml: z.boolean().nullable().optional().default(false),
  pdf: z.boolean().optional().default(false),
  note: z.string().nullable().optional(),
  sanityList: SanityChecks.nullable().optional(),
  industry: z.string().nullable().optional(),
  category: z.string().array().nullable().optional(),
});
export type Parser = z.infer<typeof Parser>;

import { z } from "zod";

export const ParserSummary = z.object({
  category: z.string().array(),
  foxbrainStatus: z.string().optional(),
  from: z.string().optional(),
  htmlFilter: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  lastCodedBy: z.string().optional(),
  lastRejectedBy: z
    .object({
      email: z.string(),
      rejectType: z.string().nullable(),
      date: z.string().nullable(),
    })
    .nullable()
    .optional(),
  name: z.string(),
  priority: z.string().optional(),
  status: z.string(),
  subjectFilter: z.string().optional(),
});
export type ParserSummary = z.infer<typeof ParserSummary>;

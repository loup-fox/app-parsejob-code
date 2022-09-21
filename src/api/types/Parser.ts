import { z } from "zod";

export const Parser = z.object({
  name: z.string(),
  sourceCode: z.string(),
  sourceCodeAnonymization: z.string().optional(),
  sourceCodePostParser: z.string().optional(),
  samples: z.object({}).array(),
});
export type Parser = z.infer<typeof Parser>;

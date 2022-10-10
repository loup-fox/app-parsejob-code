import { z } from "zod";

export const SampleHeaders = z.object({
  accountId: z.string().optional(),
  boxName: z.string().optional(),
  date: z.string().optional(),
  from: z.string().optional(),
  seen: z.boolean().optional(),
  listUnsuscribe: z.string().optional(),
  signature: z.string().optional(),
  subject: z.string().optional(),
  uid: z
    .union([z.number(), z.string()])
    .transform((x) => {
      if (typeof x === "number") {
        return x.toString();
      }
      return x;
    })
    .optional(),
});
export type SampleHeaders = z.infer<typeof SampleHeaders>;

export const Sample = z.object({
  headers: SampleHeaders,
  html: z.string(),
  hasPdf: z.boolean().optional(),
  text: z.string().optional(),
  loaded: z.boolean().optional(),
  version: z.string().optional(),
});
export type Sample = z.infer<typeof Sample>;

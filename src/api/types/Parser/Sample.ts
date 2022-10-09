import { z } from "zod";

export const Sample = z.object({
  headers: z.object({
    accountId: z.string(),
    boxName: z.string(),
    date: z.string(),
    from: z.string(),
    seen: z.boolean(),
    signature: z.string(),
    subject: z.string(),
    uid: z.number(),
  }),
  html: z.string(),
  text: z.string().optional(),
  loaded: z.boolean(),
  version: z.string().optional(),
});

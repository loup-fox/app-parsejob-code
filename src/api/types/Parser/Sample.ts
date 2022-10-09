import { z } from "zod";

export const Sample = z.object({
  headers: z.object({
    accountId: z.string().optional(),
    boxName: z.string().optional(),
    date: z.string().optional(),
    from: z.string().optional(),
    seen: z.boolean().optional(),
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
  }),
  html: z.string(),
  text: z.string().optional(),
  loaded: z.boolean(),
  version: z.string().optional(),
});

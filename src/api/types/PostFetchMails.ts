import { z } from "zod";
import { Sample } from "./Parser/Sample";

export const PostFetchMails = z.object({
  context: z.string(),
  date: z.object({
    after: z.string().optional().default(""),
    before: z.string().optional().default(""),
  }),
  from: z.string(),
  htmlFilter: z.string().optional().default(""),
  name: z.string().optional().default(""),
  pdfToHtml: z.boolean().optional().default(false),
  shuffle: z.boolean().optional().default(true),
  subjectFilter: z.string().optional().default(".*"),
});

export type PostFetchMails = z.infer<typeof PostFetchMails>;
export type PostFetchMailsInput = z.input<typeof PostFetchMails>;
export const FetchMailsStatus = z
  .object({
    loading: z.boolean(),
    fetchMetadataTime: z.number().optional(),
    fetchedMetadata: z.number().optional(),
    fetchedMetadataAccounts: z.number().optional(),
    filteredMailsCount: z.number().optional(),
    filteredMails: z
      .object({
        from: z.number().optional(),
        html: z.number().optional(),
        subject: z.number().optional(),
        total: z.number().optional(),
      })
      .optional(),
    mailCount: z.number().optional(),
    mails: Sample.array().optional(),
    start: z.string().optional(),
  })
  .passthrough();
export type FetchMailsStatus = z.infer<typeof FetchMailsStatus>;
